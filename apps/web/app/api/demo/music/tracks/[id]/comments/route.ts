import { NextResponse } from "next/server";
import { addComment, getComments } from "../../../../../../../lib/demo-store";

export async function GET(_request: Request, context: { params: { id: string } }) {
  return NextResponse.json(getComments(context.params.id));
}

export async function POST(request: Request, context: { params: { id: string } }) {
  const body = (await request.json().catch(() => ({}))) as { userName?: string; message?: string };
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ error: "Comment message is required" }, { status: 400 });
  }

  const comment = addComment(context.params.id, body.userName?.trim() || "Listener", message);
  return NextResponse.json({ ok: true, comment });
}
