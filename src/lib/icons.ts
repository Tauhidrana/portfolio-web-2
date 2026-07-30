import type { ComponentType } from "react";
import { SiFacebook, SiInstagram, SiDiscord, SiCodeforces, SiCodechef } from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, Globe } from "lucide-react";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

/**
 * Icons are React components, so they cannot live in Postgres. Socials store a
 * text key instead and resolve it here. The admin's icon picker offers exactly
 * these keys, so a stored key always maps.
 */
export const SOCIAL_ICONS: Record<string, IconComponent> = {
  github: FaGithub,
  codeforces: SiCodeforces,
  codechef: SiCodechef,
  linkedin: FaLinkedin,
  facebook: SiFacebook,
  instagram: SiInstagram,
  discord: SiDiscord,
  mail: Mail,
};

export const ICON_KEYS = Object.keys(SOCIAL_ICONS);

/** Falls back to a generic globe so an unknown key degrades instead of crashing. */
export const iconFor = (key: string): IconComponent => SOCIAL_ICONS[key] ?? Globe;
