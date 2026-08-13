import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { mainNav } from "@/config/navigation";
import { whatsappUrl } from "@/lib/whatsapp";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-silver/10 bg-navy-950">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12">
        {/* Brand + contact */}
        <div className="lg:col-span-5">
          <Image
            src={siteConfig.assets.logo}
            alt={siteConfig.name}
            width={170}
            height={46}
            className="h-10 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver-muted">
            {t("footer.tagline")}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-silver-muted">
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-neon" />
              {t("footer.location")}
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail size={16} className="text-neon" />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
                dir="ltr"
              >
                <Phone size={16} className="text-neon" />
                {siteConfig.phone}
              </a>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.company")}
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-silver-muted">
            {mainNav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="lg:col-span-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.services")}
          </h3>
          <ul className="mt-5 grid grid-cols-1 gap-3 text-sm text-silver-muted sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {t(`services.${s.key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-silver/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-silver-faint sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name}. {t("footer.rights")}
          </p>
          <a
            href={whatsappUrl(t("footer.whatsappPrefill"))}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            {t("common.cta.whatsapp")}
          </a>
        </div>
      </div>
    </footer>
  );
}
