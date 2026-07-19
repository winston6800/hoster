import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs">
          <span className="text-accent">dead</span>
          <span>://by-default</span>
          <span className="ml-2 text-foreground-muted">
            &mdash; nothing about you is set by default.
          </span>
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/about" className="hover:text-foreground">
            Philosophy
          </Link>
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
