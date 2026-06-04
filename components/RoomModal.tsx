"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRoomDetail } from "./RoomDetailProvider";
import { useBooking } from "./BookingProvider";

function isVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url);
}

// Room detail modal with a "virtual tour" video. Opens from any room card and
// shows the full room details, the tour video (native player for direct files,
// iframe for embeds), a small photo gallery, and a Book button that hands off
// to the slide-out booking drawer pre-set to this room.
export default function RoomModal() {
  const { room, closeRoom } = useRoomDetail();
  const { openBooking } = useBooking();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const open = room !== null;

  // Reset the chosen gallery image whenever a new room opens.
  useEffect(() => {
    setActiveImage(null);
  }, [room?.code]);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRoom();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeRoom]);

  if (!room) return null;

  const gallery = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];
  const poster = activeImage ?? room.image;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${room.name} details`}
      onClick={closeRoom}
    >
      <div
        className="relative my-4 w-full max-w-4xl overflow-hidden rounded-2xl bg-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeRoom}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-xl leading-none text-white transition-colors hover:bg-ink"
        >
          ✕
        </button>

        {/* Virtual tour / media */}
        <div className="relative aspect-video w-full bg-ink">
          {room.video ? (
            isVideoFile(room.video) ? (
              <video
                key={room.video}
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster={room.image}
              >
                <source src={room.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                key={room.video}
                src={room.video}
                title={`${room.name} virtual tour`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            )
          ) : (
            <Image src={poster} alt={room.name} fill className="object-cover" sizes="100vw" />
          )}
          {room.video && (
            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white">
              Virtual Tour
            </span>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            {room.beds}
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink">{room.name}</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {room.accessible && <Tag>Accessible</Tag>}
            {room.petFriendly && <Tag>Pet Friendly</Tag>}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink/75">{room.description}</p>

          <h3 className="mt-6 text-xs font-semibold uppercase tracking-widest text-ink/50">
            Room features
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {room.features.map((f) => (
              <li key={f} className="rounded-full bg-sand px-3 py-1 text-xs text-ink/70">
                {f}
              </li>
            ))}
          </ul>

          {/* Photo gallery thumbnails (also swaps the still shown when no video) */}
          {gallery.length > 1 && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              {gallery.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={`relative aspect-[4/3] overflow-hidden rounded-lg ring-2 transition ${
                    poster === src ? "ring-gold" : "ring-transparent hover:ring-ink/20"
                  }`}
                  aria-label="View photo"
                >
                  <Image
                    src={src}
                    alt={`${room.name} photo`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 30vw, 33vw"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                closeRoom();
                openBooking({ room: room.code });
              }}
              className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gold-dark"
            >
              Book This Room
            </button>
            <button
              type="button"
              onClick={closeRoom}
              className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3 text-sm font-medium uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
      {children}
    </span>
  );
}
