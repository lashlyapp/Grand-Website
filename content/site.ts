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
    fax: "408-720-1997",
  },
  email: "info@cghotelgroup.com",
  // Booking is handled by RezTrip (Cendyn). We keep linking to it; the rebuild
  // changes the marketing site only, not the reservation flow.
  bookingBaseUrl: "https://svgrandhotel.reztrip.com/search",
  // Shown on room listings and in the room detail / virtual-tour modal.
  roomMediaDisclaimer:
    "Photos and videos are for illustration only. Actual rooms may differ in furnishings, layout, view, and finishes.",
  // New on-site fitness center, featured on the homepage. Point `gymImage` at
  // the gym photo in /public (e.g. "/images/gym.jpg").
  gymImage: "/images/gym.jpg",
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
      rating: 4.3,
      count: 1100,
      url: "https://www.google.com/maps/place/The+Grand+Hotel/@37.3711242,-122.0449947,17z/data=!4m7!3m6!1s0x808fb6f4b0c3b6ff:0xdc206a476539c8ce!8m2!3d37.37112!4d-122.0449947!9m1!1b1",
    },
    tripadvisor: {
      rating: 4.0,
      count: 500,
      url: "https://www.tripadvisor.com/Hotel_Review-g33146-d225415-Reviews-The_Grand_Hotel-Sunnyvale_California.html",
    },
  },
  social: {
    facebook: "https://www.facebook.com/svgrandhotel",
    instagram: "https://instagram.com/grandsiliconvalley/",
    twitter: "https://www.twitter.com/svgrandhotel/",
    youtube: "https://www.youtube.com/channel/UCuVcDn1Jnj6NDOa38nPl-Vw",
    tripadvisor:
      "https://www.tripadvisor.com/Hotel_Review-g33146-d225415-Reviews-The_Grand_Hotel-Sunnyvale_California.html",
  },
} as const;

// Travel Tripper / Pegasus (RT3) booking widget — the live-rate slide-out used
// on the current site. Both the booking widget and the social-proof ticker
// (tonight's rate + recent bookings) are driven by this engine. The new domain
// may need to be whitelisted in the Cendyn portal for it to load cross-origin.
export const ttweb = {
  hotelId: "CASVGH",
  portalId: "svgrandhotel",
  timezone: "America/Los_Angeles",
  currency: "USD",
  pluginBase: "https://plugins.traveltripper.io/v2",
  jquery: "https://code.jquery.com/jquery-3.7.1.min.js",
} as const;

export type NavItem = { label: string; href: string; children?: NavItem[] };

// Primary navigation — paths mirror the existing site to preserve SEO.
// Accommodation pages are grouped under a single "Rooms" dropdown so the
// header stays compact.
export const mainNav: NavItem[] = [
  {
    label: "Rooms",
    href: "/rooms/",
    children: [
      { label: "Guest Rooms", href: "/rooms/" },
      { label: "Villas", href: "/villas/" },
      { label: "Annex", href: "/annex/" },
    ],
  },
  { label: "Gallery", href: "/gallery/" },
  { label: "Events", href: "/events/" },
  { label: "News", href: "/news/" },
  { label: "Location", href: "/location/" },
  { label: "Contact", href: "/contacts/" },
];

// NOTE: /vidovich-vineyards/ (wine package) is intentionally NOT linked here —
// the package is disabled by decision. The page code is kept for later use;
// see the note in app/vidovich-vineyards/page.tsx before re-adding it.
export const footerNav: NavItem[] = [
  { label: "Careers", href: "/careers/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Accessibility Statement", href: "/accessibility/" },
];

export type Amenity = {
  title: string;
  // Optional short lead-in shown above the details.
  description?: string;
  // Optional bullet points for structured details (hours, pricing, etc.).
  details?: string[];
  // When true, the details are hidden behind a "More" toggle so a long card
  // doesn't stretch the height of every card in the row.
  collapsible?: boolean;
};

