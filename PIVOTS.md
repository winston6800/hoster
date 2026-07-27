# Pivot log

Running record of what this repo has been, in order, so we don't lose the thread.

1. **ED support/education site** — `claude/ed-support-site-8axsnl`
   Judgment-free info site: understanding ED, causes, treatment options, FAQ,
   resources. No products sold, no claims beyond what's cited.

2. **Pivot** — "make a product backed w/ a product people buy."

3. **Pivot** — diet/recipe-storage app, one-time $35 purchase.

4. **Pivot (current)** — "Meal Prep Strava": a social posting app where
   users share meal-prep posts, an AI endpoint suggests food ideas, niche
   focus on Mediterranean diet for now. One-time $35 paywall via Stripe
   test mode. Branch: `claude/mealprep-strava` (branched from the ED site
   branch for the Next.js/Tailwind scaffold, then rebuilt).

   Status: built. Real Supabase project provisioned (free tier, project
   `mealprep-strava`, id `wkkgkicovztluaonlrie`) with `profiles`, `posts`,
   `likes`, `purchases` tables, RLS enabled on all four, zero security
   advisories. Auth (email/password), feed, likes, new-post form, and the
   Stripe Checkout + AI-generation code paths are all implemented and
   build/lint/typecheck clean.

   Not tested live end-to-end in this session: this sandbox's network
   egress policy blocks `supabase.co` (confirmed via the proxy's own
   status log — `403 policy denial`), so the browser-driven test couldn't
   actually sign up/post/like against the live backend. It does degrade
   gracefully (feed page shows "Host not in allowlist..." instead of
   crashing) — the schema and RLS were verified directly via SQL/advisor
   tools instead. This restriction is specific to this dev sandbox, not
   to a real deployment.

   Still needed from the user to go fully live:
   - `SUPABASE_SERVICE_ROLE_KEY` (Dashboard > Project Settings > API)
   - `STRIPE_SECRET_KEY` — real test-mode key (`sk_test_...`); none was
     available in this session, so Checkout is wired up but unexercised
   - `ANTHROPIC_API_KEY` for the AI idea generator
   - Turning off "Confirm email" in Supabase Auth settings for smoother
     local testing (no mail server configured)
