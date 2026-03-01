"use client";

import { useState } from "react";

export function ModerationActions({
  action,
  targetId,
  endpoint,
  reasonLabel
}: {
  action: string;
  targetId: string;
  endpoint: string;
  reasonLabel: string;
}) {
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const submit = async () => {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reason })
    });

    setStatus(response.ok ? `${action} succeeded` : `${action} failed`);
  };

  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 12, padding: 12, display: "grid", gap: 10 }}>
      <strong>{action}</strong>
      <div style={{ fontSize: 12, color: "var(--muted)" }}>Target: {targetId}</div>
      <input
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        placeholder={reasonLabel}
        style={{
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid var(--line)",
          background: "#0c0c0c",
          color: "var(--text)"
        }}
      />
      <button
        onClick={submit}
        style={{
          borderRadius: 10,
          border: "1px solid #4b4b4b",
          background: "#151515",
          color: "white",
          padding: "10px 12px"
        }}
      >
        Run Action
      </button>
      {status ? <small style={{ color: "var(--muted)" }}>{status}</small> : null}
    </div>
  );
}
