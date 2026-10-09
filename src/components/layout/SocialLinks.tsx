import type { ReactElement } from "react";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS, type SocialLinkId, SOCIAL_LINK_LIST } from "@/lib/social";
import { quoteWhatsappHref } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/brand-icons";

const ICONS: Record<SocialLinkId, (props: { className?: string }) => ReactElement> = {
  phone: PhoneIcon,
  email: MailIcon,
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

/**
 * Brand colours with a white glyph. Shades are chosen so the glyph keeps
 * >= 3:1 contrast (WCAG non-text) on every tile.
 */
export const SOCIAL_BRAND_CLASS: Record<SocialLinkId, string> = {
  phone: "bg-[#1E5BB8] hover:bg-[#174a96]",
  email: "bg-[#D93025] hover:bg-[#B3261E]",
  whatsapp: "bg-[#0F7A41] hover:bg-[#0B6635]",
  instagram: "bg-[linear-gradient(45deg,#833AB4,#C13584,#D62E6A)] hover:brightness-110",
  facebook: "bg-[#1877F2] hover:bg-[#1465D0]",
};

interface SocialLinksProps {
  ids?: SocialLinkId[];
  className?: string;
  size?: "sm" | "md" | "lg";
  /** On dark / blue surfaces: adds a white ring so brand tiles stay separated. */
  onDark?: boolean;
  label?: string;
  /** Picks the prefilled WhatsApp quote message language (default TR). */
  locale?: string;
}

export function SocialLinks({ ids, className, size = "md", onDark = false, label, locale }: SocialLinksProps) {
  const links = ids ? ids.map((id) => SOCIAL_LINKS[id]) : [...SOCIAL_LINK_LIST];
  const dim = size === "lg" ? "h-12 w-12" : "h-11 w-11"; // >= 44px touch target
  const iconClass = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-[18px] w-[18px]" : "h-5 w-5";

  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)} aria-label={label}>
      {links.map((link) => {
        const Icon = ICONS[link.id];
        return (
          <li key={link.id}>
            <a
              href={link.id === "whatsapp" ? quoteWhatsappHref(locale) : link.href}
              aria-label={link.label}
              title={link.label}
              className={cn(
                "btn-soft glass-pill inline-flex items-center justify-center rounded-xl text-white",
                onDark && "ring-2 ring-white/70",
                dim,
                SOCIAL_BRAND_CLASS[link.id],
              )}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon className={iconClass} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
