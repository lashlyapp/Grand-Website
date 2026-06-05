import { NextResponse } from "next/server";
import { sendHotelEmail } from "@/lib/email";

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data?.email || !data?.message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  const { name = "", email, phone = "", message } = data;

  const result = await sendHotelEmail({
    subject: `Website enquiry from ${name || "a guest"}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json(result, {
      status: result.reason === "unconfigured" ? 503 : 502,
    });
  }
  return NextResponse.json({ ok: true });
}
