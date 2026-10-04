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

/** Compact utility row — phone / site / WhatsApp stay secondary to the main nav. */
export function TopBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const tr = locale === "tr";
  return (
    <div className="px-3 pt-1.5 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-between gap-2">
        <div className="liquid-glass-btn liquid-glass-btn--compact hidden max-w-[min(100%,360px)] items-center truncate text-ink-soft md:inline-flex">
          <span className="truncate font-semibold text-cyan-700">{dict.brand.slogan}</span>
          <span className="hidden items-center gap-1 text-ink-muted xl:inline-flex">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
            {tr ? "Gaziosmanpaşa / İstanbul" : "Gaziosmanpaşa / Istanbul"}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-end gap-1 md:flex-none">
          <a
            href={CONTACT_PHONE_HREF}
            className="liquid-glass-btn liquid-glass-btn--compact text-ink hover:text-cyan"
          >
            <PhoneIcon className="h-3 w-3 text-cyan" />
            <span className="truncate">{CONTACT_PHONE_DISPLAY}</span>
          </a>
          <a
            href={CONTACT_EMAIL_HREF}
            className="liquid-glass-btn liquid-glass-btn--compact hidden text-ink hover:text-cyan lg:inline-flex"
          >
            <MailIcon className="h-3 w-3 text-cyan" />
            {CONTACT_EMAIL}
          </a>
          <a
            href={GENERIC_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-btn liquid-glass-btn--compact text-ink hover:text-[#0F7A41]"
          >
            <WhatsAppIcon className="h-3 w-3 text-[#0F7A41]" />
            WP
          </a>
          <LocaleSelect locale={locale} className="hidden md:block scale-90 origin-right" id="locale-select" />
        </div>
      </div>
    </div>
  );
}
