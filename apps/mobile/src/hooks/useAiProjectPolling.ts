import { useEffect, useState } from "react";
import type { AIProjectStatus } from "@pr3cio/types";
import { apiFetch } from "../lib/api";

export interface AiProjectSummary {
  id: string;
  status: AIProjectStatus;
  generatedLyrics?: string;
  instrumentalKey?: string;
  vocalKey?: string;
  finalMasterKey?: string;
}

export function useAiProjectPolling(projectId?: string, enabled = true) {
  const [project, setProject] = useState<AiProjectSummary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectId || !enabled) {
      return;
    }

    let active = true;
    let interval: NodeJS.Timeout | undefined;

    const fetchProject = async () => {
      setLoading(true);
      try {
        const data = await apiFetch<AiProjectSummary>(`/ai/projects/${projectId}`);
        if (active) {
          setProject(data);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchProject();
    interval = setInterval(() => {
      void fetchProject();
    }, 3000);

    return () => {
      active = false;
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [projectId, enabled]);

  return {
    project,
    loading
  };
}
