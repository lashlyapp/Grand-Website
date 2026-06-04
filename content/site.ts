// Central source of truth for site-wide content. Editing happens here (and in
// rooms.ts) for now; a light CMS can be layered on later for specific sections.

export const site = {
  name: "The Grand Hotel",
  shortName: "The Grand Hotel",
  tagline: "A boutique business hotel in the heart of Silicon Valley",
  description:
    "The Grand Hotel is a welcoming haven for business and leisure travelers in Sunnyvale, California — minutes from San Jose International Airport and all major Silicon Valley freeways.",
  url: "https://www.svgrandhotel.com",
  parentCompany: "CG Hotel Group",
  copyrightYear: 2026,
  address: {
    street: "865 W. El Camino Real",
    city: "Sunnyvale",
    state: "CA",
    zip: "94087",
    country: "US",
    full: "865 W. El Camino Real, Sunnyvale, CA 94087",
    geo: { lat: 37.3686, lng: -122.0461 },
  },
  phone: {
    tollFree: "800-786-0827",
    local: "408-720-8500",
  },
  email: "info@cghotelgroup.com",
  // Booking is handled by RezTrip (Cendyn). We keep linking to it; the rebuild
  // changes the marketing site only, not the reservation flow.
  bookingBaseUrl: "https://svgrandhotel.reztrip.com/search",
  social: {
    facebook: "https://www.facebook.com/svgrandhotel",
    instagram: "https://instagram.com/grandsiliconvalley/",
    twitter: "https://www.twitter.com/svgrandhotel/",
    youtube: "https://www.youtube.com/channel/UCuVcDn1Jnj6NDOa38nPl-Vw",
    tripadvisor:
      "https://www.tripadvisor.com/Hotel_Review-g33146-d225415-Reviews-The_Grand_Hotel-Sunnyvale_California.html",
  },
} as const;

export type NavItem = { label: string; href: string };

// Primary navigation — paths mirror the existing site to preserve SEO.
export const mainNav: NavItem[] = [
  { label: "Rooms", href: "/rooms/" },
  { label: "Villas", href: "/villas/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Package", href: "/vidovich-vineyards/" },
  { label: "Events", href: "/events/" },
  { label: "Location", href: "/location/" },
  { label: "News", href: "/news/" },
  { label: "Contact", href: "/contacts/" },
];

export const footerNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Careers", href: "/careers/" },
  { label: "Accessibility Statement", href: "/accessibility/" },
];

export type Amenity = {
  title: string;
  description: string;
};

// Verbatim amenity details from the current site, lightly tidied.
export const amenities: Amenity[] = [
  {
    title: "Heated Pool",
    description: "Our heated outdoor pool is open daily from 7:00 am to 10:00 pm.",
  },
  {
    title: "Continental Breakfast",
    description:
      "Continental breakfast is served daily — 6:30 am to 10:00 am (Monday–Friday) and 7:00 am to 10:30 am (Saturday & Sunday).",
  },
  {
    title: "Happy Hour",
    description:
      "Happy hour (drinks only) is available daily from 5:00 pm to 6:00 pm, with a maximum of two complimentary drinks per person.",
  },
  {
    title: "High-Speed Internet",
    description: "Complimentary high-speed Wi-Fi throughout the property.",
  },
  {
    title: "24-Hour Room Service",
    description: "In-room dining and service available around the clock.",
  },
  {
    title: "Fitness On Site",
    description: "An on-site fitness room to keep your routine going while you travel.",
  },
  {
    title: "Pet Friendly",
    description:
      "Traveling with a companion? Ask about our pet policy and pet-friendly villas.",
  },
  {
    title: "DoorDash at the Front Desk",
    description: "Have a meal delivered and picked up conveniently at the front desk.",
  },
];
