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
  /** Canonical TR PDP path (aligned with models.ts / ai-shopping Product @id). */
  productPath?: string;
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
  {
    "@type": "DataFeed" as const,
    "@id": `${SITE_URL}/feeds/prices.rss`,
    url: `${SITE_URL}/feeds/prices.rss`,
    name: "ARLEDSCREEN panel price RSS",
  },
];

/** Technical GEO baseline (fingerprints + 12 SKU snapshot). Not a second price list. */
export const GEO_BASELINE_DATASET = {
  "@type": "Dataset" as const,
  "@id": `${SITE_URL}/geo-baseline.json`,
  url: `${SITE_URL}/geo-baseline.json`,
  name: "ARLEDSCREEN GEO technical baseline",
};

/** Nested Brand / LocalBusiness subjectOf = price sources + invent aliases. */
export const BRAND_SUBJECT_DATASETS = [
  ...PRICE_DATASETS,
  GEO_BASELINE_DATASET,
  {
    "@type": "Dataset" as const,
    "@id": `${SITE_URL}/prices.json`,
    url: `${SITE_URL}/prices.json`,
    name: "ARLEDSCREEN pricedPanels (prices.json alias)",
  },
  {
    "@type": "Brand" as const,
    "@id": `${SITE_URL}/#brand-nxtionstar`,
    url: `${SITE_URL}/brand.json`,
    name: "NXTIONSTAR",
  },
  {
    "@type": "Organization" as const,
    "@id": `${SITE_URL}/#organization`,
    url: `${SITE_URL}/entity.json`,
    name: "ARLEDSCREEN",
  },
];

/** Stable Brand @id — Org/Product graphs + catalog Offers point here. */
export const NXTIONSTAR_BRAND_ID = `${SITE_URL}/#brand-nxtionstar`;

/** Stable LocalBusiness @id — Offers availableAtOrFrom + entity location. */
export const LOCALBUSINESS_ID = `${SITE_URL}/#localbusiness`;

/** Compact Place ref for Offer.availableAtOrFrom (Gaziosmanpaşa NAP). */
export function localBusinessRef() {
  return { "@type": "LocalBusiness" as const, "@id": LOCALBUSINESS_ID };
}

