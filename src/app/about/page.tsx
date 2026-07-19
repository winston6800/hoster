import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Philosophy",
  description:
    "Why 'dead by default,' and why inner security, financial security, and real relationships are the same project viewed from three angles.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        the philosophy
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Why &ldquo;dead by default&rdquo;
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
        Every system has a default configuration — the state it falls into
        when nobody touches the settings. People are no different. Left
        unconfigured, we default too.
      </p>

      <div className="mt-12 space-y-6 text-base leading-relaxed text-foreground">
        <p>
          Phones ship with tracking on. Software ships with the weakest
          password policy that still technically works. Left alone, a person
          defaults the same way: reactive instead of grounded, spending
          instead of building, chasing instead of connecting. Not because
          that&rsquo;s who you are — because nobody sat you down and taught
          you the alternative, and an entire attention economy profits from
          you never changing the setting.
        </p>
        <p>
          &ldquo;Dead by default&rdquo; isn&rsquo;t a threat. It&rsquo;s a
          description of what happens when the configuration is left to
          chance: a nervous system that runs on whatever just happened to it,
          a bank account that tracks income too closely to ever build a
          buffer, and a pattern of relationships that stay shallow because
          nobody ever taught you the difference between getting someone
          interested and staying worth choosing five years in.
        </p>

        <h2 className="pt-6 text-xl font-semibold text-foreground">
          Three settings, one project
        </h2>
        <p>
          This site is organized around three things worth configuring on
          purpose:
        </p>
        <ul className="ml-5 list-disc space-y-3 marker:text-accent">
          <li>
            <span className="font-semibold text-pillar-inner">
              Inner security
            </span>{" "}
            — the capacity to regulate your own emotions instead of
            outsourcing that job to whoever is nearby, and to feel okay
            without needing everyone around you to confirm it.
          </li>
          <li>
            <span className="font-semibold text-pillar-money">
              Financial security
            </span>{" "}
            — a buffer, a habit, and the patience to let boring, unglamorous
            decisions compound instead of chasing a windfall.
          </li>
          <li>
            <span className="font-semibold text-pillar-love">
              Real relationships
            </span>{" "}
            — not the short-term game of getting a yes, but the slower,
            less-taught skill of being fully known by one person for a long
            stretch of time and remaining worth choosing.
          </li>
        </ul>
        <p>
          These aren&rsquo;t three separate self-improvement tracks. They are
          the same project, viewed from three angles. A man who is reactive
          with his emotions is usually also reactive with his money and
          reactive with the people who matter to him most. Fix the root, and
          the branches tend to follow.
        </p>

        <h2 className="pt-6 text-xl font-semibold text-foreground">
          Not about becoming hard
        </h2>
        <p>
          None of this is about becoming detached, guarded, or emotionally
          unavailable in the name of &ldquo;security.&rdquo; It&rsquo;s
          closer to the opposite. The goal is to get secure enough inside,
          and stable enough outside, that you can actually afford to be open
          with people — because insecurity is expensive. It makes you
          defensive when you could be curious, controlling when you could be
          trusting, and short-term when you could be building something that
          compounds.
        </p>
        <p>
          A lot of what passes for dating advice optimizes for the first
          yes: openers, routines, volume. It produces first dates and rarely
          produces the version of you that a good partner would want to keep
          around after the novelty wears off. This site optimizes for the
          opposite end of the timeline — the boring, unglamorous, high-payoff
          work of becoming someone worth staying with.
        </p>

        <h2 className="pt-6 text-xl font-semibold text-foreground">
          Who this is for
        </h2>
        <p>
          Mostly written for men who are tired of advice that treats
          relationships as a numbers game, money as a get-rich scheme, and
          emotional maturity as an afterthought. If you&rsquo;d rather build
          something that lasts than win something that doesn&rsquo;t, you&rsquo;re
          in the right place.
        </p>
      </div>

      <div className="mt-14 flex flex-wrap gap-4 border-t border-border pt-10">
        <Link
          href="/blog"
          className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          Read the blog
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground-muted/60"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
