import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import JoinButton from "./join-button";

export default async function JoinPage() {
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

  if (profile?.has_paid) {
    redirect("/feed");
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        one-time purchase
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground">
        Unlock MealTrail — $35
      </h1>
      <p className="mt-4 text-foreground-muted">
        One payment, lifetime access: post your meal preps, get AI-generated
        Mediterranean food ideas, and follow the feed.
      </p>
      <JoinButton />
      <p className="mt-4 text-xs text-foreground-muted">
        Test mode — no real charge will be made.
      </p>
    </div>
  );
}
