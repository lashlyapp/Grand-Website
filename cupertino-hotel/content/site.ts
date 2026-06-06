// Central source of truth for site-wide content. Editing happens here (and in
// rooms.ts) for now; a light CMS can be layered on later for specific sections.
//
// Content is a faithful recreation of the current Cupertino Hotel marketing
// site (cupertino-hotel.com), rebuilt on a modern, self-hosted stack.

export const site = {
  name: "The Cupertino Hotel",
  shortName: "Cupertino Hotel",
  tagline: "A welcoming haven for business travelers in the heart of Silicon Valley",
  description:
    "The Cupertino Hotel offers value and an unbeatable location in the heart of Silicon Valley — directly across from Apple Park, at the intersection of Highway 280 and De Anza Boulevard.",
  url: "https://www.cupertino-hotel.com",
  parentCompany: "CG Hotel Group",
  copyrightYear: 2026,
  address: {
    street: "10889 N. De Anza Boulevard",
    city: "Cupertino",
    state: "CA",
    zip: "95014",
    country: "US",
    full: "10889 N. De Anza Boulevard, Cupertino, CA 95014",
    geo: { lat: 37.335358, lng: -122.033244 },
  },
  phone: {
    tollFree: "800-222-4828",
    local: "408-996-7700",
    fax: "408-257-0578",
  },
  email: "info@cghotelgroup.com",
  // Booking is handled by RezTrip (Cendyn). We keep linking to it; the rebuild
  // changes the marketing site only, not the reservation flow.
  bookingBaseUrl: "https://cupertinohotel.reztrip.com/search",
  // Shown on room listings and in the room detail / virtual-tour modal.
  roomMediaDisclaimer:
    "Photos are for illustration only. Actual rooms may differ in furnishings, layout, view, and finishes.",
  // Site-wide service notice rendered in a band under the header on every page.
  // Set to an empty string to hide the banner. This statement is intended to
  // supersede other (possibly outdated) information elsewhere on the site.
  disclaimer:
    "This notice reflects current hotel operations and supersedes all other information on this website. Continental breakfast is served daily, 6:30–10 AM (Mon–Fri) and 7–10:30 AM (Sat–Sun). Happy hour is daily, 5–6 PM (drinks only, up to two complimentary per guest). The pool is open 7 AM–10 PM. DoorDash deliveries may be received at the front desk. Room service and the hotel shuttle are not currently operating.",
  // Guest-review ratings featured in the hero. MOCKED for now — these are
  // placeholder numbers. Later, swap this static data for a live feed from
  // SerpAPI (Google + TripAdvisor) via a cached server route; the HeroReviews
  // component only needs { rating, count, url } so the data source can change
  // without touching the UI.
  reviews: {
    google: {
      rating: 4.2,
      count: 900,
      url: "https://www.google.com/maps/search/The+Cupertino+Hotel+Cupertino+CA",
    },
    tripadvisor: {
      rating: 4.0,
      count: 400,
      url: "https://www.tripadvisor.com/Search?q=Cupertino%20Hotel%20Cupertino%20California",
    },
  },
  // TODO: confirm Cupertino-specific social handles. Reusing the CG Hotel Group
  // accounts as defaults — both sister properties are promoted together.
  social: {
    facebook: "https://www.facebook.com/svgrandhotel",
    instagram: "https://instagram.com/grandsiliconvalley/",
    twitter: "https://www.twitter.com/svgrandhotel/",
    youtube: "https://www.youtube.com/channel/UCuVcDn1Jnj6NDOa38nPl-Vw",
    tripadvisor:
      "https://www.tripadvisor.com/Search?q=Cupertino%20Hotel%20Cupertino%20California",
  },
} as const;

// Travel Tripper / Pegasus (RT3) booking widget — the live-rate slide-out used
// on the current site. Both the booking widget and the social-proof ticker
// (tonight's rate + recent bookings) are driven by this engine. The new domain
// may need to be whitelisted in the Cendyn portal for it to load cross-origin.
// The hotelId is the property's RT3 code (resolved from the portal config at
// /portals/cupertinohotel.json → hotel_id "CASVCH").
export const ttweb = {
  hotelId: "CASVCH",
  portalId: "cupertinohotel",
  timezone: "America/Los_Angeles",
  currency: "USD",
  pluginBase: "https://plugins.traveltripper.io/v2",
  jquery: "https://code.jquery.com/jquery-3.7.1.min.js",
} as const;

export type NavItem = { label: string; href: string };

