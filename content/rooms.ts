// Room & villa data. The `code` matches the RezTrip booking-engine deep-link
// (?selected_room=CODE) so "Book" buttons land on the right rate.

export type Room = {
  code: string;
  name: string;
  category: "room" | "villa" | "suite" | "annex";
  beds: string;
  description: string;
  features: string[];
  accessible?: boolean;
  petFriendly?: boolean;
  image: string;
  // Optional per-room "virtual tour" video shown in the room detail modal.
  // Accepts either a direct file URL (…/tour.mp4, .webm) which renders in a
  // native <video> player, or an embed URL (YouTube/Vimeo/Cloudflare Stream)
  // which renders in an <iframe>. These point at the existing MyHotelOps
  // (Cloudflare) CDN — the same source the current site uses — so the large
  // video files are streamed, not committed to the repo. Mapping is approximate
  // for review; swap individual URLs to fine-tune which tour plays per room.
  video?: string;
  // Optional extra photos for the detail modal; falls back to `image`.
  gallery?: string[];
  // Live "Tonight's Rate" (USD): the booking engine's lowest nightly price for
  // a stay tonight, joined onto the room in lib/rooms-data.ts (see
  // lib/rates.ts). `null` = no price tonight (sold out / closed out) and the
  // UI shows "Check Availability"; omitted (feed unavailable) hides the row.
  rate?: number | null;
};

// "$279" / "$279.50" — whole dollars unless the rate carries cents.
export function formatRate(rate: number): string {
  return `$${rate.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: Number.isInteger(rate) ? 0 : 2,
  })}`;
}

// Virtual-tour videos served from the MyHotelOps Cloudflare CDN (kept as-is per
// the migration plan — videos are not locked into Cendyn).
const CDN = "https://cdn.myhotelops.com/cg-hotel-group/grand-hotel";
const tour = {
  deluxeKing: `${CDN}/8582.11603.sunnyvale.grand-hotel-sunnyvale.room.deluxe-standard-king.mp4`,
  deluxeRoom: `${CDN}/8582.11603.sunnyvale.grand-hotel-sunnyvale.room.deluxe-standard-room.mp4`,
  villaKing: `${CDN}/8582.11603.sunnyvale.grand-hotel-sunnyvale.room.villa-1-king.mp4`,
  villaQueen: `${CDN}/8582.11603.sunnyvale.grand-hotel-sunnyvale.room.villa-2-queen.mp4`,
  fireplaceSuite: `${CDN}/Grand---Fireplace-Suite-King-standard-and-handicap.mp4`,
} as const;

