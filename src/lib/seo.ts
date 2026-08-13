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
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  languages,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Override hreflang alternates, e.g. only locales a post exists in. */
  languages?: Record<string, string>;
}): Metadata {
  const url = `${siteConfig.url}/${locale}${path}`;
  const ogImage = `${siteConfig.url}${image ?? siteConfig.assets.growthCta}`;
  const alternates = languages
    ? { canonical: url, languages }
    : localeAlternates(locale, path);

  return {
    title,
    description,
    alternates,
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: [{ url: ogImage }],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
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

/**
 * LocalBusiness (ProfessionalService) targeting a specific served city. The
 * postal address stays the real company NAP in Ar Rass; areaServed marks the
 * city the page targets, and geo points at that city for local relevance.
 */
export function locationBusinessLd({
  locale,
  city,
  description,
  path,
  geo,
}: {
  locale: Locale;
  city: string;
  description: string;
  path: string;
  geo: { lat: number; lng: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} - ${city}`,
    description,
    url: `${siteConfig.url}/${locale}${path}`,
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
      latitude: geo.lat,
      longitude: geo.lng,
    },
    areaServed: { "@type": "City", name: city },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
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

export function articleLd({
  locale,
  title,
  description,
  path,
  datePublished,
  dateModified,
  author,
  image,
}: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    inLanguage: locale,
    url: `${siteConfig.url}/${locale}${path}`,
    mainEntityOfPage: `${siteConfig.url}/${locale}${path}`,
    datePublished,
    dateModified: dateModified || datePublished,
    image: image
      ? `${siteConfig.url}${image}`
      : `${siteConfig.url}${siteConfig.assets.growthCta}`,
    author: { "@type": "Organization", name: author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.assets.logo}`,
      },
    },
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
