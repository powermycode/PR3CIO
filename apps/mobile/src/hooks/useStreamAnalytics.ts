import { useCallback } from "react";
import type { StreamSource } from "@pr3cio/types";
import { apiFetch } from "../lib/api";

export function useStreamAnalytics() {
  const sendEvent = useCallback(
    async (params: {
      trackId: string;
      sessionId: string;
      secondsPlayed: number;
      completionRate: number;
      completed: boolean;
      source: StreamSource;
    }) => {
      await apiFetch("/streams/events", {
        method: "POST",
        body: JSON.stringify({
          ...params,
          playedAt: new Date().toISOString()
        })
      });
    },
    []
  );

  return {
    sendEvent
  };
}
