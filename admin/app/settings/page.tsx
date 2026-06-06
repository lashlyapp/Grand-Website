import { getHotels } from "@/lib/rooms";
import { isAdmin } from "@/lib/auth";
import NotAdmin from "@/components/NotAdmin";
import { updateHotelDisclaimer } from "./actions";

// Always render at request time — the data lives in Supabase and changes via the
// admin, so we never want a stale prerender.
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  if (!(await isAdmin())) return <NotAdmin />;
  const hotels = await getHotels();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-ink/60">
          Site-wide service notice shown in a band under the header on each
          hotel&rsquo;s public site. It supersedes other information on the site.
          Leave blank to hide the banner. Saving refreshes the live site.
        </p>
      </div>

      {hotels.map((hotel) => {
        const save = updateHotelDisclaimer.bind(null, hotel.id);
        return (
          <section
            key={hotel.id}
            className="rounded-lg border border-ink/10 bg-white p-5"
          >
            <h2 className="text-lg font-semibold">{hotel.name}</h2>
            <form action={save} className="mt-3 space-y-3">
              <label className="block">
                <span className="text-sm font-medium text-ink/70">
                  Service notice
                </span>
                <textarea
                  name="disclaimer"
                  defaultValue={hotel.disclaimer}
                  rows={5}
                  placeholder="Leave blank to hide the banner"
                  className="mt-1 w-full rounded-lg border border-ink/15 p-3 text-sm leading-relaxed"
                />
              </label>
              <button className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white hover:bg-gold-dark">
                Save notice
              </button>
            </form>
          </section>
        );
      })}
    </div>
  );
}
