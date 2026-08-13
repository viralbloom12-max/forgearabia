import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/whatsapp";

export async function PortfolioRequest() {
  const t = await getTranslations("portfolio");

  return (
    <Section id="portfolio">
      <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-electric/15 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-neon/10 blur-[110px]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {t("title")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-silver-muted">
                {t("body")}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl(t("whatsappPrefill"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ size: "lg" })}
                >
                  {t("cta")}
                  <ArrowRight size={18} className="rtl:-scale-x-100" />
                </a>
                <a
                  href="#contact"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  {t("ctaSecondary")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Abstract preview stack (no fabricated screenshots) */}
          <Reveal delay={0.1}>
            <div className="relative mx-auto w-full max-w-sm">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="glass mb-4 rounded-2xl p-4 last:mb-0"
                  style={{
                    marginInlineStart: `${i * 18}px`,
                    opacity: 1 - i * 0.18,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-electric/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neon/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-silver/30" />
                  </div>
                  <div className="mt-4 h-2.5 w-2/3 rounded-full bg-brand-gradient" />
                  <div className="mt-2.5 h-2 w-full rounded-full bg-silver/10" />
                  <div className="mt-2 h-2 w-4/5 rounded-full bg-silver/10" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
