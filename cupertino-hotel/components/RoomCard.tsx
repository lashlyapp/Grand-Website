import Image from "next/image";
import BookingButton from "./BookingButton";
import RoomDetailButton from "./RoomDetailButton";
import { formatRate, type Room } from "@/content/rooms";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-lg">
      {/* Image opens the detail / virtual-tour modal */}
      <RoomDetailButton
        room={room}
        className="relative block aspect-[4/3] w-full overflow-hidden text-left"
      >
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {room.accessible && <Badge>Accessible</Badge>}
          {room.petFriendly && <Badge>Pet Friendly</Badge>}
        </div>
        {room.video && (
          <>
            <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/20" />
            <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white">
              <PlayIcon /> Virtual Tour
            </span>
          </>
        )}
      </RoomDetailButton>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          {room.beds}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-ink">{room.name}</h3>
        {room.rate !== undefined && (
          <div className="mt-4 flex items-baseline justify-between border-y border-ink/10 py-2.5">
            <span className="text-xs font-semibold uppercase tracking-widest text-ink/50">
              Tonight&apos;s Rate
            </span>
            {room.rate !== null ? (
              <span className="font-serif text-2xl text-gold-dark">{formatRate(room.rate)}</span>
            ) : (
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Check Availability
              </span>
            )}
          </div>
        )}
        <p className="mt-3 text-sm leading-relaxed text-ink/70">{room.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {room.features.slice(0, 4).map((f) => (
            <li
              key={f}
              className="rounded-full bg-sand px-3 py-1 text-xs text-ink/70"
            >
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex-1" />
        <div className="flex gap-3">
          <RoomDetailButton
            room={room}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            View Details
          </RoomDetailButton>
          <BookingButton
            params={{ room: room.code }}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-gold-dark"
          >
            Book
          </BookingButton>
        </div>
      </div>
    </article>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur">
      {children}
    </span>
  );
}

function PlayIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
      <path d="M2 1.5v9l8-4.5-8-4.5z" />
    </svg>
  );
}
