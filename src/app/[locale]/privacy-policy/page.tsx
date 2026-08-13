import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { LegalContent } from "@/components/sections/legal-content";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return buildMetadata({
    locale,
    path: "/privacy-policy",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const home = (await getTranslations("serviceCommon"))("home");

  return (
    <>
      <JsonLd
        data={breadcrumbLd(locale as Locale, [
          { name: home, path: "" },
          { name: t("title"), path: "/privacy-policy" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: home, href: "/" },
          { name: t("title"), href: "/privacy-policy" },
        ]}
      />
      <LegalContent namespace="privacy" />
    </>
  );
}
