import { NextResponse } from "next/server";
import { getDemoState } from "../../../../../lib/demo-store";

export async function GET() {
  const state = getDemoState();
  return NextResponse.json(state.reports);
}
