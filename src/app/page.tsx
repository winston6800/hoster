import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="border-b border-border bg-accent-soft/40">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            mediterranean, for now
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Design your diet around what your body actually needs.
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-foreground-muted">
            Pick a focus — heart health, weight management, more protein,
            blood sugar, or general wellness — and share the meals you cook
            around it. AI-generated Mediterranean ideas are tuned to that
            focus, not generic.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Join for $35
            </Link>
            <Link
              href="/feed"
              className="rounded-md border border-border bg-background-elevated px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
            >
              See the feed
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
          How it works
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-background-elevated p-6">
            <p className="font-semibold text-accent">1. Set your focus</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Heart health, weight management, more protein, blood sugar, or
              general wellness — pick one at sign-up, change it any time.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background-elevated p-6">
            <p className="font-semibold text-accent">2. Generate or log</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Get an AI-generated Mediterranean idea tuned to your focus, or
              log what you actually cooked and its ingredients.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background-elevated p-6">
            <p className="font-semibold text-accent">3. Follow by focus</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Filter the feed by focus to see what people with the same goal
              are actually eating.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-olive-soft/40">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-2xl border border-olive/30 bg-background-elevated p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">
              one-time, not a subscription
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground">
              $35 once, lifetime access. No recurring charge.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block text-sm font-semibold text-olive hover:underline"
            >
              Get started &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
