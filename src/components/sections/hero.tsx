import { getTranslations } from "next-intl/server";
import { Cpu, LineChart, Bot, MapPin } from "lucide-react";
import { AmbientGlow } from "@/components/motion/ambient-glow";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/whatsapp";

export async function Hero() {
  const t = await getTranslations("hero");
  const tc = await getTranslations("common.cta");

  const pillars = [
    { icon: Cpu, label: t("pillars.technology") },
    { icon: LineChart, label: t("pillars.marketing") },
    { icon: Bot, label: t("pillars.automation") },
    { icon: MapPin, label: t("pillars.market") },
  ];

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16">
      <AmbientGlow />
      {/* Subtle technical grid, very low contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(201,206,216,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,206,216,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-silver/15 bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-silver-muted sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-neon shadow-[0_0_8px_2px_rgba(0,184,255,0.5)]" />
              {t("badge")}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-silver-muted sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}
              >
                {t("ctaPrimary")}
              </a>
              <a
                href={whatsappUrl(tc("whatsappPrefill"))}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "w-full sm:w-auto",
                })}
              >
                {t("ctaSecondary")}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="mt-5 text-sm text-silver-faint">{t("trustline")}</p>
          </Reveal>
        </div>

        {/* Four pillars: the core of what Forge Arabia combines */}
        <Reveal delay={0.32}>
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="glass flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center transition-colors duration-300 hover:border-neon/25"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-neon/20">
                  <Icon size={20} />
                </span>
                <span className="text-sm font-medium text-silver">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
