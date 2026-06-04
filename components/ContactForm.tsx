"use client";

import { useState } from "react";
import { site } from "@/content/site";

// For now this composes a pre-filled email to the hotel (no backend needed).
// A serverless route handler that posts to an email/CRM service can replace the
// mailto behavior later without changing the markup.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Website enquiry from ${name || "a guest"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field id="name" label="Name" required />
      <Field id="email" label="Email" type="email" required />
      <Field id="phone" label="Phone" type="tel" />
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          How can we help?
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
        className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold-dark"
      >
        Send Message
      </button>
      {sent && (
        <p className="text-sm text-ink/70">
          Thank you — your email client should open to complete sending. You can
          also reach us at{" "}
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
