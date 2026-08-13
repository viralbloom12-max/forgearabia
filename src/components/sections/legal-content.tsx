import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

interface LegalSection {
  title: string;
  body: string[];
}

/**
 * Renders a legal document (privacy policy, terms) from a message namespace:
 * intro, an array of titled sections, and a contact block whose email and
 * phone are interpolated from site config so they stay in sync.
 */
export async function LegalContent({ namespace }: { namespace: "privacy" | "terms" }) {
  const t = await getTranslations(namespace);
  const sections = t.raw("sections") as LegalSection[];

  return (
    <Section className="pb-24 pt-6">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {t("title")}
          </h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 text-sm text-silver-faint">{t("updated")}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-base leading-relaxed text-silver-muted">
            {t("intro")}
          </p>
        </Reveal>

        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i * 0.03, 0.15)}>
              <div>
                <h2 className="font-display text-xl font-semibold text-white">
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-base leading-relaxed text-silver-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-xl font-semibold text-white">
                {t("contactTitle")}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-silver-muted">
                {t("contactBody", { email: siteConfig.email, phone: siteConfig.phone })}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
