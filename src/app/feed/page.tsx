import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { HEALTH_FOCUSES, focusLabel } from "@/lib/health-focus";
import LikeButton from "./like-button";

export const dynamic = "force-dynamic";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ focus?: string }>;
}) {
  const { focus } = await searchParams;
  const activeFocus = HEALTH_FOCUSES.some((f) => f.value === focus)
    ? focus
    : undefined;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("posts")
    .select(
      "id, title, description, ingredients, niche, health_focus, ai_generated, created_at, user_id, profiles(username, display_name), likes(user_id)",
    )
    .order("created_at", { ascending: false })
    .limit(50);

  if (activeFocus) {
    query = query.eq("health_focus", activeFocus);
  }

  const { data: posts, error } = await query;

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            the feed
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">
            Mediterranean meal preps
          </h1>
        </div>
        {user && (
          <Link
            href="/new"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            New Post
          </Link>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/feed"
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
            !activeFocus
              ? "border-accent bg-accent-soft text-accent"
              : "border-border text-foreground-muted hover:border-accent/50"
          }`}
        >
          All focuses
        </Link>
        {HEALTH_FOCUSES.map((f) => (
          <Link
            key={f.value}
            href={`/feed?focus=${f.value}`}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              activeFocus === f.value
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-foreground-muted hover:border-accent/50"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {error && (
        <p className="mt-8 text-sm text-red-600">
          Couldn&rsquo;t load the feed: {error.message}
        </p>
      )}

      {!error && posts?.length === 0 && (
        <p className="mt-12 text-foreground-muted">
          No posts yet for this focus.{" "}
          {user ? (
            <Link href="/new" className="text-accent hover:underline">
              Be the first to post
            </Link>
          ) : (
            <Link href="/login" className="text-accent hover:underline">
              Sign in to post
            </Link>
          )}
          .
        </p>
      )}

      <div className="mt-10 space-y-6">
        {posts?.map((post) => {
          const likeCount = post.likes?.length ?? 0;
          const likedByMe = user
            ? post.likes?.some((l) => l.user_id === user.id)
            : false;
          const author = post.profiles?.display_name || post.profiles?.username || "Someone";

          return (
            <article
              key={post.id}
              className="rounded-xl border border-border bg-background-elevated p-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground-muted">
                  {author}
                  {post.ai_generated && (
                    <span className="ml-2 rounded-full bg-olive-soft px-2 py-0.5 text-xs font-semibold text-olive">
                      AI-assisted
                    </span>
                  )}
                </p>
                <div className="flex gap-1.5">
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent">
                    {post.niche}
                  </span>
                  <span className="rounded-full bg-olive-soft px-2 py-0.5 text-xs font-semibold text-olive">
                    {focusLabel(post.health_focus)}
                  </span>
                </div>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-foreground">
                {post.title}
              </h2>
              {post.description && (
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {post.description}
                </p>
              )}
              {post.ingredients && (
                <p className="mt-3 text-xs text-foreground-muted">
                  <span className="font-semibold">Ingredients: </span>
                  {post.ingredients}
                </p>
              )}
              <div className="mt-4">
                <LikeButton
                  postId={post.id}
                  initialCount={likeCount}
                  initialLiked={!!likedByMe}
                  canLike={!!user}
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
