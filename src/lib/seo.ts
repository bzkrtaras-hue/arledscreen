import type { Metadata } from "next";
import { buildAlternates, type Locale } from "@/lib/i18n";
import { absoluteUrl, SITE_URL } from "@/lib/site";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  tr: "tr_TR",
  ar: "ar_SA",
  ru: "ru_RU",
};

/**
 * Paths whose non-TR locales are thin shells (TR-gated UI / no dedicated copy).
 * Non-TR → noindex + canonical→TR + no hreflang. Keep out of EN sitemap.
 */
export const THIN_LOCALE_PATHS = ["/products", "/about", "/hesaplayici", "/quote"] as const;

export type ThinLocalePath = (typeof THIN_LOCALE_PATHS)[number];

export function isThinLocalePath(path: string): path is ThinLocalePath {
  const clean = path.replace(/\/$/, "") || "/";
  return (THIN_LOCALE_PATHS as readonly string[]).includes(clean);
}

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

/** Shared metadata for thin non-TR shells: noindex, consolidate to TR canonical. */
export function buildThinLocaleMetadata(
  input: Omit<BuildPageMetadataInput, "hreflangLocales" | "canonicalLocale">,
): Metadata {
  return {
    ...buildPageMetadata({
      ...input,
      canonicalLocale: "tr",
      hreflangLocales: [],
    }),
    robots: { index: false, follow: true },
  };
}

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

/**
 * Shared page Metadata builder — canonical, hreflang, OG, Twitter.
 * siteName / titles use ARLEDSCREEN only; NXTIONSTAR stays on product pages as sub-brand.
 * Default hreflang pair is tr↔en only (true counterparts). Pass hreflangLocales to override;
 * omit languages entirely by passing hreflangLocales: [].
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  canonicalLocale,
  hreflangLocales = ["tr", "en"],
}: BuildPageMetadataInput): Metadata {
  const clean = normalizePath(path);
  const url = absoluteUrl(`/${canonicalLocale ?? locale}${clean}`);
  const all = buildAlternates(clean || "/");
  const languages = hreflangLocales.length
    ? Object.fromEntries(Object.entries(all).filter(([l]) => hreflangLocales.includes(l as Locale)))
    : undefined;

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
      ...(languages
        ? {
            languages: {
              ...languages,
              "x-default": absoluteUrl(`/tr${clean}`),
            },
          }
        : {}),
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
