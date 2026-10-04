import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getProducts } from "@/content/products";
import { ProductCard } from "@/components/products/ProductCard";

/** One GOB, one indoor and one outdoor model (ids = group-slug from models.ts). */
const FEATURED = ["gob-led-ekran-p1-86-gob", "ic-mekan-led-ekran-p2-5", "dis-mekan-led-ekran-p4"];

interface FeaturedProductsProps {
  locale: Locale;
}

export function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const all = getProducts(locale);
  const picked = FEATURED.map((id) => all.find((p) => p.id === id)).filter((p) => p !== undefined);
  const products = picked.length === FEATURED.length ? picked : all.slice(0, 3);
  const label =
    locale === "tr"
      ? "Tüm ürün serileri"
      : locale === "ar"
        ? "كل المنتجات"
        : locale === "ru"
          ? "Все продукты"
          : "All products";

  return (
    <div className="min-w-0 max-w-full">
      <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href={`/${locale}/products/`}
          className="btn-soft inline-flex min-h-11 items-center border border-cyan/50 bg-white px-5 text-sm text-cyan hover:bg-cyan-50"
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
