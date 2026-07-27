"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { HEALTH_FOCUSES } from "@/lib/health-focus";
import StackTower from "@/components/stack-tower";

export default function NewPostForm({
  defaultHealthFocus,
}: {
  defaultHealthFocus: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [healthFocus, setHealthFocus] = useState(defaultHealthFocus);
  const [aiGenerated, setAiGenerated] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt, healthFocus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed.");
      setTitle(data.idea.title ?? "");
      setDescription(data.idea.description ?? "");
      setIngredients(data.idea.ingredients ?? "");
      setAiGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Sign in first.");

      const { error: insertError } = await supabase.from("posts").insert({
        user_id: user.id,
        title,
        description: description || null,
        ingredients: ingredients || null,
        ai_generated: aiGenerated,
        niche: "mediterranean",
        health_focus: healthFocus,
      });
      if (insertError) throw insertError;

      router.push("/stack?justAdded=1");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't post.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-end justify-center overflow-hidden pb-1">
        <StackTower
          items={[
            {
              id: "preview",
              title: title || "Your next block",
              health_focus: healthFocus,
            },
          ]}
        />
      </div>
      <p className="text-center text-xs text-foreground-muted">
        This is the block that&rsquo;ll drop onto your stack.
      </p>

      <div className="mt-6 rounded-xl border border-border bg-background-elevated p-5">
        <label className="block text-sm font-medium text-foreground">
          Focus for this post
        </label>
        <select
          value={healthFocus}
          onChange={(e) => setHealthFocus(e.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          {HEALTH_FOCUSES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <label className="mt-4 block text-sm font-medium text-foreground">
          Ask the AI for an idea (optional)
        </label>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g. quick lunch with chickpeas"
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="shrink-0 rounded-md bg-olive px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {generating ? "Thinking…" : "Generate"}
          </button>
        </div>
        <p className="mt-2 text-xs text-foreground-muted">
          Generates a Mediterranean idea tuned to the focus selected above.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground">
            Title
          </label>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background-elevated px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-border bg-background-elevated px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            Ingredients
          </label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="olive oil, chickpeas, spinach, lemon"
            className="mt-1 w-full rounded-md border border-border bg-background-elevated px-3 py-2 text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Stacking…" : "Add to my stack"}
        </button>
      </form>
    </div>
  );
}
