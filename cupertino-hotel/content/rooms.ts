// Room & suite data. The `code` matches the RezTrip booking-engine deep-link
// (?selected_room=CODE) so "Book" buttons land on the right rate. Codes are
// taken verbatim from the current Cupertino Hotel site's booking links.

export type Room = {
  code: string;
  name: string;
  category: "room" | "suite";
  beds: string;
  description: string;
  features: string[];
  accessible?: boolean;
  petFriendly?: boolean;
  image: string;
  // Optional per-room "virtual tour" video shown in the room detail modal.
  // Direct .mp4 URLs render in a native <video> player. These stream from the
  // hotel's MyHotelOps (Cloudflare R2) CDN — the same source the current site
  // uses — so the large video files are not committed to the repo.
  video?: string;
  // Optional extra photos for the detail modal; falls back to `image`.
  gallery?: string[];
  // Optional nightly "Tonight's Rate" (USD) shown on the room card and detail
  // modal. Managed via the admin (rooms.rate_tonight); omitted hides the rate.
  rate?: number;
};

// "$279" / "$279.50" — whole dollars unless the rate carries cents.
export function formatRate(rate: number): string {
  return `$${rate.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: Number.isInteger(rate) ? 0 : 2,
  })}`;
}

// Every room features air conditioning, granite countertops, dual vanity
// mirrors, an LCD TV, an iHome docking station, a mini-fridge, plush robes,
// and complimentary Wi-Fi. All rooms are non-smoking.
const STANDARD = [
  "Granite countertops",
  "Dual vanity mirrors",
  "LCD TV",
  "iHome docking station",
  "Mini-fridge",
  "Plush robes",
  "Free Wi-Fi",
];

// Real Cupertino tour videos, streamed from the MyHotelOps CDN (kept as-is —
// the videos are not locked into Cendyn). The property exposes four room tours;
// each booking room maps to the closest one. Poster stills (.jpg) are
// self-hosted in public/images/rooms (see scripts/extract-assets.mjs).
const MHO =
  "https://cdn.myhotelops.com/cg-hotel-group/cupertino-hotel/8583.11604.cupertino.cupertino-hotel";
const tour = {
  deluxeRoom: `${MHO}.room.deluxe-room.mp4`,
  execKing: `${MHO}.room.executive-suite-king.mp4`,
  execQueen: `${MHO}.room.executive-suite-queen.mp4`,
  fireplace: `${MHO}.room.fireplace-parlor.mp4`,
} as const;

// Real property gallery photos (TravelTripper library) used as supporting shots.
const G = (n: string) => `/images/gallery/${n}.jpg`;