export const rooms: Room[] = [
  {
    code: "DK",
    name: "Deluxe King",
    category: "room",
    beds: "1 King Bed",
    description:
      "An oversized hotel room with a large, comfortable king bed — a relaxed, well-appointed base for your stay.",
    features: ["King bed", "Granite bathroom", "LCD TV", "iHome docking station", "Mini-fridge"],
    image: "/images/rooms/frame-deluxe-king.jpg",
    video: tour.deluxeKing,
    gallery: ["/images/rooms/tour-deluxe-king.jpg", "/images/rooms/room-01.jpg", "/images/gallery/gallery-05.jpg"],
  },
  {
    code: "SK",
    name: "Superior King",
    category: "room",
    beds: "1 King Bed",
    description:
      "Our superior king room adds a touch of indulgence with premium finishes and extra space to unwind.",
    features: ["King bed", "Jacuzzi tub", "Walk-in shower", "Granite countertops", "LCD TV"],
    image: "/images/rooms/frame-deluxe-king.jpg",
    video: tour.deluxeKing,
    gallery: ["/images/rooms/room-02.jpg", "/images/gallery/gallery-07.jpg", "/images/gallery/gallery-08.jpg"],
  },
  {
    code: "DQ",
    name: "Deluxe Two Queens",
    category: "room",
    beds: "2 Queen Beds",
    description:
      "Two queen beds and extra space make this a comfortable setting for families or colleagues traveling together.",
    features: ["Two queen beds", "Soaking tub", "Granite bathroom", "LCD TV", "Mini-fridge"],
    image: "/images/rooms/frame-deluxe-room.jpg",
    video: tour.deluxeRoom,
    gallery: ["/images/rooms/tour-deluxe-room.jpg", "/images/rooms/room-03.jpg", "/images/gallery/gallery-09.jpg"],
  },
  {
    code: "SQ",
    name: "Superior Two Queens",
    category: "room",
    beds: "2 Queen Beds",
    description:
      "A superior take on our two-queen room, with elevated amenities and a spa-style bathroom.",
    features: ["Two queen beds", "Jacuzzi tub", "Walk-in shower", "Granite countertops"],
    image: "/images/rooms/frame-deluxe-room.jpg",
    video: tour.deluxeRoom,
    gallery: ["/images/rooms/room-04.jpg", "/images/gallery/gallery-14.jpg", "/images/gallery/gallery-15.jpg"],
  },
  {
    code: "QH",
    name: "Two Queens — Accessible",
    category: "room",
    beds: "2 Queen Beds",
    description:
      "An ADA-accessible deluxe room with two queen beds and a full suite of bathroom amenities.",
    features: ["Two queen beds", "Accessible bathroom", "Soaking tub", "LCD TV"],
    accessible: true,
    image: "/images/rooms/frame-deluxe-room.jpg",
    video: tour.deluxeRoom,
    gallery: ["/images/rooms/room-05.jpg", "/images/gallery/gallery-16.jpg", "/images/gallery/gallery-17.jpg"],
  },
  {
    code: "ADK",
    name: "Annex Deluxe King",
    category: "annex",
    beds: "1 King Bed",
    description:
      "An oversized deluxe room in our newly constructed Annex with a king bed, floor-to-ceiling windows, and direct access to the hotel gym.",
    features: [
      "King bed",
      "Floor-to-ceiling windows",
      "Direct gym access",
      "Soaking tub",
      "Granite countertops",
      "Air conditioning",
    ],
    image: "/images/rooms/tour-deluxe-king.jpg",
    gallery: ["/images/rooms/tour-deluxe-king.jpg", "/images/rooms/room-01.jpg"],
  },
  {
    code: "ADQ",
    name: "Annex Deluxe Two Queens",
    category: "annex",
    beds: "2 Queen Beds",
    description:
      "An oversized deluxe room in our newly constructed Annex with two queen beds, floor-to-ceiling windows, and direct access to the hotel gym.",
    features: [
      "Two queen beds",
      "Floor-to-ceiling windows",
      "Direct gym access",
      "Soaking tub",
      "Granite countertops",
      "Air conditioning",
    ],
    image: "/images/rooms/tour-deluxe-room.jpg",
    gallery: ["/images/rooms/tour-deluxe-room.jpg", "/images/rooms/room-03.jpg"],
  },
  {
    code: "ADQH",
    name: "Annex Deluxe Two Queens — Accessible",
    category: "annex",
    beds: "2 Queen Beds",
    description:
      "An ADA-accessible deluxe room in our newly constructed Annex with two queen beds, floor-to-ceiling windows, and direct access to the hotel gym.",
    features: [
      "Two queen beds",
      "Accessible bathroom",
      "Floor-to-ceiling windows",
      "Direct gym access",
    ],
    accessible: true,
    image: "/images/rooms/tour-deluxe-room.jpg",
    gallery: ["/images/rooms/tour-deluxe-room.jpg", "/images/rooms/room-05.jpg"],
  },
  {
    code: "VK",
    name: "Villa King",
    category: "villa",
    beds: "1 King Bed",
    description:
      "A private villa with a separate bedroom and living room, fireplace, and kitchen — a home away from home.",
    features: ["King bed", "Separate living room", "Fireplace", "Full kitchen"],
    image: "/images/rooms/frame-villa-king.jpg",
    video: tour.villaKing,
    gallery: ["/images/rooms/tour-villa-king.jpg", "/images/rooms/room-06.jpg", "/images/gallery/gallery-08.jpg"],
  },
  {
    code: "PK",
    name: "Pet Villa King",
    category: "villa",
    beds: "1 King Bed",
    description:
      "A pet-friendly villa in peaceful color tones with chic decor, fireplace, and a full kitchen.",
    features: ["King bed", "Pet friendly", "Fireplace", "Full kitchen"],
    petFriendly: true,
    image: "/images/rooms/frame-villa-king.jpg",
    video: tour.villaKing,
    gallery: ["/images/rooms/room-07.jpg", "/images/gallery/gallery-06.jpg", "/images/gallery/gallery-09.jpg"],
  },
  {
    code: "VH",
    name: "Villa King — Accessible",
    category: "villa",
    beds: "1 King Bed",
    description:
      "An ADA-accessible private villa with a separate bedroom, fireplace, and full kitchen.",
    features: ["King bed", "Accessible layout", "Fireplace", "Full kitchen"],
    accessible: true,
    image: "/images/rooms/frame-villa-king.jpg",
    video: tour.villaKing,
    gallery: ["/images/rooms/room-08.jpg", "/images/gallery/gallery-07.jpg", "/images/gallery/gallery-10.jpg"],
  },
  {
    code: "VQ",
    name: "Villa Two Queens",
    category: "villa",
    beds: "2 Queen Beds",
    description:
      "A private villa with two queen beds, fireplace, kitchen, and a comfortable living area.",
    features: ["Two queen beds", "Separate living room", "Fireplace", "Full kitchen"],
    image: "/images/rooms/frame-villa-queen.jpg",
    video: tour.villaQueen,
    gallery: ["/images/rooms/tour-villa-queen.jpg", "/images/gallery/gallery-14.jpg", "/images/gallery/gallery-16.jpg"],
  },
  {
    code: "PQ",
    name: "Pet Villa Two Queens",
    category: "villa",
    beds: "2 Queen Beds",
    description:
      "A pet-friendly villa with two queen beds and sleek, modern decor, fireplace, and a full kitchen.",
    features: ["Two queen beds", "Pet friendly", "Fireplace", "Full kitchen"],
    petFriendly: true,
    image: "/images/rooms/frame-villa-queen.jpg",
    video: tour.villaQueen,
    gallery: ["/images/rooms/room-02.jpg", "/images/gallery/gallery-15.jpg", "/images/gallery/gallery-17.jpg"],
  },
  {
    code: "FP",
    name: "Premier Fireplace Suite",
    category: "suite",
    beds: "1 King Bed",
    description:
      "A spacious fireplace suite with a king bed and a separate living room — our most generous accommodation.",
    features: ["King bed", "Separate living room", "Fireplace", "Spacious suite"],
    image: "/images/rooms/frame-fireplace-suite.jpg",
    video: tour.fireplaceSuite,
    gallery: ["/images/rooms/room-03.jpg", "/images/gallery/gallery-05.jpg", "/images/gallery/gallery-07.jpg"],
  },
  {
    code: "HS",
    name: "Premier Fireplace Suite — Accessible",
    category: "suite",
    beds: "1 King Bed",
    description:
      "An ADA-accessible premier fireplace suite with a king bed and separate living area.",
    features: ["King bed", "Accessible layout", "Separate living area", "Fireplace"],
    accessible: true,
    image: "/images/rooms/frame-fireplace-suite.jpg",
    video: tour.fireplaceSuite,
    gallery: ["/images/rooms/room-04.jpg", "/images/gallery/gallery-06.jpg", "/images/gallery/gallery-08.jpg"],
  },
];

export const guestRooms = rooms.filter(
  (r) => r.category !== "villa" && r.category !== "annex",
);
export const villas = rooms.filter((r) => r.category === "villa");
export const annexRooms = rooms.filter((r) => r.category === "annex");
