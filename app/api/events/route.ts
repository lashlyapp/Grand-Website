import { NextResponse } from "next/server";
import { sendHotelEmail } from "@/lib/email";

export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data?.email || !data?.name) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  const { name, email, date = "", time = "", event = "", info = "" } = data;

  const result = await sendHotelEmail({
    subject: `Event inquiry from ${name}`,
    text:
      `Name: ${name}\nEmail: ${email}\n` +
      `Date: ${date}\nTime: ${time}\nEvent: ${event}\n\n` +
      `Additional information:\n${info}`,
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json(result, {
      status: result.reason === "unconfigured" ? 503 : 502,
    });
  }
  return NextResponse.json({ ok: true });
}
