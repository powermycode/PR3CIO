import { NextResponse } from "next/server";
import { likeTrack } from "../../../../../../../lib/demo-store";

export async function POST(_request: Request, context: { params: { id: string } }) {
  const track = likeTrack(context.params.id);
  if (!track) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    track
  });
}
