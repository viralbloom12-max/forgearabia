import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { routing, locales, localeDirection, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { fontSans, fontDisplay, fontArabic } from "../fonts";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#080B24",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Premium Digital Transformation Partner in Saudi Arabia`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Forge Arabia is a premium digital partner in Al Qassim helping Saudi businesses grow with web development, e-commerce, SEO, and AI automation.",
  icons: {
    icon: siteConfig.assets.favicon,
    shortcut: siteConfig.assets.favicon,
    apple: siteConfig.assets.favicon,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Google Search Console verification, set only when the env var is present.
  // No placeholder is emitted, so the site stays production ready.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const dir = localeDirection[locale as Locale];
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={cn(
        fontSans.variable,
        fontDisplay.variable,
        fontArabic.variable,
      )}
    >
      <body className={cn(locale === "ar" ? "font-arabic" : "font-sans")}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
