import type {
  AIGenerateRequest,
  AIGenerateResponse,
  ApiResponse,
  TrackPublishRequest
} from "@pr3cio/types";

export interface ApiClientOptions {
  baseUrl: string;
  getAccessToken?: () => Promise<string | null>;
}

export class PR3CIOApiClient {
  constructor(private readonly options: ApiClientOptions) {}

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const token = await this.options.getAccessToken?.();
    const response = await fetch(`${this.options.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers ?? {})
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed (${response.status})`);
    }

    return (await response.json()) as T;
  }

  generateAI(payload: AIGenerateRequest) {
    return this.request<ApiResponse<AIGenerateResponse>>("/ai/generate", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  publishTrack(trackId: string, payload: TrackPublishRequest) {
    return this.request<ApiResponse<{ id: string; publishedAt: string }>>(
      `/tracks/${trackId}/publish`,
      {
        method: "POST",
        body: JSON.stringify(payload)
      }
    );
  }
}
