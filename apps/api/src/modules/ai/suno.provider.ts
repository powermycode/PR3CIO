export const SUNO_PROVIDER = "SUNO_PROVIDER";

export interface SunoProvider {
  generate(input: {
    mood: string;
    genre: string;
    theme: string;
    customLyrics?: string;
    artistId: string;
    projectId: string;
  }): Promise<{
    instrumentalUrl: string;
    lyrics: string;
    metadata: Record<string, unknown>;
  }>;
}
