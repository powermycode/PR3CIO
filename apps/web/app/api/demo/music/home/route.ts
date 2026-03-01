import { NextResponse } from "next/server";
import { getHomeSections } from "../../../../../lib/demo-store";

export async function GET() {
  return NextResponse.json(getHomeSections());
}
