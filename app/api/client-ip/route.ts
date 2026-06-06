import { NextResponse } from "next/server";

// Returns the visitor's public IP. The Travel Tripper (RT3) LiveRate API
// (getCrossOutRate) requires an `ip_address` and rejects the request without
// one, so the client fetches this before asking for tonight's rate. In
// production Vercel sets `x-forwarded-for` to the real client IP.
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  const ip = forwarded.split(",")[0].trim() || req.headers.get("x-real-ip") || "";
  return NextResponse.json({ ip });
}
