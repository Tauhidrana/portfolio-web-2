export interface RatingBand {
  from: number;
  to: number;
  label: string;
  color: string;
}

export interface RatingScale {
  platform: string;
  handle: string;
  href: string;
  current: number;
  peak: number;
  rank: string;
  max: number;
  bands: RatingBand[];
  note: string;
}

export interface Photo {
  src: string;
  caption: string;
}

export interface SummitEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  organizer: string;
  description: string;
  photos: Photo[];
}

export interface Resume {
  url: string;
  filename: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  email: string;
  image: string;
  logo: string;
  lede: string;
  status: string;
  /** Null when no resume is uploaded; the hero link is hidden entirely. */
  resume: Resume | null;
}

export interface Education {
  institution: string;
  field: string;
  location: string;
  duration: string;
}

export interface NavLink {
  label: string;
  href: string;
}

/** iconKey resolves through SOCIAL_ICONS in src/lib/icons.ts. */
export interface Social {
  iconKey: string;
  label: string;
  handle: string;
  href: string;
}

export interface Fact {
  value: string;
  label: string;
}

export interface StackGroup {
  group: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  year: string;
  tagline: string;
  problem: string;
  description: string;
  tech: string[];
  href: string;
}

export interface Role {
  id: string;
  role: string;
  org: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
}

export interface RecordItem {
  id: string;
  kind: "Award" | "Certificate";
  title: string;
  issuer: string;
  date: string;
  result: string | null;
  description: string;
  image: string;
  href: string | null;
}

/** The shape returned by the get_site_content() Postgres function. */
export interface SiteContent {
  profile: Profile;
  education: Education;
  aboutParagraphs: string[];
  navLinks: NavLink[];
  socials: Social[];
  facts: Fact[];
  stack: StackGroup[];
  ratingScales: RatingScale[];
  projects: Project[];
  roles: Role[];
  record: RecordItem[];
  events: SummitEvent[];
}
