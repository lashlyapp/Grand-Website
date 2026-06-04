import Image from "next/image";
import { bookingUrl } from "@/lib/booking";
import type { Room } from "@/content/rooms";

export default function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
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
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          {room.beds}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-ink">{room.name}</h3>
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
        <a
          href={bookingUrl({ room: room.code })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream"
        >
          Check Rates
        </a>
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
