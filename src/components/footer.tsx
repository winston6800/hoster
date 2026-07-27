import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-elevated">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-foreground-muted">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-foreground">
            Meal<span className="text-accent">Trail</span>
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/feed" className="hover:text-foreground">
              Feed
            </Link>
            <Link href="/stack" className="hover:text-foreground">
              My Stack
            </Link>
            <Link href="/new" className="hover:text-foreground">
              New Post
            </Link>
            <Link href="/login" className="hover:text-foreground">
              Sign in
            </Link>
          </nav>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed">
          MealTrail is a community meal-prep log, not medical or nutrition
          advice. AI-generated ideas are suggestions, not a diet plan —
          check with a doctor or dietitian for anything specific to your
          health.
        </p>
      </div>
    </footer>
  );
}
