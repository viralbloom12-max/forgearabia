import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Target, Eye, Globe, LayoutDashboard, Search, LineChart, Bot } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { AmbientGlow } from "@/components/motion/ambient-glow";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceCta } from "@/components/sections/service-cta";
import { buildMetadata, organizationLd, breadcrumbLd } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return buildMetadata({
    locale,
    path: "/about",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");
  const tr = await getTranslations("about"); // founder role labels
  const home = (await getTranslations("serviceCommon"))("home");

  const teamRoles = [
    { icon: Globe, key: "webDev" },
    { icon: LayoutDashboard, key: "design" },
    { icon: Search, key: "seo" },
    { icon: LineChart, key: "marketing" },
    { icon: Bot, key: "ai" },
  ] as const;

  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          breadcrumbLd(locale as Locale, [
            { name: home, path: "" },
            { name: t("title"), path: "/about" },
          ]),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: home, href: "/" },
          { name: t("title"), href: "/about" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-10">
        <AmbientGlow />
        <div className="container-page relative py-14 sm:py-20">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl">
                {t("title")}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-silver-muted">
                {t("lead")}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section className="py-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-last lg:order-first">
            <div className="glass overflow-hidden rounded-[2rem] p-2">
              <Image
                src={siteConfig.assets.aboutBanner}
                alt={t("title")}
                width={720}
                height={720}
                className="h-auto w-full rounded-[1.6rem] object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {t("storyTitle")}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-base leading-relaxed text-silver-muted">
                {t("story1")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-silver-muted">
                {t("story2")}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Mission + Vision */}
      <Section className="bg-navy-950/40 py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { icon: Target, title: t("missionTitle"), body: t("mission") },
            { icon: Eye, title: t("visionTitle"), body: t("vision") },
          ].map(({ icon: Icon, title, body }) => (
            <Reveal key={title}>
              <div className="glass h-full rounded-3xl p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-neon ring-1 ring-inset ring-neon/20">
                  <Icon size={22} />
                </span>
                <h2 className="mt-5 font-display text-xl font-semibold text-white">
                  {title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-silver-muted">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Saudi market + positioning */}
      <Section className="py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>{t("marketTitle")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-base leading-relaxed text-silver-muted">
                {t("market1")}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-silver-muted">
                {t("market2")}
              </p>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {t("positioningTitle")}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-base leading-relaxed text-silver-muted">
                {t("positioning")}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Founders + team */}
      <Section className="bg-navy-950/40 py-20">
        <Reveal>
          <Eyebrow>{t("foundersTitle")}</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {siteConfig.founders.map((f) => (
            <Reveal key={f.name}>
              <div className="glass flex items-center gap-5 rounded-3xl p-6">
                <Image
                  src={f.image}
                  alt={f.name}
                  width={72}
                  height={72}
                  className="h-18 w-18 rounded-2xl object-cover ring-1 ring-silver/15"
                />
                <div>
                  <p className="font-display text-lg font-semibold text-white">
                    {f.name}
                  </p>
                  <p className="mt-1 text-sm text-neon">{tr(`roles.${f.roleKey}`)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {t("teamTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-silver-muted">
              {t("teamLead")}
            </p>
          </Reveal>
          <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {teamRoles.map(({ icon: Icon, key }) => (
              <StaggerItem key={key}>
                <div className="glass h-full rounded-2xl p-5 text-center">
                  <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10">
                    <Icon size={20} />
                  </span>
                  <p className="mt-4 text-sm font-medium text-silver">
                    {t(`roles.${key}`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Section>

      <ServiceCta />
    </>
  );
}
