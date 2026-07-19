import Link from "next/link";
import PostCard from "@/components/post-card";
import { posts } from "@/lib/posts";

const pillars = [
  {
    key: "inner",
    label: "Inner Security",
    color: "text-pillar-inner",
    border: "border-pillar-inner/30",
    glow: "bg-pillar-inner/10",
    description:
      "Regulate your own emotions instead of outsourcing the job to whoever is nearby. Stop needing everyone's approval to feel okay.",
  },
  {
    key: "money",
    label: "Financial Security",
    color: "text-pillar-money",
    border: "border-pillar-money/30",
    glow: "bg-pillar-money/10",
    description:
      "A buffer, a habit, and enough time for compounding to work. Boring on purpose, because boring is what actually holds up.",
  },
  {
    key: "love",
    label: "Real Relationships",
    color: "text-pillar-love",
    border: "border-pillar-love/30",
    glow: "bg-pillar-love/10",
    description:
      "Not lines and volume — the slower skill of being fully known by one person for a long time, and staying worth choosing.",
  },
] as const;

export default function Home() {
  const latestPosts = [...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-grid border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            factory settings are not your destiny
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
            Nothing about who you become is set by default.
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-foreground-muted">
            Left unconfigured, most people default to reactive, broke, and
            capable of only shallow connection. Dead by Default is a field
            guide to changing the settings on purpose — building real inner
            security, financial security, and relationships that last longer
            than a season.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Read the philosophy
            </Link>
            <Link
              href="/blog"
              className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground-muted/60"
            >
              Start with the blog
            </Link>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-foreground-muted">
          The default configuration
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border p-6">
            <p className="font-mono text-sm text-accent">01</p>
            <p className="mt-3 text-foreground">
              Reactive by default — run by whoever provoked you last, with no
              floor of your own to stand on.
            </p>
          </div>
          <div className="rounded-xl border border-border p-6">
            <p className="font-mono text-sm text-accent">02</p>
            <p className="mt-3 text-foreground">
              Broke by default — income scales with lifestyle, no buffer, no
              plan, one bad month from crisis.
            </p>
          </div>
          <div className="rounded-xl border border-border p-6">
            <p className="font-mono text-sm text-accent">03</p>
            <p className="mt-3 text-foreground">
              Shallow by default — optimized for the first yes, never taught
              the slower skill of being known for years.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-border bg-background-elevated/40">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-foreground-muted">
            Three settings worth changing on purpose
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.key}
                className={`rounded-xl border ${pillar.border} ${pillar.glow} p-6`}
              >
                <h3 className={`text-lg font-semibold ${pillar.color}`}>
                  {pillar.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto excerpt */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-2xl border border-border p-8 sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            from the philosophy
          </p>
          <p className="mt-4 max-w-2xl text-balance text-xl leading-relaxed text-foreground sm:text-2xl">
            &ldquo;Insecurity is expensive. It makes you defensive when you
            could be curious, controlling when you could be trusting,
            short-term when you could be building something that
            compounds.&rdquo;
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block font-mono text-sm text-accent hover:underline"
          >
            Read the full manifesto &rarr;
          </Link>
        </div>
      </section>

      {/* Latest posts */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex items-end justify-between">
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-foreground-muted">
              Latest from the blog
            </h2>
            <Link href="/blog" className="font-mono text-xs text-accent hover:underline">
              View all &rarr;
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-background-elevated/40">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Stop running on default.
            </h2>
            <p className="mt-2 max-w-md text-foreground-muted">
              Have a question, a disagreement, or something worth adding to
              the conversation? Reach out.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
