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
  // Accepts either a direct file URL (…/tour.mp4, .webm) which renders in a
  // native <video> player, or an embed URL (YouTube/Vimeo/Cloudflare Stream)
  // which renders in an <iframe>.
  video?: string;
  // Optional extra photos for the detail modal; falls back to `image`.
  gallery?: string[];
};

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

export const rooms: Room[] = [
  {
    code: "EQ",
    name: "Executive 2 Queens",
    category: "room",
    beds: "2 Queen Beds",
    description:
      "An executive room with two queen beds and modern furnishings — comfortable space for families or colleagues traveling together.",
    features: ["Two queen beds", ...STANDARD],
    image: "/images/rooms/room-01.jpg",
    gallery: ["/images/rooms/room-01.jpg", "/images/gallery/gallery-05.jpg", "/images/gallery/gallery-07.jpg"],
  },
  {
    code: "DK",
    name: "Deluxe 1 King",
    category: "room",
    beds: "1 King Bed",
    description:
      "An oversized hotel room with a large, comfortable king bed and extra space — a relaxed base for business or leisure.",
    features: ["King bed", ...STANDARD],
    image: "/images/rooms/room-02.jpg",
    gallery: ["/images/rooms/room-02.jpg", "/images/gallery/gallery-08.jpg", "/images/gallery/gallery-09.jpg"],
  },
  {
    code: "EK",
    name: "Executive 1 King",
    category: "room",
    beds: "1 King Bed",
    description:
      "An executive king room with sleek, modern design and peaceful color tones — made for rest and relaxation.",
    features: ["King bed", ...STANDARD],
    image: "/images/rooms/room-03.jpg",
    gallery: ["/images/rooms/room-03.jpg", "/images/gallery/gallery-10.jpg", "/images/gallery/gallery-14.jpg"],
  },
  {
    code: "DQ",
    name: "Deluxe 2 Queens",
    category: "room",
    beds: "2 Queen Beds",
    description:
      "An oversized room with two queen beds and extra space for comfort during your stay in Silicon Valley.",
    features: ["Two queen beds", ...STANDARD],
    image: "/images/rooms/room-04.jpg",
    gallery: ["/images/rooms/room-04.jpg", "/images/gallery/gallery-15.jpg", "/images/gallery/gallery-16.jpg"],
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
    image: "/images/rooms/room-05.jpg",
    gallery: ["/images/rooms/room-05.jpg", "/images/gallery/gallery-17.jpg", "/images/gallery/gallery-06.jpg"],
  },
  {
    code: "FP",
    name: "Fireplace Parlor",
    category: "suite",
    beds: "1 King Bed",
    description:
      "A spacious parlor suite with a king bed and a cozy fireplace — our most inviting accommodation for a longer stay.",
    features: ["King bed", "Fireplace", "Separate parlor", ...STANDARD],
    image: "/images/rooms/room-06.jpg",
    gallery: ["/images/rooms/room-06.jpg", "/images/gallery/gallery-07.jpg", "/images/gallery/gallery-08.jpg"],
  },
  {
    code: "DS",
    name: "Deluxe Suite",
    category: "suite",
    beds: "1 King Bed",
    description:
      "A spacious king suite designed for comfort during extended stays, with room to work and unwind.",
    features: ["King bed", "Spacious suite", ...STANDARD],
    image: "/images/rooms/room-07.jpg",
    gallery: ["/images/rooms/room-07.jpg", "/images/gallery/gallery-09.jpg", "/images/gallery/gallery-05.jpg"],
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
    image: "/images/rooms/room-08.jpg",
    gallery: ["/images/rooms/room-08.jpg", "/images/gallery/gallery-10.jpg", "/images/gallery/gallery-14.jpg"],
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
    image: "/images/rooms/room-01.jpg",
    gallery: ["/images/rooms/room-01.jpg", "/images/gallery/gallery-15.jpg", "/images/gallery/gallery-16.jpg"],
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
    image: "/images/rooms/room-05.jpg",
    gallery: ["/images/rooms/room-05.jpg", "/images/gallery/gallery-17.jpg", "/images/gallery/gallery-06.jpg"],
  },
];

// No villas at the Cupertino Hotel — every accommodation is a guest room or
// suite, so the rooms page lists them all.
export const guestRooms = rooms;
