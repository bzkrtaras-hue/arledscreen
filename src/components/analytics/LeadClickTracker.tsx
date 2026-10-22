"use client";

import { useEffect } from "react";
import { trackWhatsappClick } from "@/lib/track";

/** One delegated listener: every WhatsApp link on the page is tracked (guarded gtag/fbq). */
export function LeadClickTracker({ locale }: { locale: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(a.href)) trackWhatsappClick(locale, a.href);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [locale]);
  return null;
}
