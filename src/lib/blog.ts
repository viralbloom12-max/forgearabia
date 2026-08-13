import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/routing";
import type { BlogCategory } from "@/config/blog";
import type { ServiceSlug } from "@/config/services";
import type { LocationSlug } from "@/config/locations";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  updated?: string;
  category: BlogCategory;
  image?: string;
  services?: ServiceSlug[];
  locations?: LocationSlug[];
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

function localeDir(locale: Locale) {
  return path.join(BLOG_DIR, locale);
}

function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Slugs available for a locale (files that exist as .mdx). */
export function getPostSlugs(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Locales in which a given slug has a translation. Drives hreflang. */
export function getSlugLocales(slug: string, locales: readonly Locale[]): Locale[] {
  return locales.filter((l) => fs.existsSync(path.join(localeDir(l), `${slug}.mdx`)));
}

export function getPost(locale: Locale, slug: string): Post | null {
  const file = path.join(localeDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  return {
    ...fm,
    slug,
    content,
    readingMinutes: readingMinutes(content),
  };
}

export function getAllPosts(locale: Locale): PostMeta[] {
  return getPostSlugs(locale)
    .map((slug) => {
      const post = getPost(locale, slug);
      if (!post) return null;
      const { content: _content, ...meta } = post;
      void _content;
      return meta;
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
