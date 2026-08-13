import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/config/services";

export async function Services() {
  const t = await getTranslations("services");

  return (
    <Section id="services">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ slug, key, icon: Icon }) => (
          <StaggerItem key={slug}>
            <div className="group glass relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/25">
              <div className="pointer-events-none absolute inset-x-0 -top-24 h-32 bg-radial-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10 transition-colors group-hover:text-white group-hover:ring-neon/30">
                <Icon size={22} />
              </span>
              <h3 className="relative mt-5 flex items-center gap-1.5 font-display text-lg font-semibold text-white">
                {t(`${key}.title`)}
                <ArrowUpRight
                  size={16}
                  className="text-silver-faint opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 rtl:-scale-x-100"
                />
              </h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-silver-muted">
                {t(`${key}.summary`)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.1}>
        <div className="mt-12 text-center">
          <a href="#contact" className={buttonVariants({ size: "lg" })}>
            {t("cta")}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
