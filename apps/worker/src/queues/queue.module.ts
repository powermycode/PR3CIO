import { Module } from "@nestjs/common";
import { AiGenerateProcessor } from "../processors/ai-generate.processor";
import { AiMergeEnhanceProcessor } from "../processors/ai-merge-enhance.processor";
import { TrackProcessHlsProcessor } from "../processors/track-process-hls.processor";
import { AnalyticsAggregateDailyProcessor } from "../processors/analytics-aggregate-daily.processor";

@Module({
  providers: [
    AiGenerateProcessor,
    AiMergeEnhanceProcessor,
    TrackProcessHlsProcessor,
    AnalyticsAggregateDailyProcessor
  ]
})
export class QueueModule {}
