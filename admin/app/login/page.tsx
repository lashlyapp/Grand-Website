"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();

    // There is no open signup: only emails on the admin list (managed by
    // superadmins under /admins) get a sign-in code or an account.
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
    });
    setLoading(false);
    if (error) setError(error.message);
    else {
      setCode("");
      setStep("code");
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }
    router.push("/rooms");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm pt-16">
      <h1 className="text-xl font-semibold">CG Hotels Admin</h1>
      <p className="mt-1 text-sm text-ink/60">
        {step === "email"
          ? "Sign in with a 6-digit code sent to your email."
          : `Enter the 6-digit code sent to ${email}.`}
      </p>

      {step === "email" ? (
        <form onSubmit={sendCode} className="mt-6 space-y-3">
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
            {loading ? "Sending…" : "Send code"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      ) : (
        <form onSubmit={verifyCode} className="mt-6 space-y-3">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{6}"
            maxLength={6}
            required
            autoFocus
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            className="w-full rounded-lg border border-ink/15 px-3 py-2 text-center text-lg tracking-[0.5em] outline-none focus:border-gold"
          />
          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white hover:bg-gold-dark disabled:opacity-60"
          >
            {loading ? "Verifying…" : "Sign in"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <p className="text-center text-sm text-ink/60">
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setError(null);
              }}
              className="hover:text-ink underline"
            >
              Use a different email or resend the code
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
