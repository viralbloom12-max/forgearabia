import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { whatsappUrl } from "@/lib/whatsapp";

/** Shared closing call to action used across service landing pages. */
export async function ServiceCta({ prefill }: { prefill?: string }) {
  const t = await getTranslations("serviceCommon");
  const tc = await getTranslations("common.cta");

  return (
    <Section>
      <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-radial-glow"
        />
        <Reveal>
          <h2 className="relative font-display text-3xl font-semibold text-white sm:text-4xl">
            {t("ctaTitle")}
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-silver-muted">
            {t("ctaBody")}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/#contact" className={buttonVariants({ size: "lg" })}>
              {t("ctaPrimary")}
            </Link>
            <a
              href={whatsappUrl(prefill ?? tc("whatsappPrefill"))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "whatsapp", size: "lg" })}
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
