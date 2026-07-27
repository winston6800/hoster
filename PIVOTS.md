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

5. **Pivot (current)** — "diet design app": reframed from a pure social
   feed to personalization-first. Users pick a health focus at sign-up
   (heart health / weight management / more protein / blood sugar
   friendly / general wellness), share the Mediterranean ingredients/meals
   they cook tagged to that focus, and the AI idea generator biases its
   suggestions toward the selected focus instead of a generic Mediterranean
   idea. Feed gained focus filter chips.

   Status: built on top of the mealprep-strava schema — added
   `health_focus` column (checked against the 5 known values) to both
   `profiles` and `posts` via a new migration, zero new security
   advisories. Sign-up form, new-post form, feed (filter + badge), and
   `/api/generate-idea` all updated and wired to it. Same untested-live
   caveat as above (sandbox network policy blocks `supabase.co`) — verified
   via build/lint/typecheck plus direct screenshots of the rendered UI.

6. **Enhancement** — "make creating your meal stack really fun to build
   and follow." Added a literal visual "stack": `/stack` shows every meal
   a user has posted as a tower of isometric blocks (real CSS 3D, colored
   by health focus), plus a streak counter (consecutive days posted) and
   total count. `/new` shows a live preview of the block about to be added
   and links back to the running total; posting redirects to `/stack` so
   the new block visibly drops onto the tower.

   Found and fixed a real CSS 3D bug along the way: `rotateY(90deg)` on
   the "right" face silhouetted correctly in isolation but silently failed
   to render at all once combined with the parent's
   `rotateX(-35.264deg) rotateY(45deg)` — needed `rotateY(-90deg)`
   instead. Also found that animating `transform` directly on the same
   element holding the static isometric rotation broke rendering
   intermittently; fixed by animating a separate 2D wrapper instead and
   leaving the rotated cube's transform untouched. Verified via an
   isolated CSS test file and a temporary (deleted before commit) preview
   route, not just visual guesswork.

7. **Feedback: the tower "looks trash," refocus on the actual point** —
   user said the visual gamification wasn't landing and clarified what
   they actually want: fun, simple, AI-generated dishes that satisfy
   *every* stated constraint at once — health focus, dietary restrictions,
   free-form asks (allergies, time limit, what's in the fridge). Rebuilt
   `/api/generate-idea` to take `{healthFocus, restrictions[], constraints,
   count}` and return `count` distinct dishes that must all satisfy every
   constraint (with the model told to substitute correctly rather than
   break a constraint, e.g. rice instead of couscous for gluten-free).
   `/new` now leads with a "Build your menu" panel — health focus select,
   toggleable dietary-restriction chips (vegetarian/vegan/pescatarian/
   gluten-free/dairy-free/nut-free/shellfish-free), a free-text field, and
   a "Generate my menu" button that returns 3 dishes as pickable cards;
   clicking one fills the post form below. Removed the single-idea "type
   one ingredient" flow and the live single-block preview in favor of
   this. The stack tower page itself is untouched and still reachable,
   just no longer the featured mechanic.

   New file: `src/lib/dietary-restrictions.ts` (7 restrictions + the rule
   text fed to the model). Verified with a temporary preview route
   (deleted before commit): restriction chips toggle correctly, a mocked
   3-dish response renders as selectable cards, picking one fills the
   form, and generate/submit errors now show independently instead of
   duplicating (a real bug caught while testing — both flows shared one
   error state).
