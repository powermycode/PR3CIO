export const QUEUE_NAMES = {
  AI_GENERATE: "ai.generate",
  AI_MERGE_ENHANCE: "ai.mergeEnhance",
  TRACKS_PROCESS_HLS: "tracks.processHls",
  ANALYTICS_AGGREGATE_DAILY: "analytics.aggregateDaily"
} as const;

export interface AIGenerateJob {
  projectId: string;
  artistId: string;
  mood: string;
  genre: string;
  theme: string;
  customLyrics?: string;
}

export interface AIMergeEnhanceJob {
  projectId: string;
  artistId: string;
  instrumentalKey: string;
  vocalKey: string;
}

export interface TrackProcessHlsJob {
  trackId: string;
  artistId: string;
  masterAudioKey: string;
}

export interface AnalyticsAggregateDailyJob {
  date: string;
}
