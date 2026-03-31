import { processTrackGeneration } from "../../../lib/track-service";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { prompt } = (await req.json()) as { prompt?: string };
    const result = await processTrackGeneration(prompt ?? "");

    if (!result.success) {
      return Response.json(
        { success: false, error: result.error ?? "Generation failed." },
        { status: 400 }
      );
    }

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Generation failed.",
      },
      { status: 500 }
    );
  }
}
