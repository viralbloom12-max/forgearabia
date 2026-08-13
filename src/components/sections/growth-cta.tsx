import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export async function GrowthCta() {
  const t = await getTranslations("growthCta");
  const tc = await getTranslations("common.cta");

  return (
    <Section>
      <div className="relative overflow-hidden rounded-[2.2rem] border border-silver/12 bg-navy-950">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Copy */}
          <div className="relative z-10 px-8 py-14 sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 top-0 h-60 w-60 rounded-full bg-electric/20 blur-[100px]"
            />
            <Reveal>
              <h2 className="relative max-w-xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="relative mt-5 max-w-lg text-base leading-relaxed text-silver-muted">
                {t("body")}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className={buttonVariants({ size: "lg" })}>
                  {t("ctaPrimary")}
                </a>
                <a
                  href={whatsappUrl(tc("whatsappPrefill"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "whatsapp", size: "lg" })}
                >
                  {t("ctaSecondary")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Brand banner */}
          <div className="relative hidden h-full min-h-[320px] lg:block">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy-950 via-navy-950/40 to-transparent rtl:bg-gradient-to-l" />
            <Image
              src={siteConfig.assets.growthCta}
              alt={t("title")}
              fill
              sizes="(max-width: 1024px) 0px, 40vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
