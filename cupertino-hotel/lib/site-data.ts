import { site } from "@/content/site";

// Reads the site-wide service notice (disclaimer) from the shared Supabase
// project (managed via the admin Settings page), falling back to the static
// content/site.ts value whenever Supabase is unconfigured, unreachable, or has
// no row — so the banner can never break on a data issue.
//
// A successfully fetched row is used verbatim, including an empty string: that
// is how an admin intentionally hides the banner. ISR-cached and refreshed via
// the "site" tag when the admin saves (see app/api/revalidate).
const HOTEL_ID = "cupertino";

export async function getDisclaimer(): Promise<string> {
  const fallback = site.disclaimer ?? "";
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return fallback;

  try {
    const endpoint = `${url}/rest/v1/hotels?id=eq.${HOTEL_ID}&select=disclaimer`;
    const res = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 300, tags: ["site"] },
    });
    if (!res.ok) return fallback;
    const rows = (await res.json()) as { disclaimer: string | null }[];
    if (!Array.isArray(rows) || rows.length === 0) return fallback;
    const value = rows[0]?.disclaimer;
    return typeof value === "string" ? value : fallback;
  } catch {
    return fallback;
  }
}
