import { getDisclaimer } from "@/lib/site-data";
import SiteDisclaimerBand from "./SiteDisclaimerBand";

// Site-wide service notice. The text is managed from the admin Settings page
// (live via Supabase, with the static content/site.ts value as fallback) and
// rendered as an in-flow band under the header on inner pages. The homepage
// shows it as a translucent overlay on the hero instead (see app/page.tsx), so
// the band component hides itself there. Renders nothing when no notice is set.
export default async function SiteDisclaimer() {
  const text = (await getDisclaimer()).trim();
  if (!text) return null;

  return <SiteDisclaimerBand text={text} />;
}
