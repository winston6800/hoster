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

   Needs from the user to go live:
   - Real Stripe keys (using test-mode keys for now)
   - A real LLM API key (Anthropic or OpenAI) for the AI idea generator
   - Decision on whether to provision a persistent Supabase project
     (currently provisioned on free tier for this build)
