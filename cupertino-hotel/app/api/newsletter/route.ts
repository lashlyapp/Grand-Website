import { NextResponse } from "next/server";
import { sendHotelEmail } from "@/lib/email";

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  const email = typeof data?.email === "string" ? data.email.trim() : "";
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
  }

  const result = await sendHotelEmail({
    subject: "New newsletter signup",
    text: `New subscriber requested to join the mailing list:\n${email}`,
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json(result, {
      status: result.reason === "unconfigured" ? 503 : 502,
    });
  }
  return NextResponse.json({ ok: true });
}
