import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Queue, Worker, type Job } from "bullmq";
import type { AnalyticsAggregateDailyJob } from "@pr3cio/types";
import { QUEUE_NAMES } from "@pr3cio/types";
import { RedisService } from "../infra/redis.service";
import { RevenueAggregationService } from "../services/revenue-aggregation.service";
import { logError, logInfo } from "../utils/structured-logger";

@Injectable()
export class AnalyticsAggregateDailyProcessor implements OnModuleInit, OnModuleDestroy {
  private worker?: Worker<AnalyticsAggregateDailyJob>;
  private queue?: Queue<AnalyticsAggregateDailyJob>;

  constructor(
    private readonly redisService: RedisService,
    private readonly revenueAggregation: RevenueAggregationService
  ) {}

  async onModuleInit(): Promise<void> {
    const connection = this.redisService.getClient();

    this.worker = new Worker<AnalyticsAggregateDailyJob>(
      QUEUE_NAMES.ANALYTICS_AGGREGATE_DAILY,
      async (job: Job<AnalyticsAggregateDailyJob>) => this.handleJob(job),
      {
        connection
      }
    );

    this.worker.on("failed", (job: Job<AnalyticsAggregateDailyJob> | undefined, error: Error) => {
      if (!job) {
        return;
      }

      logError("analytics.aggregateDaily failed", {
        jobId: job.id,
        date: job.data.date,
        attempt: job.attemptsMade,
        error: error.message
      });
    });

    this.queue = new Queue<AnalyticsAggregateDailyJob>(QUEUE_NAMES.ANALYTICS_AGGREGATE_DAILY, {
      connection
    });

    await this.queue.add(
      "nightly-aggregation",
      {
        date: this.yesterdayDateUTC()
      },
      {
        jobId: "nightly-stream-aggregation",
        repeat: {
          pattern: "0 2 * * *"
        },
        removeOnComplete: true,
        removeOnFail: 30
      }
    );
  }

  async onModuleDestroy(): Promise<void> {
    await this.worker?.close();
    await this.queue?.close();
  }

  private async handleJob(job: Job<AnalyticsAggregateDailyJob>): Promise<void> {
    const date = job.data.date || this.yesterdayDateUTC();
    await this.revenueAggregation.aggregateDate(date);
    logInfo("analytics.aggregateDaily completed", {
      jobId: job.id,
      date
    });
  }

  private yesterdayDateUTC(): string {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - 1);
    return date.toISOString().slice(0, 10);
  }
}
