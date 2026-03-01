import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),
  REDIS_URL: z.string().url(),
  SUPABASE_JWT_ISSUER: z.string().url(),
  SUPABASE_JWT_AUDIENCE: z.string().min(1),
  SUPABASE_JWT_JWKS_URI: z.string().url(),
  S3_REGION: z.string().min(1),
  S3_BUCKET_AUDIO: z.string().min(1),
  S3_BUCKET_IMAGES: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  SUNO_API_BASE_URL: z.string().url(),
  SUNO_API_KEY: z.string().optional(),
  SUNO_MODE: z.enum(["real", "mock"]).default("mock"),
  HLS_SIGNED_URL_TTL_SECONDS: z.coerce.number().default(120),
  PLAYBACK_TOKEN_SECRET: z.string().min(8),
  PAYOUTS_ENABLED: z.coerce.boolean().default(false)
});

export type Env = z.infer<typeof envSchema>;
