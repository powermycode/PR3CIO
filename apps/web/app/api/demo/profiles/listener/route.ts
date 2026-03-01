import { NextResponse } from "next/server";
import { getListenerProfile } from "../../../../../lib/demo-store";

export async function GET() {
  return NextResponse.json(getListenerProfile());
}
