"use server";

import { processTrackGeneration, processTrackUpload } from "../lib/track-service";

export async function uploadTrackAction(formData: FormData) {
  return processTrackUpload(formData);
}

export async function generateTrack(prompt: string) {
  return processTrackGeneration(prompt);
}
