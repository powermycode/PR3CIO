import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./config/env.schema";
import { PrismaModule } from "./infra/prisma.module";
import { RedisModule } from "./infra/redis.module";
import { S3Module } from "./infra/s3.module";
import { QueueModule } from "./queues/queue.module";
import { AiProjectStateService } from "./services/ai-project-state.service";
import { FfmpegService } from "./services/ffmpeg.service";
import { HlsPackagerService } from "./services/hls-packager.service";
import { ManifestSignerService } from "./services/manifest-signer.service";
import { RevenueAggregationService } from "./services/revenue-aggregation.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, unknown>) => envSchema.parse(config)
    }),
    PrismaModule,
    RedisModule,
    S3Module,
    QueueModule
  ],
  providers: [
    AiProjectStateService,
    FfmpegService,
    HlsPackagerService,
    ManifestSignerService,
    RevenueAggregationService
  ]
})
export class WorkerModule {}
