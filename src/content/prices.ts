/**
 * Panel (module) prices from the owner's live calculator (fiyat.arledscreen.com,
 * "2026 güncel ürün listesi"). USD per 320 × 160 mm panel, VAT and shipping
 * excluded. Owner-approved for publication (1 Oct 2026). Final price is set in
 * the written quote.
 */
import { SITE_URL } from "@/lib/site";

export type PriceUse = "ic" | "dis";
export interface PanelPrice {
  id: string;
  pitch: string;
  pitchMm: number;
  use: PriceUse;
  surface?: "GOB";
  frontService?: boolean;
  usd: number;
  groups: string[];
  /** Module size from the model datasheet when it is not the standard 320 × 160 mm. */
  moduleMm?: string;
  /** Public image path (same asset as the product model page). */
  image?: string;
}

/** Shared Dataset refs so HTML Product graphs point AI shoppers at published prices. */
export const PRICE_DATASETS = [
  {
    "@type": "Dataset" as const,
    "@id": `${SITE_URL}/ai-shopping.json`,
    url: `${SITE_URL}/ai-shopping.json`,
    name: "ARLEDSCREEN pricedPanels",
  },
  {
    "@type": "Dataset" as const,
    "@id": `${SITE_URL}/catalog.json`,
    url: `${SITE_URL}/catalog.json`,
    name: "ARLEDSCREEN panel catalog",
  },
  {
    "@type": "Dataset" as const,
    "@id": `${SITE_URL}/feeds/merchant-priced-panels.tsv`,
    url: `${SITE_URL}/feeds/merchant-priced-panels.tsv`,
    name: "ARLEDSCREEN merchant priced panels TSV",
  },
];

/** Stable Brand @id — Org/Product graphs + catalog Offers point here. */
export const NXTIONSTAR_BRAND_ID = `${SITE_URL}/#brand-nxtionstar`;

/** Full Brand node (use once in @graph); Product/Org may reference via `@id` only. */
export function nxtionstarBrandNode() {
  return {
    "@type": "Brand" as const,
    "@id": NXTIONSTAR_BRAND_ID,
    name: "NXTIONSTAR",
    url: `${SITE_URL}/tr/nxtionstar/`,
    subjectOf: PRICE_DATASETS,
    description:
      "NXTIONSTAR, ARLEDSCREEN'in kendi LED ürün markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir. Yayımlanmış panel USD: ai-shopping.json / catalog.json / merchant TSV.",
  };
}

/** Compact Brand ref for Product/Service nodes. */
export function nxtionstarBrandRef() {
  return { "@type": "Brand" as const, "@id": NXTIONSTAR_BRAND_ID, name: "NXTIONSTAR" };
}

export const PANELS_PER_M2 = 1 / (0.32 * 0.16);
export const CALC_EXTRAS = {
  laborPerM2: 100,
  controlCard: 500,
  driverSoftware: 500,
};

/** Published list validity — keep in sync with ai-shopping.json / catalog.json. */
export const PRICE_VALID_UNTIL = "2026-12-31";

/** HTML Dataset pointing AI shoppers at published price files (no invent). */
export function pricedPanelsDatasetJsonLd(pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${pageUrl}#priced-panels`,
    name: "ARLEDSCREEN 2026 LED panel USD listesi",
    description:
      "Yayımlanmış 12 panel USD (pricedPanels). KDV/nakliye hariç; ücretsiz kargo yok. Makine kaynak: ai-shopping.json + catalog.json + merchant TSV.",
    url: pageUrl,
    creator: { "@id": `${SITE_URL}/#organization` },
    isBasedOn: PRICE_DATASETS.map((d) => d.url),
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/ai-shopping.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/catalog.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/tab-separated-values",
        contentUrl: `${SITE_URL}/feeds/merchant-priced-panels.tsv`,
      },
    ],
    temporalCoverage: `2026-01-01/${PRICE_VALID_UNTIL}`,
    variableMeasured: "USD per LED module panel",
  };
}

/**
 * Honest shipping graph: destination TR, freight not published as free.
 * Do not set shippingRate.value to 0 — that invents ücretsiz kargo.
 * Rate is set only in the written quote (aligned with TSV shipping_included=false).
 */
