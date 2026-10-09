import { cn } from "@/lib/utils";

interface ModelNoPhotoProps {
  /** Manufacturer / brand name, e.g. "Huidu" */
  brand: string;
  /** Model code shown large, e.g. "HD-C16" */
  chip: string;
  locale?: "tr" | "en";
  className?: string;
}

/**
 * Text card shown instead of a product photo when no photo that truly shows
 * this exact model is available. Never replace it with a screenshot, banner
 * or a photo of a different model.
 */
export function ModelNoPhoto({ brand, chip, locale = "tr", className }: ModelNoPhotoProps) {
  return (
    <div
      role="img"
      aria-label={`${brand} ${chip}`}
      className={cn("flex flex-col items-center justify-center bg-white px-4 text-center", className)}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{brand}</span>
      <span className="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">{chip}</span>
      <span className="mt-2 text-sm text-ink-muted">
        {locale === "en" ? "Product photo shared with the quote" : "Ürün fotoğrafı teklifle paylaşılır"}
      </span>
    </div>
  );
}
