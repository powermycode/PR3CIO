import { AdminShell } from "../../components/admin-shell";
import { MetricCard } from "../../components/metric-card";
import { serverFetch } from "../../lib/api";
import { requireAdmin } from "../../lib/role-guard";

interface DashboardData {
  totalStreams: number;
  activeArtists: number;
  projectedRevenueMicros: number;
}

export default async function AdminDashboardPage() {
  await requireAdmin();

  const dashboard = await serverFetch<DashboardData>("/admin/dashboard").catch(() => ({
    totalStreams: 0,
    activeArtists: 0,
    projectedRevenueMicros: 0
  }));

  return (
    <AdminShell title="Admin Dashboard">
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <MetricCard label="Total Streams" value={dashboard.totalStreams} />
        <MetricCard label="Active Artists" value={dashboard.activeArtists} />
        <MetricCard label="Revenue Projection (USD)" value={`$${(dashboard.projectedRevenueMicros / 1_000_000).toFixed(2)}`} />
      </div>
    </AdminShell>
  );
}
