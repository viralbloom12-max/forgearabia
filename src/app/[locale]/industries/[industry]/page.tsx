import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Check, ArrowUpRight } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { industries, getIndustry } from "@/config/industries";
import { getService } from "@/config/services";
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
  serviceLd,
  breadcrumbLd,
  faqLd,
} from "@/lib/seo";

interface Item {
  title: string;
  text: string;
}
interface Faq {
  q: string;
  a: string;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    industries.map((i) => ({ locale, industry: i.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}): Promise<Metadata> {
  const { locale, industry } = await params;
  const def = getIndustry(industry);
  if (!def) return {};
  const t = await getTranslations({
    locale,
    namespace: `industryDetail.${def.key}`,
  });
  return buildMetadata({
    locale,
    path: `/industries/${industry}`,
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale, industry } = await params;
  const def = getIndustry(industry);
  if (!def) notFound();

  setRequestLocale(locale);
  const t = await getTranslations(`industryDetail.${def.key}`);
  const tid = await getTranslations("industryDetail");
  const tc = await getTranslations("industryCommon");
  const ts = await getTranslations("services");
  const home = (await getTranslations("serviceCommon"))("home");

  const name = t("name");
  const helps = t.raw("helps") as Item[];
  const faqs = t.raw("faqs") as Faq[];
  const path = `/industries/${industry}`;
  const related = industries.filter((i) => i.slug !== industry);
  const relevantServices = def.services
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const Icon = def.icon;

  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            locale: locale as Locale,
            name: t("h1"),
            description: t("metaDescription"),
            path,
          }),
          breadcrumbLd(locale as Locale, [
            { name: home, path: "" },
            { name: tc("industries"), path: "/industries" },
            { name, path },
          ]),
          faqLd(faqs),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: home, href: "/" },
          { name: tc("industries"), href: "/industries" },
          { name, href: path },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-10">
        <AmbientGlow />
        <div className="container-page relative py-14 sm:py-20">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-neon ring-1 ring-inset ring-neon/20">
                <Icon size={26} />
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

      {/* Intro */}
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

      {/* How we help */}
      <Section className="bg-navy-950/40 py-20">
        <Reveal>
          <Eyebrow>{tc("helpsTitle", { industry: name })}</Eyebrow>
        </Reveal>
        <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3">
          {helps.map((item) => (
            <StaggerItem key={item.title}>
              <div className="h-full">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-white">
                  <Check size={16} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-muted">
                  {item.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* Recommended services */}
      <Section className="py-20">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{tc("servicesTitle")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-base leading-relaxed text-silver-muted">
              {tc("servicesIntro", { industry: name })}
            </p>
          </Reveal>
        </div>
        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relevantServices.map((s) => (
            <StaggerItem key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group glass flex h-full items-start gap-3 rounded-2xl p-5 transition-colors hover:border-neon/25"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10">
                  <s.icon size={18} />
                </span>
                <span className="text-sm font-medium text-silver group-hover:text-white">
                  {ts(`${s.key}.title`)}
                </span>
              </Link>
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

      {/* Other industries */}
      <Section className="py-20">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            {tc("relatedTitle")}
          </h2>
        </Reveal>
        <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map(({ slug, key, icon: RIcon }) => (
            <StaggerItem key={slug}>
              <Link
                href={`/industries/${slug}`}
                className="group glass flex items-center gap-3 rounded-2xl p-5 transition-colors hover:border-neon/25"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10">
                  <RIcon size={18} />
                </span>
                <span className="flex-1 text-sm font-medium text-silver group-hover:text-white">
                  {tid(`${key}.name`)}
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
              {tc("ctaTitle")}
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
