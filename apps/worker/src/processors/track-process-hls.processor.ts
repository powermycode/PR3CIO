import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Worker, type Job } from "bullmq";
import type { TrackProcessHlsJob } from "@pr3cio/types";
import { QUEUE_NAMES } from "@pr3cio/types";
import { PrismaService } from "../infra/prisma.service";
import { RedisService } from "../infra/redis.service";
import { HlsPackagerService } from "../services/hls-packager.service";
import { logError, logInfo } from "../utils/structured-logger";

@Injectable()
export class TrackProcessHlsProcessor implements OnModuleInit, OnModuleDestroy {
  private worker?: Worker<TrackProcessHlsJob>;

  constructor(
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
    private readonly hlsPackagerService: HlsPackagerService
  ) {}

  onModuleInit(): void {
    this.worker = new Worker<TrackProcessHlsJob>(
      QUEUE_NAMES.TRACKS_PROCESS_HLS,
      async (job: Job<TrackProcessHlsJob>) => this.handleJob(job),
      {
        connection: this.redisService.getClient() as any
      }
    );

    this.worker.on("failed", async (job: Job<TrackProcessHlsJob> | undefined, error: Error) => {
      if (!job) {
        return;
      }

      const attempts = job.opts.attempts ?? 1;
      if (job.attemptsMade >= attempts) {
        await this.prisma.track.update({
          where: { id: job.data.trackId },
          data: {
            status: "DRAFT",
            description: `HLS processing failed: ${error.message}`
          }
        });
      }

      logError("tracks.processHls failed", {
        jobId: job.id,
        trackId: job.data.trackId,
        attempt: job.attemptsMade,
        error: error.message
      });
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.worker?.close();
  }

  private async handleJob(job: Job<TrackProcessHlsJob>): Promise<void> {
    logInfo("tracks.processHls started", {
      jobId: job.id,
      trackId: job.data.trackId
    });

    const hls = await this.hlsPackagerService.processTrack({
      trackId: job.data.trackId,
      masterAudioKey: job.data.masterAudioKey
    });

    await this.prisma.track.update({
      where: { id: job.data.trackId },
      data: {
        status: "READY",
        hlsMasterManifestKey: hls.masterManifestKey
      }
    });

    logInfo("tracks.processHls completed", {
      jobId: job.id,
      trackId: job.data.trackId,
      masterManifestKey: hls.masterManifestKey
    });
  }
}
