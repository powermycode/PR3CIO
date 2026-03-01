import { NextResponse } from "next/server";
import { publishAiProject } from "../../../../../../../lib/demo-store";

export async function POST(_request: Request, context: { params: { id: string } }) {
  const track = publishAiProject(context.params.id);
  if (!track) {
    return NextResponse.json({ error: "Project not found or already published" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    track
  });
}
