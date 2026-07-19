export type Pillar = "inner" | "money" | "love";

export const pillarMeta: Record<
  Pillar,
  { label: string; color: string; textClass: string; bgClass: string; borderClass: string }
> = {
  inner: {
    label: "Inner Security",
    color: "var(--pillar-inner)",
    textClass: "text-pillar-inner",
    bgClass: "bg-pillar-inner/10",
    borderClass: "border-pillar-inner/30",
  },
  money: {
    label: "Financial Security",
    color: "var(--pillar-money)",
    textClass: "text-pillar-money",
    bgClass: "bg-pillar-money/10",
    borderClass: "border-pillar-money/30",
  },
  love: {
    label: "Real Relationships",
    color: "var(--pillar-love)",
    textClass: "text-pillar-love",
    bgClass: "bg-pillar-love/10",
    borderClass: "border-pillar-love/30",
  },
};

export interface Post {
  slug: string;
  title: string;
  pillar: Pillar;
  date: string;
  excerpt: string;
  readTime: string;
  content: string[];
}

export const posts: Post[] = [
  {
    slug: "dead-by-default-the-manifesto",
    title: "Dead by Default: The Manifesto",
    pillar: "inner",
    date: "2026-01-12",
    readTime: "6 min",
    excerpt:
      "Nobody ships you the settings for a stable life. Left alone, the defaults are reactive, broke, and lonely. This is the case for configuring on purpose.",
    content: [
      "Every system has a default configuration — the state it falls into when nobody touches the settings. Phones ship with tracking on. Software ships with the weakest password policy that still technically works. People are no different. Left unconfigured, we default too: reactive instead of grounded, spending instead of building, chasing instead of connecting.",
      "That's the whole idea behind the name. Dead by default isn't a threat, it's a description. If you never intervene in your own operating system, the factory settings win — not because they're good for you, but because they're easy, and because an entire attention economy profits from you never changing them.",
      "This site is organized around three settings worth changing on purpose: inner security, financial security, and the ability to build relationships that last longer than a season. They're not separate self-improvement tracks. They're the same project, viewed from three angles. A man who is reactive with his emotions is usually also reactive with his money and reactive with the people who matter to him. Fix the root, and the branches follow.",
      "None of this is about becoming hard or detached. It's closer to the opposite — the goal is to get secure enough on the inside, and stable enough on the outside, that you can actually afford to be open with people. Insecurity is expensive. It makes you defensive when you could be curious, controlling when you could be trusting, short-term when you could be building something that compounds.",
      "So that's the project: stop running on default. Read the philosophy, take what's useful, and start configuring on purpose.",
    ],
  },
  {
    slug: "chasing-is-the-opposite-of-security",
    title: "Chasing Is the Opposite of Security",
    pillar: "love",
    date: "2026-01-26",
    readTime: "7 min",
    excerpt:
      "A lot of \"dating advice\" optimizes for one night. It teaches lines, not character — and it quietly makes you worse at the thing you actually want, which is someone who stays.",
    content: [
      "There's an entire industry built around getting a yes. Openers, routines, statistically-optimized profiles, the whole apparatus of pickup-as-numbers-game. It works, sort of, in the narrow sense that volume plus technique produces more first dates. What it doesn't produce is a relationship that survives the fortieth date, or the version of you a good partner would actually want to keep.",
      "The tell is what the advice optimizes for. Short-term systems optimize for the first yes. Long-term security optimizes for the version of you that's still worth choosing after the novelty wears off — after they've seen you tired, wrong, inconvenienced, and ordinary. Nothing about a great opening line prepares you for that. Character does.",
      "This isn't an argument against effort, confidence, or being interesting — those matter. It's an argument against treating people as a conversion funnel. If your framework for relationships is fundamentally about acquisition, you will unconsciously optimize for acquiring, and you will get very good at starting things and mysteriously bad at keeping them.",
      "The alternative is unglamorous: build a life and a self that's genuinely secure, so that you're not approaching every interaction from scarcity. Scarcity makes people chase. Chasing reads, correctly, as need. Need is not attractive over a long horizon, even when it produces short-term wins — it produces relationships built on the fear of losing the other person rather than the enjoyment of having them.",
      "Long-term relationships are built by people who can tolerate being fully seen, who regulate their own emotions instead of outsourcing that job to a partner, and who bring something stable to the table instead of extracting validation from it. That's a different skill set than closing. It's slower to build and it's the only version that actually compounds.",
    ],
  },
  {
    slug: "boring-money-habits-that-compound",
    title: "The Boring Money Habits That Actually Compound",
    pillar: "money",
    date: "2026-02-09",
    readTime: "5 min",
    excerpt:
      "Financial security isn't a windfall or a hot trade. It's a small number of unglamorous habits, repeated for long enough that the math starts doing the work for you.",
    content: [
      "Financial insecurity doesn't feel like a math problem from the inside. It feels like anxiety, like avoidance, like not opening the banking app for three weeks because you already know it's bad news. But underneath the feeling, it usually is a math problem, and a solvable one: spending that tracks income too closely, no buffer, no plan, and no honest accounting of where the money actually goes.",
      "Security starts with a number most people avoid calculating: how many months could you survive with zero income, using only what you already have. If the answer is under one, that's not a personal failing, it's just the current state — and it's the single highest-leverage thing to fix before anything else, including investing.",
      "After the buffer exists, the habits that build real security are almost insultingly boring: automate the savings so it happens before you see the money, not after. Spend meaningfully below what you earn instead of scaling lifestyle to match every raise. Put long-term money into diversified, low-cost instruments and then largely leave it alone. None of this is exciting. All of it works, precisely because it removes willpower from the equation.",
      "The connection to the rest of this site isn't incidental. Financial insecurity makes people desperate in relationships — dependent on a partner's income, unable to walk away from something bad, or quietly resentful about money neither person wants to discuss. It also keeps the nervous system in low-grade threat mode, which bleeds into everything else. Getting your finances boring is one of the fastest ways to get the rest of your life calmer.",
      "You don't need a windfall. You need a buffer, a habit, and enough time for the habit to compound.",
    ],
  },
  {
    slug: "regulate-before-you-relate",
    title: "Regulate Yourself Before You Relate to Anyone Else",
    pillar: "inner",
    date: "2026-02-23",
    readTime: "6 min",
    excerpt:
      "Most relationship problems that look like communication problems are actually regulation problems wearing a disguise. Fix the nervous system first.",
    content: [
      "A fight about dishes is rarely about dishes. It's usually two nervous systems that both went into threat response at the same time, and neither person had a way to come back down before words got said that weren't really about the dishes at all. Communication frameworks help at the margins, but they assume a baseline of regulation that a lot of us never actually have.",
      "Regulation is the capacity to feel something strong — anger, rejection, fear of losing someone — without immediately having to discharge it onto whoever is nearby. It's a trainable skill, not a personality trait, which is good news, because most people were never taught it. If your household growing up handled conflict by yelling, going silent, or fleeing, that's the template your body defaults to under stress, regardless of what you've read since.",
      "The work is unglamorous and mostly physical before it's psychological: noticing the early signs of activation — jaw tightening, chest heat, the urge to interrupt — and having something to do about it besides act on the impulse immediately. A pause, a breath, a walk around the block. It sounds too simple to matter. It's simple and it matters enormously, because the two or three seconds of space it creates is exactly where the choice to respond instead of react lives.",
      "This is the actual foundation under 'real relationships.' You cannot bring stability to someone else while your own internal state is being run by whoever said the last provocative thing. Inner security isn't confidence as a performance — it's having enough of a floor that you don't need the people around you to manage your emotional state for you. Get that floor in place, and most of what looked like a relationship problem quietly resolves on its own.",
    ],
  },
  {
    slug: "what-long-term-actually-requires",
    title: "What Long-Term Actually Requires (That Short-Term Never Teaches You)",
    pillar: "love",
    date: "2026-03-09",
    readTime: "6 min",
    excerpt:
      "Getting someone to like you and keeping a relationship healthy for a decade are different skills, trained differently, and almost nobody teaches the second one.",
    content: [
      "There's a lopsided amount of content about getting into a relationship and almost nothing about running one well once you're in it. That's not an accident — attraction is easier to package and sell as a technique. Sustaining a relationship for years is slower, less visually dramatic, and mostly made of decisions nobody's filming.",
      "A few of those decisions, in no particular order: choosing to say the uncomfortable true thing early, before it calcifies into resentment. Staying curious about someone after you think you already know them, because people keep changing and treating them as a finished project is how closeness quietly dies. Repairing after conflict, actively, rather than just letting time paper over it. Protecting the relationship's reputation of you — being someone your partner can trust with their bad days, not just their good ones.",
      "None of this is instinctive, and none of it is taught by advice optimized for a first date. The skills that get someone interested — novelty, confidence, mystery — are frequently the opposite of the skills that keep a relationship healthy, which lean on consistency, transparency, and the willingness to be a little boring on purpose because reliability is what safety is made of.",
      "This is why 'building stronger relationships' has to be trained on its own terms instead of treated as the natural continuation of getting good at dating. It's a different discipline. It rewards patience over cleverness, and it's learnable by anyone willing to trade the dopamine of a new match for the much quieter reward of being fully known by one person over a long stretch of time.",
    ],
  },
  {
    slug: "the-cost-of-staying-guarded",
    title: "The Cost of Staying Guarded",
    pillar: "inner",
    date: "2026-03-23",
    readTime: "5 min",
    excerpt:
      "Guardedness feels like protection. Over a long enough timeline, it's usually the thing doing the damage — just slower, and harder to blame.",
    content: [
      "Being guarded has an obvious upside: it's very hard to be hurt by someone you never let close. It also has a cost that's easy to miss precisely because it never announces itself as a crisis — it shows up as a string of relationships that stayed shallow, a reputation for being 'hard to read,' and a private sense that nobody really knows you, which you may have quietly arranged yourself.",
      "Guardedness usually isn't a character flaw, it's a learned response to a real past event where openness got punished — betrayed trust, public embarrassment, a relationship that ended badly after you gave it everything. The response made sense at the time. The problem is that it doesn't turn itself back off automatically once the original threat is gone, and most people never go back to check whether the setting still serves them.",
      "The fix isn't becoming an open book with everyone. It's building enough inner security that opening up to the right people stops feeling like handing over a weapon. That security comes from the same place as everything else on this site: a track record of handling your own emotions, a life that isn't precarious enough to make you desperate, and enough self-respect that one person's opinion of you doesn't get to set your entire sense of worth.",
      "Once that floor exists, selective openness becomes a choice instead of a wound in disguise — and the relationships that were never going to survive behind a wall finally get the chance to.",
    ],
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug);
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
