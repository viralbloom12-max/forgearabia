import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MapPin, ArrowUpRight } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { qassimLocations, cityLocations, type LocationDef } from "@/config/locations";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
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
  const t = await getTranslations({ locale, namespace: "locationCommon" });
  return buildMetadata({
    locale,
    path: "/locations",
    title: t("overviewMetaTitle"),
    description: t("overviewMetaDescription"),
  });
}

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("locationCommon");
  const td = await getTranslations("locationDetail");

  return (
    <>
      <JsonLd
        data={breadcrumbLd(locale as Locale, [
          { name: (await getTranslations("serviceCommon"))("home"), path: "" },
          { name: t("locations"), path: "/locations" },
        ])}
      />

      <Breadcrumbs
        items={[
          { name: (await getTranslations("serviceCommon"))("home"), href: "/" },
          { name: t("locations"), href: "/locations" },
        ]}
      />

      <Section className="pt-10">
        <SectionHeading
          eyebrow={t("overviewEyebrow")}
          title={t("overviewTitle")}
          intro={t("overviewIntro")}
        />
      </Section>

      <LocationGroup
        title={t("qassimTitle")}
        note={t("qassimNote")}
        items={qassimLocations}
        nameFor={(key) => td(`${key}.name`)}
      />
      <LocationGroup
        title={t("citiesTitle")}
        note={t("citiesNote")}
        items={cityLocations}
        nameFor={(key) => td(`${key}.name`)}
        tinted
      />

      <ServiceCta />
    </>
  );
}

function LocationGroup({
  title,
  note,
  items,
  nameFor,
  tinted = false,
}: {
  title: string;
  note: string;
  items: LocationDef[];
  nameFor: (key: string) => string;
  tinted?: boolean;
}) {
  return (
    <Section className={tinted ? "bg-navy-950/40 py-16" : "py-16"}>
      <div className="max-w-2xl">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 text-base leading-relaxed text-silver-muted">
            {note}
          </p>
        </Reveal>
      </div>
      <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ slug, key }) => (
          <StaggerItem key={slug}>
            <Link
              href={`/locations/${slug}`}
              className="group glass flex items-center gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/25"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10">
                <MapPin size={20} />
              </span>
              <span className="flex-1 font-display text-lg font-semibold text-white">
                {nameFor(key)}
              </span>
              <ArrowUpRight
                size={18}
                className="text-silver-faint transition-transform group-hover:translate-x-0.5 group-hover:text-neon rtl:-scale-x-100"
              />
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
