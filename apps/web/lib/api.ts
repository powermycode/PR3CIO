const externalBaseUrl = process.env.NEXT_PUBLIC_API_URL;

function resolveBaseUrl(): string {
  if (externalBaseUrl) {
    return externalBaseUrl;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/demo`;
  }

  return "http://localhost:3000/api/demo";
}

export async function serverFetch<T>(path: string, token?: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${resolveBaseUrl()}${path}`, {
    ...init,
    cache: "no-store",
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
