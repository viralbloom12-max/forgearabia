import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { compileMDX } from "next-mdx-remote/rsc";
import { Clock, ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { routing, locales, type Locale } from "@/i18n/routing";
import { getPost, getPostSlugs, getSlugLocales } from "@/lib/blog";
import { getService } from "@/config/services";
import { getLocation } from "@/config/locations";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogCover } from "@/components/blog/blog-cover";
import { mdxComponents } from "@/components/blog/mdx-components";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { whatsappUrl } from "@/lib/whatsapp";
import { buildMetadata, articleLd, breadcrumbLd } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

function hreflangFor(slug: string) {
  const available = getSlugLocales(slug, locales);
  const languages: Record<string, string> = {};
  for (const l of available) {
    languages[l] = `${siteConfig.url}/${l}/blog/${slug}`;
  }
  const xDefault = available.includes("en") ? "en" : available[0];
  if (xDefault) languages["x-default"] = `${siteConfig.url}/${xDefault}/blog/${slug}`;
  return languages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale as Locale, slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated || post.date,
    languages: hreflangFor(slug),
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(locale as Locale, slug);
  if (!post) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const ts = await getTranslations("services");
  const tld = await getTranslations("locationDetail");
  const home = (await getTranslations("serviceCommon"))("home");

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  });

  const dateFmt = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const relatedServices = (post.services ?? [])
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedLocations = (post.locations ?? [])
    .map((l) => getLocation(l))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <>
      <JsonLd
        data={[
          articleLd({
            locale: locale as Locale,
            title: post.title,
            description: post.excerpt,
            path: `/blog/${slug}`,
            datePublished: post.date,
            dateModified: post.updated,
            author: post.author,
            image: post.image,
          }),
          breadcrumbLd(locale as Locale, [
            { name: home, path: "" },
            { name: t("blog"), path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: home, href: "/" },
          { name: t("blog"), href: "/blog" },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />

      <Section className="pb-24 pt-8">
        <article className="mx-auto max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-silver/15 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-silver-muted">
              {t(`categories.${post.category}`)}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-silver-muted">
              <span>{t("by", { author: post.author })}</span>
              <span className="text-silver-faint">
                {t("published")} {dateFmt.format(new Date(post.date))}
              </span>
              {post.updated && post.updated !== post.date ? (
                <span className="text-silver-faint">
                  {t("updated")} {dateFmt.format(new Date(post.updated))}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1 text-silver-faint">
                <Clock size={13} />
                {t("readingTime", { minutes: post.readingMinutes })}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 overflow-hidden rounded-3xl">
              <BlogCover category={t(`categories.${post.category}`)} seed={post.slug} />
            </div>
          </Reveal>

          <div className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:text-white prose-p:text-silver-muted prose-p:leading-relaxed prose-li:text-silver-muted prose-strong:text-white prose-a:text-neon prose-a:no-underline hover:prose-a:underline">
            {content}
          </div>

          {/* Related services + locations */}
          {relatedServices.length > 0 || relatedLocations.length > 0 ? (
            <div className="mt-12 grid gap-8 border-t border-silver/10 pt-10 sm:grid-cols-2">
              {relatedServices.length > 0 ? (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                    {t("relatedServices")}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {relatedServices.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="group inline-flex items-center gap-1.5 text-sm text-silver transition-colors hover:text-white"
                        >
                          {ts(`${s.key}.title`)}
                          <ArrowUpRight size={14} className="text-silver-faint rtl:-scale-x-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {relatedLocations.length > 0 ? (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                    {t("relatedLocations")}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {relatedLocations.map((l) => (
                      <li key={l.slug}>
                        <Link
                          href={`/locations/${l.slug}`}
                          className="group inline-flex items-center gap-1.5 text-sm text-silver transition-colors hover:text-white"
                        >
                          <MapPin size={14} className="text-neon" />
                          {tld(`${l.key}.name`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* CTA */}
          <div className="glass mt-12 rounded-3xl p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-white">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-silver-muted">
              {t("ctaBody")}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className={buttonVariants({ size: "lg" })}>
                {(await getTranslations("serviceCommon"))("ctaPrimary")}
              </Link>
              <a
                href={whatsappUrl(post.title)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "whatsapp", size: "lg" })}
              >
                {(await getTranslations("serviceCommon"))("ctaSecondary")}
              </a>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-silver transition-colors hover:text-white"
            >
              <ArrowLeft size={16} className="rtl:-scale-x-100" />
              {t("backToBlog")}
            </Link>
          </div>
        </article>
      </Section>
    </>
  );
}
