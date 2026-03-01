import { AdminShell } from "../../../components/admin-shell";
import { ReportsTable } from "../../../components/reports-table";
import { serverFetch } from "../../../lib/api";
import { requireAdmin } from "../../../lib/role-guard";

interface ReportItem {
  id: string;
  reason: string;
  status: string;
  trackId?: string | null;
  artistId?: string | null;
  createdAt: string;
}

export default async function AdminReportsPage() {
  await requireAdmin();
  const reports = await serverFetch<ReportItem[]>("/admin/reports").catch(() => []);

  return (
    <AdminShell title="Reports Queue">
      <ReportsTable reports={reports} />
    </AdminShell>
  );
}
