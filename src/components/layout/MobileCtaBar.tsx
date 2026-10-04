"use client";

import Link from "next/link";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { CONTACT_PHONE_HREF } from "@/lib/social";
import { GENERIC_WHATSAPP_HREF } from "@/lib/whatsapp";


/**
 * Fixed bottom action bar on mobile (< md): Ara · WhatsApp · Teklif.
 * Hidden on the calculator page so the embedded calculator UI stays unchanged.
 */
export function MobileCtaBar({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "";
  if (pathname.includes("/hesaplayici")) return null;
  const tr = locale === "tr";

  const item =
    "flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold";

  return (
    <nav
      aria-label={tr ? "Hızlı iletişim" : "Quick contact"}
      className="mobile-cta-bar liquid-glass fixed inset-x-0 bottom-0 z-50 flex border-t border-white/45 md:hidden"
    >
      <a href={CONTACT_PHONE_HREF} className={`${item} text-ink-soft`}>
        <PhoneIcon className="h-5 w-5 text-cyan" />
        {tr ? "Ara" : "Call"}
      </a>
      <a
        href={GENERIC_WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} text-ink-soft`}
      >
        <WhatsAppIcon className="h-5 w-5 text-[#0F7A41]" />
        WhatsApp
      </a>
      <Link
        href={`/${locale}/quote/`}
        className={`${item} m-1.5 rounded-xl bg-cyan text-white`}
      >
        <FileText className="h-5 w-5" aria-hidden />
        {tr ? "Teklif İste" : "Get a quote"}
      </Link>
    </nav>
  );
}
