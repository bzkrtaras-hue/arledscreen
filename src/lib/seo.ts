import type { Metadata } from "next";
import { buildAlternates, type Locale } from "@/lib/i18n";
import { absoluteUrl, SITE_URL } from "@/lib/site";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  tr: "tr_TR",
  ar: "ar_SA",
  ru: "ru_RU",
};

/** Bing Webmaster: meta description should stay within 25–160 characters. */
export const META_DESCRIPTION_MIN = 25;
export const META_DESCRIPTION_MAX = 160;

const META_DESCRIPTION_FALLBACK =
  "ARLEDSCREEN — LED ekran satış, montaj ve teknik servis. İstanbul Gaziosmanpaşa.";

/**
 * Next.js escapes meta attribute text (`'` → `&#x27;`, `&` → `&amp;`, …).
 * Bing counts the attribute source length, so clamp against encoded size.
 */
export function htmlAttrEncodedLength(text: string): number {
  let n = 0;
  for (const ch of text) {
    if (ch === "&") n += 5; // &amp;
    else if (ch === "'") n += 6; // &#x27;
    else if (ch === '"') n += 6; // &quot;
    else if (ch === "<") n += 4; // &lt;
    else if (ch === ">") n += 4; // &gt;
    else n += 1;
  }
  return n;
}

function truncateMetaDescription(text: string): string {
  // Walk down until encoded length fits Bing’s 160 cap.
  let end = text.length;
  while (end > 0 && htmlAttrEncodedLength(text.slice(0, end)) > META_DESCRIPTION_MAX) {
    end -= 1;
  }
  let cut = text.slice(0, end);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace >= META_DESCRIPTION_MIN) {
    cut = cut.slice(0, lastSpace);
  }
  return cut.replace(/[\s.,;:–—-]+$/u, "").trim();
}

/**
 * Clamp a meta description into Bing’s 25–160 character window.
 * Uses HTML-attribute encoded length (apostrophes expand to &#x27;).
 * Truncates on a word boundary when too long; pads with a short brand line when too short.
 */
export function clampMetaDescription(raw: string): string {
  const text = raw.replace(/\s+/g, " ").trim();
  if (!text) return META_DESCRIPTION_FALLBACK;

  const encoded = htmlAttrEncodedLength(text);
  if (encoded >= META_DESCRIPTION_MIN && encoded <= META_DESCRIPTION_MAX) {
    return text;
  }

  if (encoded > META_DESCRIPTION_MAX) {
    return truncateMetaDescription(text);
  }

  const padded = `${text} ${META_DESCRIPTION_FALLBACK}`.replace(/\s+/g, " ").trim();
  if (htmlAttrEncodedLength(padded) <= META_DESCRIPTION_MAX) return padded;
  return truncateMetaDescription(padded);
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
  const desc = clampMetaDescription(description);

  return {
    title,
    description: desc,
    ...(keywords?.length ? { keywords } : {}),
    openGraph: {
      title,
      description: desc,
      url,
      siteName: "ARLEDSCREEN",
      locale: OG_LOCALE[locale],
      type: "website",
      images: [{ url: "/og/arledscreen-og.jpg", width: 1200, height: 630, alt: "ARLEDSCREEN — LED Ekran Teknoloji Merkezi" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
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
  productMeta,
}: {
  path: string;
  title: string;
  description: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  /** Open Graph product:* tags for priced PDP shopping crawlers. */
  productMeta?: {
    amountUsd: number;
    sku: string;
    brand?: string;
    availability?: string;
  };
}): Metadata {
  const clean = normalizePath(path);
  const og = image ?? { url: "/og/arledscreen-og.jpg", width: 1200, height: 630, alt: "ARLEDSCREEN — LED Ekran Teknoloji Merkezi" };
  const url = absoluteUrl(`/tr${clean}`);
  const desc = clampMetaDescription(description);
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url,
      siteName: "ARLEDSCREEN",
      locale: "tr_TR",
      type,
      images: [og],
    },
    twitter: { card: "summary_large_image", title, description: desc, images: [og.url] },
    alternates: { canonical: url },
    metadataBase: new URL(SITE_URL),
    ...(productMeta
      ? {
          other: {
            "product:price:amount": productMeta.amountUsd.toFixed(2),
            "product:price:currency": "USD",
            "product:availability": productMeta.availability ?? "in stock",
            "product:brand": productMeta.brand ?? "NXTIONSTAR",
            "product:retailer_item_id": productMeta.sku,
          },
        }
      : {}),
  };
}
