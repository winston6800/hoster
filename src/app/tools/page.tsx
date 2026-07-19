import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Two things we're building at Dead by Default: a CRM for the real people in your life, and AI agents that extend your relationships and your work.",
};

const tools = [
  {
    href: "/tools/crm",
    label: "Relationship CRM",
    tag: "For real people",
    description:
      "A private system for tracking the people who actually matter to you — context, key dates, and the follow-up you'd otherwise forget. No pipelines, no deal stages.",
  },
  {
    href: "/tools/agents",
    label: "AI Agents",
    tag: "For leverage",
    description:
      "Context-driven agents that help you show up for the relationships you're building, and handle the important projects that keep sliding.",
  },
] as const;

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        tools
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Positioning first. Tools second.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
        Everything on this site starts with the self-work — inner security,
        financial security, real relationships. Tools don&rsquo;t replace
        that work. They&rsquo;re leverage on top of it, and only useful once
        it&rsquo;s in place.
      </p>

      <div className="mt-10 space-y-4 text-base leading-relaxed text-foreground">
        <p>
          AI agents specifically are not something to work toward as a goal
          in themselves. An agent can&rsquo;t hand you positioning, a sense
          of self, or a real relationship — it can only extend one you
          already have. That&rsquo;s the design principle behind both tools
          below: they&rsquo;re built to amplify effort you&rsquo;re already
          putting in, not to substitute for it.
        </p>
        <p>
          We&rsquo;re deliberately separating these into two things, because
          they solve different problems and shouldn&rsquo;t be blended into
          one generic &ldquo;AI assistant.&rdquo; One is a system of record
          for real relationships. The other is agentic help — for staying
          present with people, and for getting real work done.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex flex-col gap-3 rounded-xl border border-border bg-background-elevated p-6 transition-colors hover:border-foreground-muted/40"
          >
            <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
              {tool.tag}
            </span>
            <h2 className="text-lg font-semibold text-foreground group-hover:text-accent">
              {tool.label}
            </h2>
            <p className="text-sm leading-relaxed text-foreground-muted">
              {tool.description}
            </p>
            <span className="mt-2 font-mono text-xs text-accent">
              Learn more &rarr;
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-12 border-t border-border pt-8 text-sm text-foreground-muted">
        Both are early — in active development, opening up in stages. Get in
        touch on the{" "}
        <Link href="/contact" className="text-accent hover:underline">
          contact page
        </Link>{" "}
        if you want early access.
      </p>
    </div>
  );
}
