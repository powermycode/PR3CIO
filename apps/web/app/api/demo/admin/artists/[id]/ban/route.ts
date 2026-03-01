import { NextResponse } from "next/server";
import { markArtistBanned } from "../../../../../../../lib/demo-store";

export async function POST(request: Request, context: { params: { id: string } }) {
  const body = (await request.json().catch(() => ({}))) as { reason?: string };
  const reason = body.reason?.trim() || "No reason provided";

  markArtistBanned(context.params.id, reason);

  return NextResponse.json({
    ok: true,
    action: "BAN_ARTIST",
    targetId: context.params.id,
    reason
  });
}