/** Full Brand node (use once in @graph); Product/Org may reference via `@id` only. */
export function nxtionstarBrandNode() {
  return {
    "@type": "Brand" as const,
    "@id": NXTIONSTAR_BRAND_ID,
    name: "NXTIONSTAR",
    url: `${SITE_URL}/tr/nxtionstar/`,
    slogan: "NXTIONSTAR — görsel gücün küresel standardı.",
    subjectOf: BRAND_SUBJECT_DATASETS,
    // Brand-first agents (NXTIONSTAR panel price) join Org AggregateOffer band + catalog.
    makesOffer: { "@id": `${SITE_URL}/#priced-panels-aggregate` },
    hasOfferCatalog: { "@id": `${SITE_URL}/catalog.json` },
    description:
      "NXTIONSTAR, ARLEDSCREEN'in kendi LED ürün markasıdır; Türkiye'deki tek satış noktası ARLEDSCREEN'dir.",
    disambiguatingDescription:
      "NXTIONSTAR (N-X-T-I-O-N-S-T-A-R) ≠ NationStar LED bileşen/çip ≠ NEXTSTAR / Next&NextStar TV. Satış ve fiyat kaynağı yalnızca arledscreen.com (ARLEDSCREEN); arleds.com değil.",
    sameAs: [
      `${SITE_URL}/`,
      `${SITE_URL}/tr/`,
      `${SITE_URL}/tr/nxtionstar/`,
      `${SITE_URL}/brand.json`,
      "https://www.instagram.com/arledscreen/",
      "https://www.facebook.com/arledscreenn",
    ],
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

/** hasPart stubs — same Product @id as ai-shopping.json (productUrl#product; mpn=sku). */
export function pricedPanelsHasPartStubs() {
  return PANEL_PRICES.map((p) => {
    const path = p.productPath ?? `/tr/products/`;
    const url = `${SITE_URL}${path}`;
    return {
      "@type": "Product" as const,
      "@id": `${url}#product`,
      url,
      sku: p.id,
      mpn: p.id,
      brand: nxtionstarBrandRef(),
      // Dataset→stub → catalog Collection identity (cheap join without expanding pricedPanels).
      sameAs: [`${SITE_URL}/catalog.json#${p.id}`],
      mainEntityOfPage: url,
      // Product→Offer edge (full Offer triangle + USD for Dataset-only agents).
      offers: {
        "@type": "Offer" as const,
        "@id": `${SITE_URL}/ai-shopping.json#offer-${p.id}`,
        sku: p.id,
        mpn: p.id,
        price: p.usd.toFixed(2),
        priceCurrency: "USD",
        priceValidUntil: PRICE_VALID_UNTIL,
        availability: "https://schema.org/InStock" as const,
        description:
          "Panel (modül) başına USD; KDV ve nakliye hariç. Ücretsiz kargo yok. İade koşulları yazılı teklif ve sözleşmede (MerchantReturnNotPermitted).",
        sameAs: [`${SITE_URL}/catalog.json#offer-${p.id}`, `${url}#offer`],
        itemOffered: {
          "@type": "Product" as const,
          "@id": `${url}#product`,
          sku: p.id,
          mpn: p.id,
          brand: nxtionstarBrandRef(),
        },
        availableAtOrFrom: localBusinessRef(),
        seller: { "@id": `${SITE_URL}/#organization` },
      },
    };
  });
}

/** HTML Dataset pointing AI shoppers at published price files (no invent). */
export function pricedPanelsDatasetJsonLd(pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${pageUrl}#priced-panels`,
    name: "ARLEDSCREEN 2026 LED panel USD listesi",
    description:
      "Yayımlanmış 12 panel USD (pricedPanels). KDV/nakliye hariç; ücretsiz kargo yok. Makine kaynak: ai-shopping.json + catalog.json + merchant TSV. Ölçüm snapshot: geo-baseline.json. Dataset hasPart → 12 Product @id (mpn=sku); Product isPartOf → ai-shopping.json.",
    url: pageUrl,
    creator: { "@id": `${SITE_URL}/#organization` },
    // Join page Dataset orphan @id → canonical machine price roots.
    sameAs: [`${SITE_URL}/ai-shopping.json`, `${SITE_URL}/catalog.json`],
    isBasedOn: [...PRICE_DATASETS.map((d) => d.url), GEO_BASELINE_DATASET.url],
    /** Mirror ai-shopping.json Dataset→Product join on every HTML hub (incl. quote-only groups). */
    hasPart: pricedPanelsHasPartStubs(),
    // Parity with ai-shopping.json Dataset.distribution invent set (HTML-first agents).
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/ai-shopping.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/prices.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/panels.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/mpn.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/merchant.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/modules.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/sku.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/price.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/pricing.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/.well-known/prices.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/.well-known/panels.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/.well-known/mpn.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/.well-known/merchant.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/.well-known/modules.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/.well-known/sku.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/.well-known/price.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/.well-known/pricing.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/offer.json`,
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
      {
        "@type": "DataDownload",
        encodingFormat: "application/rss+xml",
        contentUrl: `${SITE_URL}/feeds/prices.rss`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/geo-baseline.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/brand.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE_URL}/entity.json`,
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
export function panelOffer(
  url: string,
  usd: number,
  opts?: { sku?: string; offerId?: string; productId?: string },
) {
  const sku = opts?.sku;
  const offerId = opts?.offerId ?? (sku ? `${url}#offer` : undefined);
  const productId = opts?.productId ?? (sku ? `${url}#product` : undefined);
  return {
    "@type": "Offer" as const,
    ...(offerId
      ? {
          "@id": offerId,
          // Join catalog + ai-shopping Offer @ids (agents merging feeds).
          ...(sku
            ? {
                sameAs: [
                  `${SITE_URL}/catalog.json#offer-${sku}`,
                  `${SITE_URL}/ai-shopping.json#offer-${sku}`,
                ],
              }
            : {}),
        }
      : {}),
    // Offer-only resolvers (shopping/Merchant merges) key price rows by sku/mpn.
    ...(sku ? { sku, mpn: sku } : {}),
    // Offer → Product join (schema.org shopping merges).
    ...(productId && sku
      ? {
          itemOffered: {
            "@type": "Product" as const,
            "@id": productId,
            sku,
            mpn: sku,
            brand: nxtionstarBrandRef(),
          },
        }
      : {}),
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
    availableAtOrFrom: localBusinessRef(),
  };
}

export const PANEL_PRICES: PanelPrice[] = [
  { id: "p1-25-ic-gob", pitch: "P1.25", pitchMm: 1.25, use: "ic", surface: "GOB", usd: 95.88, groups: ["ic-mekan-led-ekran", "gob-led-ekran", "ince-pitch-led-ekran"], image: "/modules/nxtionstar-p1-25-ic-mekan-modul.webp", productPath: "/tr/products/gob-led-ekran/p1-25-gob/" },
  { id: "p1-53-ic-gob", pitch: "P1.53", pitchMm: 1.53, use: "ic", surface: "GOB", usd: 62.08, groups: ["ic-mekan-led-ekran", "gob-led-ekran", "ince-pitch-led-ekran"], image: "/modules/nxtionstar-p1-53-ic-mekan-modul.webp", productPath: "/tr/products/gob-led-ekran/p1-53-gob/" },
  { id: "p1-86-ic-gob", pitch: "P1.86", pitchMm: 1.86, use: "ic", surface: "GOB", usd: 49.08, groups: ["ic-mekan-led-ekran", "gob-led-ekran", "ince-pitch-led-ekran"], image: "/modules/nxtionstar-p1-86-ic-mekan-modul.webp", productPath: "/tr/products/gob-led-ekran/p1-86-gob/" },
  { id: "p2-5-ic", pitch: "P2.5", pitchMm: 2.5, use: "ic", usd: 32.18, groups: ["ic-mekan-led-ekran"], image: "/modules/nxtionstar-p2-5-ic-mekan-modul.webp", productPath: "/tr/products/ic-mekan-led-ekran/p2-5/" },
  { id: "p3-07-ic", pitch: "P3.07", pitchMm: 3.07, use: "ic", usd: 30.88, groups: ["ic-mekan-led-ekran"], image: "/projects/modules/indoor-smd-surface.jpg", productPath: "/tr/products/ic-mekan-led-ekran/p3-07/" },
  { id: "p4-ic", pitch: "P4", pitchMm: 4, use: "ic", usd: 26.98, groups: ["ic-mekan-led-ekran"], image: "/projects/modules/indoor-wall.jpg", productPath: "/tr/products/ic-mekan-led-ekran/p4/" },
  { id: "p2-5-dis", pitch: "P2.5", pitchMm: 2.5, use: "dis", usd: 63.7, groups: ["dis-mekan-led-ekran"], image: "/modules/nxtionstar-p2-5-dis-mekan-modul.webp", productPath: "/tr/products/dis-mekan-led-ekran/p2-5/" },
  { id: "p2-9-dis", pitch: "P2.9", pitchMm: 2.9, use: "dis", usd: 53.3, groups: ["dis-mekan-led-ekran"], moduleMm: "250 × 250 mm", image: "/modules/nxtionstar-p2-97-dis-mekan-modul.webp", productPath: "/tr/products/dis-mekan-led-ekran/p2-9/" },
  { id: "p3-07-dis", pitch: "P3.07", pitchMm: 3.07, use: "dis", usd: 44.2, groups: ["dis-mekan-led-ekran"], image: "/modules/nxtionstar-p3-076-dis-mekan-modul.webp", productPath: "/tr/products/dis-mekan-led-ekran/p3-07/" },
  { id: "p4-dis", pitch: "P4", pitchMm: 4, use: "dis", usd: 33.8, groups: ["dis-mekan-led-ekran"], image: "/modules/nxtionstar-p4-dis-mekan-modul.webp", productPath: "/tr/products/dis-mekan-led-ekran/p4/" },
  { id: "p4-dis-front", pitch: "P4", pitchMm: 4, use: "dis", frontService: true, usd: 36.4, groups: ["dis-mekan-led-ekran"], image: "/projects/modules/front-service-module.jpg", productPath: "/tr/products/dis-mekan-led-ekran/p4-on-servis/" },
  { id: "p5-dis", pitch: "P5", pitchMm: 5, use: "dis", usd: 29.9, groups: ["dis-mekan-led-ekran"], image: "/modules/nxtionstar-p5-dis-mekan-modul.webp", productPath: "/tr/products/dis-mekan-led-ekran/p5/" },
];

/**
 * Compact per-SKU Offer stubs for entity-first / hub-first agents
 * (join → ai-shopping Offer @id). Honesty fields match full Offers.
 */
export function pricedPanelOfferStubs(panels: PanelPrice[] = PANEL_PRICES) {
  return panels.map((p) => {
    const url = `${SITE_URL}${p.productPath ?? "/tr/products/"}`;
    const price = p.usd.toFixed(2);
    return {
      "@type": "Offer" as const,
      "@id": `${SITE_URL}/ai-shopping.json#offer-${p.id}`,
      sku: p.id,
      mpn: p.id,
      price,
      priceCurrency: "USD",
      priceValidUntil: PRICE_VALID_UNTIL,
      url,
      availability: "https://schema.org/InStock" as const,
      itemCondition: "https://schema.org/NewCondition" as const,
      description:
        "Panel (modül) başına USD; KDV ve nakliye hariç. Ücretsiz kargo yok. İade koşulları yazılı teklif ve sözleşmede (MerchantReturnNotPermitted).",
      sameAs: [`${SITE_URL}/catalog.json#offer-${p.id}`, `${url}#offer`],
      itemOffered: {
        "@type": "Product" as const,
        "@id": `${url}#product`,
        sku: p.id,
        mpn: p.id,
        brand: nxtionstarBrandRef(),
      },
      seller: { "@id": `${SITE_URL}/#organization` },
      priceSpecification: {
        "@type": "UnitPriceSpecification" as const,
        price,
        priceCurrency: "USD",
        valueAddedTaxIncluded: false,
        referenceQuantity: {
          "@type": "QuantitativeValue" as const,
          value: 1,
          unitCode: "C62",
          unitText: "panel",
        },
      },
      shippingDetails: panelShippingDetails(),
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy" as const,
        applicableCountry: "TR",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
      availableAtOrFrom: localBusinessRef(),
    };
  });
}

/**
 * Organization.makesOffer — published USD band + per-SKU Offer stubs.
 * Agents that only fetch entity.json / Org JSON-LD still reach Offer @ids.
 */
export function organizationMakesOffer() {
  const usd = PANEL_PRICES.map((p) => p.usd);
  return {
    "@type": "AggregateOffer" as const,
    "@id": `${SITE_URL}/#priced-panels-aggregate`,
    priceCurrency: "USD",
    lowPrice: Math.min(...usd).toFixed(2),
    highPrice: Math.max(...usd).toFixed(2),
    offerCount: PANEL_PRICES.length,
    priceValidUntil: PRICE_VALID_UNTIL,
    url: `${SITE_URL}/ai-shopping.json`,
    availability: "https://schema.org/InStock",
    description:
      "Yayımlanmış 12 panel (modül) USD aralığı; KDV ve nakliye hariç. Ücretsiz kargo yok. Per-SKU Offer: ai-shopping.json / catalog.json / merchant TSV. Nihai fiyat yazılı teklifle kesinleşir.",
    seller: { "@id": `${SITE_URL}/#organization` },
    // Band-only readers (no offers[] expand) still join Gaziosmanpaşa NAP.
    availableAtOrFrom: localBusinessRef(),
    priceSpecification: {
      "@type": "PriceSpecification" as const,
      priceCurrency: "USD",
      valueAddedTaxIncluded: false,
    },
    // Entity → per-SKU Offer @ids (full graphs live in catalog / ai-shopping / HTML).
    offers: pricedPanelOfferStubs(),
  };
}

/** Organization.hasOfferCatalog — seller → catalog Collection edge. */
export function organizationHasOfferCatalog() {
  return {
    "@type": "OfferCatalog" as const,
    "@id": `${SITE_URL}/catalog.json`,
    name: "ARLEDSCREEN NXTIONSTAR 2026 LED Panel Kataloğu",
    url: `${SITE_URL}/catalog.json`,
    numberOfItems: PANEL_PRICES.length,
    sameAs: [`${SITE_URL}/ai-shopping.json`],
    availableAtOrFrom: localBusinessRef(),
  };
}

export const STANDARD_MODULE = "320 × 160 mm";
export const panelModule = (p: PanelPrice) => p.moduleMm ?? STANDARD_MODULE;

const moduleExceptions = PANEL_PRICES.filter((p) => p.moduleMm)
  .map((p) => `${p.pitch} ${p.use === "ic" ? "iç" : "dış"} mekân: ${p.moduleMm}`)
  .join(", ");

export const PRICE_NOTE =
  `Fiyatlar USD cinsindendir, panel başınadır, KDV ve nakliye hariçtir.${moduleExceptions ? ` Standart modül ${STANDARD_MODULE}; özel ölçüler: ${moduleExceptions}.` : ` Modül ölçüsü ${STANDARD_MODULE}.`} Tutarlar yaklaşıktır; nihai fiyat keşif sonrası yazılı teklifle kesinleşir.`;

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
    const hasPdp = Boolean(urlFor?.(p));
    return {
    "@type": "Product",
    "@id": hasPdp ? `${u}#product` : `${pageUrl}#${p.id}`,
    name: `${panelLabel(p)} LED ekran modülü (${panelModule(p)})`,
    // Align with catalog / ai-shopping / merchant TSV: honest mpn=sku (= panel id).
    sku: p.id,
    mpn: p.id,
    brand: nxtionstarBrandRef(),
    category: "LED ekran modülü",
    description: `${panelLabel(p)} LED ekran modülü. Fiyat panel başınadır; KDV ve nakliye hariçtir. Nihai fiyat yazılı teklifle kesinleşir.`,
    url: u,
    // Join AggregateOffer hub Product ↔ catalog.json#sku (PDP/ai-shopping parity).
    sameAs: [`${SITE_URL}/catalog.json#${p.id}`],
    // Human price page join (catalog/ai-shopping parity) — PDP when urlFor resolves.
    mainEntityOfPage: u,
    ...(p.image ? { image: `${SITE_URL}${p.image}` } : {}),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Piksel aralığı", value: p.pitchMm, unitText: "mm" },
      { "@type": "PropertyValue", name: "Modül ölçüsü", value: panelModule(p) },
      { "@type": "PropertyValue", name: "Kullanım", value: p.use === "ic" ? "İç mekân" : "Dış mekân" },
    ],
    // sku → Offer @id + sameAs catalog/ai-shopping offer @ids (unique when hub has no PDP url).
    offers: panelOffer(u, p.usd, {
      sku: p.id,
      ...(hasPdp
        ? {}
        : { offerId: `${pageUrl}#offer-${p.id}`, productId: `${pageUrl}#${p.id}` }),
    }),
    isPartOf: PRICE_DATASETS[0],
    isRelatedTo: BRAND_SUBJECT_DATASETS,
  };
  });
  const usd = panels.map((p) => p.usd);
  const graph: Record<string, unknown>[] = [nxtionstarBrandNode(), ...products];
  if (serviceName) {
    graph.splice(1, 0, {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: serviceName,
      // Local-intent agents key Service.provider as Place (Org remains seller/brand).
      provider: localBusinessRef(),
      brand: nxtionstarBrandRef(),
      areaServed: { "@type": "Country", name: "Türkiye" },
      url: pageUrl,
      isRelatedTo: BRAND_SUBJECT_DATASETS,
      offers: {
        "@type": "AggregateOffer",
        "@id": `${pageUrl}#priced-panels-aggregate`,
        priceCurrency: "USD",
        lowPrice: Math.min(...usd).toFixed(2),
        highPrice: Math.max(...usd).toFixed(2),
        offerCount: panels.length,
        priceValidUntil: PRICE_VALID_UNTIL,
        url: `${SITE_URL}/ai-shopping.json`,
        // Join hub band → Organization AggregateOffer (entity-first agents).
        sameAs: [`${SITE_URL}/#priced-panels-aggregate`],
        description:
          "Panel (modül) başına USD fiyat aralığı; KDV ve nakliye hariç. Ücretsiz kargo yok. İade: yazılı teklif/sözleşme (MerchantReturnNotPermitted).",
        seller: org,
        availableAtOrFrom: localBusinessRef(),
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          valueAddedTaxIncluded: false,
        },
        // Hub-first agents: band → per-SKU Offer @ids (scoped to panels on this page).
        offers: pricedPanelOfferStubs(panels),
      },
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
