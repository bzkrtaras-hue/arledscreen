import type { Locale } from "@/lib/i18n";

/** Project-log months as stored in references.ts. */
const TR_MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"] as const;

const MONTHS: Record<Exclude<Locale, "tr">, readonly string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ru: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
};

/** "Tem 2026" → locale label. Turkish stays as logged. Unknown strings pass through. */
export function formatProjectDate(value: string, locale: Locale): string {
  if (locale === "tr" || !value) return value;
  const match = value.trim().match(/^(\S+)\s+(\d{4})$/);
  if (!match) return value;
  const index = TR_MONTHS.indexOf(match[1] as (typeof TR_MONTHS)[number]);
  if (index < 0) return value;
  return `${MONTHS[locale][index]} ${match[2]}`;
}

const DETAIL_PHRASES: [string, string][] = [
  ["Montaj tamamlandı", "Installation completed"],
  ["LED ekran projesi", "LED display project"],
  ["Sahne arkası LED ekran", "Backstage LED display"],
  ["Yüksek çözünürlüklü LED", "High-resolution LED"],
  ["Dev LED ekran", "Large-format LED display"],
  ["dış mekân kiralama kabini", "outdoor rental cabinet"],
  ["outdoor kiralama kabin", "outdoor rental cabinet"],
  ["Türkiye'nin en büyük mağazası", "Flagship store (as logged)"],
  ["Yeşilpınar şube", "Yeşilpınar branch"],
  ["Eskişehir şube", "Eskişehir branch"],
  ["çift yön", "double-sided"],
  ["iç mekân", "indoor"],
  ["İç mekân", "Indoor"],
  ["dış mekân", "outdoor"],
  ["Dış mekân", "Outdoor"],
  ["dış mekan", "outdoor"],
  ["Dış mekan", "Outdoor"],
  ["ev içi", "indoor home"],
  ["vitrin", "storefront"],
  ["kolon", "column"],
  ["Yeni nesil", "Next-generation"],
  ["Dev ekran", "Large-format display"],
  ["Oval ekran", "Oval display"],
  ["LED ekran", "LED display"],
  ["kiralama", "rental"],
  ["adet", "pcs"],
];

/** Translate logged Turkish scope fragments for EN. Dimensions and pitch stay. */
export function formatProjectDetail(value: string, locale: Locale): string {
  if (locale !== "en" || !value) return value;
  let out = value;
  for (const [tr, en] of DETAIL_PHRASES) out = out.replaceAll(tr, en);
  return out;
}
