import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// On-demand cache invalidation. The admin calls this (with the shared secret)
// after publishing changes so edits appear on the site immediately instead of
// waiting for the 5-minute ISR window. Covers room content ("rooms") and the
// site-wide service notice ("site").
export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }
  revalidateTag("rooms");
  revalidateTag("site");
  return NextResponse.json({ revalidated: true, at: Date.now() });
}
