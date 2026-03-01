import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { Queue } from "bullmq";
import type {
  AIGenerateJob,
  AIMergeEnhanceJob,
  AnalyticsAggregateDailyJob,
  TrackProcessHlsJob
} from "@pr3cio/types";
import { QUEUE_NAMES } from "@pr3cio/types";
import { RedisService } from "./redis.service";

@Injectable()
export class QueueService implements OnModuleDestroy {
  private readonly aiGenerateQueue: Queue<AIGenerateJob>;
  private readonly aiMergeQueue: Queue<AIMergeEnhanceJob>;
  private readonly hlsQueue: Queue<TrackProcessHlsJob>;
  private readonly analyticsQueue: Queue<AnalyticsAggregateDailyJob>;

  constructor(redisService: RedisService) {
    const connection = redisService.getClient();

    this.aiGenerateQueue = new Queue<AIGenerateJob>(QUEUE_NAMES.AI_GENERATE, { connection });
    this.aiMergeQueue = new Queue<AIMergeEnhanceJob>(QUEUE_NAMES.AI_MERGE_ENHANCE, { connection });
    this.hlsQueue = new Queue<TrackProcessHlsJob>(QUEUE_NAMES.TRACKS_PROCESS_HLS, { connection });
    this.analyticsQueue = new Queue<AnalyticsAggregateDailyJob>(QUEUE_NAMES.ANALYTICS_AGGREGATE_DAILY, {
      connection
    });
  }

  enqueueAIGenerate(job: AIGenerateJob) {
    return this.aiGenerateQueue.add("generate", job, {
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 3000
      },
      removeOnComplete: true,
      removeOnFail: 100
    });
  }

  enqueueAIMergeEnhance(job: AIMergeEnhanceJob) {
    return this.aiMergeQueue.add("merge-enhance", job, {
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 3000
      },
      removeOnComplete: true,
      removeOnFail: 100
    });
  }

  enqueueTrackProcessHls(job: TrackProcessHlsJob) {
    return this.hlsQueue.add("process-hls", job, {
      attempts: 4,
      backoff: {
        type: "exponential",
        delay: 3000
      },
      removeOnComplete: true,
      removeOnFail: 100
    });
  }

  enqueueAnalyticsAggregateDaily(job: AnalyticsAggregateDailyJob) {
    return this.analyticsQueue.add("aggregate-daily", job, {
      attempts: 3,
      removeOnComplete: true,
      removeOnFail: 50
    });
  }

  async onModuleDestroy(): Promise<void> {
    await Promise.all([
      this.aiGenerateQueue.close(),
      this.aiMergeQueue.close(),
      this.hlsQueue.close(),
      this.analyticsQueue.close()
    ]);
  }
}
