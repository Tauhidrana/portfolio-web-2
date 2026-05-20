import type { LucideIcon } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";
import type { IconType } from "react-icons";

export type CategoryColor = "emerald" | "indigo" | "cyan" | "violet";

export interface CategoryStyle {
  bg: string;
  border: string;
  text: string;
  dot: string;
}

export interface Photo {
  src: string;
  caption: string;
}

export interface StatConfig {
  icon: LucideIcon;
  label: string;
  /** static value, or a function that receives the events array */
  value: string | number | ((events: SummitEvent[]) => string | number);
}

export interface SummitEvent {
  id: number;
  title: string;
  shortTitle: string;
  category: string;
  categoryColor: CategoryColor;
  date: string;
  location: string;
  organizer: string;
  description: string;
  highlight: string;
  tags: string[];
  photos: Photo[];
  featured?: boolean;
}

export interface SummitData {
  section: {
    number: string;
    subtitle: string;
    title: string;
    titleAccent: string;
    description: string;
  };
  categoryStyles: Record<CategoryColor, CategoryStyle>;
  stats: StatConfig[];
  events: SummitEvent[];
}

type AnyIcon =
  | IconType
  | ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;

interface ProgressItem {
  icon: AnyIcon;
  name: string;
  level: number;
  color: string;
}

interface GridItem {
  icon: AnyIcon;
  name: string;
  color: string;
}

interface ListItem {
  name: string;
  desc: string;
}

interface BaseCategory {
  id: string;
  title: string;
  icon: AnyIcon;
  iconColor: string;
  iconBg: string;
}

export interface Section {
  id: string;
  eyebrow: string;
  title: {
    normal: string;
    gradient: string;
  };
}

export type SkillCategory =
  | (BaseCategory & { type: "progress"; items: ProgressItem[] })
  | (BaseCategory & { type: "grid"; items: GridItem[] })
  | (BaseCategory & { type: "list"; items: ListItem[] });
