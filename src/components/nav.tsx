"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const links = [
    { href: "/", label: "Home" },
    { href: "/feed", label: "Feed" },
    ...(user
      ? [
          { href: "/stack", label: "My Stack" },
          { href: "/new", label: "New Post" },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          Meal<span className="text-accent">Trail</span>
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
          {user ? (
            <button
              onClick={signOut}
              className="text-sm text-foreground-muted hover:text-foreground"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Sign in
            </Link>
          )}
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
          {user ? (
            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="rounded-md px-2 py-2 text-left text-sm text-foreground-muted hover:bg-background-elevated hover:text-foreground"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-foreground-muted hover:bg-background-elevated hover:text-foreground"
            >
              Sign in
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
