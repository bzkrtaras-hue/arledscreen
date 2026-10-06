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
