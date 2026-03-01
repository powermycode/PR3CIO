export const API_URL = process.env.EXPO_PUBLIC_API_URL!;
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

if (!API_URL || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing required mobile environment variables");
}
