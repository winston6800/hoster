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
  {
    slug: "build-your-own-positioning",
    title: "Build Your Own Positioning: A Practical Guide to Sense of Self, Security, and Opportunity",
    pillar: "inner",
    date: "2026-04-06",
    readTime: "12 min",
    excerpt:
      "Most people never deliberately figure out what they're actually good at or what makes them different — it gets decided for them, by default. A practical, evidence-based process for building real positioning, and why your security and your opportunities are both downstream of it.",
    content: [
      "Almost nobody does this work on purpose. Ask most people what they're actually good at, what makes them different from the next person, or where they should be spending the next five years of effort, and you'll get a shrug, a job title, or a personality-quiz label. Not because they're incurious — because nobody ever handed them a process for figuring it out, so the question got answered by default: by whatever job showed up first, whatever their parents expected, whatever the algorithm fed them at seventeen.",
      "That default answer is usually wrong, or at least incomplete, and it's expensive in a way that's easy to miss. A shaky sense of what you actually bring to the table doesn't just cost you career options — it's a major source of the reactivity and insecurity that shows up everywhere else in your life. People who don't know their own footing tend to either posture (overclaim, because the truth feels too thin to stand on) or hide (underclaim, because putting a real stake in the ground feels dangerous). Both are exhausting, and both are symptoms of the same missing piece: you never actually did the audit.",
      "## Positioning is not a personality quiz",
      "Most \"know yourself\" content is vibes dressed up as insight — four-letter personality types, vision boards, journaling prompts that ask how you feel without asking what you've done. None of it is grounded in evidence, which means none of it produces something you can actually stand on when it matters.",
      "Real positioning is closer to an audit than a discovery. It's not a mystical process of finding a hidden truth about yourself — it's the unglamorous work of collecting evidence about what you've actually demonstrated, what's held your attention over time, and where that intersects with something the world in front of you actually needs. It produces a conclusion you can defend with specifics, not a label you post in a bio.",
      "## The track record test",
      "Self-report is unreliable. What you believe you're good at and what you've actually proven, across years and across contexts, are frequently two different lists — and the gap between them is exactly where a shaky sense of self lives.",
      "The fix is a simple audit. Go back three to five years and list every specific instance where someone sought you out for something, trusted you with a responsibility they didn't hand to everyone, or you produced a result faster or better than the people around you. Not things you enjoyed — things that actually happened, with a specific person, a specific outcome, evidence. Resist the urge to round up or to be falsely modest; you're building a dataset, not a highlight reel.",
      "Once the list exists, look for repeats. The same underlying capability tends to show up in different costumes — the friend everyone calls first when something goes wrong, the person who ends up running the project nobody assigned them, the one who can walk into a tense room and lower the temperature. Different situations, same core skill. That repetition, not any single flattering moment, is the signal worth trusting.",
      "## Interest tested by time, not novelty",
      "The second input is sustained interest, and it needs its own honesty check, because curiosity that survives boredom and curiosity that's just dopamine from something being new feel identical in the first month. They only tell themselves apart later.",
      "Use a simple test: has this interest survived at least one stretch where it stopped being exciting and started being work — the unglamorous maintenance part, the plateau, the point where progress got slow and nobody was watching? If yes, that's real signal. If you notice the same category of thing started and quietly dropped several times, that's not a character flaw, it's data — it's telling you something honest about where your actual attention lives, which is more useful than another attempt at forcing it.",
      "## Where skill, interest, and context actually meet",
      "Positioning lives at the intersection of three things: what you've actually proven you're good at, what holds your attention past the point where it's fun, and what a specific group of people or specific situation in front of you needs and isn't getting anywhere else.",
      "This is deliberately not \"find your passion\" — passion alone ignores whether anyone needs what you're passionate about, which is how people end up resentful that the world won't pay them for their hobby. It's also not \"just be pragmatic and do whatever pays,\" which ignores that you will quietly quit, sabotage, or coast through anything you don't actually care about, usually right when it starts to matter.",
      "The part people get wrong most often is \"context.\" You don't need to find a gap in the entire global market — you need a specific pocket: a team, a niche, a relationship, a community, a moment, where your particular combination of proven skill and real interest is scarce. Positioning isn't a slogan that works everywhere. It's a specific answer to a specific room.",
      "## Why security is downstream of this, not separate from it",
      "A lot of people chase security by minimizing exposure — staying in the role that's merely tolerable, avoiding the conversation that might change something, never fully committing so there's less to lose. That's defense, and defense is not the same thing as security. It just delays finding out whether you actually have a floor.",
      "Real security is knowing what you could rebuild if the current version of your life disappeared — the job, the title, the platform, the specific people who currently vouch for you. That knowledge only comes from having done the audit above: knowing your actual, transferable core rather than the costume you happened to be wearing when things were working. A useful test: could you describe, in one honest paragraph, what you'd do in a new city with none of your current contacts or credentials, using only what's actually inside you? If the answer is vague, your security is currently borrowed from your circumstances, not built into you — and borrowed security gets called in exactly when you can least afford it.",
      "## Finding opportunity without waiting for permission",
      "Most opportunity isn't discovered sitting still — it's manufactured by putting a proven skill in front of a real, specific need at a small enough scale that you can simply start, instead of waiting for a five-year plan to authorize you.",
      "The practical move is to take the smallest real version of the intersection you found — skill, sustained interest, specific context — and do it for one actual person or situation this month. Not a plan. A rep. Evidence compounds faster than planning does, and each rep either confirms the positioning or corrects it, which is information a plan sitting in a notebook can never give you.",
      "Watch out for credential-collecting as a substitute for this. Another course, another certification, another framework can feel like progress while functioning as a way to avoid the track-record test — because a credential can't fail publicly, and a real rep can. The discomfort of that risk is usually the actual signal that you're finally doing something that counts.",
      "## A short process, if you want to actually run it",
      "1. Run the track record audit — specific instances, specific evidence, over three to five years. 2. Test your interests against time, not novelty — keep what survived boredom, let go of what didn't without shame. 3. Map the intersection of proven skill, sustained interest, and a specific unmet context in front of you right now. 4. Find the smallest real version of that intersection and do it for one specific person or situation. 5. Let the result update your positioning instead of treating this as a one-time exercise you finish and file away.",
      "Positioning isn't a slogan you write once and carry around. It's evidence you keep collecting on purpose instead of letting it accumulate by accident — the same discipline that runs everything else on this site. Left unconfigured, your sense of self defaults to whatever happened to you. Audited on purpose, it becomes something you can actually stand on.",
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
