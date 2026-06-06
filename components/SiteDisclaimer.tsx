import { site } from "@/content/site";

// Site-wide service notice shown in a band directly under the (fixed, overlay)
// header on every page. The top padding clears the 80px fixed header so the
// text is never hidden behind it. Renders nothing when no disclaimer is set.
export default function SiteDisclaimer() {
  const text = site.disclaimer?.trim();
  if (!text) return null;

  return (
    <aside
      role="note"
      aria-label="Hotel service notice"
      className="relative z-30 border-b border-gold/30 bg-ink pb-6 pt-24 text-white"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Hotel Service Notice
        </p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-white/90">
          {text}
        </p>
      </div>
    </aside>
  );
}
