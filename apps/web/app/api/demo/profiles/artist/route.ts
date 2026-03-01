import { NextResponse } from "next/server";
import { getArtistProfile } from "../../../../../lib/demo-store";

export async function GET() {
  return NextResponse.json(getArtistProfile());
}
