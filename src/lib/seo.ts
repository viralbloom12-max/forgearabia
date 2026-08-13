import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { locales, type Locale } from "@/i18n/routing";

/**
 * Build localized alternates (canonical + hreflang) for a path that is the
 * same across locales, e.g. "/services/website-development". Pass "" for home.
 */
export function localeAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${siteConfig.url}/${l}${path}`;
  }
  languages["x-default"] = `${siteConfig.url}/en${path}`;
  return {
    canonical: `${siteConfig.url}/${locale}${path}`,
    languages,
  };
}

/**
 * Compose page Metadata with localized title, description, canonical,
 * hreflang alternates, and Open Graph / Twitter cards.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;
  return {
    title,
    description,
    alternates: localeAlternates(locale, path),
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      locale: locale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD builders (typed loosely as Record to keep call sites simple).
// ---------------------------------------------------------------------------

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.assets.logo}`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.countryCode,
    },
  };
}

export function localBusinessLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    image: `${siteConfig.url}${siteConfig.assets.logo}`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.geo.lat,
      longitude: siteConfig.address.geo.lng,
    },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
  };
}

export function serviceLd({
  locale,
  name,
  description,
  path,
}: {
  locale: Locale;
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: `${siteConfig.url}/${locale}${path}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
  };
}

export function breadcrumbLd(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}/${locale}${item.path}`,
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
