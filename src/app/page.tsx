import Link from "next/link";

const facts = [
  {
    stat: "Very common",
    detail:
      "Most men experience trouble getting or keeping an erection at some point. Risk rises with age, but ED is not an inevitable part of aging, and it isn't rare in younger men either.",
  },
  {
    stat: "Usually physical",
    detail:
      "It's often tied to blood flow, nerves, hormones, or medications — and can be an early warning sign of heart or vascular problems worth checking out.",
  },
  {
    stat: "Highly treatable",
    detail:
      "The large majority of cases improve with the right combination of lifestyle changes, medical treatment, or counseling — often more than one at once.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-accent-soft/40">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            you are not broken, and you are not alone
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            Erectile dysfunction is common, treatable, and nothing to be
            ashamed of.
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-foreground-muted">
            This site exists to give you clear, judgment-free information
            about what ED is, why it happens, and what actually helps — so
            you can have a better conversation with a doctor, or with a
            partner.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/understanding-ed"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Start here
            </Link>
            <Link
              href="/resources"
              className="rounded-md border border-border bg-background-elevated px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
            >
              Find help now
            </Link>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
          Three things worth knowing right away
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.stat}
              className="rounded-xl border border-border bg-background-elevated p-6"
            >
              <p className="font-semibold text-accent">{fact.stat}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {fact.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* When to see a doctor */}
      <section className="border-t border-border bg-warm-soft/40">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="rounded-2xl border border-warm/30 bg-background-elevated p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-warm">
              worth a doctor visit
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground">
              If it&rsquo;s happening regularly — not just once or twice — it&rsquo;s
              worth talking to a doctor. ED can be an early signal of
              cardiovascular disease, diabetes, or low testosterone, so
              getting it checked is about more than sex.
            </p>
            <Link
              href="/faq"
              className="mt-6 inline-block text-sm font-semibold text-accent hover:underline"
            >
              How to talk to a doctor about it &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Explore sections */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">
          Explore
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Link
            href="/understanding-ed"
            className="rounded-xl border border-border bg-background-elevated p-6 transition-colors hover:border-accent/50"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Understanding ED
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              What it is, how common it is, and the myths worth retiring.
            </p>
          </Link>
          <Link
            href="/causes"
            className="rounded-xl border border-border bg-background-elevated p-6 transition-colors hover:border-accent/50"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Causes &amp; Risk Factors
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              Physical, psychological, and lifestyle factors, and how they
              interact.
            </p>
          </Link>
          <Link
            href="/treatment"
            className="rounded-xl border border-border bg-background-elevated p-6 transition-colors hover:border-accent/50"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Treatment Options
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              An honest overview of what&rsquo;s available, from lifestyle changes
              to medical treatment.
            </p>
          </Link>
          <Link
            href="/resources"
            className="rounded-xl border border-border bg-background-elevated p-6 transition-colors hover:border-accent/50"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Get Help
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              Where to go next — trustworthy organizations and how to find
              the right specialist.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
