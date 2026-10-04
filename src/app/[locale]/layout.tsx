import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  locales,
  isLocale,
  getLocaleDirection,
  buildAlternates,
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
  const languages = buildAlternates("/");

  return {
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: {
        ...languages,
        "x-default": absoluteUrl("/tr/"),
      },
    },
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
    </div>
  );
}
