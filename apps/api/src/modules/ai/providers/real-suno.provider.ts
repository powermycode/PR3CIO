import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { getEnv } from "../../../config/app.config";
import type { SunoProvider } from "../suno.provider";

@Injectable()
export class RealSunoProvider implements SunoProvider {
  private readonly env = getEnv();

  async generate(input: {
    mood: string;
    genre: string;
    theme: string;
    customLyrics?: string;
    artistId: string;
    projectId: string;
  }) {
    if (!this.env.SUNO_API_KEY) {
      throw new ServiceUnavailableException("SUNO_API_KEY is not configured");
    }

    const response = await fetch(`${this.env.SUNO_API_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.env.SUNO_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mood: input.mood,
        genre: input.genre,
        theme: input.theme,
        lyrics: input.customLyrics,
        projectId: input.projectId,
        artistId: input.artistId
      })
    });

    if (!response.ok) {
      throw new ServiceUnavailableException(`Suno generate failed: ${response.status}`);
    }

    const payload = (await response.json()) as {
      instrumentalUrl?: string;
      lyrics?: string;
      metadata?: Record<string, unknown>;
    };

    if (!payload.instrumentalUrl || !payload.lyrics) {
      throw new ServiceUnavailableException("Suno response missing required fields");
    }

    return {
      instrumentalUrl: payload.instrumentalUrl,
      lyrics: payload.lyrics,
      metadata: payload.metadata ?? { provider: "suno" }
    };
  }
}
