export declare const QUEUE_NAMES: {
    readonly AI_GENERATE: "ai.generate";
    readonly AI_MERGE_ENHANCE: "ai.mergeEnhance";
    readonly TRACKS_PROCESS_HLS: "tracks.processHls";
    readonly ANALYTICS_AGGREGATE_DAILY: "analytics.aggregateDaily";
};
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
//# sourceMappingURL=queue.d.ts.map