import type { CSSProperties } from "react";

interface ReportItem {
  id: string;
  reason: string;
  status: string;
  trackId?: string | null;
  artistId?: string | null;
  createdAt: string;
}

export function ReportsTable({ reports }: { reports: ReportItem[] }) {
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#0f0f0f" }}>
            <th style={cellHead}>ID</th>
            <th style={cellHead}>Reason</th>
            <th style={cellHead}>Target</th>
            <th style={cellHead}>Status</th>
            <th style={cellHead}>Created</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td style={cell}>{report.id.slice(0, 8)}</td>
              <td style={cell}>{report.reason}</td>
              <td style={cell}>{report.trackId ?? report.artistId ?? "N/A"}</td>
              <td style={cell}>{report.status}</td>
              <td style={cell}>{new Date(report.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellHead: CSSProperties = {
  textAlign: "left",
  color: "var(--muted)",
  fontWeight: 500,
  fontSize: 12,
  padding: "10px 12px",
  borderBottom: "1px solid var(--line)"
};

const cell: CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid var(--line)",
  fontSize: 13
};
