import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { jwtVerify, SignJWT } from "jose";
import { getEnv } from "../../config/app.config";
import { PrismaService } from "../../infra/prisma.service";
import { S3Service } from "../../infra/s3.service";

@Injectable()
export class StreamManifestService {
  private readonly env = getEnv();
  private readonly secret = new TextEncoder().encode(this.env.PLAYBACK_TOKEN_SECRET);

  constructor(private readonly prisma: PrismaService, private readonly s3Service: S3Service) {}

  async getSignedMasterManifest(userId: string, trackId: string): Promise<string> {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
      select: {
        id: true,
        status: true,
        blockedAt: true,
        hlsMasterManifestKey: true
      }
    });

    if (!track) {
      throw new NotFoundException("Track not found");
    }

    if (track.status !== "PUBLISHED" || track.blockedAt) {
      throw new ForbiddenException("Track is not playable");
    }

    if (!track.hlsMasterManifestKey) {
      throw new NotFoundException("HLS master manifest missing");
    }

    const manifest = await this.s3Service.getObjectText({
      Bucket: this.env.S3_BUCKET_AUDIO,
      Key: track.hlsMasterManifestKey
    });

    const lines = manifest.split("\n");
    const rewritten = await Promise.all(
      lines.map(async (line) => {
        if (!line || line.startsWith("#") || !line.endsWith(".m3u8")) {
          return line;
        }

        const variantName = line.replace(".m3u8", "");
        const token = await this.signPlaybackToken({
          userId,
          trackId,
          variant: variantName
        });

        return `/tracks/${trackId}/variant/${variantName}?token=${token}`;
      })
    );

    return rewritten.join("\n");
  }

  async getSignedVariantManifest(trackId: string, variantName: string, token: string): Promise<string> {
    await this.verifyPlaybackToken(token, trackId, variantName);

    const key = `tracks/${trackId}/hls/${variantName}.m3u8`;
    const manifest = await this.s3Service.getObjectText({
      Bucket: this.env.S3_BUCKET_AUDIO,
      Key: key
    });

    const rewritten = await Promise.all(
      manifest.split("\n").map(async (line) => {
        if (!line || line.startsWith("#") || !line.endsWith(".ts")) {
          return line;
        }

        const segmentKey = `tracks/${trackId}/hls/${variantName}/${line}`;
        return this.s3Service.getDownloadUrl({
          bucket: this.env.S3_BUCKET_AUDIO,
          key: segmentKey,
          expiresIn: this.env.HLS_SIGNED_URL_TTL_SECONDS
        });
      })
    );

    return rewritten.join("\n");
  }

  private async signPlaybackToken(payload: {
    userId: string;
    trackId: string;
    variant: string;
  }): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${this.env.HLS_SIGNED_URL_TTL_SECONDS}s`)
      .sign(this.secret);
  }

  private async verifyPlaybackToken(token: string, trackId: string, variantName: string): Promise<void> {
    const { payload } = await jwtVerify(token, this.secret);

    if (payload.trackId !== trackId || payload.variant !== variantName) {
      throw new BadRequestException("Invalid playback token");
    }
  }
}
