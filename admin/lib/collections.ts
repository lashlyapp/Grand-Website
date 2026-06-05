// Declarative config for every CMS collection. Adding a content type is just a
// new entry here — the generic list/edit pages and server actions render and
// persist it. (Rooms have their own richer UI with the video cover-picker, so
// they're not listed here.)

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "stringList" // textarea, one value per line -> text[]
  | "json"; // raw JSON -> jsonb

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
};

export type Collection = {
  key: string; // URL slug
  table: string; // Supabase table
  label: string; // plural, for nav
  singular: string;
  titleField: string; // which field labels a row in the list
  fields: Field[];
};

export const collections: Collection[] = [
  {
    key: "news",
    table: "news_posts",
    label: "News",
    singular: "News post",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "date_label", label: "Date label", type: "text", help: "e.g. “Ongoing”, “June 2026”" },
      { name: "body", label: "Body", type: "textarea" },
    ],
  },
  {
    key: "press",
    table: "press_mentions",
    label: "Press",
    singular: "Press mention",
    titleField: "outlet",
    fields: [
      { name: "outlet", label: "Outlet", type: "text" },
      { name: "title", label: "Headline", type: "text" },
      { name: "url", label: "Link URL", type: "text" },
    ],
  },
  {
    key: "careers",
    table: "job_postings",
    label: "Careers",
    singular: "Job posting",
    titleField: "title",
    fields: [
      { name: "title", label: "Job title", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "employment_type", label: "Type", type: "text", help: "e.g. Full-time" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "apply_email", label: "Apply email", type: "text" },
    ],
  },
  {
    key: "testimonials",
    table: "testimonials",
    label: "Testimonials",
    singular: "Testimonial",
    titleField: "author",
    fields: [
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "author", label: "Author", type: "text" },
    ],
  },
  {
    key: "amenities",
    table: "amenities",
    label: "Amenities",
    singular: "Amenity",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    key: "meeting-rooms",
    table: "meeting_rooms",
    label: "Meeting rooms",
    singular: "Meeting room",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "dimensions", label: "Dimensions", type: "text" },
      { name: "ceiling", label: "Ceiling", type: "text" },
      { name: "square_footage", label: "Square footage", type: "text" },
      { name: "price", label: "Price", type: "text" },
      {
        name: "capacity",
        label: "Capacity",
        type: "json",
        help: 'JSON array, e.g. [{"layout":"Theatre","seats":50}]',
      },
      { name: "accessibility", label: "Accessibility", type: "textarea" },
    ],
  },
  {
    key: "attractions",
    table: "attractions",
    label: "Attractions",
    singular: "Attraction",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "detail", label: "Detail", type: "text" },
    ],
  },
  {
    key: "gallery",
    table: "gallery_images",
    label: "Gallery",
    singular: "Gallery image",
    titleField: "alt",
    fields: [
      { name: "src", label: "Image URL / path", type: "text" },
      { name: "alt", label: "Alt text", type: "text" },
      { name: "span", label: "Grid span (CSS classes)", type: "text", help: "e.g. lg:col-span-2" },
    ],
  },
  {
    key: "offers",
    table: "offers",
    label: "Offers",
    singular: "Offer / package",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "image", label: "Image URL / path", type: "text" },
      { name: "cta_label", label: "Button label", type: "text" },
      { name: "cta_href", label: "Button link", type: "text" },
    ],
  },
];

export function getCollection(key: string): Collection | undefined {
  return collections.find((c) => c.key === key);
}
