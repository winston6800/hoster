import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { computeStreak } from "@/lib/streak";
import NewPostForm from "./new-post-form";

export default async function NewPostPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("has_paid, health_focus")
    .eq("id", user.id)
    .single();

  if (!profile?.has_paid) {
    redirect("/join");
  }

  const { data: existingPosts } = await supabase
    .from("posts")
    .select("created_at")
    .eq("user_id", user.id);

  const count = existingPosts?.length ?? 0;
  const streak = computeStreak((existingPosts ?? []).map((p) => p.created_at));

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        new post
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-foreground">
        What are you cooking?
      </h1>
      <p className="mt-2 text-foreground-muted">
        Set your focus and restrictions, generate a few dishes that fit all
        of them, or just write your own.
      </p>

      {count > 0 && (
        <Link
          href="/stack"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated px-3 py-1.5 text-xs font-semibold text-foreground-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          {count} stacked so far{streak >= 2 ? ` · ${streak}-day streak` : ""}
          <span aria-hidden>&rarr;</span>
        </Link>
      )}

      <NewPostForm defaultHealthFocus={profile.health_focus} />
    </div>
  );
}
