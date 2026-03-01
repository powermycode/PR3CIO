import { NextResponse } from "next/server";
import { createAiProject, getArtistProfile } from "../../../../../lib/demo-store";

interface GenerateBody {
  mood?: string;
  genre?: string;
  theme?: string;
  customLyrics?: string;
}

function fallbackLyrics(body: GenerateBody) {
  const mood = body.mood?.trim() || "cinematic";
  const genre = body.genre?.trim() || "electronic";
  const theme = body.theme?.trim() || "ambition";

  return [
    `Late lights on the boulevard, ${theme} in my veins,`,
    `Heartbeat syncs to ${genre}, washing out the rain,`,
    `We rise in a ${mood} glow, no fear in the frame,`,
    `Every scar turns signal, every night turns flame.`
  ].join("\n");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as GenerateBody;
  const mood = body.mood?.trim() || "cinematic";
  const genre = body.genre?.trim() || "electronic";
  const theme = body.theme?.trim() || "ambition";
  const customLyrics = body.customLyrics?.trim();
  const optionalLyrics = customLyrics ? { customLyrics } : {};

  const artist = getArtistProfile();
  const sunoKey = process.env.SUNO_API_KEY;
  const sunoBase = process.env.SUNO_API_BASE_URL ?? "https://api.sunoapi.org/v1";

  if (sunoKey) {
    try {
      const response = await fetch(`${sunoBase}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sunoKey}`
        },
        body: JSON.stringify({
          mood,
          genre,
          theme,
          lyrics: customLyrics,
          title: `${theme} - ${artist.stageName}`
        })
      });

      if (!response.ok) {
        throw new Error(`Suno request failed (${response.status})`);
      }

      const payload = (await response.json()) as Record<string, unknown>;
      const instrumentalUrl =
        (typeof payload.instrumentalUrl === "string" && payload.instrumentalUrl) ||
        (typeof payload.audio_url === "string" && payload.audio_url) ||
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3";
      const generatedLyrics =
        (typeof payload.lyrics === "string" && payload.lyrics) || customLyrics || fallbackLyrics(body);

      const project = createAiProject({
        artistId: artist.id,
        mood,
        genre,
        theme,
        ...optionalLyrics,
        generatedLyrics,
        instrumentalUrl,
        provider: "suno",
        metadata: payload,
        status: "COMPLETED"
      });

      return NextResponse.json({ ok: true, project });
    } catch (error) {
      const project = createAiProject({
        artistId: artist.id,
        mood,
        genre,
        theme,
        ...optionalLyrics,
        generatedLyrics: customLyrics || fallbackLyrics(body),
        instrumentalUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        provider: "mock-fallback",
        metadata: {
          reason: error instanceof Error ? error.message : "Suno unavailable"
        },
        status: "COMPLETED"
      });

      return NextResponse.json({ ok: true, project, warning: "Suno unavailable, using fallback." });
    }
  }

  const project = createAiProject({
    artistId: artist.id,
    mood,
    genre,
    theme,
    ...optionalLyrics,
    generatedLyrics: customLyrics || fallbackLyrics(body),
    instrumentalUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    provider: "mock",
    metadata: {
      reason: "SUNO_API_KEY not configured"
    },
    status: "COMPLETED"
  });

  return NextResponse.json({ ok: true, project, warning: "Suno key missing, using mock output." });
}
