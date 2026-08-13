import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { platforms } from "@/config/platforms";

export async function Platforms() {
  const t = await getTranslations("platforms");
  // Duplicate the list so the marquee can loop seamlessly.
  const row = [...platforms, ...platforms];

  return (
    <section className="relative overflow-hidden border-y border-silver/10 py-16">
      <div className="container-page">
        <Reveal className="text-center">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-silver-muted sm:text-base">
            {t("intro")}
          </p>
        </Reveal>
      </div>

      <div className="group relative mt-12">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-navy-900 to-transparent rtl:bg-gradient-to-l" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-navy-900 to-transparent rtl:bg-gradient-to-r" />

        <div className="flex w-max animate-marquee items-center gap-4 group-hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="glass whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium text-silver"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
