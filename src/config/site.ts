export const siteConfig = {
  name: "Forge Arabia",
  domain: "forgearabia.com",
  url: "https://forgearabia.com",
  // Contact
  email: "info@forgearabia.com",
  phone: "+966 56 745 1061",
  phoneRaw: "+966567451061",
  whatsapp: "966567451061",
  // Location (NAP for LocalBusiness schema)
  address: {
    city: "Ar Rass",
    region: "Al Qassim",
    country: "Saudi Arabia",
    countryCode: "SA",
    // Approximate coordinates for Ar Rass, Al Qassim
    geo: { lat: 25.8693, lng: 43.4979 },
  },
  founders: [
    {
      name: "Ibrahim Malik",
      role: "Co-Founder & CEO",
      image: "/brand/founder-ceo.webp",
    },
    {
      name: "Muhammad Mujahid",
      role: "Co-Founder & CMO",
      image: "/brand/cofounder-cmo.webp",
    },
  ],
  socials: {
    // Placeholders, to be confirmed
    instagram: "",
    linkedin: "",
    x: "",
  },
  assets: {
    logo: "/brand/logo.webp",
    favicon: "/brand/favicon.webp",
    aboutBanner: "/brand/about-banner.webp",
    growthCta: "/brand/growth-cta-banner.webp",
  },
} as const;

export type SiteConfig = typeof siteConfig;
