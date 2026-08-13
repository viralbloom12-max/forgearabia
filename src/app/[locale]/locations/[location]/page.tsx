import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MapPin, ArrowUpRight } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { locations, getLocation } from "@/config/locations";
import { services } from "@/config/services";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { AmbientGlow } from "@/components/motion/ambient-glow";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { whatsappUrl } from "@/lib/whatsapp";
import {
  buildMetadata,
  locationBusinessLd,
  breadcrumbLd,
  faqLd,
} from "@/lib/seo";

interface Faq {
  q: string;
  a: string;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    locations.map((l) => ({ locale, location: l.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; location: string }>;
}): Promise<Metadata> {
  const { locale, location } = await params;
  const def = getLocation(location);
  if (!def) return {};
  const t = await getTranslations({
    locale,
    namespace: `locationDetail.${def.key}`,
  });
  return buildMetadata({
    locale,
    path: `/locations/${location}`,
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; location: string }>;
}) {
  const { locale, location } = await params;
  const def = getLocation(location);
  if (!def) notFound();

  setRequestLocale(locale);
  const t = await getTranslations(`locationDetail.${def.key}`);
  const tld = await getTranslations("locationDetail");
  const tc = await getTranslations("locationCommon");
  const ts = await getTranslations("services");
  const tsc = await getTranslations("serviceCommon");
  const ti = await getTranslations("locationIndustries");

  const city = t("name");
  const faqs = t.raw("faqs") as Faq[];
  const industries = ti.raw(def.key) as string[];
  const path = `/locations/${location}`;
  const related = locations.filter((l) => l.slug !== location);

  return (
    <>
      <JsonLd
        data={[
          locationBusinessLd({
            locale: locale as Locale,
            city,
            description: t("metaDescription"),
            path,
            geo: def.geo,
          }),
          breadcrumbLd(locale as Locale, [
            { name: tsc("home"), path: "" },
            { name: tc("locations"), path: "/locations" },
            { name: city, path },
          ]),
          faqLd(faqs),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: tsc("home"), href: "/" },
          { name: tc("locations"), href: "/locations" },
          { name: city, href: path },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-10">
        <AmbientGlow />
        <div className="container-page relative py-14 sm:py-20">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-silver/15 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-silver-muted">
                <MapPin size={13} className="text-neon" />
                {tc("locations")}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl">
                {t("h1")}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-silver-muted">
                {t("tagline")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/#contact" className={buttonVariants({ size: "lg" })}>
                  {tc("ctaPrimary")}
                </Link>
                <a
                  href={whatsappUrl(t("metaTitle"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  {tc("ctaSecondary")}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Local introduction */}
      <Section className="py-10">
        <div className="max-w-3xl space-y-5">
          <Reveal>
            <p className="text-lg leading-relaxed text-silver">{t("intro1")}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="text-base leading-relaxed text-silver-muted">
              {t("intro2")}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Relevant services */}
      <Section className="bg-navy-950/40 py-20">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{tc("servicesTitle", { city })}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-base leading-relaxed text-silver-muted">
              {tc("servicesIntro", { city })}
            </p>
          </Reveal>
        </div>
        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ slug, key, icon: Icon }) => (
            <StaggerItem key={slug}>
              <Link
                href={`/services/${slug}`}
                className="group glass flex h-full items-start gap-3 rounded-2xl p-5 transition-colors hover:border-neon/25"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10">
                  <Icon size={18} />
                </span>
                <span className="text-sm font-medium text-silver group-hover:text-white">
                  {ts(`${key}.title`)}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* Local industries */}
      <Section className="py-20">
        <Reveal>
          <Eyebrow>{tc("industriesTitle", { city })}</Eyebrow>
        </Reveal>
        <StaggerGroup className="mt-8 flex flex-wrap gap-3">
          {industries.map((name) => (
            <StaggerItem key={name}>
              <span className="glass inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-silver">
                {name}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* FAQ */}
      <Section className="bg-navy-950/40 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <Eyebrow>{tc("faqTitle")}</Eyebrow>
          </Reveal>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <details className="glass group rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-white">
                    {f.q}
                    <span className="text-neon transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-silver-muted">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Other locations */}
      <Section className="py-20">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            {tc("relatedTitle")}
          </h2>
        </Reveal>
        <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((l) => (
            <StaggerItem key={l.slug}>
              <Link
                href={`/locations/${l.slug}`}
                className="group glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-neon/25"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10">
                  <MapPin size={18} />
                </span>
                <span className="flex-1 text-sm font-medium text-silver group-hover:text-white">
                  {tld(`${l.key}.name`)}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-silver-faint transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100"
                />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* CTA */}
      <Section>
        <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-radial-glow"
          />
          <Reveal>
            <h2 className="relative font-display text-3xl font-semibold text-white sm:text-4xl">
              {tc("ctaTitle", { city })}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="relative mx-auto mt-4 max-w-xl text-base text-silver-muted">
              {tc("ctaBody")}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/#contact" className={buttonVariants({ size: "lg" })}>
                {tc("ctaPrimary")}
              </Link>
              <a
                href={whatsappUrl(t("metaTitle"))}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "whatsapp", size: "lg" })}
              >
                {tc("ctaSecondary")}
              </a>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
