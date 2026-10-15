import { reviewedLabel, GEO_REVIEWED } from "@/content/short-answers";

/** Answer-first block (GEO paket 2). Uses existing tokens only; no new design. */
export function ShortAnswer({ text, locale, id = "kisa-cevap", className = "mt-5" }: { text: string; locale: "tr" | "en"; id?: string; className?: string }) {
  return (
    <div id={id} className={`${className} max-w-3xl rounded-2xl bg-band px-4 py-3`}>
      <p className="text-[15px] leading-[1.7] text-ink">
        <strong>{locale === "tr" ? "Kısa cevap:" : "Short answer:"}</strong> {text}
      </p>
      <p className="mt-2 text-xs text-ink-muted">
        <time dateTime={GEO_REVIEWED}>{reviewedLabel(locale)}</time>
      </p>
    </div>
  );
}
