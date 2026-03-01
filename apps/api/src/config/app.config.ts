import { envSchema, type Env } from "./env.schema";

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (cachedEnv) {
    return cachedEnv;
  }

  cachedEnv = envSchema.parse(process.env);
  return cachedEnv;
}
