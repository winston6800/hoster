import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Help",
  description:
    "Trustworthy places to learn more or find a specialist for erectile dysfunction, and crisis resources for related mental health concerns.",
};

const orgs = [
  {
    name: "Urology Care Foundation",
    href: "https://www.urologyhealth.org",
    body: "The patient-education arm of the American Urological Association. Good for finding a urologist and reading vetted clinical explanations of ED.",
  },
  {
    name: "Mayo Clinic — Erectile Dysfunction",
    href: "https://www.mayoclinic.org",
    body: "Clear, physician-reviewed overviews of symptoms, causes, diagnosis, and treatment. Search “erectile dysfunction” once there.",
  },
  {
    name: "NHS — Erection Problems",
    href: "https://www.nhs.uk",
    body: "UK National Health Service guidance, useful regardless of where you live for its plain-language explanations. Search “erectile dysfunction” once there.",
  },
];

const crisis = [
  {
    name: "988 Suicide & Crisis Lifeline (US)",
    href: "https://988lifeline.org",
    body: "Call or text 988 anytime for support with suicidal thoughts, mental health crises, or emotional distress — including distress connected to relationship or body-image struggles.",
  },
  {
    name: "Crisis Text Line",
    href: "https://www.crisistextline.org",
    body: "Text HOME to 741741 (US) to reach a trained crisis counselor by text, 24/7.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        get help
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Where to go next
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
        The single best next step is a conversation with a licensed doctor —
        your primary care physician or a urologist. The organizations below
        are good for background reading and finding a provider; they aren&rsquo;t
        a replacement for an actual visit.
      </p>

      <h2 className="mt-12 text-xl font-semibold text-foreground">
        Learn more &amp; find a specialist
      </h2>
      <div className="mt-6 space-y-5">
        {orgs.map((org) => (
          <div
            key={org.name}
            className="rounded-xl border border-border bg-background-elevated p-6"
          >
            <a
              href={org.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:underline"
            >
              {org.name} &rarr;
            </a>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {org.body}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-semibold text-foreground">
        If it&rsquo;s affecting your mental health
      </h2>
      <p className="mt-3 text-foreground-muted">
        ED can bring on shame, anxiety, or strain in a relationship. That&rsquo;s a
        normal reaction, and support exists for that too.
      </p>
      <div className="mt-6 space-y-5">
        {crisis.map((item) => (
          <div
            key={item.name}
            className="rounded-xl border border-warm/30 bg-warm-soft/40 p-6"
          >
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-warm hover:underline"
            >
              {item.name} &rarr;
            </a>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-background-elevated p-6 text-sm leading-relaxed text-foreground-muted">
        This site doesn&rsquo;t sell, prescribe, or endorse any specific
        product, supplement, or telehealth service. It exists to help you
        walk into a real appointment better informed.
      </div>
    </div>
  );
}
