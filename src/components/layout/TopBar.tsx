import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { LocaleSelect } from "@/components/layout/LocaleSelect";

/**
 * Quiet utility row (ONERI #4): slogan on the left, language + a single
 * "Teklif alın" action on the right. E-mail, phone, WhatsApp and
 * social links live in the footer (and the mobile CTA bar), still in HTML.
 */
export function TopBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const tr = locale === "tr";
  // Always the canonical quote page. /tr/contact/ and /en/contact/ are noindex redirect bridges
  // (extra hop) and made this button point to a different URL than every other "Teklif alın"
  // link (PageSpeed: "Identical links have the same purpose"). /ar/contact/ and /ru/contact/ do not exist.
  const ctaHref = `/${locale}/quote/`;
  const ctaLabel = tr
    ? "Teklif alın"
    : locale === "ar"
      ? "اطلب عرض سعر"
      : locale === "ru"
        ? dict.nav.quote
        : "Quote / Contact";
  return (
    <div className="px-3 pt-1.5 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl min-w-0 items-center gap-1.5 sm:gap-2">
        <div className="liquid-glass-btn liquid-glass-btn--slogan min-w-0 flex-1 justify-start px-3">
          <p className="min-w-0 text-start text-[12px] font-semibold leading-tight tracking-[-0.01em] text-[#1a2430] sm:truncate sm:text-[13px] sm:font-bold">
            {dict.brand.slogan}
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-1">
          <LocaleSelect locale={locale} className="hidden md:block" id="locale-select" />
          <Link
            href={ctaHref}
            className="liquid-glass-btn liquid-glass-btn--compact min-h-11 min-w-11 justify-center px-3 font-semibold text-[#1a2430] hover:text-cyan"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
