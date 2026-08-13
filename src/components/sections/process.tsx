import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export async function Process() {
  const t = await getTranslations("process");
  const steps = ["discovery", "strategy", "build", "launch", "growth"] as const;

  return (
    <Section id="process">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      <StaggerGroup className="relative mt-16 grid gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
        {/* Connecting line on desktop */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-silver/15 to-transparent lg:block"
        />
        {steps.map((step, i) => (
          <StaggerItem key={step} className="relative">
            <div className="flex flex-col items-start lg:items-center lg:text-center">
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-silver/15 bg-navy-900 font-display text-lg font-semibold">
                <span className="text-gradient">{i + 1}</span>
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                {t(`steps.${step}.title`)}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-silver-muted">
                {t(`steps.${step}.text`)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
