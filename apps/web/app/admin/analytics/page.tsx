import { AdminShell } from "../../../components/admin-shell";
import { MetricCard } from "../../../components/metric-card";
import { serverFetch } from "../../../lib/api";
import { requireAdmin } from "../../../lib/role-guard";

interface DashboardData {
  totalStreams: number;
  activeArtists: number;
  projectedRevenueMicros: number;
}

export default async function AdminAnalyticsPage() {
  await requireAdmin();

  const dashboard = await serverFetch<DashboardData>("/admin/dashboard").catch(() => ({
    totalStreams: 0,
    activeArtists: 0,
    projectedRevenueMicros: 0
  }));

  return (
    <AdminShell title="Analytics">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <MetricCard label="Total Streams" value={dashboard.totalStreams} />
        <MetricCard label="Active Artists" value={dashboard.activeArtists} />
        <MetricCard label="Revenue Micros" value={dashboard.projectedRevenueMicros} />
      </div>
    </AdminShell>
  );
}
