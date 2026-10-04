import Link from "next/link";
import { FileText, MessageCircle } from "lucide-react";
import type { Product } from "@/types/product";
import type { Locale } from "@/lib/i18n";
import { OptImage } from "@/components/ui/opt-image";
import { SPECS_VERIFIED, CATEGORY_LABELS_TR, CATEGORY_LABELS_EN } from "@/content/products";
import { whatsappHref } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  locale?: Locale;
}

/**
 * NXTIONSTAR model card (generated from the verified model list). Detailed
 * technical values live on the model page; visitors can request the datasheet.
 */
export function ProductCard({ product, locale = "en" }: ProductCardProps) {
  const tr = locale === "tr";
  const pitch = `P${product.specs.pixelPitchMm}`;
  const datasheetMsg = tr
    ? `Merhaba, ${product.name} (${pitch}) modelinin teknik föyünü ve fiyat bilgisini rica ediyorum.`
    : `Hello, please send me the datasheet and pricing for ${product.name} (${pitch}).`;

  return (
    <article
      id={product.slug}
      className="group flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl glass-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <OptImage
          src={product.image}
          alt={product.imageAlt ?? `${product.name} — ${product.series}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-cyan-700">
          {product.series}
        </span>
        <span className="absolute bottom-3 left-3 rounded-lg bg-[#0F2A4F]/85 px-2.5 py-1 font-display text-sm font-bold text-white">
          {pitch}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-ink">
          {tr && product.href ? (
            <Link href={product.href} className="hover:text-cyan hover:underline">
              {product.name}
            </Link>
          ) : (
            product.name
          )}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{product.shortDescription}</p>

        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-surface px-3 py-2">
            <dt className="text-ink-muted">{tr ? "Piksel aralığı" : "Pixel pitch"}</dt>
            <dd className="mt-0.5 font-display text-sm font-bold text-cyan">{pitch}</dd>
          </div>
          <div className="rounded-lg bg-surface px-3 py-2">
            <dt className="text-ink-muted">{tr ? "Kullanım" : "Use"}</dt>
            <dd className="mt-0.5 font-display text-sm font-semibold text-ink-soft">
              {tr ? CATEGORY_LABELS_TR[product.category] : CATEGORY_LABELS_EN[product.category]}
            </dd>
          </div>
          {SPECS_VERIFIED && product.specs.brightnessNits && product.specs.ipRating ? (
            <>
              <div className="rounded-lg bg-surface px-3 py-2">
                <dt className="text-ink-muted">{tr ? "Parlaklık" : "Brightness"}</dt>
                <dd className="mt-0.5 font-display text-sm text-ink-soft">{product.specs.brightnessNits} nit</dd>
              </div>
              <div className="rounded-lg bg-surface px-3 py-2">
                <dt className="text-ink-muted">IP</dt>
                <dd className="mt-0.5 font-display text-sm text-ink-soft">{product.specs.ipRating}</dd>
              </div>
            </>
          ) : null}
        </dl>

        <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
          <Link
            href={`/${locale}/quote/?product=${encodeURIComponent(product.slug)}`}
            className="btn-soft inline-flex min-h-11 items-center justify-center gap-1.5 bg-cyan px-3 text-sm text-white hover:bg-cyan-600"
          >
            <FileText className="h-4 w-4" aria-hidden />
            {tr ? "Teklif iste" : "Request quote"}
          </Link>
          <a
            href={whatsappHref(datasheetMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-soft inline-flex min-h-11 items-center justify-center gap-1.5 border border-border bg-white px-3 text-sm text-ink-soft hover:border-cyan/50 hover:text-cyan"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {tr ? "Teknik föy iste" : "Get datasheet"}
          </a>
        </div>
      </div>
    </article>
  );
}
