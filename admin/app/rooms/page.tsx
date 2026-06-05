import Link from "next/link";
import { getHotels, getRooms } from "@/lib/rooms";
import { isAdmin } from "@/lib/auth";
import NotAdmin from "@/components/NotAdmin";
import type { Room } from "@/lib/types";

// Always render at request time — the data lives in Supabase and changes via the
// admin, so we never want a stale prerender.
export const dynamic = "force-dynamic";

export default async function RoomsPage() {
  if (!(await isAdmin())) return <NotAdmin />;
  const [hotels, rooms] = await Promise.all([getHotels(), getRooms()]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">Rooms</h1>
        <p className="mt-1 text-sm text-ink/60">
          {rooms.length} rooms across {hotels.length} hotels. Video-frame covers
          arrive in the next phase.
        </p>
      </div>

      {hotels.map((hotel) => {
        const hotelRooms = rooms.filter((r) => r.hotel_id === hotel.id);
        return (
          <section key={hotel.id}>
            <div className="mb-3 flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <h2 className="text-lg font-semibold">{hotel.name}</h2>
                <span className="text-sm text-ink/50">
                  {hotelRooms.length} rooms
                </span>
              </div>
              <Link
                href="/rooms/new"
                className="rounded-lg bg-gold px-3 py-1.5 text-xs font-semibold text-white hover:bg-gold-dark"
              >
                + New room
              </Link>
            </div>
            <div className="overflow-hidden rounded-lg border border-ink/10 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-neutral-100 text-left text-xs uppercase tracking-wide text-ink/50">
                  <tr>
                    <th className="px-4 py-2 font-medium">Cover</th>
                    <th className="px-4 py-2 font-medium">Code</th>
                    <th className="px-4 py-2 font-medium">Name</th>
                    <th className="px-4 py-2 font-medium">Category</th>
                    <th className="px-4 py-2 font-medium">Beds</th>
                    <th className="px-4 py-2 font-medium">Flags</th>
                    <th className="px-4 py-2 font-medium">Video</th>
                    <th className="px-4 py-2 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {hotelRooms.map((room) => (
                    <RoomRow key={room.id} room={room} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function RoomRow({ room }: { room: Room }) {
  return (
    <tr className="border-t border-ink/5 align-middle">
      <td className="px-4 py-2">
        <Cover url={room.cover_image_url} alt={room.name} />
      </td>
      <td className="px-4 py-2">
        <span className="rounded bg-ink/5 px-2 py-0.5 font-mono text-xs">
          {room.code}
        </span>
      </td>
      <td className="px-4 py-2 font-medium">{room.name}</td>
      <td className="px-4 py-2 capitalize text-ink/70">{room.category}</td>
      <td className="px-4 py-2 text-ink/70">{room.beds}</td>
      <td className="px-4 py-2">
        <div className="flex gap-1">
          {room.accessible && <Tag>Accessible</Tag>}
          {room.pet_friendly && <Tag>Pet</Tag>}
          {!room.published && <Tag>Hidden</Tag>}
        </div>
      </td>
      <td className="px-4 py-2">
        {room.video_url ? (
          <a
            href={room.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-dark"
          >
            tour ↗
          </a>
        ) : (
          <span className="text-ink/30">—</span>
        )}
      </td>
      <td className="px-4 py-2 text-right">
        <Link
          href={`/rooms/${room.id}/edit`}
          className="font-medium text-gold hover:text-gold-dark"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}

// Cover thumbnail. Seeded covers are site-relative paths (resolve only on each
// public site); generated video-frame covers (Phase 2) are absolute Supabase
// Storage URLs and render here directly.
function Cover({ url, alt }: { url: string | null; alt: string }) {
  const isAbsolute = !!url && /^https?:\/\//.test(url);
  if (isAbsolute) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url!} alt={alt} className="h-10 w-16 rounded object-cover" />;
  }
  return (
    <div
      className="flex h-10 w-16 items-center justify-center rounded bg-ink/5 text-[9px] text-ink/40"
      title={url ?? "no cover"}
    >
      {url ? "site img" : "none"}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-gold/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold-dark">
      {children}
    </span>
  );
}
