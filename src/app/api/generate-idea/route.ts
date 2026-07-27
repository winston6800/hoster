import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid")
    .eq("id", user.id)
    .single();

  if (!profile?.has_paid) {
    return NextResponse.json(
      { error: "AI idea generation is a paid feature." },
      { status: 403 },
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        error:
          "AI generation isn't configured yet. Add ANTHROPIC_API_KEY to .env.local.",
      },
      { status: 500 },
    );
  }

  const { prompt } = await request.json().catch(() => ({ prompt: "" }));

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
    max_tokens: 500,
    system:
      "You generate one Mediterranean-diet meal-prep idea per request: olive oil, vegetables, legumes, whole grains, fish or lean protein, nuts, herbs. Respond with strict JSON only, no markdown fences, matching: {\"title\": string, \"description\": string (1-2 sentences), \"ingredients\": string (comma-separated)}.",
    messages: [
      {
        role: "user",
        content:
          prompt && typeof prompt === "string" && prompt.trim()
            ? `Give me a Mediterranean meal-prep idea. Context/preferences: ${prompt.trim()}`
            : "Give me a Mediterranean meal-prep idea for the week.",
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return NextResponse.json(
      { error: "The model didn't return usable text." },
      { status: 502 },
    );
  }

  try {
    const idea = JSON.parse(textBlock.text);
    return NextResponse.json({ idea });
  } catch {
    return NextResponse.json(
      { error: "Couldn't parse the model's response." },
      { status: 502 },
    );
  }
}
