import "server-only";

const DEFAULT_SUNO_API_BASE_URL = "https://api.sunoapi.org/v1";

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function getServerEnv() {
  return {
    sunoApiKey: readEnv("SUNO_API_KEY"),
    sunoApiBaseUrl: readEnv("SUNO_API_BASE_URL") ?? DEFAULT_SUNO_API_BASE_URL,
    playbackTokenSecret: readEnv("PLAYBACK_TOKEN_SECRET")
  };
}
