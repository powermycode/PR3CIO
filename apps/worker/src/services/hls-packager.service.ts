import { Injectable } from "@nestjs/common";
import {
  mkdtemp,
  mkdir,
  readdir,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import { join, relative } from "node:path";
import { tmpdir } from "node:os";
import { getEnv } from "../config/env.schema";
import { S3Service } from "../infra/s3.service";
import { FfmpegService } from "./ffmpeg.service";

@Injectable()
export class HlsPackagerService {
  private readonly env = getEnv();

  constructor(private readonly s3Service: S3Service, private readonly ffmpegService: FfmpegService) {}

  async processTrack(params: { trackId: string; masterAudioKey: string }): Promise<{ masterManifestKey: string }> {
    const tempRoot = await mkdtemp(join(tmpdir(), "pr3cio-hls-"));

    try {
      const sourcePath = join(tempRoot, "source.wav");
      const outPath = join(tempRoot, "hls");
      await mkdir(outPath, { recursive: true });

      const source = await this.s3Service.download({
        Bucket: this.env.S3_BUCKET_AUDIO,
        Key: params.masterAudioKey
      });
      await writeFile(sourcePath, source);

      await this.ffmpegService.run([
        "-y",
        "-i",
        sourcePath,
        "-filter_complex",
        "[0:a]asplit=3[a1][a2][a3]",
        "-map",
        "[a1]",
        "-c:a:0",
        "aac",
        "-b:a:0",
        "64k",
        "-map",
        "[a2]",
        "-c:a:1",
        "aac",
        "-b:a:1",
        "128k",
        "-map",
        "[a3]",
        "-c:a:2",
        "aac",
        "-b:a:2",
        "256k",
        "-f",
        "hls",
        "-hls_time",
        "6",
        "-hls_playlist_type",
        "vod",
        "-hls_flags",
        "independent_segments",
        "-master_pl_name",
        "master.m3u8",
        "-hls_segment_filename",
        join(outPath, "%v", "seg_%03d.ts"),
        "-var_stream_map",
        "a:0,name:64k a:1,name:128k a:2,name:256k",
        join(outPath, "%v.m3u8")
      ]);

      const files = await this.listFiles(outPath);
      await Promise.all(
        files.map(async (filePath) => {
          const content = await readFile(filePath);
          const rel = relative(outPath, filePath).replaceAll("\\", "/");
          const key = `tracks/${params.trackId}/hls/${rel}`;

          await this.s3Service.upload({
            Bucket: this.env.S3_BUCKET_AUDIO,
            Key: key,
            Body: content,
            ContentType: rel.endsWith(".m3u8")
              ? "application/vnd.apple.mpegurl"
              : "video/mp2t"
          });
        })
      );

      return {
        masterManifestKey: `tracks/${params.trackId}/hls/master.m3u8`
      };
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  }

  private async listFiles(root: string): Promise<string[]> {
    const entries = await readdir(root, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
      const absPath = join(root, entry.name);
      if (entry.isDirectory()) {
        files.push(...(await this.listFiles(absPath)));
      } else {
        files.push(absPath);
      }
    }

    return files;
  }
}
