import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { getEnv } from "../../config/app.config";
import { PrismaService } from "../../infra/prisma.service";
import { QueueService } from "../../infra/queue.service";
import { S3Service } from "../../infra/s3.service";
import type { CreateTrackUploadDto } from "./dto/create-track-upload.dto";
import type { PublishTrackDto } from "./dto/publish-track.dto";

@Injectable()
export class TracksService {
  private readonly env = getEnv();

  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService,
    private readonly s3Service: S3Service
  ) {}

  async createTrackUpload(userId: string, dto: CreateTrackUploadDto) {
    const extension = dto.contentType.split("/")[1] ?? "wav";

    const track = await this.prisma.track.create({
      data: {
        artistId: userId,
        title: dto.title,
        genre: dto.genre,
        status: "DRAFT"
      }
    });

    const masterAudioKey = `tracks/${track.id}/master/source.${extension}`;

    let uploadUrl: string | null = null;
    if (dto.sourceKey) {
      await this.s3Service.copyObject({
        sourceBucket: this.env.S3_BUCKET_AUDIO,
        sourceKey: dto.sourceKey,
        destinationBucket: this.env.S3_BUCKET_AUDIO,
        destinationKey: masterAudioKey
      });
    } else {
      uploadUrl = await this.s3Service.getUploadUrl({
        bucket: this.env.S3_BUCKET_AUDIO,
        key: masterAudioKey,
        contentType: dto.contentType,
        expiresIn: 900
      });
    }

    await this.prisma.track.update({
      where: { id: track.id },
      data: {
        masterAudioKey
      }
    });

    return {
      trackId: track.id,
      masterAudioKey,
      uploadUrl
    };
  }

  async queueHlsProcessing(userId: string, trackId: string) {
    const track = await this.prisma.track.findUnique({ where: { id: trackId } });
    if (!track) {
      throw new NotFoundException("Track not found");
    }

    if (track.artistId !== userId) {
      throw new ForbiddenException("Track access denied");
    }

    if (!track.masterAudioKey) {
      throw new BadRequestException("Master audio is not uploaded");
    }

    await this.prisma.track.update({
      where: { id: trackId },
      data: {
        status: "PROCESSING"
      }
    });

    await this.queueService.enqueueTrackProcessHls({
      trackId,
      artistId: userId,
      masterAudioKey: track.masterAudioKey
    });

    return {
      trackId,
      status: "PROCESSING"
    };
  }

  async publish(userId: string, trackId: string, dto: PublishTrackDto) {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
      select: {
        id: true,
        artistId: true,
        status: true
      }
    });

    if (!track) {
      throw new NotFoundException("Track not found");
    }

    if (track.artistId !== userId) {
      throw new ForbiddenException("Track access denied");
    }

    if (track.status !== "READY") {
      throw new BadRequestException("Track must be READY before publishing");
    }

    if (!dto.isOriginal || !dto.copyrightDeclared || !dto.termsAccepted) {
      throw new BadRequestException("Publish compliance requirements are not met");
    }

    const profile = await this.prisma.artistProfile.findUnique({
      where: { userId },
      select: {
        userId: true,
        onboardingCompleted: true,
        ogVerifiedAt: true
      }
    });

    if (!profile?.onboardingCompleted) {
      throw new BadRequestException("Artist onboarding must be completed");
    }

    const updated = await this.prisma.track.update({
      where: { id: trackId },
      data: {
        isOriginal: true,
        copyrightDeclared: true,
        termsAccepted: true,
        status: "PUBLISHED",
        publishedAt: new Date()
      }
    });

    if (!profile.ogVerifiedAt) {
      await this.prisma.artistProfile.update({
        where: { userId },
        data: {
          ogVerifiedAt: new Date()
        }
      });
    }

    return updated;
  }
}
