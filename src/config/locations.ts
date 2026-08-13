export type LocationSlug =
  | "ar-rass"
  | "buraidah"
  | "unaizah"
  | "al-qassim"
  | "riyadh"
  | "jeddah"
  | "dammam";

export type LocationRegion = "qassim" | "city";

export interface LocationDef {
  slug: LocationSlug;
  /** Key into the location message namespaces. */
  key: string;
  /** Grouping on the hub page: Qassim home region vs major Saudi cities. */
  region: LocationRegion;
  /** Approximate coordinates of the city, used for LocalBusiness schema. */
  geo: { lat: number; lng: number };
}

/**
 * Priority locations. Qassim region first (home region), then the three
 * largest Saudi metros. Each drives a unique, non-thin landing page.
 */
export const locations: LocationDef[] = [
  { slug: "ar-rass", key: "arRass", region: "qassim", geo: { lat: 25.8693, lng: 43.4979 } },
  { slug: "buraidah", key: "buraidah", region: "qassim", geo: { lat: 26.326, lng: 43.975 } },
  { slug: "unaizah", key: "unaizah", region: "qassim", geo: { lat: 26.0843, lng: 43.9935 } },
  { slug: "al-qassim", key: "alQassim", region: "qassim", geo: { lat: 26.2, lng: 43.97 } },
  { slug: "riyadh", key: "riyadh", region: "city", geo: { lat: 24.7136, lng: 46.6753 } },
  { slug: "jeddah", key: "jeddah", region: "city", geo: { lat: 21.4858, lng: 39.1925 } },
  { slug: "dammam", key: "dammam", region: "city", geo: { lat: 26.4207, lng: 50.0888 } },
];

export const qassimLocations = locations.filter((l) => l.region === "qassim");
export const cityLocations = locations.filter((l) => l.region === "city");

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug);
}
