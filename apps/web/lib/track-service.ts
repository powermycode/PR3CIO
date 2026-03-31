import "server-only";

import { revalidatePath } from "next/cache";
import {
  addGeneratedTrack,
  addUploadedTrack,
  createTrackId
} from "./mock-db";
import { extractTrackMetadata } from "./track-metadata";
import { createRemoteFileRef, persistUploadedFile } from "./upload-storage";
import { getServerEnv } from "./env";

const FALLBACK_GENERATED_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3";

export interface UploadTrackActionResult {
  success: boolean;
  artist?: string;
  title?: string;
  fileUrl?: string;
  error?: string;
}

export interface GenerateTrackActionResult {
  success: boolean;
  artist?: string;
  title?: string;
  fileUrl?: string;
  provider?: "suno" | "mock";
  warning?: string;
  error?: string;
}

function isMp3File(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  return name.endsWith(".mp3") || type === "audio/mpeg" || type === "audio/mp3" || type === "mpeg";
}

function titleFromPrompt(prompt: string): string {
  const collapsed = prompt.trim().replace(/\s+/g, " ");
  const snippet = collapsed.split(" ").slice(0, 5).join(" ");
  const candidate = snippet || "Generated Track";

  return candidate
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function readString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readNestedRecord(record: Record<string, unknown>, key: string): Record<string, unknown> | undefined {
  const value = record[key];
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return undefined;
}

function readFirstRecord(record: Record<string, unknown>, key: string): Record<string, unknown> | undefined {
  const value = record[key];
  if (!Array.isArray(value) || value.length === 0) {
    return undefined;
  }

  const first = value[0];
  if (first && typeof first === "object") {
    return first as Record<string, unknown>;
  }

  return undefined;
}

function normalizeGeneratedPayload(payload: Record<string, unknown>, prompt: string) {
  const nestedData = readNestedRecord(payload, "data");
  const firstClip = readFirstRecord(payload, "clips") ?? readFirstRecord(payload, "songs") ?? readFirstRecord(payload, "data");
  const source = firstClip ?? nestedData ?? payload;

  const fileUrl =
    readString(source, "audio_url") ??
    readString(source, "audioUrl") ??
    readString(source, "stream_url") ??
    readString(source, "streamUrl") ??
    readString(source, "file_url") ??
    readString(source, "fileUrl");

  const title =
    readString(source, "title") ??
    readString(source, "song_title") ??
    readString(source, "songTitle") ??
    titleFromPrompt(prompt);

  const artist =
    readString(source, "artist") ??
    readString(source, "artist_name") ??
    readString(source, "artistName") ??
    "AI Studio";

  return { fileUrl, title, artist };
}

function revalidateCatalogViews() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function processTrackUpload(formData: FormData): Promise<UploadTrackActionResult> {
  const entry = formData.get("audioFile") ?? formData.get("file");
  if (!(entry instanceof File)) {
    return { success: false, error: "Please choose an MP3 file to upload." };
  }

  if (!isMp3File(entry)) {
    return { success: false, error: "Only MP3 uploads are supported right now." };
  }

  const parsed = await extractTrackMetadata(entry);
  const trackId = createTrackId();
  const storage = await persistUploadedFile(trackId, entry);

  const result = addUploadedTrack({
    trackId,
    artistName: parsed.artistName,
    title: parsed.title,
    fileName: entry.name,
    previewUrl: storage.fileUrl,
    storage
  });

  revalidateCatalogViews();

  return {
    success: true,
    artist: result.artist.name,
    title: result.track.title,
    fileUrl: result.track.previewUrl
  };
}

export async function processTrackGeneration(prompt: string): Promise<GenerateTrackActionResult> {
  const trimmedPrompt = prompt.trim();
  if (!trimmedPrompt) {
    return { success: false, error: "Enter a prompt before generating a track." };
  }

  const { sunoApiBaseUrl, sunoApiKey } = getServerEnv();

  if (sunoApiKey) {
    try {
      const response = await fetch(`${sunoApiBaseUrl}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sunoApiKey}`
        },
        body: JSON.stringify({
          prompt: trimmedPrompt,
          title: titleFromPrompt(trimmedPrompt)
        }),
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error(`Suno request failed (${response.status})`);
      }

      const payload = (await response.json()) as Record<string, unknown>;
      const normalized = normalizeGeneratedPayload(payload, trimmedPrompt);
      if (!normalized.fileUrl) {
        throw new Error("Suno response did not include an audio URL");
      }

      const storage = createRemoteFileRef(normalized.fileUrl, normalized.title);
      const result = addGeneratedTrack({
        title: normalized.title,
        artistName: normalized.artist,
        prompt: trimmedPrompt,
        previewUrl: normalized.fileUrl,
        provider: "suno",
        storage
      });

      revalidateCatalogViews();

      return {
        success: true,
        artist: result.artist.name,
        title: result.track.title,
        fileUrl: result.track.previewUrl,
        provider: "suno"
      };
    } catch (error) {
      const fallbackStorage = createRemoteFileRef(FALLBACK_GENERATED_AUDIO_URL, titleFromPrompt(trimmedPrompt));
      const result = addGeneratedTrack({
        title: titleFromPrompt(trimmedPrompt),
        artistName: "AI Studio",
        prompt: trimmedPrompt,
        previewUrl: FALLBACK_GENERATED_AUDIO_URL,
        provider: "mock",
        storage: fallbackStorage
      });

      revalidateCatalogViews();

      return {
        success: true,
        artist: result.artist.name,
        title: result.track.title,
        fileUrl: result.track.previewUrl,
        provider: "mock",
        warning: error instanceof Error ? error.message : "Suno was unavailable, so a mock track was created instead."
      };
    }
  }

  const fallbackStorage = createRemoteFileRef(FALLBACK_GENERATED_AUDIO_URL, titleFromPrompt(trimmedPrompt));
  const result = addGeneratedTrack({
    title: titleFromPrompt(trimmedPrompt),
    artistName: "AI Studio",
    prompt: trimmedPrompt,
    previewUrl: FALLBACK_GENERATED_AUDIO_URL,
    provider: "mock",
    storage: fallbackStorage
  });

  revalidateCatalogViews();

  return {
    success: true,
    artist: result.artist.name,
    title: result.track.title,
    fileUrl: result.track.previewUrl,
    provider: "mock",
    warning: "SUNO_API_KEY is not configured, so a mock generated track was created."
  };
}
