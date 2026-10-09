"use client";

import Link from "next/link";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { CONTACT_PHONE_HREF } from "@/lib/social";
import { quoteWhatsappHref } from "@/lib/whatsapp";

/**
 * Fixed bottom liquid-glass action buttons on mobile (< md): Ara · WhatsApp · Teklif.
 * Hidden on the calculator page so the embedded calculator UI stays unchanged.
 */
export function MobileCtaBar({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "";
  if (pathname.includes("/hesaplayici")) return null;
  const tr = locale === "tr";

  return (
    <nav
      aria-label={tr ? "Hızlı iletişim" : "Quick contact"}
      className="mobile-cta-bar fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <a
          href={CONTACT_PHONE_HREF}
          className="liquid-glass-btn min-h-[52px] flex-1 flex-col gap-0.5 px-2 text-xs font-semibold text-ink-soft"
        >
          <PhoneIcon className="h-5 w-5 text-cyan" />
          {tr ? "Ara" : "Call"}
        </a>
        <a
          href={quoteWhatsappHref(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass-btn min-h-[52px] flex-1 flex-col gap-0.5 px-2 text-xs font-semibold text-ink-soft"
        >
          <WhatsAppIcon className="h-5 w-5 text-[#0F7A41]" />
          WhatsApp
        </a>
        <Link
          href={`/${locale}/quote/`}
          className="liquid-glass-btn liquid-glass-btn--primary min-h-[52px] flex-[1.35] flex-col gap-0.5 px-2 text-xs font-semibold"
        >
          <FileText className="h-5 w-5" aria-hidden />
          {tr ? "Teklif iste" : "Get a quote"}
        </Link>
      </div>
    </nav>
  );
}
