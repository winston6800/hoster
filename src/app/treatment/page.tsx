import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Treatment Options",
  description:
    "An overview of the main approaches to treating erectile dysfunction, from lifestyle changes to medical and surgical options.",
};

const options = [
  {
    title: "Lifestyle changes",
    body: "Quitting smoking, cutting back on alcohol, losing excess weight, exercising regularly, and improving sleep can meaningfully improve erectile function on their own — especially when the underlying cause is vascular. These changes also help every other treatment work better.",
  },
  {
    title: "Treating the underlying condition",
    body: "If ED is connected to diabetes, high blood pressure, low testosterone, or sleep apnea, getting that condition under control is often the most effective single step. A doctor can check for these with routine bloodwork.",
  },
  {
    title: "Oral medications",
    body: "A class of prescription medications (PDE5 inhibitors) is the most common first-line medical treatment and works for most men who try it. They require a prescription because they interact with certain heart medications and aren't safe for everyone — a doctor needs to check your health history first.",
  },
  {
    title: "Counseling or sex therapy",
    body: "When anxiety, depression, or relationship stress plays a role, talking to a therapist — alone or with a partner — can resolve ED on its own or make medical treatment work better.",
  },
  {
    title: "Vacuum erection devices",
    body: "A non-invasive option that draws blood into the penis using a pump, then uses a ring to maintain it. Often used when medications aren't suitable or don't work.",
  },
  {
    title: "Injections, suppositories, or implants",
    body: "For cases that don't respond to the above, there are effective next-line options, including injectable medication, urethral suppositories, and surgically implanted devices. These are typically discussed with a urologist.",
  },
];

export default function TreatmentPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        treatment options
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        What actually helps
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
        There is no single right answer — the best treatment depends on the
        cause, your overall health, and what you&rsquo;re comfortable with. Most
        men end up combining more than one approach.
      </p>

      <div className="mt-12 space-y-6">
        {options.map((option) => (
          <div
            key={option.title}
            className="rounded-xl border border-border bg-background-elevated p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">
              {option.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              {option.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-warm/30 bg-warm-soft/40 p-6">
        <p className="font-semibold text-foreground">
          A note on medications and supplements
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          Prescription ED medications are only safe when prescribed by a
          doctor who knows your health history and other medications. Be
          especially cautious with unregulated online &ldquo;ED
          supplements&rdquo; — they&rsquo;re not FDA-reviewed for safety or
          effectiveness, and some have
          been found to contain undisclosed prescription drug ingredients at
          unpredictable doses.
        </p>
      </div>

      <div className="mt-14 flex flex-wrap gap-4 border-t border-border pt-10">
        <Link
          href="/faq"
          className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          Read the FAQ
        </Link>
        <Link
          href="/resources"
          className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/60"
        >
          Find a specialist
        </Link>
      </div>
    </div>
  );
}
