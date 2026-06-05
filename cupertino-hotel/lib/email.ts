// Minimal email sender for the site's forms. Posts directly to the Resend REST
// API so we don't add an SDK dependency. Configure with env vars on Vercel:
//
//   RESEND_API_KEY     (required to actually send)
//   CONTACT_TO_EMAIL   (where form submissions go; defaults to the hotel inbox)
//   CONTACT_FROM_EMAIL (verified sender; defaults to Resend's test sender so it
//                       works as soon as RESEND_API_KEY is set, before a custom
//                       domain is verified)
//
// When RESEND_API_KEY is absent (e.g. an un-configured preview), this returns
// { ok: false, reason: "unconfigured" } and the forms fall back to a mailto:
// link, so nothing is ever a dead end.

type SendArgs = {
  subject: string;
  text: string;
  replyTo?: string;
};

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "send_failed"; detail?: string };

export async function sendHotelEmail({ subject, text, replyTo }: SendArgs): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "info@cghotelgroup.com";
  const from = process.env.CONTACT_FROM_EMAIL || "The Cupertino Hotel <onboarding@resend.dev>";

  if (!key) return { ok: false, reason: "unconfigured" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, reason: "send_failed", detail };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: "send_failed", detail: String(err) };
  }
}
