import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Worker, type Job } from "bullmq";
import type { AIMergeEnhanceJob } from "@pr3cio/types";
import { QUEUE_NAMES } from "@pr3cio/types";
import { getEnv } from "../config/env.schema";
import { RedisService } from "../infra/redis.service";
import { S3Service } from "../infra/s3.service";
import { AiProjectStateService } from "../services/ai-project-state.service";
import { logError, logInfo } from "../utils/structured-logger";

@Injectable()
export class AiMergeEnhanceProcessor implements OnModuleInit, OnModuleDestroy {
  private worker?: Worker<AIMergeEnhanceJob>;
  private readonly env = getEnv();

  constructor(
    private readonly redisService: RedisService,
    private readonly s3Service: S3Service,
    private readonly aiProjectState: AiProjectStateService
  ) {}

  onModuleInit(): void {
    this.worker = new Worker<AIMergeEnhanceJob>(
      QUEUE_NAMES.AI_MERGE_ENHANCE,
      async (job: Job<AIMergeEnhanceJob>) => this.handleJob(job),
      {
        connection: this.redisService.getClient() as any
      }
    );

    this.worker.on("failed", async (job: Job<AIMergeEnhanceJob> | undefined, error: Error) => {
      if (!job) {
        return;
      }

      const attempts = job.opts.attempts ?? 1;
      if (job.attemptsMade >= attempts) {
        await this.aiProjectState.setFailed(job.data.projectId, error.message);
      }

      logError("ai.mergeEnhance failed", {
        jobId: job.id,
        projectId: job.data.projectId,
        attempt: job.attemptsMade,
        error: error.message
      });
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.worker?.close();
  }

  private async handleJob(job: Job<AIMergeEnhanceJob>): Promise<void> {
    logInfo("ai.mergeEnhance started", {
      jobId: job.id,
      projectId: job.data.projectId
    });

    const vocal = await this.s3Service.download({
      Bucket: this.env.S3_BUCKET_AUDIO,
      Key: job.data.vocalKey
    });

    const instrumental = await this.s3Service.download({
      Bucket: this.env.S3_BUCKET_AUDIO,
      Key: job.data.instrumentalKey
    });

    // Phase 1 enhancement mock: prioritize vocal stem and fallback to instrumental.
    const merged = vocal.length ? vocal : instrumental;
    const finalMasterKey = `ai-projects/${job.data.projectId}/final-master.wav`;

    await this.s3Service.upload({
      Bucket: this.env.S3_BUCKET_AUDIO,
      Key: finalMasterKey,
      Body: merged,
      ContentType: "audio/wav"
    });

    await this.aiProjectState.setCompleted(job.data.projectId, finalMasterKey);

    logInfo("ai.mergeEnhance completed", {
      jobId: job.id,
      projectId: job.data.projectId,
      finalMasterKey
    });
  }
}
