"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useMemo, useState } from "react";
import { getProducts, getSeriesTabs } from "@/content/products";
import type { ProductCategory } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

interface ProductSeriesGridProps {
  locale?: Locale;
}

export function ProductSeriesGrid({ locale = "en" }: ProductSeriesGridProps) {
  const [tab, setTab] = useState<string>("all");
  const catalog = useMemo(() => getProducts(locale), [locale]);
  const tabs = useMemo(() => getSeriesTabs(locale), [locale]);
  const empty = getDictionary(locale).products.empty;

  const filtered = useMemo(() => {
    if (tab === "all") return catalog;
    return catalog.filter((p) => p.category === (tab as ProductCategory));
  }, [tab, catalog]);

  return (
    <Tabs.Root value={tab} onValueChange={setTab}>
      <Tabs.List
        className="mb-8 flex flex-wrap gap-2"
        aria-label={locale === "tr" ? "Ürün serileri" : "Product series"}
      >
        {tabs.map((t) => (
          <Tabs.Trigger
            key={t.id}
            value={t.id}
            className="chip-soft data-[state=active]:border-cyan data-[state=active]:bg-cyan/10 data-[state=active]:text-cyan data-[state=active]:shadow-sm"
          >
            {t.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value={tab} className="outline-none">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-ink-muted">{empty}</p>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
}
