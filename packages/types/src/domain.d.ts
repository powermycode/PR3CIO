export type UserRole = "LISTENER" | "ARTIST" | "ADMIN";
export type TrackStatus = "DRAFT" | "PROCESSING" | "READY" | "PUBLISHED" | "BLOCKED";
export type AIProjectStatus = "QUEUED" | "GENERATING" | "GENERATED" | "MERGING" | "COMPLETED" | "FAILED";
export type ReportStatus = "OPEN" | "REVIEWED" | "RESOLVED" | "DISMISSED";
export type StreamSource = "MOBILE_IOS" | "MOBILE_ANDROID" | "WEB";
export type PayoutStatus = "ACCRUED" | "ELIGIBLE" | "HELD" | "PAID";
export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
    displayName: string;
}
export interface ArtistSocialLinks {
    instagramUrl?: string;
    youtubeUrl?: string;
    tiktokUrl?: string;
}
//# sourceMappingURL=domain.d.ts.map