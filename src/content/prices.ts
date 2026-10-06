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
}

export const PANELS_PER_M2 = 1 / (0.32 * 0.16);
export const CALC_EXTRAS = {
  laborPerM2: 100,
  controlCard: 500,
  driverSoftware: 500,
};

/** Published list year window — agents/Merchant may treat prices as dated. */
export const PRICE_VALID_UNTIL = "2026-12-31";

/** Honest OfferShippingDetails: list USD excludes freight; final = quote. */
export const PANEL_SHIPPING_DETAILS = {
  "@type": "OfferShippingDetails",
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: "TR",
  },
  description:
    "Nakliye list fiyatına dahil değildir; keşif sonrası yazılı teklifle netleşir. Uydurma ücretsiz kargo yok.",
} as const;

/**
 * Honest MerchantReturnPolicy: no fixed site return window.
 * iade koşulları teklifte = no online self-serve return; contract may still
 * define returns (yazılı teklif ve sözleşmede). Blocks invented “14-day free return”.
 */
export const PANEL_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "TR",
  returnPolicyCategory: "https://schema.org/iade koşulları teklifte",
  description:
    "Sabit iade günü yok — sitede sabit iade penceresi veya genel iade günü yayımlanmaz; yazılı teklif ve sözleşmede belirlenir. hasMerchantReturnPolicy=iade koşulları teklifte",
} as const;

export const NXTIONSTAR_BRAND = {
  "@type": "Brand",
  name: "NXTIONSTAR",
  url: `${SITE_URL}/tr/nxtionstar/`,
} as const;

export const PANEL_PRICES: PanelPrice[] = [
  { id: "p1-25-ic-gob", pitch: "P1.25", pitchMm: 1.25, use: "ic", surface: "GOB", usd: 95.88, groups: ["ic-mekan-led-ekran", "gob-led-ekran"] },
  { id: "p1-53-ic-gob", pitch: "P1.53", pitchMm: 1.53, use: "ic", surface: "GOB", usd: 62.08, groups: ["ic-mekan-led-ekran", "gob-led-ekran"] },
  { id: "p1-86-ic-gob", pitch: "P1.86", pitchMm: 1.86, use: "ic", surface: "GOB", usd: 49.08, groups: ["ic-mekan-led-ekran", "gob-led-ekran"] },
  { id: "p2-5-ic", pitch: "P2.5", pitchMm: 2.5, use: "ic", usd: 32.18, groups: ["ic-mekan-led-ekran"] },
  { id: "p3-07-ic", pitch: "P3.07", pitchMm: 3.07, use: "ic", usd: 30.88, groups: ["ic-mekan-led-ekran"] },
  { id: "p4-ic", pitch: "P4", pitchMm: 4, use: "ic", usd: 26.98, groups: ["ic-mekan-led-ekran"] },
  { id: "p2-5-dis", pitch: "P2.5", pitchMm: 2.5, use: "dis", usd: 63.7, groups: ["dis-mekan-led-ekran"] },
  { id: "p2-9-dis", pitch: "P2.9", pitchMm: 2.9, use: "dis", usd: 53.3, groups: ["dis-mekan-led-ekran"], moduleMm: "250 × 250 mm" },
  { id: "p3-07-dis", pitch: "P3.07", pitchMm: 3.07, use: "dis", usd: 44.2, groups: ["dis-mekan-led-ekran"] },
  { id: "p4-dis", pitch: "P4", pitchMm: 4, use: "dis", usd: 33.8, groups: ["dis-mekan-led-ekran"] },
  { id: "p4-dis-front", pitch: "P4", pitchMm: 4, use: "dis", frontService: true, usd: 36.4, groups: ["dis-mekan-led-ekran"] },
  { id: "p5-dis", pitch: "P5", pitchMm: 5, use: "dis", usd: 29.9, groups: ["dis-mekan-led-ekran"] },
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
    const catalogUrl = `${SITE_URL}/catalog.json`;
    return {
    "@type": "Product",
    "@id": urlFor?.(p) ? `${u}#product` : `${pageUrl}#${p.id}`,
    name: `${panelLabel(p)} LED ekran modülü (${panelModule(p)})`,
    sku: p.id,
    brand: { ...NXTIONSTAR_BRAND },
    category: "LED ekran modülü",
    description: `${panelLabel(p)} LED ekran modülü. Fiyat panel başınadır; KDV ve nakliye hariçtir. Nihai fiyat yazılı teklifle kesinleşir.`,
    url: u,
    isPartOf: {
      "@type": "DataCatalog",
      "@id": catalogUrl,
      url: catalogUrl,
      name: "NXTIONSTAR yayımlanmış panel USD katalog",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Piksel aralığı", value: p.pitchMm, unitText: "mm" },
      { "@type": "PropertyValue", name: "Modül ölçüsü", value: panelModule(p) },
      { "@type": "PropertyValue", name: "Kullanım", value: p.use === "ic" ? "İç mekân" : "Dış mekân" },
    ],
    offers: {
      "@type": "Offer",
      url: u,
      price: p.usd.toFixed(2),
      priceCurrency: "USD",
      priceValidUntil: PRICE_VALID_UNTIL,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: { ...PANEL_SHIPPING_DETAILS },
      hasMerchantReturnPolicy: { ...PANEL_RETURN_POLICY },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.usd.toFixed(2),
        priceCurrency: "USD",
        valueAddedTaxIncluded: false,
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "C62", unitText: "panel" },
      },
      seller: org,
      isPartOf: { "@id": catalogUrl },
    },
  };
  });
  const usd = panels.map((p) => p.usd);
  const graph: Record<string, unknown>[] = [...products];
  if (serviceName) {
    graph.unshift({
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: serviceName,
      provider: org,
      brand: { ...NXTIONSTAR_BRAND },
      areaServed: { "@type": "Country", name: "Türkiye" },
      url: pageUrl,
      offers: {
        "@type": "AggregateOffer",
        "@id": `${SITE_URL}/catalog.json#all-priced-panels`,
        priceCurrency: "USD",
        lowPrice: Math.min(...usd).toFixed(2),
        highPrice: Math.max(...usd).toFixed(2),
        offerCount: panels.length,
        priceValidUntil: PRICE_VALID_UNTIL,
        description:
          "Panel (modül) başına USD fiyat aralığı; KDV ve nakliye hariç; ücretsiz kargo yok. İade/garanti teklif/sözleşme. Kaynak: catalog.json.",
        seller: org,
        isPartOf: { "@id": `${SITE_URL}/catalog.json` },
      },
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
