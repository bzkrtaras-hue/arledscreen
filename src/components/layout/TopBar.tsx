import { MapPin } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
} from "@/lib/social";
import { GENERIC_WHATSAPP_HREF } from "@/lib/whatsapp";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { LocaleSelect } from "@/components/layout/LocaleSelect";

/** Utility chips only. Brand slogan strip is not shown to customers. */
export function TopBar({ locale }: { locale: Locale }) {
  const tr = locale === "tr";
  return (
    <div className="px-3 pt-1.5 sm:px-4 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl min-w-0 items-center justify-end gap-1.5 sm:gap-2">
        <div className="flex shrink-0 items-center justify-end gap-1">
          <span className="liquid-glass-btn liquid-glass-btn--compact hidden text-[#3d4650] xl:inline-flex">
            <MapPin className="h-3 w-3 text-cyan" aria-hidden />
            {tr ? "Gaziosmanpaşa / İstanbul" : "Gaziosmanpaşa / Istanbul"}
          </span>
          <a
            href={CONTACT_PHONE_HREF}
            className="liquid-glass-btn liquid-glass-btn--compact text-[#1a2430] hover:text-cyan"
            aria-label={CONTACT_PHONE_DISPLAY}
          >
            <PhoneIcon className="h-3 w-3 text-cyan" />
            <span className="hidden md:inline">{CONTACT_PHONE_DISPLAY}</span>
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
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-3 w-3 text-[#0F7A41]" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>
          <LocaleSelect locale={locale} className="hidden md:block scale-90 origin-right" id="locale-select" />
        </div>
      </div>
    </div>
  );
}
