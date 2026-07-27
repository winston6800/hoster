import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
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
    .select("has_paid")
    .eq("id", user.id)
    .single();

  if (!profile?.has_paid) {
    redirect("/join");
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        new post
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-foreground">
        Share a meal prep
      </h1>
      <p className="mt-2 text-foreground-muted">
        Write your own, or get an AI-generated Mediterranean idea to start
        from.
      </p>
      <NewPostForm />
    </div>
  );
}