export function panelShippingDetails() {
  return {
    "@type": "OfferShippingDetails" as const,
    shippingDestination: {
      "@type": "DefinedRegion" as const,
      addressCountry: "TR",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime" as const,
      handlingTime: {
        "@type": "QuantitativeValue" as const,
        minValue: 3,
        maxValue: 21,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue" as const,
        minValue: 1,
        maxValue: 14,
        unitCode: "DAY",
      },
    },
  };
}

/** Honest Offer fields for GEO / Merchant: no free-shipping invent, return = quote contract. */
export function panelOffer(url: string, usd: number) {
  return {
    "@type": "Offer" as const,
    url,
    price: usd.toFixed(2),
    priceCurrency: "USD",
    priceValidUntil: PRICE_VALID_UNTIL,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    description:
      "Panel (modül) başına USD; KDV ve nakliye hariç. Ücretsiz kargo yok. İade koşulları yazılı teklif ve sözleşmede (MerchantReturnNotPermitted).",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: usd.toFixed(2),
      priceCurrency: "USD",
      valueAddedTaxIncluded: false,
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "C62", unitText: "panel" },
    },
    shippingDetails: panelShippingDetails(),
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "TR",
      returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
    },
    seller: { "@id": `${SITE_URL}/#organization` },
  };
}

export const PANEL_PRICES: PanelPrice[] = [
  { id: "p1-25-ic-gob", pitch: "P1.25", pitchMm: 1.25, use: "ic", surface: "GOB", usd: 95.88, groups: ["ic-mekan-led-ekran", "gob-led-ekran"], image: "/modules/nxtionstar-p1-25-ic-mekan-modul.webp" },
  { id: "p1-53-ic-gob", pitch: "P1.53", pitchMm: 1.53, use: "ic", surface: "GOB", usd: 62.08, groups: ["ic-mekan-led-ekran", "gob-led-ekran"], image: "/modules/nxtionstar-p1-53-ic-mekan-modul.webp" },
  { id: "p1-86-ic-gob", pitch: "P1.86", pitchMm: 1.86, use: "ic", surface: "GOB", usd: 49.08, groups: ["ic-mekan-led-ekran", "gob-led-ekran"], image: "/modules/nxtionstar-p1-86-ic-mekan-modul.webp" },
  { id: "p2-5-ic", pitch: "P2.5", pitchMm: 2.5, use: "ic", usd: 32.18, groups: ["ic-mekan-led-ekran"], image: "/modules/nxtionstar-p2-5-ic-mekan-modul.webp" },
  { id: "p3-07-ic", pitch: "P3.07", pitchMm: 3.07, use: "ic", usd: 30.88, groups: ["ic-mekan-led-ekran"], image: "/projects/modules/indoor-smd-surface.jpg" },
  { id: "p4-ic", pitch: "P4", pitchMm: 4, use: "ic", usd: 26.98, groups: ["ic-mekan-led-ekran"], image: "/projects/modules/indoor-wall.jpg" },
  { id: "p2-5-dis", pitch: "P2.5", pitchMm: 2.5, use: "dis", usd: 63.7, groups: ["dis-mekan-led-ekran"], image: "/modules/nxtionstar-p2-5-dis-mekan-modul.webp" },
  { id: "p2-9-dis", pitch: "P2.9", pitchMm: 2.9, use: "dis", usd: 53.3, groups: ["dis-mekan-led-ekran"], moduleMm: "250 × 250 mm", image: "/modules/nxtionstar-p2-97-dis-mekan-modul.webp" },
  { id: "p3-07-dis", pitch: "P3.07", pitchMm: 3.07, use: "dis", usd: 44.2, groups: ["dis-mekan-led-ekran"], image: "/modules/nxtionstar-p3-076-dis-mekan-modul.webp" },
  { id: "p4-dis", pitch: "P4", pitchMm: 4, use: "dis", usd: 33.8, groups: ["dis-mekan-led-ekran"], image: "/modules/nxtionstar-p4-dis-mekan-modul.webp" },
  { id: "p4-dis-front", pitch: "P4", pitchMm: 4, use: "dis", frontService: true, usd: 36.4, groups: ["dis-mekan-led-ekran"], image: "/projects/modules/front-service-module.jpg" },
  { id: "p5-dis", pitch: "P5", pitchMm: 5, use: "dis", usd: 29.9, groups: ["dis-mekan-led-ekran"], image: "/modules/nxtionstar-p5-dis-mekan-modul.webp" },
];

