"use client";

import { useState } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

// Event / meeting inquiry form. Posts to /api/events (Resend), with a mailto
// fallback if the backend isn't configured.
export default function EventInquiryForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      date: String(data.get("date") || ""),
      time: String(data.get("time") || ""),
      event: String(data.get("event") || ""),
      info: String(data.get("info") || ""),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      const subject = encodeURIComponent(`Event inquiry from ${payload.name || "a guest"}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\nDate: ${payload.date}\nTime: ${payload.time}\nEvent: ${payload.event}\n\n${payload.info}`,
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field id="name" label="Full Name" required />
      <Field id="email" label="Email" type="email" required />
      <Field id="date" label="Preferred Date" type="date" />
      <Field id="time" label="Preferred Time" type="time" />
      <div className="sm:col-span-2">
        <Field id="event" label="Type of Event" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="info" className="block text-sm font-medium text-ink">
          Additional Information
        </label>
        <textarea
          id="info"
          name="info"
          rows={4}
          className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit Inquiry"}
        </button>
        {status === "sent" && (
          <p className="mt-4 text-sm text-green-700">
            Thank you — your inquiry has been sent. Our events team will follow up soon.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-ink/70">
            We&rsquo;ve opened your email app to finish sending, or call{" "}
            <a href={`tel:${site.phone.tollFree}`} className="text-gold underline">
              {site.phone.tollFree}
            </a>
            .
          </p>
        )}
      </div>
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