// Primary navigation — paths mirror the existing site to preserve SEO.
export const mainNav: NavItem[] = [
  { label: "Rooms", href: "/rooms/" },
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

// Services & amenities from the current Cupertino Hotel site.
export const amenities: Amenity[] = [
  {
    title: "Heated Pool",
    description: "Our heated outdoor pool is open daily from 7:00 am to 10:00 pm.",
  },
  {
    title: "Complimentary Continental Breakfast",
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
    title: "Pet Friendly",
    description:
      "We welcome your furry companions in our pet rooms and suites — dogs under 50 lbs, one per room, with a $35/day cleaning fee. Ask about our pet policy when you book.",
  },
];

export type Testimonial = { quote: string; author: string };

export const testimonials: Testimonial[] = [
  { quote: "Perfect location and excellent service!", author: "Pia S. — Paris, France" },
  {
    quote:
      "Right across from Apple Park — an unbeatable spot for our team's visit, and the room was spotless.",
    author: "Business traveler",
  },
  {
    quote:
      "Clean, comfortable, and so convenient to everything in Silicon Valley. We'll be back.",
    author: "Leisure guest",
  },
];

export type Attraction = { name: string; detail: string };

// Nearby Silicon Valley landmarks and employers — Apple Park is directly across
// De Anza Boulevard from the hotel.
export const attractions: Attraction[] = [
  { name: "Apple Park", detail: "1 Apple Park Way, Cupertino — directly across the street" },
  { name: "Main Street Cupertino", detail: "Dining, shopping & entertainment — minutes away" },
  { name: "De Anza College", detail: "21250 Stevens Creek Blvd, Cupertino" },
  { name: "Santana Row", detail: "Upscale shopping & dining in San Jose" },
  { name: "Levi's Stadium", detail: "Home of the 49ers — ~15 minutes away" },
  { name: "Stanford University", detail: "A short drive away" },
];

export type Department = { label: string; email?: string; note?: string };

// Contact directory from the current Cupertino Hotel Contacts page.
export const departments: Department[] = [
  { label: "General Information", email: "info@cghotelgroup.com" },
  { label: "Front Office Manager", email: "Pyu@cghotelgroup.com", note: "Phillip Yu" },
  { label: "Sales Department", email: "salesdepartment1@cghotelgroup.com" },
  { label: "Area General Manager", email: "cbono@cghotelgroup.com", note: "Claudio Bono" },
  { label: "Area Assistant General Manager", email: "rsuarez@cghotelgroup.com", note: "Raul Suarez" },
  { label: "Lead Chef", email: "Chefrubio@cghotelgroup.com", note: "Fabian Rubio" },
  { label: "IT Department", email: "IT@cghotelgroup.com" },
  { label: "Accounting", email: "AP@cghotelgroup.com" },
];

export type PressMention = { outlet: string; title: string };

export const pressMentions: PressMention[] = [
  { outlet: "KRON4", title: "KRON4 TV News — Bay Area feature on the Cupertino Hotel" },
  { outlet: "NBC", title: "NBC video feature on the Cupertino & Grand Hotels" },
  { outlet: "FOX", title: "FOX TV Channel — the Cupertino Hotel" },
  { outlet: "Telemundo", title: "Telemundo Acceso — CG Hotels" },
];

export type MeetingRoom = {
  name: string;
  dimensions: string;
  ceiling: string;
  squareFootage: string;
  price: string;
  capacity: { layout: string; seats: number }[];
  accessibility: string;
};

// Meeting spaces from the current Cupertino Hotel Events page.
export const meetingRooms: MeetingRoom[] = [
  {
    name: "De Anza Room",
    dimensions: "38 × 20 feet",
    ceiling: "12 feet",
    squareFootage: "760 sq ft",
    price: "Inquire for rates",
    capacity: [{ layout: "Maximum Capacity", seats: 60 }],
    accessibility: "Accessible, with a 72\" entrance door width. Rental fees are subject to change.",
  },
  {
    name: "Conference Parlor",
    dimensions: "20 × 24 feet",
    ceiling: "8 feet",
    squareFootage: "480 sq ft (two rooms available)",
    price: "Inquire for rates",
    capacity: [{ layout: "Maximum Capacity", seats: 15 }],
    accessibility: "Each parlor has a 36\" entrance door width. Rental fees are subject to change.",
  },
];

// Events sales contact (Cupertino Hotel Events page).
export const salesEmail = "eorr@cghotelgroup.com";
