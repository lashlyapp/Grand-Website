// Send Email Auth Hook: Supabase Auth calls this function instead of sending
// mail over SMTP, and we deliver through the Resend HTTP API.
//
// Required function secrets (Dashboard → Edge Functions → send-email → Secrets):
//   RESEND_API_KEY         — Resend API key
//   SEND_EMAIL_HOOK_SECRET — the "v1,whsec_..." secret shown when enabling the
//                            Send Email hook (Dashboard → Auth → Hooks)
import { Webhook } from "https://esm.sh/standardwebhooks@1.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const HOOK_SECRET = Deno.env.get("SEND_EMAIL_HOOK_SECRET");

const FROM = "CG Hotels Admin <noreply@cghotelgroup.com>";

const SUBJECTS: Record<string, string> = {
  signup: "Your CG Hotels admin sign-in code",
  magiclink: "Your CG Hotels admin sign-in code",
  invite: "Your CG Hotels admin sign-in code",
  recovery: "Your CG Hotels admin recovery code",
  email_change: "Confirm your new CG Hotels admin email",
};

function renderHtml(token: string): string {
  return `
    <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 420px; margin: 0 auto; padding: 24px;">
      <h2 style="margin: 0 0 8px;">CG Hotels Admin</h2>
      <p style="margin: 0 0 16px; color: #444;">Enter this code to sign in:</p>
      <p style="font-size: 32px; font-weight: 700; letter-spacing: 8px; margin: 0 0 16px;">${token}</p>
      <p style="margin: 0; color: #888; font-size: 13px;">
        This code expires in 1 hour. If you didn't request it, you can ignore this email.
      </p>
    </div>`;
}

type HookPayload = {
  user: { email: string };
  email_data: { token: string; email_action_type: string };
};

Deno.serve(async (req) => {
  if (!RESEND_API_KEY || !HOOK_SECRET) {
    return new Response(
      JSON.stringify({
        error: {
          http_code: 500,
          message: "Missing RESEND_API_KEY or SEND_EMAIL_HOOK_SECRET secret",
        },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const payload = await req.text();
  const headers = Object.fromEntries(req.headers);
  const wh = new Webhook(HOOK_SECRET.replace("v1,whsec_", ""));

  let user: HookPayload["user"];
  let email_data: HookPayload["email_data"];
  try {
    ({ user, email_data } = wh.verify(payload, headers) as HookPayload);
  } catch {
    return new Response(
      JSON.stringify({
        error: { http_code: 401, message: "Invalid webhook signature" },
      }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  const subject =
    SUBJECTS[email_data.email_action_type] ?? SUBJECTS.magiclink;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [user.email],
      subject,
      html: renderHtml(email_data.token),
      text: `Your CG Hotels admin sign-in code is ${email_data.token}. It expires in 1 hour.`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return new Response(
      JSON.stringify({
        error: { http_code: 500, message: `Resend error: ${detail}` },
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response("{}", {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
