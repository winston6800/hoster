"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/understanding-ed", label: "Understanding ED" },
  { href: "/causes", label: "Causes" },
  { href: "/treatment", label: "Treatment" },
  { href: "/faq", label: "FAQ" },
  { href: "/resources", label: "Get Help" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          Understanding <span className="text-accent">ED</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  active
                    ? "font-semibold text-accent"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-sm">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 pb-4 lg:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-foreground-muted hover:bg-background-elevated hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
