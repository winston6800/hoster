import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Causes & Risk Factors",
  description:
    "The physical, psychological, and lifestyle factors behind erectile dysfunction, and how they interact.",
};

const groups = [
  {
    title: "Vascular & physical",
    color: "text-accent",
    items: [
      "Reduced blood flow from atherosclerosis (hardened or narrowed arteries) — often the biggest single cause",
      "High blood pressure, high cholesterol, and heart disease",
      "Diabetes, which can damage both nerves and blood vessels over time",
      "Low testosterone or other hormonal imbalances",
      "Nerve damage from surgery (e.g. prostate surgery), injury, or conditions like multiple sclerosis",
    ],
  },
  {
    title: "Psychological",
    color: "text-warm",
    items: [
      "Performance anxiety, which can create a self-reinforcing cycle",
      "Stress and general anxiety",
      "Depression, or the medications used to treat it",
      "Relationship tension or unresolved conflict",
      "Compulsive or escalating porn use, in some men (see note below — the research here is real but contested)",
    ],
  },
  {
    title: "Lifestyle & medication",
    color: "text-accent",
    items: [
      "Smoking, which directly damages blood vessels",
      "Heavy alcohol use and recreational drug use",
      "Lack of physical activity and excess weight",
      "Poor sleep, including undiagnosed sleep apnea",
      "Side effects from common medications, including some blood pressure drugs, antidepressants, and antihistamines",
    ],
  },
];

export default function CausesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        causes &amp; risk factors
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Why ED happens
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
        Most cases don&rsquo;t have one single cause — they&rsquo;re a mix of physical
        and psychological factors that feed into each other. A physical issue
        can create anxiety, and that anxiety can make the physical issue
        worse.
      </p>

      <div className="mt-12 space-y-10">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className={`text-lg font-semibold ${group.color}`}>
              {group.title}
            </h2>
            <ul className="mt-4 ml-5 list-disc space-y-2 text-foreground marker:text-accent">
              {group.items.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-background-elevated p-6">
        <p className="font-semibold text-foreground">
          A note on porn and ED
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          This gets asked about a lot, and it deserves a straight answer
          instead of a scary number. Some researchers have proposed that
          heavy, escalating porn use can desensitize the brain&rsquo;s reward
          response enough to make real-life arousal harder — the theory is
          usually called porn-induced ED. Clinical reports of younger men
          seeking ED treatment have genuinely increased in recent decades.
          But the direct evidence is thinner than the theory: other studies
          looking specifically for a link between porn use and ED in young
          men haven&rsquo;t found one, and the rise in young-onset ED is more
          reliably tied to anxiety, depression, obesity, alcohol, and
          performance pressure — porn is one hypothesized piece, not a
          settled, quantified cause. If cutting back on porn is something
          you want to try, it&rsquo;s a reasonable experiment; just know the
          science doesn&rsquo;t support treating it as the default explanation.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-warm/30 bg-warm-soft/40 p-6">
        <p className="font-semibold text-foreground">
          Why this matters beyond the bedroom
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          Because ED so often has a vascular cause, it can show up years
          before a heart attack or stroke — the blood vessels in the penis
          are small and tend to show trouble early. Bringing it up with a
          doctor is also a chance to catch a bigger issue while it&rsquo;s still
          manageable.
        </p>
      </div>

      <div className="mt-14 flex flex-wrap gap-4 border-t border-border pt-10">
        <Link
          href="/treatment"
          className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          See treatment options
        </Link>
        <Link
          href="/faq"
          className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
        >
          Read the FAQ
        </Link>
      </div>
    </div>
  );
}
