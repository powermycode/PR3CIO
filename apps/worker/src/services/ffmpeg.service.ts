import { Injectable } from "@nestjs/common";
import { spawn } from "node:child_process";
import { getEnv } from "../config/env.schema";

@Injectable()
export class FfmpegService {
  private readonly env = getEnv();

  run(args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const process = spawn(this.env.FFMPEG_PATH, args, {
        stdio: ["ignore", "pipe", "pipe"]
      });

      let stderr = "";
      process.stderr.on("data", (chunk: Buffer) => {
        stderr += chunk.toString("utf8");
      });

      process.on("exit", (code) => {
        if (code === 0) {
          resolve();
          return;
        }

        reject(new Error(`ffmpeg exited with code ${code}: ${stderr}`));
      });
    });
  }
}
