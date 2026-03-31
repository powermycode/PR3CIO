import { NextResponse } from "next/server";
import { getTrackById } from "../../../../lib/mock-db";
import { readTrackBinary, verifyPlaybackRequest } from "../../../../lib/upload-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { trackId: string } }) {
  const track = getTrackById(params.trackId);
  if (!track || track.storage?.kind !== "temp") {
    return NextResponse.json({ error: "Track not found." }, { status: 404 });
  }

  const url = new URL(request.url);
  const signature = url.searchParams.get("signature");
  const expires = url.searchParams.get("expires");
  if (!verifyPlaybackRequest(params.trackId, signature, expires)) {
    return NextResponse.json({ error: "Playback token is invalid." }, { status: 403 });
  }

  const file = await readTrackBinary(track);
  if (!file) {
    return NextResponse.json({ error: "Track file is unavailable." }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(file), {
    status: 200,
    headers: {
      "Content-Type": track.storage.mimeType,
      "Content-Disposition": `inline; filename="${track.storage.fileName}"`,
      "Cache-Control": "private, no-store"
    }
  });
}
