import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/routing";
import { services } from "@/config/services";
import { locations } from "@/config/locations";
import { industries } from "@/config/industries";

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

interface RouteDef {
  path: string; // locale-agnostic path, "" for home
  changeFrequency: ChangeFreq;
  priority: number;
}

/**
 * Every indexable, locale-agnostic route. Blog routes plug in here once the
 * blog ships. About and Contact are homepage sections today; add their paths
 * here when they become standalone pages.
 */
function routes(): RouteDef[] {
  const list: RouteDef[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "yearly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/locations", changeFrequency: "monthly", priority: 0.9 },
    { path: "/industries", changeFrequency: "monthly", priority: 0.9 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];
  for (const s of services) {
    list.push({ path: `/services/${s.slug}`, changeFrequency: "monthly", priority: 0.8 });
  }
  for (const l of locations) {
    list.push({ path: `/locations/${l.slug}`, changeFrequency: "monthly", priority: 0.8 });
  }
  for (const i of industries) {
    list.push({ path: `/industries/${i.slug}`, changeFrequency: "monthly", priority: 0.8 });
  }
  return list;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes()) {
    // hreflang alternates: identical for every localized version of a route.
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[l] = `${siteConfig.url}/${l}${route.path}`;
    }
    languages["x-default"] = `${siteConfig.url}/en${route.path}`;

    for (const locale of locales) {
      entries.push({
        url: `${siteConfig.url}/${locale}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
