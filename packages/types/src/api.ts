import type { AIProjectStatus, TrackStatus, UserRole } from "./domain";

export interface ApiResponse<T> {
  data: T;
}

export interface SessionPayload {
  supabaseUserId: string;
  email: string;
  displayName?: string;
  role: UserRole;
}

export interface AIGenerateRequest {
  mood: string;
  genre: string;
  theme: string;
  customLyrics?: string;
}

export interface AIGenerateResponse {
  projectId: string;
  status: AIProjectStatus;
}

export interface TrackPublishRequest {
  isOriginal: boolean;
  copyrightDeclared: boolean;
  termsAccepted: boolean;
}

export interface TrackSummary {
  id: string;
  artistId: string;
  title: string;
  status: TrackStatus;
}
