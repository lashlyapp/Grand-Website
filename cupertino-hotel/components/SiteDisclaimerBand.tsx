"use client";

import { usePathname } from "next/navigation";

// In-flow service-notice band shown under the fixed header on every page EXCEPT
// the homepage. The homepage renders its own translucent copy of this notice as
// an overlay on top of the hero image (so the hero runs full-bleed to the top of
// the screen), so the in-flow band is suppressed there to avoid showing it twice.
export default function SiteDisclaimerBand({ text }: { text: string }) {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <aside
      role="region"
      aria-label="Hotel service notice"
      className="relative z-30 border-b border-gold/30 bg-ink pb-3 pt-[84px] text-white"
    >
      <div className="w-full px-5 sm:px-8">
        <p className="text-xs leading-relaxed text-white/80">{text}</p>
      </div>
    </aside>
  );
}
