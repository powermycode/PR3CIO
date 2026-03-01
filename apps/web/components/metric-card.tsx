export function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <article
      style={{
        border: "1px solid var(--line)",
        borderRadius: 14,
        padding: 16,
        background: "var(--card)",
        minWidth: 220
      }}
    >
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>{label}</p>
      <p style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 700 }}>{value}</p>
    </article>
  );
}
