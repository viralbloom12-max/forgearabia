import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

export async function About() {
  const t = await getTranslations("about");
  const points = ["one", "two", "three"] as const;

  return (
    <Section id="about">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Visual */}
        <Reveal className="order-last lg:order-first">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.2rem] bg-radial-glow blur-xl" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-2">
              <Image
                src={siteConfig.assets.aboutBanner}
                alt={t("title")}
                width={720}
                height={720}
                className="h-auto w-full rounded-[1.6rem] object-cover"
              />
            </div>
          </div>
        </Reveal>

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
            <p className="mt-5 text-base leading-relaxed text-silver-muted">
              {t("p1")}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-base leading-relaxed text-silver-muted">
              {t("p2")}
            </p>
          </Reveal>

          <ul className="mt-7 space-y-3">
            {points.map((p, i) => (
              <Reveal key={p} delay={0.2 + i * 0.05} as="li">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-white">
                    <Check size={14} />
                  </span>
                  <span className="text-sm font-medium text-silver">
                    {t(`points.${p}`)}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Founders */}
          <Reveal delay={0.35}>
            <div className="mt-9 border-t border-silver/10 pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-silver-faint">
                {t("foundersTitle")}
              </p>
              <div className="mt-4 flex flex-wrap gap-6">
                {siteConfig.founders.map((f) => (
                  <div key={f.name} className="flex items-center gap-3">
                    <Image
                      src={f.image}
                      alt={f.name}
                      width={52}
                      height={52}
                      className="h-13 w-13 rounded-full object-cover ring-1 ring-silver/15"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {f.name}
                      </p>
                      <p className="text-xs text-silver-muted">
                        {t(`roles.${f.roleKey}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
