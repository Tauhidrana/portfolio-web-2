import { ICON_KEYS } from "@/lib/icons";
import type { FieldDef } from "@/admin/fieldTypes";
import type { ResourceConfig } from "@/admin/ResourceEditor";
import type { SingletonConfig } from "@/admin/SingletonEditor";

/**
 * Every straightforward editor in the dashboard is a config entry rather than a
 * hand-written page. Ten screens live here; only the two nested editors
 * (ratings, events) and the image library need real components.
 */

const str = (name: string, label: string, extra: Partial<FieldDef> = {}) =>
  ({ name, label, type: "text" as const, required: true, ...extra });

export const SINGLETONS: Record<string, SingletonConfig> = {
  profile: {
    table: "profile",
    title: "Profile",
    description: "The header identity: who you are, where, and the opening line.",
    fields: [
      str("name", "Name"),
      str("role", "Role"),
      str("location", "Location"),
      { name: "email", label: "Email", type: "email", required: true },
      { name: "status", label: "Status line", type: "text", required: true,
        help: "Shown under the hero and in the footer." },
      { name: "lede", label: "Lede", type: "textarea", required: true, rows: 4,
        help: "The opening paragraph. States what you do and where you stand." },
      { name: "image_url", label: "Portrait", type: "image", required: true },
      { name: "logo_url", label: "Logo", type: "image", required: true },
    ],
  },

  education: {
    table: "education",
    title: "Education",
    description: "Shown in the profile sidebar and as the section meta.",
    fields: [
      str("institution", "Institution"),
      str("field", "Field"),
      str("location", "Location"),
      str("duration", "Duration", { help: "For example 2025–2026." }),
    ],
  },
};

export interface ListPage extends ResourceConfig {
  path: string;
  nav: string;
}

export const LIST_PAGES: ListPage[] = [
  {
    path: "about",
    nav: "About",
    table: "about_paragraphs",
    title: "About paragraphs",
    singular: "Paragraph",
    description: "The profile prose. **Bold** spans render as bold on the site.",
    fields: [
      { name: "body", label: "Paragraph", type: "textarea", required: true, rows: 5 },
    ],
    summary: (row) => ({ title: String(row.body).slice(0, 90) + "…" }),
  },

  {
    path: "nav",
    nav: "Navigation",
    table: "nav_links",
    title: "Navigation",
    singular: "Link",
    description: "Header links. Each href must match a section id, like #work.",
    fields: [
      str("label", "Label"),
      str("href", "Href", { placeholder: "#work" }),
    ],
    summary: (row) => ({ title: String(row.label), subtitle: String(row.href) }),
  },

  {
    path: "socials",
    nav: "Socials",
    table: "socials",
    title: "Socials",
    singular: "Social link",
    description: "Icons are code, so pick from the keys the site can resolve.",
    fields: [
      {
        name: "icon_key",
        label: "Icon",
        type: "select",
        required: true,
        options: ICON_KEYS.map((k) => ({ value: k, label: k })),
      },
      str("label", "Label"),
      str("handle", "Handle"),
      { name: "href", label: "Link", type: "url", required: true,
        help: "mailto: links are fine here." },
    ],
    summary: (row) => ({ title: String(row.label), subtitle: String(row.handle) }),
  },

  {
    path: "facts",
    nav: "Facts",
    table: "facts",
    title: "Facts strip",
    singular: "Fact",
    description: "The four figures under the hero.",
    fields: [
      str("value", "Value", { placeholder: "600+" }),
      str("label", "Label", { placeholder: "Problems solved" }),
    ],
    summary: (row) => ({ title: `${row.value} — ${row.label}` }),
  },

  {
    path: "stack",
    nav: "Stack",
    table: "stack_groups",
    title: "Stack",
    singular: "Group",
    description: "Named, not scored. A percentage on a language is a guess.",
    fields: [
      str("group_name", "Group", { placeholder: "Languages" }),
      { name: "items", label: "Items", type: "stringList", help: "Enter to add each one." },
    ],
    summary: (row) => ({
      title: String(row.group_name),
      subtitle: (row.items as string[]).join(", "),
    }),
  },

  {
    path: "projects",
    nav: "Projects",
    table: "projects",
    title: "Projects",
    singular: "Project",
    description: "The work section. The problem comes first — it is why the thing exists.",
    fields: [
      str("slug", "Slug", { help: "Unique, lowercase, used as the React key." }),
      str("title", "Title"),
      str("year", "Year"),
      { name: "href", label: "Live URL", type: "url", required: true },
      str("tagline", "Tagline"),
      { name: "problem", label: "The problem", type: "textarea", required: true, rows: 3 },
      { name: "description", label: "What it does", type: "textarea", required: true, rows: 4 },
      { name: "tech", label: "Tech", type: "stringList" },
    ],
    summary: (row) => ({ title: String(row.title), subtitle: String(row.tagline) }),
  },

  {
    path: "roles",
    nav: "Roles",
    table: "roles",
    title: "Roles",
    singular: "Role",
    fields: [
      str("slug", "Slug", { help: "Unique, lowercase." }),
      str("role_title", "Role"),
      str("org", "Organisation"),
      str("period", "Period", { placeholder: "2026 — Present" }),
      str("location", "Location"),
      { name: "description", label: "Description", type: "textarea", required: true, rows: 3 },
      { name: "tags", label: "Tags", type: "stringList" },
    ],
    summary: (row) => ({
      title: `${row.role_title} · ${row.org}`,
      subtitle: String(row.period),
    }),
  },

  {
    path: "records",
    nav: "Record",
    table: "records",
    title: "Record",
    singular: "Entry",
    description: "Awards and certificates — things somebody else verified.",
    fields: [
      str("slug", "Slug", { help: "Unique, lowercase." }),
      {
        name: "kind",
        label: "Kind",
        type: "select",
        required: true,
        options: [
          { value: "Award", label: "Award" },
          { value: "Certificate", label: "Certificate" },
        ],
      },
      str("title", "Title"),
      str("issuer", "Issuer"),
      str("date_label", "Date", { placeholder: "April 2026" }),
      { name: "result", label: "Result", type: "text", nullable: true,
        placeholder: "5th — Regional", help: "Leave blank for certificates." },
      { name: "description", label: "Description", type: "textarea", required: true, rows: 3 },
      { name: "image_url", label: "Image", type: "image", required: true },
      { name: "href", label: "Verification link", type: "url", nullable: true },
    ],
    summary: (row) => ({
      title: String(row.title),
      subtitle: `${row.kind} · ${row.issuer}`,
      image: String(row.image_url),
    }),
  },
];
