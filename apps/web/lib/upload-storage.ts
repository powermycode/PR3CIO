import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import { basename, extname, join } from "path";
import { getServerEnv } from "./env";
import type { StoredFileRef, TrackRecord } from "./mock-db";

const PUBLIC_UPLOAD_DIR = join(process.cwd(), "public", "uploads");
const TEMP_UPLOAD_DIR = "/tmp/pr3cio-uploads";

function sanitizeFileName(fileName: string): string {
  const extension = extname(fileName).toLowerCase() || ".mp3";
  const stem = basename(fileName, extname(fileName))
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return `${stem || "track"}${extension}`;
}

function shouldUseTempStorage(): boolean {
  return process.env.VERCEL === "1";
}

function createPlaybackSignature(trackId: string, expires: string, secret: string): string {
  return createHmac("sha256", secret).update(`${trackId}:${expires}`).digest("hex");
}

function buildSignedPlaybackUrl(trackId: string): string {
  const { playbackTokenSecret } = getServerEnv();
  const pathname = `/api/uploads/${trackId}`;

  if (!playbackTokenSecret) {
    return pathname;
  }

  const expires = String(Date.now() + 1000 * 60 * 60 * 24);
  const signature = createPlaybackSignature(trackId, expires, playbackTokenSecret);
  return `${pathname}?expires=${encodeURIComponent(expires)}&signature=${signature}`;
}

export async function persistUploadedFile(trackId: string, file: File): Promise<StoredFileRef> {
  const fileName = `${trackId}-${sanitizeFileName(file.name)}`;
  const mimeType = file.type || "audio/mpeg";
  const buffer = Buffer.from(await file.arrayBuffer());

  if (shouldUseTempStorage()) {
    await mkdir(TEMP_UPLOAD_DIR, { recursive: true });
    const filePath = join(TEMP_UPLOAD_DIR, fileName);
    await writeFile(filePath, buffer);

    return {
      kind: "temp",
      fileName,
      filePath,
      mimeType,
      fileUrl: buildSignedPlaybackUrl(trackId)
    };
  }

  await mkdir(PUBLIC_UPLOAD_DIR, { recursive: true });
  const filePath = join(PUBLIC_UPLOAD_DIR, fileName);
  await writeFile(filePath, buffer);

  return {
    kind: "public",
    fileName,
    filePath,
    mimeType,
    fileUrl: `/uploads/${fileName}`
  };
}

export function createRemoteFileRef(fileUrl: string, title: string): StoredFileRef {
  return {
    kind: "remote",
    fileName: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "generated-track"}.mp3`,
    mimeType: "audio/mpeg",
    fileUrl
  };
}

export function verifyPlaybackRequest(trackId: string, signature: string | null, expires: string | null): boolean {
  const { playbackTokenSecret } = getServerEnv();
  if (!playbackTokenSecret) {
    return true;
  }

  if (!signature || !expires) {
    return false;
  }

  const expiry = Number(expires);
  if (!Number.isFinite(expiry) || expiry < Date.now()) {
    return false;
  }

  const expected = createPlaybackSignature(trackId, expires, playbackTokenSecret);
  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(signatureBuffer, expectedBuffer);
}

export async function readTrackBinary(track: TrackRecord): Promise<Buffer | null> {
  if (track.storage?.kind !== "temp" || !track.storage.filePath) {
    return null;
  }

  return readFile(track.storage.filePath);
}
