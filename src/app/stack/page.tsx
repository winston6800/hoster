import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { computeStreak } from "@/lib/streak";
import { focusLabel } from "@/lib/health-focus";
import StackTower from "@/components/stack-tower";

export const metadata: Metadata = {
  title: "Your Stack",
  description: "Every meal you've logged, stacked up.",
};

export const dynamic = "force-dynamic";

export default async function StackPage({
  searchParams,
}: {
  searchParams: Promise<{ justAdded?: string }>;
}) {
  const { justAdded } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid")
    .eq("id", user.id)
    .single();

  if (!profile?.has_paid) {
    redirect("/join");
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, health_focus, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  const items = posts ?? [];
  const streak = computeStreak(items.map((p) => p.created_at));
  const newestId = justAdded === "1" ? items.at(-1)?.id : undefined;
  const latest = [...items].reverse().slice(0, 5);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        your stack
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-foreground">
        {items.length === 0
          ? "Nothing stacked yet"
          : `${items.length} meal${items.length === 1 ? "" : "s"} stacked`}
      </h1>

      {streak >= 2 && (
        <p className="mt-2 inline-block rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
          {streak}-day streak
        </p>
      )}

      {error && (
        <p className="mt-8 text-sm text-red-600">
          Couldn&rsquo;t load your stack: {error.message}
        </p>
      )}

      {!error && items.length === 0 && (
        <div className="mt-10">
          <p className="text-foreground-muted">
            Add your first meal and watch the tower start climbing.
          </p>
          <Link
            href="/new"
            className="mt-6 inline-block rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Add your first meal
          </Link>
        </div>
      )}

      {!error && items.length > 0 && (
        <>
          <div className="mt-12 flex min-h-[220px] items-end justify-center overflow-x-hidden">
            <StackTower
              items={items.map((p) => ({
                id: p.id,
                title: p.title,
                health_focus: p.health_focus,
              }))}
              highlightId={newestId}
            />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/new"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Add another
            </Link>
            <Link
              href="/feed"
              className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
            >
              See the feed
            </Link>
          </div>

          <div className="mt-14 border-t border-border pt-8 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
              latest additions
            </p>
            <ul className="mt-4 space-y-3">
              {latest.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background-elevated px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">
                    {p.title}
                  </span>
                  <span className="text-xs font-semibold text-foreground-muted">
                    {focusLabel(p.health_focus)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
