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
      "We recognize the growing need for pet-friendly accommodations and offer pet-friendly villas. Dogs under 50 lbs are welcome — ask about our pet policy when you book.",
  },
  {
    title: "DoorDash at the Front Desk",
    description: "Have a meal delivered and picked up conveniently at the front desk.",
  },
  {
    title: "Deliveries, Shipping & Handling",
    description:
      "Send packages to the hotel for registered guests — up to 7 lbs complimentary. Additional weight: boxes $0.35/lb, pallets $0.50/lb, envelopes $4.00 each; storage $20.00 per day, per shipment.",
  },
  {
    title: "Business Services & Express Checkout",
    description:
      "Business services are available to keep you productive, and express checkout makes departure quick and easy.",
  },
];

export type Testimonial = { quote: string; author: string };

export const testimonials: Testimonial[] = [
  { quote: "Perfect location and excellent service!", author: "Pia S. — Paris, France" },
  {
    quote:
      "Clean, comfortable, and so convenient to everything in Silicon Valley. We'll be back.",
    author: "Business traveler",
  },
  {
    quote:
      "The villa felt like a home away from home — the fireplace and kitchen were a lovely touch.",
    author: "Leisure guest",
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
