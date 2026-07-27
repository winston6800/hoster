"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LikeButton({
  postId,
  initialCount,
  initialLiked,
  canLike,
}: {
  postId: string;
  initialCount: number;
  initialLiked: boolean;
  canLike: boolean;
}) {
  const router = useRouter();
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);
  const [pending, setPending] = useState(false);

  async function toggle() {
    if (!canLike) {
      router.push("/login");
      return;
    }
    setPending(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      setPending(false);
      return;
    }

    if (liked) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);
      if (!error) {
        setLiked(false);
        setCount((c) => c - 1);
      }
    } else {
      const { error } = await supabase
        .from("likes")
        .insert({ post_id: postId, user_id: user.id });
      if (!error) {
        setLiked(true);
        setCount((c) => c + 1);
      } else {
        router.push("/join");
      }
    }
    setPending(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
        liked
          ? "border-accent bg-accent-soft text-accent"
          : "border-border text-foreground-muted hover:border-accent/50 hover:text-accent"
      }`}
    >
      <span aria-hidden>{liked ? "♥" : "♡"}</span>
      {count}
    </button>
  );
}
