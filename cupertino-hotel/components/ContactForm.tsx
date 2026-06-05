"use client";

import { useState } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

// Posts to /api/contact (Resend). If the backend isn't configured yet, falls
// back to opening the visitor's mail client so the message is never lost.
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      message: String(data.get("message") || ""),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      // Backend not configured (or send failed) — fall back to mailto.
      const subject = encodeURIComponent(`Website enquiry from ${payload.name || "a guest"}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\n\n${payload.message}`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field id="name" label="Name" required />
      <Field id="email" label="Email" type="email" required />
      <Field id="phone" label="Phone" type="tel" />
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          How can we help? <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {status === "sent" && (
        <p className="text-sm text-green-700">
          Thank you — your message has been sent. We&rsquo;ll be in touch shortly.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-ink/70">
          We&rsquo;ve opened your email app to finish sending. You can also reach us at{" "}
          <a href={`tel:${site.phone.tollFree}`} className="text-gold underline">
            {site.phone.tollFree}
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}
