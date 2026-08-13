import { setRequestLocale } from "next-intl/server";
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
