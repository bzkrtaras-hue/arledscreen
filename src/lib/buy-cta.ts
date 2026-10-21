import type { Locale } from "@/lib/i18n";

/** Sitewide primary purchase CTA (replaces the old "Teklif alın" buttons). */
export function buyLabel(locale: Locale | string): string {
  return locale === "tr" ? "Satın al" : locale === "ar" ? "اشترِ الآن" : "Buy now";
}

/** Locale price calculator page (embeds /fiyat-hesap/). */
export function buyHref(locale: Locale | string): string {
  return `/${locale}/hesaplayici/`;
}
