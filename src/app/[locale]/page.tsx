import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { buildMetadata, organizationLd, localBusinessLd } from "@/lib/seo";
import { type Locale } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { Trust } from "@/components/sections/trust";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Platforms } from "@/components/sections/platforms";
import { AiAutomation } from "@/components/sections/ai-automation";
import { PortfolioRequest } from "@/components/sections/portfolio-request";
import { GrowthCta } from "@/components/sections/growth-cta";
import { Contact } from "@/components/sections/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({
    locale,
    path: "",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={[organizationLd(), localBusinessLd(locale as Locale)]} />
      <Hero />
      <Trust />
      <About />
      <Services />
      <WhyUs />
      <Process />
      <Platforms />
      <AiAutomation />
      <PortfolioRequest />
      <GrowthCta />
      <Contact />
    </>
  );
}
