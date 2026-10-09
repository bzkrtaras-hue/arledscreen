import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  locales,
  isLocale,
  getLocaleDirection,
  type Locale,
} from "@/lib/i18n";
import { SiteShell } from "@/components/layout/SiteShell";
import { LocaleHtml } from "@/components/layout/LocaleHtml";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { absoluteUrl } from "@/lib/site";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  // Page-level metadata owns hreflang (tr↔en only where content matches).
  // Do not emit home alternates for every route — that invents false pairs.
  // ar/ru are thin mirrors → keep out of the index.
  const thinLocale = locale === "ar" || locale === "ru";
  return {
    alternates: {
      canonical: absoluteUrl(`/${locale}/`),
    },
    ...(thinLocale ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dir = getLocaleDirection(locale);

  return (
    <div lang={locale} dir={dir}>
      <LocaleHtml locale={locale} />
      <OrganizationJsonLd />
      <SiteShell locale={locale}>{children}</SiteShell>
      {/* Canlı Destek (Melis): her sayfa türünde; /hesaplayici ve /fiyat-hesap widget içinde hariç tutulur. */}
      <Script src="/chat-widget.js" strategy="lazyOnload" data-locale={locale} data-pages="*" />
    </div>
  );
}
