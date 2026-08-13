import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { services } from "@/config/services";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceCta } from "@/components/sections/service-cta";
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
  const t = await getTranslations({ locale, namespace: "serviceCommon" });
  return buildMetadata({
    locale,
    path: "/services",
    title: t("overviewMetaTitle"),
    description: t("overviewMetaDescription"),
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("serviceCommon");
  const ts = await getTranslations("services");

  const crumbs = [
    { name: t("home"), href: "/" },
    { name: t("services"), href: "/services" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(locale as Locale, [
        { name: t("home"), path: "" },
        { name: t("services"), path: "/services" },
      ])} />

      <Breadcrumbs items={crumbs} />

      <Section className="pt-10">
        <SectionHeading
          eyebrow={t("overviewEyebrow")}
          title={t("overviewTitle")}
          intro={t("overviewIntro")}
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ slug, key, icon: Icon }) => (
            <StaggerItem key={slug}>
              <Link
                href={`/services/${slug}`}
                className="group glass block h-full rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-neon/25"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10 transition-colors group-hover:text-white group-hover:ring-neon/30">
                  <Icon size={22} />
                </span>
                <h2 className="mt-5 flex items-center gap-1.5 font-display text-lg font-semibold text-white">
                  {ts(`${key}.title`)}
                  <ArrowUpRight
                    size={16}
                    className="text-silver-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-neon rtl:-scale-x-100"
                  />
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-silver-muted">
                  {ts(`${key}.summary`)}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <ServiceCta />
    </>
  );
}
