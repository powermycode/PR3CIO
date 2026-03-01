import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Worker, type Job } from "bullmq";
import type { AIGenerateJob } from "@pr3cio/types";
import { QUEUE_NAMES } from "@pr3cio/types";
import { getEnv } from "../config/env.schema";
import { RedisService } from "../infra/redis.service";
import { AiProjectStateService } from "../services/ai-project-state.service";
import { logError, logInfo } from "../utils/structured-logger";

@Injectable()
export class AiGenerateProcessor implements OnModuleInit, OnModuleDestroy {
  private worker?: Worker<AIGenerateJob>;
  private readonly env = getEnv();

  constructor(
    private readonly redisService: RedisService,
    private readonly aiProjectState: AiProjectStateService
  ) {}

  onModuleInit(): void {
    this.worker = new Worker<AIGenerateJob>(
      QUEUE_NAMES.AI_GENERATE,
      async (job: Job<AIGenerateJob>) => this.handleJob(job),
      {
        connection: this.redisService.getClient()
      }
    );

    this.worker.on("failed", async (job: Job<AIGenerateJob> | undefined, error: Error) => {
      if (!job) {
        return;
      }

      const attempts = job.opts.attempts ?? 1;
      if (job.attemptsMade >= attempts) {
        await this.aiProjectState.setFailed(job.data.projectId, error.message);
      }

      logError("ai.generate failed", {
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

  private async handleJob(job: Job<AIGenerateJob>): Promise<void> {
    logInfo("ai.generate started", {
      jobId: job.id,
      projectId: job.data.projectId
    });

    await this.aiProjectState.setGenerating(job.data.projectId);
    const result = await this.generate(job.data);

    await this.aiProjectState.setGenerated(job.data.projectId, {
      lyrics: result.lyrics,
      instrumentalKey: `ai-projects/${job.data.projectId}/instrumental.wav`,
      metadata: result.metadata as any
    });

    logInfo("ai.generate completed", {
      jobId: job.id,
      projectId: job.data.projectId
    });
  }

  private async generate(input: AIGenerateJob): Promise<{
    lyrics: string;
    metadata: Record<string, unknown>;
  }> {
    if (this.env.SUNO_MODE === "mock") {
      return {
        lyrics:
          input.customLyrics ??
          `Mock generated lyrics for ${input.genre} ${input.theme} with ${input.mood} mood.`,
        metadata: {
          provider: "mock"
        }
      };
    }

    if (!this.env.SUNO_API_KEY) {
      throw new Error("SUNO_API_KEY missing for real mode");
    }

    const response = await fetch(`${this.env.SUNO_API_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.env.SUNO_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mood: input.mood,
        genre: input.genre,
        theme: input.theme,
        lyrics: input.customLyrics,
        artistId: input.artistId,
        projectId: input.projectId
      })
    });

    if (!response.ok) {
      throw new Error(`Suno API failed (${response.status})`);
    }

    const payload = (await response.json()) as {
      lyrics?: string;
      metadata?: Record<string, unknown>;
    };

    return {
      lyrics: payload.lyrics ?? "",
      metadata: {
        provider: "suno",
        ...(payload.metadata ?? {})
      }
    };
  }
}
