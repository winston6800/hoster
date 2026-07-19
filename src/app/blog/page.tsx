import type { Metadata } from "next";
import PostCard from "@/components/post-card";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on inner security, financial security, and building relationships that last.",
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        the blog
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Configuration notes
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
        Short, direct writing on the three pillars: inner security, financial
        security, and relationships built to last.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