export const rooms: Room[] = [
  {
    code: "EQ",
    name: "Executive 2 Queens",
    category: "room",
    beds: "2 Queen Beds",
    description:
      "An executive room with two queen beds and modern furnishings — comfortable space for families or colleagues traveling together.",
    features: ["Two queen beds", ...STANDARD],
    image: "/images/rooms/executive-suite-queen.jpg",
    video: tour.execQueen,
    gallery: ["/images/rooms/executive-suite-queen.jpg", G("c-01"), G("c-02")],
  },
  {
    code: "DK",
    name: "Deluxe 1 King",
    category: "room",
    beds: "1 King Bed",
    description:
      "An oversized hotel room with a large, comfortable king bed and extra space — a relaxed base for business or leisure.",
    features: ["King bed", ...STANDARD],
    image: "/images/rooms/deluxe-room.jpg",
    video: tour.deluxeRoom,
    gallery: ["/images/rooms/deluxe-room.jpg", G("c-03"), "/images/lobby.jpg"],
  },
  {
    code: "EK",
    name: "Executive 1 King",
    category: "room",
    beds: "1 King Bed",
    description:
      "An executive king room with sleek, modern design and peaceful color tones — made for rest and relaxation.",
    features: ["King bed", ...STANDARD],
    image: "/images/rooms/executive-suite-king.jpg",
    video: tour.execKing,
    gallery: ["/images/rooms/executive-suite-king.jpg", G("c-04"), G("c-05")],
  },
  {
    code: "DQ",
    name: "Deluxe 2 Queens",
    category: "room",
    beds: "2 Queen Beds",
    description:
      "An oversized room with two queen beds and extra space for comfort during your stay in Silicon Valley.",
    features: ["Two queen beds", ...STANDARD],
    image: "/images/rooms/deluxe-room.jpg",
    video: tour.deluxeRoom,
    gallery: ["/images/rooms/deluxe-room.jpg", G("c-06"), G("c-07")],
  },
  {
    code: "QH",
    name: "2 Queens — Accessible",
    category: "room",
    beds: "2 Queen Beds",
    description:
      "A deluxe room with two queen beds and ADA-accessible accommodations and bathroom amenities.",
    features: ["Two queen beds", "Accessible bathroom", ...STANDARD],
    accessible: true,
    image: "/images/rooms/executive-suite-queen.jpg",
    video: tour.execQueen,
    gallery: ["/images/rooms/executive-suite-queen.jpg", G("c-08"), G("c-09")],
  },
  {
    code: "FP",
    name: "Fireplace Parlor",
    category: "suite",
    beds: "1 King Bed",
    description:
      "A spacious parlor suite with a king bed and a cozy fireplace — our most inviting accommodation for a longer stay.",
    features: ["King bed", "Fireplace", "Separate parlor", ...STANDARD],
    image: "/images/rooms/fireplace-parlor.jpg",
    video: tour.fireplace,
    gallery: ["/images/rooms/fireplace-parlor.jpg", G("c-01"), G("c-03")],
  },
  {
    code: "DS",
    name: "Deluxe Suite",
    category: "suite",
    beds: "1 King Bed",
    description:
      "A spacious king suite designed for comfort during extended stays, with room to work and unwind.",
    features: ["King bed", "Spacious suite", ...STANDARD],
    image: "/images/rooms/executive-suite-king.jpg",
    video: tour.execKing,
    gallery: ["/images/rooms/executive-suite-king.jpg", "/images/overview.jpg", G("c-05")],
  },
  {
    code: "PK",
    name: "Pet Suite King",
    category: "suite",
    beds: "1 King Bed",
    description:
      "A pet-friendly king suite that welcomes your furry companion — dogs under 50 lbs, one per room, with a $35/day cleaning fee.",
    features: ["King bed", "Pet friendly", "Spacious suite", ...STANDARD],
    petFriendly: true,
    image: "/images/rooms/executive-suite-king.jpg",
    video: tour.execKing,
    gallery: ["/images/rooms/executive-suite-king.jpg", G("c-06"), G("c-08")],
  },
  {
    code: "PQ",
    name: "Pet Two Queens",
    category: "suite",
    beds: "2 Queen Beds",
    description:
      "A pet-friendly suite with two queen beds for guests traveling with pets — dogs under 50 lbs, one per room, with a $35/day cleaning fee.",
    features: ["Two queen beds", "Pet friendly", ...STANDARD],
    petFriendly: true,
    image: "/images/rooms/executive-suite-queen.jpg",
    video: tour.execQueen,
    gallery: ["/images/rooms/executive-suite-queen.jpg", G("c-02"), G("c-09")],
  },
  {
    code: "KH",
    name: "1 King — Accessible",
    category: "room",
    beds: "1 King Bed",
    description:
      "An oversized deluxe king room with ADA-accessible features and a full suite of bathroom amenities.",
    features: ["King bed", "Accessible bathroom", ...STANDARD],
    accessible: true,
    image: "/images/rooms/deluxe-room.jpg",
    video: tour.deluxeRoom,
    gallery: ["/images/rooms/deluxe-room.jpg", G("c-04"), "/images/lobby.jpg"],
  },
];

// No villas at the Cupertino Hotel — every accommodation is a guest room or
// suite, so the rooms page lists them all.
export const guestRooms = rooms;
