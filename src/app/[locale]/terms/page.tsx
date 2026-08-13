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
  const t = await getTranslations({ locale, namespace: "terms" });
  return buildMetadata({
    locale,
    path: "/terms",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");
  const home = (await getTranslations("serviceCommon"))("home");

  return (
    <>
      <JsonLd
        data={breadcrumbLd(locale as Locale, [
          { name: home, path: "" },
          { name: t("title"), path: "/terms" },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: home, href: "/" },
          { name: t("title"), href: "/terms" },
        ]}
      />
      <LegalContent namespace="terms" />
    </>
  );
}
