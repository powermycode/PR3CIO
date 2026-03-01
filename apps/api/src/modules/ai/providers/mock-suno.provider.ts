import { Injectable } from "@nestjs/common";
import type { SunoProvider } from "../suno.provider";

@Injectable()
export class MockSunoProvider implements SunoProvider {
  async generate(input: {
    mood: string;
    genre: string;
    theme: string;
    customLyrics?: string;
    artistId: string;
    projectId: string;
  }) {
    return {
      instrumentalUrl: `https://mock.pr3cio.local/${input.projectId}/instrumental.wav`,
      lyrics:
        input.customLyrics ??
        `Mock lyrics for ${input.genre} ${input.theme}. Mood: ${input.mood}. Artist ${input.artistId}.`,
      metadata: {
        provider: "mock",
        latencyMs: 1200
      }
    };
  }
}
