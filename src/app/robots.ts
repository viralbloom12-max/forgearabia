import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Production robots policy: open the public site to all search engines, keep
 * API and Next internals out of the index, and advertise the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
