"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { HEALTH_FOCUSES } from "@/lib/health-focus";
import { DIETARY_RESTRICTIONS } from "@/lib/dietary-restrictions";

type Dish = {
  title: string;
  description: string;
  ingredients: string;
};

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
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [constraints, setConstraints] = useState("");
  const [aiGenerated, setAiGenerated] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function toggleRestriction(value: string) {
    setRestrictions((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
    );
  }

  async function handleGenerate() {
    setGenerating(true);
    setGenError(null);
    setDishes([]);
    setSelectedIndex(null);
    try {
      const res = await fetch("/api/generate-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ healthFocus, restrictions, constraints, count: 3 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed.");
      setDishes(data.dishes ?? []);
    } catch (err) {
      setGenError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  function pickDish(index: number) {
    const dish = dishes[index];
    if (!dish) return;
    setSelectedIndex(index);
    setTitle(dish.title ?? "");
    setDescription(dish.description ?? "");
    setIngredients(dish.ingredients ?? "");
    setAiGenerated(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
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
      setSubmitError(err instanceof Error ? err.message : "Couldn't post.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="rounded-xl border border-border bg-background-elevated p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          build your menu
        </p>
        <h2 className="mt-1 text-lg font-semibold text-foreground">
          Tell it your constraints, get dishes that fit all of them
        </h2>

        <label className="mt-4 block text-sm font-medium text-foreground">
          Focus
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
          Dietary restrictions
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {DIETARY_RESTRICTIONS.map((r) => {
            const active = restrictions.includes(r.value);
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => toggleRestriction(r.value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border text-foreground-muted hover:border-accent/50"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        <label className="mt-4 block text-sm font-medium text-foreground">
          Anything else?
        </label>
        <input
          type="text"
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          placeholder="e.g. no shellfish, 20 minutes or less, use up spinach"
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />

        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="mt-4 w-full rounded-md bg-olive px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {generating ? "Cooking up ideas…" : "Generate my menu"}
        </button>

        {genError && <p className="mt-3 text-sm text-red-600">{genError}</p>}

        {dishes.length > 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {dishes.map((dish, i) => {
              const selected = selectedIndex === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => pickDish(i)}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    selected
                      ? "border-accent bg-accent-soft"
                      : "border-border bg-background hover:border-accent/50"
                  }`}
                >
                  <p className="text-sm font-semibold text-foreground">
                    {dish.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
                    {dish.description}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-accent">
                    {selected ? "Selected — edit below" : "Use this one"}
                  </p>
                </button>
              );
            })}
          </div>
        )}
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

        {submitError && <p className="text-sm text-red-600">{submitError}</p>}

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
