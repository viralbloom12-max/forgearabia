import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight, Clock } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceCta } from "@/components/sections/service-cta";
import { BlogCover } from "@/components/blog/blog-cover";
import { Link } from "@/i18n/navigation";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return buildMetadata({
    locale,
    path: "/blog",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const home = (await getTranslations("serviceCommon"))("home");
  const posts = getAllPosts(locale as Locale);

  const dateFmt = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <JsonLd
        data={breadcrumbLd(locale as Locale, [
          { name: home, path: "" },
          { name: t("blog"), path: "/blog" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: home, href: "/" },
          { name: t("blog"), href: "/blog" },
        ]}
      />

      <Section className="pt-10">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

        {posts.length === 0 ? (
          <p className="mt-14 text-center text-silver-muted">{t("emptyState")}</p>
        ) : (
          <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group glass block h-full overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-neon/25"
                >
                  <BlogCover
                    category={t(`categories.${post.category}`)}
                    seed={post.slug}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-silver-faint">
                      <span>{dateFmt.format(new Date(post.date))}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} />
                        {t("readingTime", { minutes: post.readingMinutes })}
                      </span>
                    </div>
                    <h2 className="mt-3 flex items-start gap-1.5 font-display text-lg font-semibold leading-snug text-white">
                      {post.title}
                      <ArrowUpRight
                        size={16}
                        className="mt-1 shrink-0 text-silver-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-neon rtl:-scale-x-100"
                      />
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-silver-muted">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </Section>

      <ServiceCta />
    </>
  );
}
