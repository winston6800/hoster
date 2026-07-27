import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { HEALTH_FOCUSES, focusGuidance } from "@/lib/health-focus";
import { DIETARY_RESTRICTIONS, restrictionRules } from "@/lib/dietary-restrictions";

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
      { error: "AI menu generation is a paid feature." },
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

  const body = await request.json().catch(() => ({}));
  const constraints = typeof body.constraints === "string" ? body.constraints : "";
  const healthFocus = HEALTH_FOCUSES.some((f) => f.value === body.healthFocus)
    ? body.healthFocus
    : "general_wellness";
  const restrictionValues: string[] = Array.isArray(body.restrictions)
    ? body.restrictions.filter((v: unknown) =>
        DIETARY_RESTRICTIONS.some((r) => r.value === v),
      )
    : [];
  const count = [1, 2, 3, 4].includes(body.count) ? body.count : 3;

  const rules = restrictionRules(restrictionValues);
  const constraintLines = [
    `Health focus: aim every dish at ${focusGuidance(healthFocus)}.`,
    ...(rules.length
      ? [`Every single dish must satisfy ALL of: ${rules.join("; ")}.`]
      : []),
    ...(constraints.trim() ? [`Also work with: ${constraints.trim()}.`] : []),
  ].join(" ");

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001",
    max_tokens: 1200,
    system:
      `You generate Mediterranean-diet meal-prep dish ideas: olive oil, vegetables, legumes, whole grains, fish or lean protein, nuts, herbs — never non-Mediterranean cuisine. Every dish you return MUST satisfy every constraint given, with zero exceptions; if a constraint conflicts with a Mediterranean staple (e.g. gluten-free ruling out regular couscous), substitute correctly (e.g. rice or quinoa) rather than breaking the constraint. Generate ${count} genuinely distinct dishes (different main ingredients/techniques from each other, not variations on one idea). Respond with strict JSON only, no markdown fences, matching: {"dishes": [{"title": string, "description": string (1-2 sentences), "ingredients": string (comma-separated)}, ...]} with exactly ${count} items.`,
    messages: [
      {
        role: "user",
        content: constraintLines,
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
    const parsed = JSON.parse(textBlock.text);
    const dishes = Array.isArray(parsed.dishes) ? parsed.dishes : [];
    if (dishes.length === 0) throw new Error("empty");
    return NextResponse.json({ dishes });
  } catch {
    return NextResponse.json(
      { error: "Couldn't parse the model's response." },
      { status: 502 },
    );
  }
}