// Amenity details from the current site, organized into a short lead-in plus
// bullets where there are multiple facts to scan (hours, pricing, policies).
export const amenities: Amenity[] = [
  {
    title: "Heated Pool",
    description: "Our heated outdoor pool is open daily, 7:00 am to 10:00 pm.",
  },
  {
    title: "Continental Breakfast",
    description: "Complimentary continental breakfast, served daily:",
    details: [
      "Monday–Friday: 6:30 am – 10:00 am",
      "Saturday & Sunday: 7:00 am – 10:30 am",
    ],
  },
  {
    title: "Happy Hour",
    description: "Complimentary happy hour (drinks only):",
    details: ["Daily: 5:00 pm – 6:00 pm", "Up to two drinks per guest"],
  },
  {
    title: "High-Speed Internet",
    description: "Complimentary high-speed Wi-Fi throughout the property.",
  },
  {
    title: "24-Hour Room Service",
    description: "In-room dining and service, available around the clock.",
  },
  {
    title: "Fitness On Site",
    description: "An on-site fitness room to keep your routine going while you travel.",
  },
  {
    title: "Pet Friendly",
    description: "Pet-friendly villas for you and your companion:",
    details: ["Dogs under 50 lbs welcome", "Ask about our pet policy when you book"],
  },
  {
    title: "DoorDash at the Front Desk",
    description: "Have a meal delivered and picked up conveniently at the front desk.",
  },
  {
    title: "Deliveries, Shipping & Handling",
    description:
      "Receive packages for registered guests — up to 7 lbs complimentary.",
    details: [
      "Boxes: $0.35 / lb",
      "Pallets: $0.50 / lb",
      "Envelopes: $4.00 each",
      "Storage: $20.00 per day, per shipment",
    ],
    collapsible: true,
  },
  {
    title: "Business Services & Express Checkout",
    description: "Stay productive and depart with ease:",
    details: ["Business services on site", "Express checkout available"],
  },
];

export type Testimonial = {
  quote: string;
  source: "Google" | "Tripadvisor";
};

// Real guest reviews from the hotel's public Google and Tripadvisor listings.
// Attribution is kept at the platform level and links to the source listing.
// NOTE: Google/Tripadvisor block automated access, so confirm the exact wording
// against the live listings before launch.
export const testimonials: Testimonial[] = [
  {
    quote: "Great clean rooms, super friendly staff, nice comfy bed.",
    source: "Google",
  },
  {
    quote: "Great breakfast and happy hour.",
    source: "Tripadvisor",
  },
  {
    quote: "Spacious rooms, good breakfast, nice atmosphere, excellent service.",
    source: "Google",
  },
];

export type Attraction = { name: string; detail: string };

// Nearby Silicon Valley landmarks and employers (from the current site's
// "Proximity at its best" map).
export const attractions: Attraction[] = [
  { name: "Googleplex", detail: "1600 Amphitheatre Pkwy, Mountain View" },
  { name: "Intuit Corporate HQ", detail: "2632 Marine Way, Mountain View" },
  { name: "LinkedIn", detail: "2029 Stierlin Court, Mountain View" },
  { name: "Stanford University", detail: "A short drive away" },
  { name: "San Jose Convention Center", detail: "Minutes from downtown San Jose" },
  { name: "Apple Park", detail: "Neighboring Cupertino" },
];

export type Department = { label: string; email?: string; note?: string };

// Contact directory from the current site's Contacts page.
export const departments: Department[] = [
  { label: "General Information", email: "info@cghotelgroup.com" },
  { label: "Reservations Manager", email: "ReservationManager@cghotelgroup.com" },
  { label: "Sales Department", email: "salesdepartment1@cghotelgroup.com" },
  { label: "General Manager", email: "cbono@cghotelgroup.com", note: "Claudio Bono" },
  { label: "Accounting", email: "AP@cghotelgroup.com" },
  { label: "Rooms & Division Manager", email: "Milena@cghotelgroup.com" },
];

export type PressMention = { outlet: string; title: string };

export const pressMentions: PressMention[] = [
  { outlet: "KRON4", title: "KRON4 TV News — Bay Area feature on The Grand Hotel" },
  { outlet: "NBC", title: "NBC video feature on The Grand & Cupertino Hotels" },
  { outlet: "FOX", title: "FOX TV Channel — The Grand Hotel" },
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

export const meetingRooms: MeetingRoom[] = [
  {
    name: "Montebello Conference Room",
    dimensions: "34 × 30 feet",
    ceiling: "12 feet",
    squareFootage: "1,020 sq ft",
    price: "$800 per day",
    capacity: [
      { layout: "U-Shape", seats: 32 },
      { layout: "Rectangle", seats: 42 },
      { layout: "Classroom", seats: 50 },
      { layout: "Rounds", seats: 64 },
      { layout: "Theatre", seats: 50 },
    ],
    accessibility:
      "Accessible, with a 47\" entrance door plus three additional 35\" entrances. Rental fees are applied daily and are subject to change.",
  },
];
