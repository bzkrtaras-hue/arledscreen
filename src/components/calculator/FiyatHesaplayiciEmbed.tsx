"use client";

import { useEffect, useRef } from "react";
import { FIYAT_HESAPLAYICI_URL } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

interface Props {
  title?: string;
  /** When `en`, loads `/fiyat-hesap/?lang=en` so iframe chrome is English. */
  locale?: Locale;
}

const MIN_H = 200;
const MAX_H = 20000;

/**
 * Full-width, frameless embed of the self-hosted price calculator (/fiyat-hesap/,
 * same origin). The calculator posts {type:"arled-calc-height", h} (snippet
 * documented in /workspace/fiyat-edit/build/EMBED_HEIGHT.md) and the iframe is
 * sized to its content, so the page has a single scrollbar. Until a message
 * arrives the CSS fallback height is calc(100dvh - header).
 */
export function FiyatHesaplayiciEmbed({
  title = "ARLEDSCREEN LED Malzeme Hesaplayıcı",
  locale = "tr",
}: Props) {
  const ref = useRef<HTMLIFrameElement>(null);
  const src =
    locale === "en" ? `${FIYAT_HESAPLAYICI_URL}?lang=en` : FIYAT_HESAPLAYICI_URL;

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.source !== frame.contentWindow) return;
      const d = e.data as { type?: unknown; h?: unknown } | null;
      if (!d || d.type !== "arled-calc-height") return;
      const h = Number(d.h);
      if (!Number.isFinite(h)) return;
      const next = Math.min(MAX_H, Math.max(MIN_H, Math.ceil(h)));
      if (Math.abs(frame.offsetHeight - next) > 1) frame.style.height = `${next}px`;
    };
    const ping = () => frame.contentWindow?.postMessage({ type: "arled-calc-ping" }, window.location.origin);
    window.addEventListener("message", onMessage);
    frame.addEventListener("load", ping);
    ping();
    return () => {
      window.removeEventListener("message", onMessage);
      frame.removeEventListener("load", ping);
    };
  }, []);

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      className="calc-frame"
      scrolling="no"
      referrerPolicy="no-referrer-when-downgrade"
      allow="clipboard-write; microphone"
    />
  );
}
