import { AdminShell } from "../../../components/admin-shell";
import { ModerationActions } from "../../../components/moderation-actions";
import { requireAdmin } from "../../../lib/role-guard";

export default async function AdminTracksPage() {
  await requireAdmin();
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/demo` : "http://localhost:3000/api/demo");

  return (
    <AdminShell title="Track Moderation">
      <ModerationActions
        action="Remove Track"
        targetId="track-id"
        endpoint={`${baseUrl}/admin/tracks/track-id/remove`}
        reasonLabel="Reason for removal"
      />
    </AdminShell>
  );
}
