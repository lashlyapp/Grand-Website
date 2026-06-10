"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();

    // There is no open signup: only emails on the admin list (managed by
    // superadmins under /admins) get a magic link or an account.
    const { data: allowed, error: checkError } = await supabase.rpc(
      "is_allowed_email",
      { check_email: email.trim() },
    );
    if (checkError || !allowed) {
      setLoading(false);
      setError(
        checkError?.message ??
          "This email doesn't have admin access. Ask an admin to invite you.",
      );
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <div className="mx-auto max-w-sm pt-16">
      <h1 className="text-xl font-semibold">CG Hotels Admin</h1>
      <p className="mt-1 text-sm text-ink/60">
        Sign in with a magic link sent to your email.
      </p>

      {sent ? (
        <p className="mt-6 rounded-lg bg-gold/10 px-4 py-3 text-sm text-ink">
          Check <span className="font-medium">{email}</span> for a sign-in link.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@cghotelgroup.com"
            className="w-full rounded-lg border border-ink/15 px-3 py-2 text-sm outline-none focus:border-gold"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white hover:bg-gold-dark disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send magic link"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      )}
    </div>
  );
}
