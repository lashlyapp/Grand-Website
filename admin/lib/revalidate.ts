// After a room change, ping each public site's /api/revalidate so the edit
// shows up immediately (instead of waiting for their 5-minute ISR window).
// Best-effort: if a target or the secret isn't configured, we simply skip it —
// the sites still pick up changes on their next revalidation.
export async function revalidatePublicSites() {
  const secret = process.env.REVALIDATE_SECRET;
  const targets = [
    process.env.GRAND_REVALIDATE_URL,
    process.env.CUPERTINO_REVALIDATE_URL,
  ].filter(Boolean) as string[];

  if (!secret || targets.length === 0) return;

  await Promise.allSettled(
    targets.map((base) =>
      fetch(`${base}?secret=${encodeURIComponent(secret)}`, {
        method: "POST",
        cache: "no-store",
      }),
    ),
  );
}
