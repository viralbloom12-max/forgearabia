/**
 * Blog category registry. Frontmatter `category` fields reference these keys;
 * labels are localized under the `blog.categories` message namespace.
 */
export type BlogCategory =
  | "websiteDevelopment"
  | "seo"
  | "digitalMarketing"
  | "aiAutomation"
  | "ecommerce"
  | "saudiGrowth";

export const blogCategories: BlogCategory[] = [
  "websiteDevelopment",
  "seo",
  "digitalMarketing",
  "aiAutomation",
  "ecommerce",
  "saudiGrowth",
];

export const AUTHORS: Record<string, { name: string }> = {
  "forge-arabia": { name: "Forge Arabia" },
};
