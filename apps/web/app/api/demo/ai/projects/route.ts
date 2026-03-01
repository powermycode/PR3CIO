import { NextResponse } from "next/server";
import { getArtistProfile, listAiProjects } from "../../../../../lib/demo-store";

export async function GET() {
  const artist = getArtistProfile();
  return NextResponse.json(listAiProjects(artist.id));
}
