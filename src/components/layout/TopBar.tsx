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

/** Thin liquid-glass utility bar above the main header: slogan + contact + language. */
export function TopBar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const tr = locale === "tr";
  return (
    <div className="liquid-glass border-b border-white/40">
      <div className="mx-auto flex h-10 max-w-7xl min-w-0 items-center justify-between gap-3 px-4 text-[13px] text-ink-soft sm:px-6 lg:px-8">
        <p className="hidden min-w-0 items-center gap-3 truncate md:flex">
          <span className="truncate font-semibold text-cyan-700">{dict.brand.slogan}</span>
          <span className="hidden items-center gap-1 text-ink-muted lg:inline-flex">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {tr ? "Gaziosmanpaşa / İstanbul" : "Gaziosmanpaşa / Istanbul"}
          </span>
        </p>
        <div className="flex min-w-0 flex-1 items-center justify-between gap-1 md:flex-none md:justify-end md:gap-2">
          <a
            href={CONTACT_PHONE_HREF}
            className="nav-glass-link inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 font-semibold text-ink hover:text-cyan"
          >
            <PhoneIcon className="h-4 w-4 text-cyan" />
            {CONTACT_PHONE_DISPLAY}
          </a>
          <a
            href={CONTACT_EMAIL_HREF}
            className="nav-glass-link hidden min-h-9 items-center gap-1.5 rounded-full px-2.5 font-semibold text-ink hover:text-cyan lg:inline-flex"
          >
            <MailIcon className="h-4 w-4 text-cyan" />
            {CONTACT_EMAIL}
          </a>
          <a
            href={GENERIC_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-glass-link inline-flex min-h-9 items-center gap-1.5 rounded-full px-2.5 font-semibold text-ink hover:text-[#0F7A41]"
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
