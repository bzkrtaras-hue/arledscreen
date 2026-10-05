import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { Calculator, FileText } from "lucide-react";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { GENERIC_WHATSAPP_HREF } from "@/lib/whatsapp";

interface HomeCtaBandProps {
  locale: Locale;
}

export function HomeCtaBand({ locale }: HomeCtaBandProps) {
  const dict = getDictionary(locale);

  const title =
    locale === "tr"
      ? "Projenizi birlikte netleştirelim"
      : locale === "ar"
        ? "لنحدد مشروعك معاً"
        : locale === "ru"
          ? "Спроектируем ваш проект вместе"
          : "Let’s size your project together";

  const body =
    locale === "tr"
      ? "Ölçü ve konum bilgisini paylaşın; size ekran önerisi, malzeme listesi ve yazılı teklif hazırlayalım. İsterseniz önce hesaplayıcıyla yaklaşık maliyeti görün."
      : locale === "ar"
        ? "اطلب عرض سعر أو استكشف المواد والتكلفة عبر الحاسبة المباشرة."
        : locale === "ru"
          ? "Запросите КП или оцените материалы и стоимость в живом калькуляторе."
          : "Request a written quote from Gaziosmanpaşa, or explore materials and cost with the live calculator.";

  const waLabel = locale === "tr" ? "WhatsApp'tan yazın" : locale === "ar" ? "واتساب" : locale === "ru" ? "WhatsApp" : "WhatsApp us";
  const socialLabel = locale === "tr" ? "Bize ulaşın" : locale === "ar" ? "تواصل معنا" : locale === "ru" ? "Связаться" : "Contact us";

  return (
    <section className="relative overflow-hidden border-y border-[#133B78] bg-[linear-gradient(135deg,#1E5BB8_0%,#174a96_55%,#0F2A4F_100%)] py-14 sm:py-20">
      {/* soft highlight, decorative */}
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl min-w-0 flex-col items-stretch gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="min-w-0 max-w-xl text-white">
          <h2 className="text-balance font-display text-white text-[clamp(1.6rem,1.2rem+1.6vw,2.4rem)] font-extrabold leading-tight tracking-[-0.02em]">
            {title}
          </h2>
          <p className="mt-3 text-pretty text-base leading-[1.65] text-white sm:text-[1.0625rem]">{body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white">{socialLabel}</span>
            <SocialLinks ids={["phone", "whatsapp", "instagram", "facebook", "email"]} onDark label={socialLabel} />
          </div>
        </div>
        <div className="flex min-w-0 w-full flex-col gap-3 sm:w-auto">
          <Link
            href={`/${locale}/quote/`}
            className="btn-soft inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#ffffff] px-8 text-[17px] font-bold text-[#174a96] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:bg-[#EEF4FF] sm:min-w-[280px]"
          >
            <FileText className="h-5 w-5" aria-hidden />
            {dict.nav.quote}
          </Link>
          <a
            href={GENERIC_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-soft inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#0F7A41] px-8 text-[17px] font-bold text-white ring-2 ring-white/70 hover:bg-[#0B6635] sm:min-w-[280px]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {waLabel}
          </a>
          <Link
            href={"/tr/hesaplayici/"}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
          >
            <Calculator className="h-4 w-4" aria-hidden />
            {dict.nav.priceCalculator}
          </Link>
        </div>
      </div>
    </section>
  );
}
