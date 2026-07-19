import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agents",
  description:
    "Two agent types: one that helps you stay present in long-term relationships, one that gets real projects done. Leverage on top of positioning, not a substitute for it.",
};

const agents = [
  {
    label: "Relationship agents",
    tag: "Long-term, high-quality",
    description:
      "You give it context — who matters to you, what's going on in their life, how you naturally communicate. It uses that to help you actually show up: drafting a thoughtful check-in, surfacing the follow-up you'd otherwise forget, prepping you before a conversation that matters. It doesn't have the relationship for you. It removes the friction that keeps you from being the one who remembers.",
  },
  {
    label: "Project agents",
    tag: "Important work",
    description:
      "For the projects that matter but keep sliding because they need sustained attention you don't have. Give it a real project and the context it needs, and it works the parts that don't require you specifically — so the important thing actually gets finished instead of quietly stalling.",
  },
] as const;

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/tools" className="font-mono text-xs text-accent hover:underline">
        &larr; All tools
      </Link>

      <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        for leverage
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        AI agents aren&rsquo;t the destination. They&rsquo;re leverage.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
        Working toward &ldquo;having agents&rdquo; as a goal in itself gets
        it backwards. An agent can&rsquo;t manufacture positioning, inner
        security, or a real relationship — it can only extend one you
        already have. That&rsquo;s the principle both of these are built on.
      </p>

      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground">
        <p>
          We&rsquo;re building two distinct agent types, kept deliberately
          separate instead of blended into one generic assistant, because
          they serve different parts of the site&rsquo;s philosophy: staying
          present for the people who matter, and actually finishing the work
          that matters.
        </p>
      </div>

      <div className="mt-12 space-y-6">
        {agents.map((agent) => (
          <div key={agent.label} className="rounded-xl border border-border bg-background-elevated p-8">
            <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
              {agent.tag}
            </span>
            <h2 className="mt-4 text-xl font-semibold text-foreground">
              {agent.label}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              {agent.description}
            </p>
          </div>
        ))}
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
