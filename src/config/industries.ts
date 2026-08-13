import type { LucideIcon } from "lucide-react";
import {
  Utensils,
  HeartPulse,
  Building2,
  ShoppingBag,
  HardHat,
  Briefcase,
  GraduationCap,
  Hotel,
} from "lucide-react";
import type { ServiceSlug } from "./services";

export type IndustrySlug =
  | "restaurants-cafes"
  | "healthcare"
  | "real-estate"
  | "retail-ecommerce"
  | "construction"
  | "professional-services"
  | "education"
  | "hospitality";

export interface IndustryDef {
  slug: IndustrySlug;
  /** Key into the industry message namespaces. */
  key: string;
  icon: LucideIcon;
  /** Curated services most relevant to this industry. */
  services: ServiceSlug[];
}

export const industries: IndustryDef[] = [
  {
    slug: "restaurants-cafes",
    key: "restaurants",
    icon: Utensils,
    services: ["website-development", "branding-design", "digital-marketing", "seo-local-seo"],
  },
  {
    slug: "healthcare",
    key: "healthcare",
    icon: HeartPulse,
    services: ["website-development", "seo-local-seo", "google-ads-ppc", "ai-automation"],
  },
  {
    slug: "real-estate",
    key: "realEstate",
    icon: Building2,
    services: ["website-development", "seo-local-seo", "google-ads-ppc", "digital-marketing"],
  },
  {
    slug: "retail-ecommerce",
    key: "retail",
    icon: ShoppingBag,
    services: ["ecommerce-development", "digital-marketing", "seo-local-seo", "google-ads-ppc"],
  },
  {
    slug: "construction",
    key: "construction",
    icon: HardHat,
    services: ["website-development", "branding-design", "seo-local-seo", "ui-ux-design"],
  },
  {
    slug: "professional-services",
    key: "professional",
    icon: Briefcase,
    services: ["website-development", "seo-local-seo", "branding-design", "ai-automation"],
  },
  {
    slug: "education",
    key: "education",
    icon: GraduationCap,
    services: ["website-development", "digital-marketing", "seo-local-seo", "ai-automation"],
  },
  {
    slug: "hospitality",
    key: "hospitality",
    icon: Hotel,
    services: ["website-development", "branding-design", "digital-marketing", "seo-local-seo"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
