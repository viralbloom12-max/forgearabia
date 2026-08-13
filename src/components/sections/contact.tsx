import { getTranslations } from "next-intl/server";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

export async function Contact() {
  const t = await getTranslations("contact");
  const tc = await getTranslations("common.cta");

  const details = [
    {
      icon: Mail,
      label: t("info.emailLabel"),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      ltr: true,
    },
    {
      icon: Phone,
      label: t("info.phoneLabel"),
      value: siteConfig.phone,
      href: `tel:${siteConfig.phoneRaw}`,
      ltr: true,
    },
    {
      icon: MessageCircle,
      label: t("info.whatsappLabel"),
      value: siteConfig.phone,
      href: whatsappUrl(tc("whatsappPrefill")),
      external: true,
      ltr: true,
    },
    {
      icon: MapPin,
      label: t("info.locationLabel"),
      value: `${siteConfig.address.city}, ${siteConfig.address.region}, ${siteConfig.address.country}`,
    },
    {
      icon: Clock,
      label: t("info.hoursLabel"),
      value: t("info.hoursValue"),
    },
  ];

  return (
    <Section id="contact" className="bg-navy-950/40">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        {/* Contact details */}
        <Reveal>
          <div className="space-y-4">
            {details.map((d) => {
              const inner = (
                <div className="glass flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-neon/25">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-neon ring-1 ring-inset ring-silver/10">
                    <d.icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-silver-faint">
                      {d.label}
                    </p>
                    <p
                      className="truncate text-sm font-medium text-white"
                      dir={d.ltr ? "ltr" : undefined}
                    >
                      {d.value}
                    </p>
                  </div>
                </div>
              );

              return d.href ? (
                <a
                  key={d.label}
                  href={d.href}
                  target={d.external ? "_blank" : undefined}
                  rel={d.external ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <div key={d.label}>{inner}</div>
              );
            })}
          </div>
        </Reveal>

        {/* Lead form */}
        <Reveal delay={0.1}>
          <LeadForm />
        </Reveal>
      </div>
    </Section>
  );
}
