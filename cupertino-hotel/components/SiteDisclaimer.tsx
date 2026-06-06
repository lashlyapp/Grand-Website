import { getDisclaimer } from "@/lib/site-data";

// Site-wide service notice shown in a band directly under the (fixed, overlay)
// header on every page. The text is managed from the admin Settings page (live
// via Supabase, with the static content/site.ts value as fallback). The top
// padding clears the 80px fixed header so the text is never hidden behind it.
// Renders nothing when no disclaimer is set.
export default async function SiteDisclaimer() {
  const text = (await getDisclaimer()).trim();
  if (!text) return null;

  return (
    <aside
      role="region"
      aria-label="Hotel service notice"
      className="relative z-30 border-b border-gold/30 bg-ink pb-6 pt-24 text-white"
    >
      <div className="w-full px-5 sm:px-8">
        <p className="text-xs leading-relaxed text-white/80">
          {text}
        </p>
      </div>
    </aside>
  );
}
