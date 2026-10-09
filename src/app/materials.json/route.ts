import {
  MATERIALS_PRICE_NOTE,
  MATERIAL_CATEGORIES,
  MATERIAL_MODELS,
  MATERIAL_TOTALS,
  categoryPath,
  itemHref,
  itemPrice,
  materialModelPath,
  materialSections,
} from "@/content/materials";
import { PANEL_AVG_RATIO, PRICE_VALID_UNTIL } from "@/content/prices";
import { absoluteUrl, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /materials.json — machine-readable LED ekran malzemeleri price list (ARL-20261009-006).
 * Separate from the 12-SKU pricedPanels feeds (ai-shopping.json / catalog.json).
 */
export function GET(): Response {
  const totals = MATERIAL_TOTALS();
  const body = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE_URL}/materials.json`,
    url: `${SITE_URL}/materials.json`,
    name: "ARLEDSCREEN LED ekran malzemeleri fiyat listesi",
    description: `Kontrol kartı, NovaStar alıcı/gönderici, video işlemci, trafo, CNC ve rental kasa, LED matrix, kablo/aksesuar ve ek panel varyantları. ${MATERIALS_PRICE_NOTE} Ücretsiz kargo yok. Yayımlanmış 12 panel listesi ayrı: ${SITE_URL}/ai-shopping.json (pricedPanels).`,
    inLanguage: "tr-TR",
    creator: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: absoluteUrl("/tr/malzemeler/"),
    priceCurrency: "USD",
    valueAddedTaxIncluded: false,
    priceValidUntil: PRICE_VALID_UNTIL,
    brandNote:
      "Huidu ve NovaStar üretici ürün adlarıdır; ARLEDSCREEN bu ürünleri satar ve kurar. NXTIONSTAR ARLEDSCREEN'in kendi panel markasıdır.",
    panelPricing: {
      sitePrice: "Aynı piksel aralığı ve ortamda yayımlanmış panel fiyatı (prices.ts / pricedPanels).",
      averageRatio: { ic: PANEL_AVG_RATIO.ic, dis: PANEL_AVG_RATIO.dis, note: "Site fiyatı olmayan paneller: eski liste fiyatı × aynı ortamın ortalama site/liste oranı. Tek renk P10 için dış mekân oranı." },
    },
    totals,
    categories: MATERIAL_CATEGORIES.map((c) => ({
      slug: c.slug,
      name: c.name,
      url: absoluteUrl(categoryPath(c.slug)),
      sections: materialSections(c.slug).map((s) => ({
        title: s.title,
        kind: s.kind,
        items: s.items.map((it) => {
          const p = itemPrice(it);
          const href = itemHref(it);
          return {
            id: it.id,
            name: it.name,
            spec: it.spec || undefined,
            brand: it.brand,
            ...(s.kind === "cnc"
              ? { priceSingleSidedUsd: it.usd, priceDoubleSidedUsd: it.usd2 }
              : { priceUsd: p?.usd ?? null }),
            unit: s.kind === "panel" ? "panel" : "adet",
            priceBasis: s.kind === "cnc" ? "liste" : (p?.basis ?? "teklif"),
            url: href ? absoluteUrl(href) : `${absoluteUrl(categoryPath(c.slug))}#${it.id}`,
          };
        }),
      })),
    })),
    modelPages: MATERIAL_MODELS.map((m) => absoluteUrl(materialModelPath(m))),
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
