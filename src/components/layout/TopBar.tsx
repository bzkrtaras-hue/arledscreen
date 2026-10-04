import { MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";
import { GENERIC_WHATSAPP_HREF } from "@/lib/whatsapp";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { LocaleSelect } from "@/components/layout/LocaleSelect";

/** Compact utility row — slogan stays fully readable; contacts stay secondary. */
export function TopBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const tr = locale === "tr";
  return (
    <div className="px-3 pt-1.5 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-between gap-2">
        <div className="liquid-glass-btn liquid-glass-btn--brand min-h-8 min-w-0 max-w-[min(100%,52rem)] flex-1 gap-2 px-3 py-1.5">
          <p className="min-w-0 text-left text-[12px] font-bold leading-snug tracking-[-0.01em] text-[#1a2430] sm:text-[13px]">
            {dict.brand.slogan}
          </p>
          <span
            className="hidden h-3.5 w-px shrink-0 bg-[#1a2430]/20 lg:block"
            aria-hidden
          />
          <span className="hidden shrink-0 items-center gap-1 text-[12px] font-semibold text-[#3d4650] lg:inline-flex">
            <MapPin className="h-3.5 w-3.5 text-cyan" aria-hidden />
            {tr ? "Gaziosmanpaşa / İstanbul" : "Gaziosmanpaşa / Istanbul"}
          </span>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-1">
          <a
            href={CONTACT_PHONE_HREF}
            className="liquid-glass-btn liquid-glass-btn--compact text-[#1a2430] hover:text-cyan"
            aria-label={CONTACT_PHONE_DISPLAY}
          >
            <PhoneIcon className="h-3 w-3 text-cyan" />
            <span className="hidden sm:inline">{CONTACT_PHONE_DISPLAY}</span>
          </a>
          <a
            href={CONTACT_EMAIL_HREF}
            className="liquid-glass-btn liquid-glass-btn--compact hidden text-[#1a2430] hover:text-cyan xl:inline-flex"
          >
            <MailIcon className="h-3 w-3 text-cyan" />
            {CONTACT_EMAIL}
          </a>
          <a
            href={GENERIC_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-btn liquid-glass-btn--compact text-[#1a2430] hover:text-[#0F7A41]"
          >
            <WhatsAppIcon className="h-3 w-3 text-[#0F7A41]" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">WP</span>
          </a>
          <LocaleSelect locale={locale} className="hidden md:block scale-90 origin-right" id="locale-select" />
        </div>
      </div>
    </div>
  );
}
