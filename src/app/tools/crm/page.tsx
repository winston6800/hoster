import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Relationship CRM",
  description:
    "A private system for tracking the real people in your life — context, key dates, and follow-up, without turning relationships into a sales pipeline.",
};

const holds = [
  {
    label: "Context",
    detail:
      "What's actually going on in someone's life right now — their situation, what they're working through, what they mentioned in passing that you don't want to lose.",
  },
  {
    label: "Key dates",
    detail:
      "Birthdays, anniversaries, the appointment they were nervous about — the things that matter to remember without needing to remember to remember them.",
  },
  {
    label: "Follow-up",
    detail:
      "A quiet nudge when it's been too long, before the silence turns into distance. Not a sales cadence — a way of keeping your word to people who matter.",
  },
  {
    label: "History",
    detail:
      "A running thread of what's been said and shared, so every conversation can pick up where the last one left off instead of starting over.",
  },
] as const;

export default function CrmPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/tools" className="font-mono text-xs text-accent hover:underline">
        &larr; All tools
      </Link>

      <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        for real people
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        A CRM for the people who matter, not the deals in a pipeline.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
        Most relationships don&rsquo;t end in a dramatic falling out. They
        just quietly erode from forgotten context and follow-up that never
        happened. This is a private system built to stop that — for
        friendships, family, and partners, not leads.
      </p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground">
        <p>
          Business CRMs are built to move people through stages toward a
          close. That model is wrong for real relationships, and using it —
          or nothing at all — is why so much of staying close to people
          becomes accidental. This is the opposite premise: no pipelines, no
          deal stages, no scoring anyone. Just a place to keep the context
          that makes you a good friend, partner, or family member on
          purpose instead of by luck.
        </p>
        <p>
          The idea is simple: relationships get stronger when you actually
          remember and act on what matters to the other person. Most of us
          don&rsquo;t forget because we don&rsquo;t care — we forget because
          nothing holds the context between conversations. This closes that
          gap.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">
          What it holds
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {holds.map((item) => (
            <div key={item.label} className="rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 rounded-2xl border border-accent/30 bg-accent/5 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          status
        </p>
        <p className="mt-3 text-foreground">
          In active development, opening up in stages. If you want early
          access, reach out and say so.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          Request early access
        </Link>
      </div>
    </div>
  );
}
