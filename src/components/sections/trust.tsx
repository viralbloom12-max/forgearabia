import { getTranslations } from "next-intl/server";
import { MapPin, Languages, Landmark, Users } from "lucide-react";
import { StaggerGroup, StaggerItem, Reveal } from "@/components/motion/reveal";

export async function Trust() {
  const t = await getTranslations("trust");

  const items = [
    { icon: MapPin, key: "saudi" },
    { icon: Languages, key: "bilingual" },
    { icon: Landmark, key: "vision" },
    { icon: Users, key: "senior" },
  ] as const;

  return (
    <section className="relative border-y border-silver/10 bg-navy-950/40 py-14">
      <div className="container-page">
        <Reveal>
          <p className="text-center text-sm font-medium uppercase tracking-[0.16em] text-silver-faint">
            {t("lead")}
          </p>
        </Reveal>
        <StaggerGroup className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, key }) => (
            <StaggerItem key={key} className="flex gap-4">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10">
                <Icon size={18} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-silver-muted">
                  {t(`items.${key}.text`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
