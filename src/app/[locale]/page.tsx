import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("foundation");

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="container-page relative flex min-h-screen flex-col items-center justify-center text-center">
        <Image
          src={siteConfig.assets.logo}
          alt={siteConfig.name}
          width={220}
          height={64}
          priority
          className="mb-10 h-auto w-[200px]"
        />
        <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {t("workingTitle")}
        </h1>
        <p className="mt-4 max-w-xl text-silver-muted">{t("workingBody")}</p>
      </div>
    </main>
  );
}
