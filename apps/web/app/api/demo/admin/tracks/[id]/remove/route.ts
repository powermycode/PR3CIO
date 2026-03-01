import { NextResponse } from "next/server";
import { markTrackRemoved } from "../../../../../../../lib/demo-store";

export async function POST(request: Request, context: { params: { id: string } }) {
  const body = (await request.json().catch(() => ({}))) as { reason?: string };
  const reason = body.reason?.trim() || "No reason provided";

  markTrackRemoved(context.params.id, reason);

  return NextResponse.json({
    ok: true,
    action: "REMOVE_TRACK",
    targetId: context.params.id,
    reason
  });
}
