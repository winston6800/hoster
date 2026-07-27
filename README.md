# MealTrail

A diet-design app: pick a health focus (heart health, weight management,
more protein, blood sugar friendly, or general wellness), share the
Mediterranean meals you cook tagged to it, and get AI-generated ideas tuned
to that focus instead of generic Mediterranean suggestions. One-time $35
access via Stripe (test mode).

See `PIVOTS.md` for how this repo got here — it started as an ED support
site and has pivoted a few times since.

## Stack

- Next.js (App Router) + Tailwind CSS
- Supabase (Postgres + Auth) for accounts, posts, likes, purchases
- Stripe Checkout (test mode) for the one-time $35 unlock
- Anthropic API for AI-generated, focus-tuned meal-prep ideas

## Structure

- `/` — landing page, pricing, "how it works"
- `/login` — sign up (picks a health focus) / sign in
- `/join` — paywall: pay $35 once via Stripe Checkout
- `/success` — post-checkout confirmation (also flips `has_paid` directly,
  since this dev environment has no stable public URL for a Stripe webhook)
- `/feed` — public post feed with focus filter chips, like button (paid
  users can like/post)
- `/new` — new post form: pick a focus, optionally hit "Generate" for an
  AI idea tuned to it, see a live preview of the block about to be added
  (paid users only)
- `/stack` — your own posts as a tower of isometric blocks, colored by
  health focus, plus a streak counter and total count
- `src/lib/health-focus.ts` — the 5 focus values, labels, and the guidance
  text each one adds to the AI prompt
- `src/lib/streak.ts` — consecutive-day streak calculation
- `src/components/stack-tower.tsx` — the isometric block tower (real CSS
  3D, no images/libraries)

## Setup

```bash
npm install
cp .env.example .env.local
```

`.env.example` already has the real Supabase URL + anon key for the
project provisioned for this app. You still need to fill in:

- `SUPABASE_SERVICE_ROLE_KEY` — Supabase Dashboard > Project Settings > API
- `STRIPE_SECRET_KEY` — Stripe Dashboard > Developers > API keys, **test mode** (`sk_test_...`)
- `STRIPE_WEBHOOK_SECRET` — optional here; `/success` confirms payment directly as a fallback
- `ANTHROPIC_API_KEY` — https://console.anthropic.com/settings/keys

Also, in Supabase Auth settings, turn off "Confirm email" for easier local
testing (no mail server configured for this project).

```bash
npm run dev
```

## Build

```bash
npm run build
npm run start
```