export const STANDARD_MODULE = "320 × 160 mm";
export const panelModule = (p: PanelPrice) => p.moduleMm ?? STANDARD_MODULE;

const moduleExceptions = PANEL_PRICES.filter((p) => p.moduleMm)
  .map((p) => `${p.pitch} ${p.use === "ic" ? "iç" : "dış"} mekân: ${p.moduleMm}`)
  .join(", ");

export const PRICE_NOTE =
  `Fiyatlar USD, panel (modül) başınadır; modül ölçüsü ${STANDARD_MODULE}${moduleExceptions ? ` (${moduleExceptions})` : ""}. KDV ve nakliye hariçtir. Tutarlar yaklaşıktır; nihai fiyat keşif sonrası yazılı teklifle kesinleşir.`;

export const pricesForGroup = (slug: string) => PANEL_PRICES.filter((p) => p.groups.includes(slug));

const trNum = (n: number, d = 2) =>
  n.toLocaleString("tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d });
export const fmtUsd = (n: number) => trNum(n, 2);
export const fmtM2 = (n: number) => trNum(Math.round(n * PANELS_PER_M2), 0);
/**
 * Module cost per m², only for standard 320 × 160 mm panels. For a panel with a
 * different datasheet module size the per-m² figure is left to the quote (the
 * calculator tiles every panel as 320 × 160 mm; owner to confirm).
 */
export const panelM2 = (p: PanelPrice): string | undefined => (p.moduleMm ? undefined : fmtM2(p.usd));

export function panelLabel(p: PanelPrice): string {
  const use = p.use === "ic" ? "İç mekân" : "Dış mekân";
  const extra = [p.surface, p.frontService ? "önden servis" : ""].filter(Boolean).join(", ");
  return `${p.pitch} ${use}${extra ? ` (${extra})` : ""}`;
}

/** Product + Offer graph for a set of panels, shown in a visible table on `pageUrl`. */
export function panelProductsJsonLd(
  panels: PanelPrice[],
  pageUrl: string,
  serviceName?: string,
  urlFor?: (p: PanelPrice) => string | undefined,
) {
  const org = { "@id": `${SITE_URL}/#organization` };
  const products = panels.map((p) => {
    const u = urlFor?.(p) ?? pageUrl;
    return {
    "@type": "Product",
    "@id": urlFor?.(p) ? `${u}#product` : `${pageUrl}#${p.id}`,
    name: `${panelLabel(p)} LED ekran modülü (${panelModule(p)})`,
    brand: nxtionstarBrandRef(),
    category: "LED ekran modülü",
    description: `${panelLabel(p)} LED ekran modülü. Fiyat panel başınadır; KDV ve nakliye hariçtir. Nihai fiyat yazılı teklifle kesinleşir.`,
    url: u,
    ...(p.image ? { image: `${SITE_URL}${p.image}` } : {}),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Piksel aralığı", value: p.pitchMm, unitText: "mm" },
      { "@type": "PropertyValue", name: "Modül ölçüsü", value: panelModule(p) },
      { "@type": "PropertyValue", name: "Kullanım", value: p.use === "ic" ? "İç mekân" : "Dış mekân" },
    ],
    offers: panelOffer(u, p.usd),
    isRelatedTo: PRICE_DATASETS,
  };
  });
  const usd = panels.map((p) => p.usd);
  const graph: Record<string, unknown>[] = [nxtionstarBrandNode(), ...products];
  if (serviceName) {
    graph.splice(1, 0, {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: serviceName,
      provider: org,
      brand: nxtionstarBrandRef(),
      areaServed: { "@type": "Country", name: "Türkiye" },
      url: pageUrl,
      isRelatedTo: PRICE_DATASETS,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: Math.min(...usd).toFixed(2),
        highPrice: Math.max(...usd).toFixed(2),
        offerCount: panels.length,
        priceValidUntil: PRICE_VALID_UNTIL,
        description:
          "Panel (modül) başına USD fiyat aralığı; KDV ve nakliye hariç. Ücretsiz kargo yok. İade: yazılı teklif/sözleşme (MerchantReturnNotPermitted).",
        seller: org,
      },
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
