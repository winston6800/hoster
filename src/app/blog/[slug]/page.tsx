import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  formatDate,
  getAllSlugs,
  getPostBySlug,
  pillarMeta,
  posts,
} from "@/lib/posts";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const meta = pillarMeta[post.pillar];
  const more = posts.filter((p) => p.slug !== post.slug && p.pillar === post.pillar).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/blog" className="font-mono text-xs text-accent hover:underline">
        &larr; All posts
      </Link>

      <div className="mt-6 flex items-center gap-3 text-xs">
        <span
          className={`rounded-full border px-2.5 py-1 font-mono ${meta.textClass} ${meta.bgClass} ${meta.borderClass}`}
        >
          {meta.label}
        </span>
        <span className="text-foreground-muted">{formatDate(post.date)}</span>
        <span className="text-foreground-muted">&middot; {post.readTime}</span>
      </div>

      <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {more.length > 0 && (
        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">
            More on {meta.label.toLowerCase()}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-xl border border-border p-5 transition-colors hover:border-foreground-muted/40"
              >
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
