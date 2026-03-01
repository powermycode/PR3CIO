import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().url(),
  S3_REGION: z.string().min(1),
  S3_BUCKET_AUDIO: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  SUNO_API_BASE_URL: z.string().url(),
  SUNO_API_KEY: z.string().optional(),
  SUNO_MODE: z.enum(["real", "mock"]).default("mock"),
  HLS_SIGNED_URL_TTL_SECONDS: z.coerce.number().default(120),
  FFMPEG_PATH: z.string().default("ffmpeg")
});

export type Env = z.infer<typeof envSchema>;

let envCache: Env | null = null;

export function getEnv(): Env {
  if (envCache) {
    return envCache;
  }

  envCache = envSchema.parse(process.env);
  return envCache;
}
