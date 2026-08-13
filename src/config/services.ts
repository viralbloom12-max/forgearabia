import type { LucideIcon } from "lucide-react";
import {
  Globe,
  ShoppingBag,
  Search,
  Megaphone,
  Target,
  Bot,
  Palette,
  LayoutDashboard,
} from "lucide-react";

export type ServiceSlug =
  | "website-development"
  | "ecommerce-development"
  | "seo-local-seo"
  | "digital-marketing"
  | "google-ads-ppc"
  | "ai-automation"
  | "branding-design"
  | "ui-ux-design";

export interface ServiceDef {
  slug: ServiceSlug;
  /** Key into the `services` message namespace. */
  key: string;
  icon: LucideIcon;
}

/**
 * Ordered registry of the eight core services. Copy (title, summary, etc.)
 * lives in the translation catalogs under `services.<key>` so both locales
 * stay in sync. This same registry drives the homepage grid and, later, the
 * data-driven service landing pages.
 */
export const services: ServiceDef[] = [
  { slug: "website-development", key: "websiteDevelopment", icon: Globe },
  { slug: "ecommerce-development", key: "ecommerceDevelopment", icon: ShoppingBag },
  { slug: "seo-local-seo", key: "seo", icon: Search },
  { slug: "digital-marketing", key: "digitalMarketing", icon: Megaphone },
  { slug: "google-ads-ppc", key: "googleAds", icon: Target },
  { slug: "ai-automation", key: "aiAutomation", icon: Bot },
  { slug: "branding-design", key: "branding", icon: Palette },
  { slug: "ui-ux-design", key: "uiUx", icon: LayoutDashboard },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
