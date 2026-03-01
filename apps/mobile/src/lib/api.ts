import { PR3CIOApiClient } from "@pr3cio/api-client";
import { API_URL } from "./constants";
import { supabase } from "./supabase";

export const apiClient = new PR3CIOApiClient({
  baseUrl: API_URL,
  getAccessToken: async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }
});

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return (await response.json()) as T;
}
