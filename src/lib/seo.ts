import type { Metadata } from "next";
import { buildAlternates, type Locale } from "@/lib/i18n";
import { absoluteUrl, SITE_URL } from "@/lib/site";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  tr: "tr_TR",
  ar: "ar_SA",
  ru: "ru_RU",
};

export interface BuildPageMetadataInput {
  locale: Locale;
  /** Path after locale, e.g. "" | "/" | "/products" */
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  /**
   * When this locale only mirrors another locale's text (e.g. ar/ru guides that
   * show the English guide), canonicalise to that locale instead of self.
   */
  canonicalLocale?: Locale;
  /** Restrict hreflang alternates to locales that have their own text. */
  hreflangLocales?: Locale[];
}

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

/**
 * Shared page Metadata builder — canonical, hreflang, OG, Twitter.
 * siteName / titles use ARLEDSCREEN only; NXTIONSTAR stays on product pages as sub-brand.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  canonicalLocale,
  hreflangLocales,
}: BuildPageMetadataInput): Metadata {
  const clean = normalizePath(path);
  const url = absoluteUrl(`/${canonicalLocale ?? locale}${clean}`);
  const all = buildAlternates(clean || "/");
  const languages = hreflangLocales
    ? Object.fromEntries(Object.entries(all).filter(([l]) => hreflangLocales.includes(l as Locale)))
    : all;

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: "ARLEDSCREEN",
      locale: OG_LOCALE[locale],
      type: "website",
      images: [{ url: "/og/arledscreen-og.jpg", width: 1200, height: 630, alt: "ARLEDSCREEN — LED Ekran Teknoloji Merkezi" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og/arledscreen-og.jpg"],
    },
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": absoluteUrl(`/tr${clean}`),
      },
    },
    metadataBase: new URL(SITE_URL),
  };
}

/** Metadata for Turkish-only pages (no hreflang alternates to missing locales). */
export function buildTrOnlyMetadata({
  path,
  title,
  description,
  image,
  type = "website",
}: {
  path: string;
  title: string;
  description: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
}): Metadata {
  const clean = normalizePath(path);
  const og = image ?? { url: "/og/arledscreen-og.jpg", width: 1200, height: 630, alt: "ARLEDSCREEN — LED Ekran Teknoloji Merkezi" };
  const url = absoluteUrl(`/tr${clean}`);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "ARLEDSCREEN",
      locale: "tr_TR",
      type,
      images: [og],
    },
    twitter: { card: "summary_large_image", title, description, images: [og.url] },
    alternates: { canonical: url },
    metadataBase: new URL(SITE_URL),
  };
}
