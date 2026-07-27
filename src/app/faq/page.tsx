import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about erectile dysfunction, including how to talk to a doctor or partner about it.",
};

const faqs = [
  {
    q: "How do I bring this up with a doctor?",
    a: "You can start as plainly as you like: “I've been having trouble getting or keeping an erection and I'd like to figure out why.” Your primary care doctor is a fine place to start — they'll likely ask about your health history, current medications, and lifestyle, check your blood pressure, and may order bloodwork to check things like blood sugar and testosterone. If needed, they'll refer you to a urologist.",
  },
  {
    q: "Do I need to see a specialist, or is my regular doctor enough?",
    a: "A primary care doctor can diagnose and treat most cases, including prescribing first-line medication. A urologist gets involved for more complex cases, when first-line treatment doesn't work, or when a procedure is being considered.",
  },
  {
    q: "How do I talk to my partner about it?",
    a: "Most partners respond better to early, direct honesty than to avoidance — silence or excuses tend to read as disinterest, which creates more hurt than the ED itself. Naming it as a shared, solvable problem (“this is something my body is doing, not something about you, and I want to figure it out”) tends to land well.",
  },
  {
    q: "Is it linked to age?",
    a: "Risk increases with age because vascular disease, diabetes, and other risk factors become more common over time — but ED is not an automatic or unavoidable part of getting older, and plenty of men in their 60s, 70s, and beyond have healthy erectile function.",
  },
  {
    q: "Can it happen even if I'm attracted to my partner and want sex?",
    a: "Yes. Desire and physical arousal are related but separate systems. Stress, fatigue, alcohol, certain medications, or an unrelated health issue can interrupt the physical process even when desire is fully present.",
  },
  {
    q: "Will it go away on its own?",
    a: "Sometimes — for example, if it's tied to a temporary stressor, a course of medication, or heavy drinking. But if it's persistent, it's usually a sign that something (physical, psychological, or both) needs to be addressed rather than waited out.",
  },
  {
    q: "What if I'm too embarrassed to go in person?",
    a: "Many licensed telehealth services now offer private consultations for ED specifically for this reason. The important thing is that a real, licensed clinician reviews your health history — not just an intake form.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        frequently asked questions
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Questions men actually ask
      </h1>

      <div className="mt-12 space-y-8">
        {faqs.map((item) => (
          <div key={item.q} className="border-b border-border pb-8">
            <h2 className="text-lg font-semibold text-foreground">
              {item.q}
            </h2>
            <p className="mt-3 leading-relaxed text-foreground-muted">
              {item.a}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-4">
        <Link
          href="/resources"
          className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          Find help now
        </Link>
      </div>
    </div>
  );
}
