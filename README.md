# MealTrail

"Strava for meal prep" — a social feed where people log their meal preps,
get AI-generated Mediterranean food ideas, and follow what the niche is
making. One-time $35 access via Stripe (test mode).

See `PIVOTS.md` for how this repo got here — it started as an ED support
site and pivoted twice.

## Stack

- Next.js (App Router) + Tailwind CSS
- Supabase (Postgres + Auth) for accounts, posts, likes, purchases
- Stripe Checkout (test mode) for the one-time $35 unlock
- Anthropic API for AI-generated meal-prep ideas

## Structure

- `/` — landing page, pricing, "how it works"
- `/login` — sign up / sign in
- `/join` — paywall: pay $35 once via Stripe Checkout
- `/success` — post-checkout confirmation (also flips `has_paid` directly,
  since this dev environment has no stable public URL for a Stripe webhook)
- `/feed` — public post feed, like button (paid users can like/post)
- `/new` — new post form with an AI "Generate" button (paid users only)

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
