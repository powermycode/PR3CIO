import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional music lyricist. Write creative, original song lyrics in the style of modern hip-hop/R&B with vivid imagery and emotional depth.",
        },
        {
          role: "user",
          content: `Write song lyrics based on: ${prompt}`,
        },
      ],
      max_tokens: 500,
      temperature: 0.9,
    });

    return Response.json({
      lyrics: completion.choices[0].message.content,
    });
  } catch (err: any) {
    console.error("Lyrics generation error:", err?.message || err);
    const errorMessage =
      err && err.message ? err.message : "Failed to generate lyrics";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
