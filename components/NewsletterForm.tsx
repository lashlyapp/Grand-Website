"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

// Footer newsletter signup. Posts the email to /api/newsletter (Resend).
export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "");
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="text-sm text-white/75">
        Thanks for subscribing — you&rsquo;re on the list.
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Enter your email…"
          className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="shrink-0 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
        >
          {status === "sending" ? "…" : "Send"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-white/60" role="alert">
          Sorry, something went wrong. Please email us directly.
        </p>
      )}
    </div>
  );
}
