import { getTranslations } from "next-intl/server";
import {
  Layers,
  MapPinned,
  Gem,
  BarChart3,
  Bot,
  MessageSquare,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export async function WhyUs() {
  const t = await getTranslations("whyUs");

  const items = [
    { icon: Layers, key: "oneTeam" },
    { icon: MapPinned, key: "saudiMarket" },
    { icon: Gem, key: "premium" },
    { icon: BarChart3, key: "results" },
    { icon: Bot, key: "automation" },
    { icon: MessageSquare, key: "honest" },
  ] as const;

  return (
    <Section id="why-us" className="bg-navy-950/40">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

      <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, key }) => (
          <StaggerItem key={key}>
            <div className="glass h-full rounded-3xl p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-silver-muted">
                {t(`items.${key}.text`)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
