import Link from "next/link";
import { Calculator, FileText } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Canonical product CTA row for AI alışveriş / lead capture.
 * Order (fixed): Teklif → WhatsApp → optional Hesaplayıcı.
 */
export function ProductCtaRow({
  quoteHref,
  whatsappMessage,
  showCalculator = true,
  className,
  fullWidthMobile = true,
}: {
  quoteHref: string;
  whatsappMessage: string;
  showCalculator?: boolean;
  className?: string;
  /** Stretch buttons on narrow screens (group yazılı teklifle card). */
  fullWidthMobile?: boolean;
}) {
  const width = fullWidthMobile ? "w-full sm:w-auto" : "";
  return (
    <div
      className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}
      data-product-cta-row
    >
      <Link
        href={quoteHref}
        data-cta="quote"
        className={cn(
          "btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan px-6 text-white hover:bg-cyan-600",
          width,
        )}
      >
        <FileText className="h-4 w-4" aria-hidden />
        Teklif isteyin
      </Link>
      <a
        href={whatsappHref(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="whatsapp"
        className={cn(
          "btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0F7A41] px-6 text-white hover:bg-[#0B6435]",
          width,
        )}
      >
        <WhatsAppIcon className="h-4 w-4" />
        WhatsApp&apos;tan sorun
      </a>
      {showCalculator ? (
        <Link
          href="/tr/hesaplayici/"
          data-cta="calculator"
          className={cn(
            "btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 text-ink-soft hover:border-cyan/50 hover:text-cyan",
            width,
          )}
        >
          <Calculator className="h-4 w-4" aria-hidden />
          Fiyatı hesaplayın
        </Link>
      ) : null}
    </div>
  );
}
