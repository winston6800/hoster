import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Understanding ED",
  description:
    "What erectile dysfunction is, how common it is, and the myths that keep men from getting help.",
};

const myths = [
  {
    myth: "“It only happens to old men.”",
    fact:
      "Risk does rise with age, but ED shows up at every adult age, including in men in their 20s and 30s — often linked to stress, anxiety, smoking, or underlying health conditions rather than age alone.",
  },
  {
    myth: "“It means I'm not attracted to my partner.”",
    fact:
      "Erections depend on blood flow, nerve signaling, hormones, and mental state all working together. A single misfire says very little about attraction or the relationship.",
  },
  {
    myth: "“It's all in my head.”",
    fact:
      "Psychological factors are real and common, but the majority of ongoing cases have a physical component too — often both, reinforcing each other.",
  },
  {
    myth: "“Nothing can be done about it.”",
    fact:
      "The opposite is true. ED is one of the more treatable conditions in men's health, with several effective options depending on the cause.",
  },
  {
    myth: "“It's too embarrassing to bring up with a doctor.”",
    fact:
      "Doctors, especially primary care physicians and urologists, field this conversation constantly. It's a routine, low-drama visit from their side of the desk.",
  },
];

export default function UnderstandingEdPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        understanding ed
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        What erectile dysfunction actually is
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
        Erectile dysfunction (ED) is the consistent inability to get or keep
        an erection firm enough for satisfying sex. The key word is
        <em> consistent</em> — nearly every man has an off night at some
        point, and that alone isn&rsquo;t ED.
      </p>

      <div className="mt-12 space-y-6 text-base leading-relaxed text-foreground">
        <p>
          An erection is a coordinated event: the brain sends a signal,
          nerves carry it to the penis, blood vessels open up and fill with
          blood, and that blood gets trapped long enough to maintain
          firmness. Any link in that chain — vascular, neurological,
          hormonal, or psychological — can interrupt the process. That&rsquo;s why
          ED is treated as a symptom with many possible causes, not a single
          disease.
        </p>
        <p>
          It&rsquo;s also extremely common. Large population studies consistently
          find that a majority of men experience some degree of erectile
          difficulty by their 40s and 50s, and a meaningful share of younger
          men report it too. If you&rsquo;re dealing with it, you are in very
          ordinary company.
        </p>

        <h2 className="pt-6 text-xl font-semibold text-foreground">
          Myths vs. facts
        </h2>
        <div className="space-y-5">
          {myths.map((item) => (
            <div
              key={item.myth}
              className="rounded-xl border border-border bg-background-elevated p-5"
            >
              <p className="font-semibold text-foreground-muted line-through decoration-warm/60">
                {item.myth}
              </p>
              <p className="mt-2 text-foreground">{item.fact}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 flex flex-wrap gap-4 border-t border-border pt-10">
        <Link
          href="/causes"
          className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          See common causes
        </Link>
        <Link
          href="/treatment"
          className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
        >
          Explore treatment options
        </Link>
      </div>
    </div>
  );
}
