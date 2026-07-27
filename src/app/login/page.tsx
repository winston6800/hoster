"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { HEALTH_FOCUSES } from "@/lib/health-focus";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [healthFocus, setHealthFocus] = useState<string>(HEALTH_FOCUSES[0].value);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        if (!data.user) throw new Error("Sign-up didn't return a user.");

        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          username: username || email.split("@")[0],
          health_focus: healthFocus,
        });
        if (profileError && profileError.code !== "23505") throw profileError;

        if (!data.session) {
          setError(
            "Account created. Check your email to confirm it, then sign in. (If email confirmation is on and you don't have a mail server configured, turn off \"Confirm email\" in Supabase Auth settings for local testing.)",
          );
          setLoading(false);
          return;
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }

      router.push("/join");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <h1 className="text-3xl font-semibold text-foreground">
        {mode === "signup" ? "Create your account" : "Sign in"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {mode === "signup" && (
          <>
            <div>
              <label className="block text-sm font-medium text-foreground">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-background-elevated px-3 py-2 text-sm"
                placeholder="mediterraneanmike"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">
                What&rsquo;s your focus?
              </label>
              <select
                value={healthFocus}
                onChange={(e) => setHealthFocus(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-background-elevated px-3 py-2 text-sm"
              >
                {HEALTH_FOCUSES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-foreground-muted">
                Tunes your AI-generated ideas and defaults on new posts. You
                can change this any time.
              </p>
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background-elevated px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background-elevated px-3 py-2 text-sm"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Working…" : mode === "signup" ? "Sign up" : "Sign in"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
        className="mt-4 text-sm text-foreground-muted hover:text-foreground"
      >
        {mode === "signup"
          ? "Already have an account? Sign in"
          : "Need an account? Sign up"}
      </button>
    </div>
  );
}
