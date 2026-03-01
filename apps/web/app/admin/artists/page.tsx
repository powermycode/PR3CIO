import { AdminShell } from "../../../components/admin-shell";
import { ModerationActions } from "../../../components/moderation-actions";
import { requireAdmin } from "../../../lib/role-guard";

export default async function AdminArtistsPage() {
  await requireAdmin();
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/demo` : "http://localhost:3000/api/demo");

  return (
    <AdminShell title="Artist Moderation">
      <ModerationActions
        action="Ban Artist"
        targetId="artist-id"
        endpoint={`${baseUrl}/admin/artists/artist-id/ban`}
        reasonLabel="Reason for ban"
      />
    </AdminShell>
  );
}
