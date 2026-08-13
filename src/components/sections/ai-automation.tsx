import { getTranslations } from "next-intl/server";
import {
  MessagesSquare,
  UserPlus,
  Workflow,
  CalendarClock,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";

export async function AiAutomation() {
  const t = await getTranslations("ai");

  const features = [
    { icon: MessagesSquare, key: "chat" },
    { icon: UserPlus, key: "leads" },
    { icon: Workflow, key: "workflows" },
    { icon: CalendarClock, key: "tasks" },
  ] as const;

  return (
    <Section id="ai-automation" className="bg-navy-950/40">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
              {t("body")}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="#contact"
              className={buttonVariants({ size: "lg", className: "mt-8" })}
            >
              {t("cta")}
              <ArrowRight size={18} className="rtl:-scale-x-100" />
            </a>
          </Reveal>
        </div>

        {/* Feature panel */}
        <StaggerGroup className="space-y-3">
          {features.map(({ icon: Icon, key }) => (
            <StaggerItem key={key}>
              <div className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-neon/25">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-neon/20">
                  <Icon size={20} />
                </span>
                <p className="text-sm font-medium text-silver sm:text-base">
                  {t(`features.${key}`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
