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

/** Floating liquid-glass utility buttons above the main header. */
export function TopBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const tr = locale === "tr";
  return (
    <div className="px-3 pt-2 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-between gap-2">
        <div className="liquid-glass-btn hidden min-h-9 max-w-[min(100%,420px)] items-center gap-2 truncate px-3.5 text-[12.5px] text-ink-soft md:inline-flex">
          <span className="truncate font-semibold text-cyan-700">{dict.brand.slogan}</span>
          <span className="hidden items-center gap-1 text-ink-muted xl:inline-flex">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {tr ? "Gaziosmanpaşa / İstanbul" : "Gaziosmanpaşa / Istanbul"}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 md:flex-none">
          <a
            href={CONTACT_PHONE_HREF}
            className="liquid-glass-btn min-h-9 gap-1.5 px-3 text-[13px] font-semibold text-ink hover:text-cyan"
          >
            <PhoneIcon className="h-4 w-4 text-cyan" />
            <span className="truncate">{CONTACT_PHONE_DISPLAY}</span>
          </a>
          <a
            href={CONTACT_EMAIL_HREF}
            className="liquid-glass-btn hidden min-h-9 gap-1.5 px-3 text-[13px] font-semibold text-ink hover:text-cyan lg:inline-flex"
          >
            <MailIcon className="h-4 w-4 text-cyan" />
            {CONTACT_EMAIL}
          </a>
          <a
            href={GENERIC_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-btn min-h-9 gap-1.5 px-3 text-[13px] font-semibold text-ink hover:text-[#0F7A41]"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#0F7A41]" />
            WhatsApp
          </a>
          <LocaleSelect locale={locale} className="hidden md:block" id="locale-select" />
        </div>
      </div>
    </div>
  );
}
