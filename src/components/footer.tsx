import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-elevated">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-foreground-muted">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-foreground">
            Understanding <span className="text-accent">ED</span>
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/understanding-ed" className="hover:text-foreground">
              Understanding ED
            </Link>
            <Link href="/causes" className="hover:text-foreground">
              Causes
            </Link>
            <Link href="/treatment" className="hover:text-foreground">
              Treatment
            </Link>
            <Link href="/faq" className="hover:text-foreground">
              FAQ
            </Link>
            <Link href="/resources" className="hover:text-foreground">
              Get Help
            </Link>
          </nav>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed">
          This site is for general education only and is not a substitute for
          a diagnosis or treatment plan from a licensed healthcare provider.
          If you&rsquo;re having a mental health crisis in the US, call or
          text <strong className="text-foreground">988</strong> (Suicide &amp;
          Crisis Lifeline) any time.
        </p>
      </div>
    </footer>
  );
}
