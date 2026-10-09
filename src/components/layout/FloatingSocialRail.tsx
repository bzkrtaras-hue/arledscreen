"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tag } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/social";
import { GENERIC_WHATSAPP_HREF } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

/**
 * Right-edge quick-action tabs (desktop). Labels slide out on hover/focus.
 * On mobile the sticky bottom CTA bar takes this role.
 */
export function FloatingSocialRail({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "";
  // Keep the embedded calculator page free of overlays.
  if (pathname.includes("/hesaplayici")) return null;
  const tr = locale === "tr";
  const tabs = [
    { href: GENERIC_WHATSAPP_HREF, label: "WhatsApp", Icon: WhatsAppIcon, ext: true, cls: "bg-[#0F7A41] hover:bg-[#0B6635]" },
    { href: SOCIAL_LINKS.instagram.href, label: "Instagram", Icon: InstagramIcon, ext: true, cls: "bg-[linear-gradient(45deg,#833AB4,#C13584)] hover:brightness-110" },
    { href: SOCIAL_LINKS.facebook.href, label: "Facebook", Icon: FacebookIcon, ext: true, cls: "bg-[#1465D0] hover:bg-[#1257B5]" },
    { href: `/${locale}/quote/`, label: tr ? "Hızlı teklif" : "Quick quote", Icon: Tag, ext: false, cls: "bg-cyan hover:bg-cyan-600" },
  ];
  return (
    <nav
      aria-label={tr ? "Hızlı iletişim" : "Quick contact"}
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 min-[1440px]:block"
    >
      <ul className="flex flex-col items-end gap-2">
        {tabs.map(({ href, label, Icon, ext, cls }) => {
          const className = `group flex h-11 items-center gap-2 glass-pill rounded-l-full pl-3.5 pr-3 text-white transition-all duration-300 hover:pr-4 focus-visible:pr-4 ${cls}`;
          const inner = (
            <>
              <Icon className="h-5 w-5" aria-hidden />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[140px] group-hover:opacity-100 group-focus-visible:max-w-[140px] group-focus-visible:opacity-100">
                {label}
              </span>
            </>
          );
          return (
            <li key={label}>
              {ext ? (
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
                  {inner}
                </a>
              ) : (
                <Link href={href} aria-label={label} className={className}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
