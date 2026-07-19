import Link from "next/link";
import { pillarMeta, formatDate, type Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  const meta = pillarMeta[post.pillar];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-background-elevated p-6 transition-colors hover:border-foreground-muted/40"
    >
      <div className="flex items-center gap-3 text-xs">
        <span
          className={`rounded-full border px-2.5 py-1 font-mono ${meta.textClass} ${meta.bgClass} ${meta.borderClass}`}
        >
          {meta.label}
        </span>
        <span className="text-foreground-muted">{formatDate(post.date)}</span>
        <span className="text-foreground-muted">&middot; {post.readTime}</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground group-hover:text-accent">
        {post.title}
      </h3>
      <p className="text-sm leading-relaxed text-foreground-muted">{post.excerpt}</p>
      <span className="mt-2 font-mono text-xs text-accent">Read the post &rarr;</span>
    </Link>
  );
}
