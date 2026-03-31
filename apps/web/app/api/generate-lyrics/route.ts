export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { mood, genre, theme } = await req.json();

    console.log("INPUT:", { mood, genre, theme });

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 1,
        messages: [
          {
            role: "user",
            content: `Write original song lyrics.

Mood: ${mood}
Genre: ${genre}
Theme: ${theme}

Format:
Verse 1
Chorus
Verse 2
Bridge`,
          },
        ],
      }),
    });

    const data = await res.json();

    console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

    if (!data || !data.choices || !data.choices[0]) {
      return Response.json({
        lyrics: "API ERROR — CHECK TERMINAL",
      });
    }

    const output = data.choices[0].message?.content;

    return Response.json({
      lyrics: output || "EMPTY RESPONSE FROM AI",
    });

  } catch (err) {
    console.error("ERROR:", err);
    return Response.json({
      lyrics: "SERVER ERROR — CHECK TERMINAL",
    });
  }
}
