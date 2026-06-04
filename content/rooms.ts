// Room & villa data. The `code` matches the RezTrip booking-engine deep-link
// (?selected_room=CODE) so "Book" buttons land on the right rate.

export type Room = {
  code: string;
  name: string;
  category: "room" | "villa" | "suite";
  beds: string;
  description: string;
  features: string[];
  accessible?: boolean;
  petFriendly?: boolean;
  image: string;
};

export const rooms: Room[] = [
  {
    code: "DK",
    name: "Deluxe King",
    category: "room",
    beds: "1 King Bed",
    description:
      "An oversized hotel room with a large, comfortable king bed — a relaxed, well-appointed base for your stay.",
    features: ["King bed", "Granite bathroom", "LCD TV", "iHome docking station", "Mini-fridge"],
    image: "/images/suites.jpg",
  },
  {
    code: "SK",
    name: "Superior King",
    category: "room",
    beds: "1 King Bed",
    description:
      "Our superior king room adds a touch of indulgence with premium finishes and extra space to unwind.",
    features: ["King bed", "Jacuzzi tub", "Walk-in shower", "Granite countertops", "LCD TV"],
    image: "/images/suites.jpg",
  },
  {
    code: "DQ",
    name: "Deluxe Two Queens",
    category: "room",
    beds: "2 Queen Beds",
    description:
      "Two queen beds and extra space make this a comfortable setting for families or colleagues traveling together.",
    features: ["Two queen beds", "Soaking tub", "Granite bathroom", "LCD TV", "Mini-fridge"],
    image: "/images/about_2.jpg",
  },
  {
    code: "SQ",
    name: "Superior Two Queens",
    category: "room",
    beds: "2 Queen Beds",
    description:
      "A superior take on our two-queen room, with elevated amenities and a spa-style bathroom.",
    features: ["Two queen beds", "Jacuzzi tub", "Walk-in shower", "Granite countertops"],
    image: "/images/about_2.jpg",
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
    image: "/images/about_1.jpg",
  },
  {
    code: "VK",
    name: "Villa King",
    category: "villa",
    beds: "1 King Bed",
    description:
      "A private villa with a separate bedroom and living room, fireplace, and kitchen — a home away from home.",
    features: ["King bed", "Separate living room", "Fireplace", "Full kitchen"],
    image: "/images/heated-pool.jpg",
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
    image: "/images/heated-pool.jpg",
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
    image: "/images/heated-pool.jpg",
  },
  {
    code: "VQ",
    name: "Villa Two Queens",
    category: "villa",
    beds: "2 Queen Beds",
    description:
      "A private villa with two queen beds, fireplace, kitchen, and a comfortable living area.",
    features: ["Two queen beds", "Separate living room", "Fireplace", "Full kitchen"],
    image: "/images/heated-pool.jpg",
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
    image: "/images/heated-pool.jpg",
  },
  {
    code: "FP",
    name: "Premier Fireplace Suite",
    category: "suite",
    beds: "1 King Bed",
    description:
      "A spacious fireplace suite with a king bed and a separate living room — our most generous accommodation.",
    features: ["King bed", "Separate living room", "Fireplace", "Spacious suite"],
    image: "/images/suites.jpg",
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
    image: "/images/suites.jpg",
  },
];

export const guestRooms = rooms.filter((r) => r.category !== "villa");
export const villas = rooms.filter((r) => r.category === "villa");
