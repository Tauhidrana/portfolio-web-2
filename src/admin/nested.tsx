import ResourceEditor, { type ResourceConfig } from "@/admin/ResourceEditor";
import CodeforcesSync from "@/admin/CodeforcesSync";
import type { Row } from "@/admin/useResource";

/**
 * The two editors that manage a parent and its children together. They reuse
 * ResourceEditor twice over: once for the parent list, once nested inside an
 * expanded row for that row's children.
 */

/** The rank vars defined in src/index.css. Swatches are those literal values. */
const RANK_COLORS = [
  { value: "var(--color-rank-newbie)", label: "Newbie grey", swatch: "#8a8a8a" },
  { value: "var(--color-rank-pupil)", label: "Pupil green", swatch: "#3e9e4f" },
  { value: "var(--color-rank-specialist)", label: "Specialist teal", swatch: "#22a39a" },
  { value: "var(--color-rank-expert)", label: "Expert blue", swatch: "#4b7fd6" },
  { value: "var(--color-rank-cm)", label: "CM purple", swatch: "#9a4fbf" },
  { value: "var(--color-rank-master)", label: "Master orange", swatch: "#e08c2e" },
  { value: "var(--color-rank-gm)", label: "GM red", swatch: "#d6413e" },
];

const bandsConfig = (scaleId: string): ResourceConfig => ({
  table: "rating_bands",
  title: "Bands",
  singular: "Band",
  nested: true,
  parent: { column: "scale_id", id: scaleId },
  fields: [
    { name: "from_value", label: "From", type: "number", required: true, min: 0 },
    { name: "to_value", label: "To", type: "number", required: true, min: 1 },
    { name: "label", label: "Label", type: "text", required: true },
    {
      name: "color",
      label: "Colour",
      type: "select",
      required: true,
      options: RANK_COLORS,
    },
  ],
  summary: (row) => ({
    title: `${row.label}`,
    subtitle: `${row.from_value} – ${row.to_value}`,
  }),
});

export const RATINGS_CONFIG: ResourceConfig = {
  table: "rating_scales",
  title: "Rating ladders",
  singular: "Ladder",
  description:
    "Bands are the real thresholds on each judge — the marker position on the site is derived from them, so nothing here is decorative.",
  fields: [
    { name: "platform", label: "Platform", type: "text", required: true },
    { name: "handle", label: "Handle", type: "text", required: true },
    { name: "href", label: "Profile URL", type: "url", required: true },
    { name: "rank", label: "Rank", type: "text", required: true },
    { name: "current_rating", label: "Current", type: "number", required: true, min: 0 },
    { name: "peak_rating", label: "Peak", type: "number", required: true, min: 0,
      help: "Must be at or above current — the database enforces it." },
    { name: "max_rating", label: "Scale max", type: "number", required: true, min: 1,
      help: "The top of the drawn ladder, not your rating." },
    { name: "note", label: "Note", type: "textarea", rows: 2,
      help: "One honest, specific line shown under the ladder." },
  ],
  summary: (row) => ({
    title: String(row.platform),
    subtitle: `${row.current_rating} · peak ${row.peak_rating} · ${row.rank}`,
  }),
  formActions: ({ values, setValues }) => (
    <CodeforcesSync values={values} setValues={setValues} />
  ),
  renderChildren: (row: Row) => (
    <ResourceEditor key={row.id} config={bandsConfig(row.id)} />
  ),
};

const photosConfig = (eventId: string): ResourceConfig => ({
  table: "event_photos",
  title: "Photos",
  singular: "Photo",
  nested: true,
  parent: { column: "event_id", id: eventId },
  fields: [
    { name: "src", label: "Image", type: "image", required: true },
    { name: "caption", label: "Caption", type: "text", required: true,
      help: "Used as the alt text and in the lightbox." },
  ],
  summary: (row) => ({
    title: String(row.caption),
    image: String(row.src),
  }),
});

export const EVENTS_CONFIG: ResourceConfig = {
  table: "events",
  title: "Events",
  singular: "Event",
  description: "Deleting an event deletes its photos with it.",
  fields: [
    { name: "slug", label: "Slug", type: "text", required: true,
      help: "Unique, lowercase." },
    { name: "title", label: "Title", type: "text", required: true },
    { name: "date_label", label: "Date", type: "text", required: true,
      placeholder: "May 9, 2026" },
    { name: "location", label: "Location", type: "text", required: true },
    { name: "organizer", label: "Organiser", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: true, rows: 4 },
  ],
  summary: (row) => ({
    title: String(row.title),
    subtitle: `${row.date_label} · ${row.location}`,
  }),
  renderChildren: (row: Row) => (
    <ResourceEditor key={row.id} config={photosConfig(row.id)} />
  ),
};
