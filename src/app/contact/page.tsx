import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Dead by Default.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        get in touch
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Say something worth reading.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
        Questions, disagreements, or a story about configuring your own
        settings on purpose — all welcome. No forms, no funnels, just a real
        inbox.
      </p>

      <div className="mt-10 rounded-2xl border border-border p-8">
        <p className="text-sm text-foreground-muted">Email</p>
        <a
          href="mailto:hello@deadbydefault.com"
          className="mt-1 block font-mono text-lg text-accent hover:underline"
        >
          hello@deadbydefault.com
        </a>
        <p className="mt-6 text-sm leading-relaxed text-foreground-muted">
          Best topics to write in about: a question on one of the three
          pillars, a disagreement with something on the blog, or a request
          to write about a specific situation. Read everything, reply when
          it&rsquo;s useful.
        </p>
      </div>
    </div>
  );
}
