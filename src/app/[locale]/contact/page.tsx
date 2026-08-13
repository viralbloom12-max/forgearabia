import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Mail, Phone, MessageCircle, MapPin, Clock, ExternalLink } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { AmbientGlow } from "@/components/motion/ambient-glow";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { LeadForm } from "@/components/forms/lead-form";
import { buttonVariants } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/whatsapp";
import {
  buildMetadata,
  organizationLd,
  localBusinessLd,
  breadcrumbLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return buildMetadata({
    locale,
    path: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const ci = await getTranslations("contact.info");
  const tc = await getTranslations("common.cta");
  const home = (await getTranslations("serviceCommon"))("home");

  const mapsQuery = "Ar Rass, Al Qassim, Saudi Arabia";
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=11&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

  const details = [
    { icon: Mail, label: ci("emailLabel"), value: siteConfig.email, href: `mailto:${siteConfig.email}`, ltr: true },
    { icon: Phone, label: ci("phoneLabel"), value: siteConfig.phone, href: `tel:${siteConfig.phoneRaw}`, ltr: true },
    { icon: MessageCircle, label: ci("whatsappLabel"), value: siteConfig.phone, href: whatsappUrl(tc("whatsappPrefill")), external: true, ltr: true },
    { icon: MapPin, label: ci("locationLabel"), value: `${siteConfig.address.city}, ${siteConfig.address.region}, ${siteConfig.address.country}` },
    { icon: Clock, label: ci("hoursLabel"), value: ci("hoursValue") },
  ];

  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          localBusinessLd(locale as Locale),
          breadcrumbLd(locale as Locale, [
            { name: home, path: "" },
            { name: t("title"), path: "/contact" },
          ]),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: home, href: "/" },
          { name: t("title"), href: "/contact" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-10">
        <AmbientGlow />
        <div className="container-page relative py-14 sm:py-16">
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

      {/* Details + form */}
      <Section className="py-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <Reveal>
            <div className="space-y-4">
              {details.map((d) => {
                const inner = (
                  <div className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-neon/25">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10">
                      <d.icon size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-silver-faint">
                        {d.label}
                      </p>
                      <p className="truncate text-sm font-medium text-white" dir={d.ltr ? "ltr" : undefined}>
                        {d.value}
                      </p>
                    </div>
                  </div>
                );
                return d.href ? (
                  <a key={d.label} href={d.href} target={d.external ? "_blank" : undefined} rel={d.external ? "noopener noreferrer" : undefined} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={d.label}>{inner}</div>
                );
              })}

              {/* WhatsApp CTA */}
              <div className="glass rounded-2xl p-6">
                <h2 className="font-display text-lg font-semibold text-white">
                  {t("whatsappCtaTitle")}
                </h2>
                <p className="mt-2 text-sm text-silver-muted">
                  {t("whatsappCtaBody")}
                </p>
                <a
                  href={whatsappUrl(tc("whatsappPrefill"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "whatsapp", size: "md", className: "mt-4 w-full" })}
                >
                  <MessageCircle size={18} />
                  {tc("whatsapp")}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <LeadForm />
          </Reveal>
        </div>
      </Section>

      {/* Map / location */}
      <Section className="pb-24 pt-6">
        <Reveal>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <Eyebrow>{t("mapTitle")}</Eyebrow>
              <p className="mt-3 max-w-xl text-base text-silver-muted">
                {t("mapNote")}
              </p>
            </div>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-neon transition-colors hover:text-white"
            >
              {t("viewOnMaps")}
              <ExternalLink size={15} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="glass overflow-hidden rounded-[2rem] p-2">
            <iframe
              title={t("mapTitle")}
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full rounded-[1.6rem] border-0 grayscale-[0.2] contrast-[1.05]"
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
