/**
 * Mağaza / Shop (/tr|en/magaza/) — the 19 products that are also listed in the ARLEDSCREEN
 * Shopify store (k3kkws-wg.myshopify.com): 12 NXTIONSTAR LED modules + 7 reference display systems.
 *
 * Source rules (do not relax):
 * - Module names, USD prices, images and product URLs come from PANEL_PRICES / LED_MODELS, i.e. the
 *   same data that feeds ai-shopping.json, catalog.json and /products.json. No second price list.
 * - Shopify TL prices are NOT shown anywhere on the site (the site publishes USD only).
 * - The 7 reference systems have no published USD price: they are quote-only ("yazılı teklif").
 *   They get a neutral card, never an invented photo.
 * - No Product/Offer JSON-LD is emitted here: module Product/Offer nodes already live on the model
 *   pages and in ai-shopping.json (same @id); this page only lists them (ItemList).
 */
import { PANEL_PRICES, fmtUsd, type PanelPrice } from "@/content/prices";
import { LED_MODELS, modelPath, type LedModel } from "@/content/models";

export type Lang = "tr" | "en";

export interface ShopModule {
  kind: "module";
  id: string;
  sku: string;
  use: "ic" | "dis";
  pitch: string;
  usd: number;
  nameTr: string;
  nameEn: string;
  /** One own-words sentence (TR = model note; EN = spec line). */
  descTr: string;
  descEn: string;
  moduleMm: string;
  /** Real module photo; empty = neutral card (the site asset for this SKU is a scene or mis-labelled photo, not a product shot). */
  image: string;
  imageAlt: string;
  /** TR model page (exists); EN has no model page, so EN links to the EN product-group page. */
  pathTr: string;
  pathEn: string;
  quoteSlug: string;
}

export interface ShopSystem {
  kind: "system";
  id: string;
  sku: string;
  use: "ic" | "dis";
  areaM2: number;
  pitch: string;
  nameTr: string;
  nameEn: string;
  descTr: string;
  descEn: string;
}

const panelLabelTr = (p: PanelPrice) => {
  const extra = [p.surface, p.frontService ? "önden servis" : ""].filter(Boolean).join(", ");
  return `${p.pitch} ${p.use === "ic" ? "İç mekân" : "Dış mekân"}${extra ? ` (${extra})` : ""}`;
};
const panelLabelEn = (p: PanelPrice) => {
  const extra = [p.surface ? String(p.surface).toUpperCase() : "", p.frontService ? "front service" : ""]
    .filter(Boolean)
    .join(", ");
  return `${p.pitch} ${p.use === "ic" ? "Indoor" : "Outdoor"}${extra ? ` (${extra})` : ""}`;
};

const pitchMm = (p: PanelPrice) => String(p.pitchMm).replace(".", ",");

/**
 * Site assets that are not photos of the module itself (auditorium banner labelled P2.5 for the P3.07
 * panel, camera-operator stock photo for P4). The same SKUs in Shopify use the same files, so they
 * get a neutral card instead of a misleading picture. Open PR #102 fixes these assets separately.
 */
const NEUTRAL_IMAGE_IDS = new Set(["p3-07-ic", "p4-ic"]);

function toModule(p: PanelPrice, m: LedModel | undefined): ShopModule {
  const size = p.moduleMm ?? "320 × 160 mm";
  const group = m?.group ?? p.groups[0];
  return {
    kind: "module",
    id: p.id,
    sku: p.id,
    use: p.use,
    pitch: p.pitch,
    usd: p.usd,
    nameTr: `NXTIONSTAR ${panelLabelTr(p)} LED Modül`,
    nameEn: `NXTIONSTAR ${panelLabelEn(p)} LED Module`,
    descTr: m?.note ?? `${size} modül, ${pitchMm(p)} mm piksel aralığı.`,
    descEn: `${p.use === "ic" ? "Indoor" : "Outdoor"} LED module${p.surface ? ", GOB protected surface" : ""}${p.frontService ? ", front service" : ""}. ${size}, ${p.pitchMm} mm pixel pitch.`,
    moduleMm: size,
    image: NEUTRAL_IMAGE_IDS.has(p.id) ? "" : (p.image ?? m?.image ?? ""),
    imageAlt: m?.imageAlt ?? `NXTIONSTAR ${p.pitch} LED modül`,
    pathTr: p.productPath ?? (m ? modelPath(m) : "/tr/products/"),
    pathEn: `/en/products/${group}/`,
    quoteSlug: m ? `${m.group}-${m.slug}` : p.id,
  };
}

export const SHOP_MODULES: ShopModule[] = PANEL_PRICES.map((p) =>
  toModule(
    p,
    LED_MODELS.find((m) => m.priceId === p.id),
  ),
);

/** Reference (örnek) display systems from the Shopify store; quote-only on the site. */
export const SHOP_SYSTEMS: ShopSystem[] = [
  { area: 2, use: "ic", pitch: "P2.5" },
  { area: 4, use: "ic", pitch: "P2.5" },
  { area: 6, use: "ic", pitch: "P2.5" },
  { area: 8, use: "ic", pitch: "P2.5" },
  { area: 12, use: "dis", pitch: "P4" },
  { area: 24, use: "dis", pitch: "P4" },
  { area: 50, use: "dis", pitch: "P4" },
].map(({ area, use, pitch }) => ({
  kind: "system" as const,
  id: `sys-${area}m2-${use}`,
  sku: `sys-${area}m2-${use === "ic" ? "ic" : "dis"}`,
  use: use as "ic" | "dis",
  areaM2: area,
  pitch,
  nameTr: `${area} m² ${use === "ic" ? "iç mekân" : "dış mekân"} LED ekran`,
  nameEn: `${area} m² ${use === "ic" ? "indoor" : "outdoor"} LED display`,
  descTr:
    use === "ic"
      ? "Lobi, showroom ve stüdyo gibi iç mekânlar için anahtar teslim kurulum: modüller, kontrol sistemi ve yazılım tek elden."
      : "Cephe ve açık alan projeleri için anahtar teslim kurulum: modüller, kontrol sistemi ve yazılım tek elden.",
  descEn:
    use === "ic"
      ? "Turnkey installation for lobbies, showrooms and studios: modules, control system and software from one source."
      : "Turnkey installation for façade and open-area projects: modules, control system and software from one source.",
}));

export const SHOP_COUNT = SHOP_MODULES.length + SHOP_SYSTEMS.length;

export const priceBand = (use?: "ic" | "dis") => {
  const v = SHOP_MODULES.filter((m) => !use || m.use === use).map((m) => m.usd);
  return { lo: Math.min(...v), hi: Math.max(...v) };
};

/** Price label: TR "32,18 USD", EN "USD 32.18" — same numbers as the price pages in each language. */
export const priceLabel = (usd: number, l: Lang) =>
  l === "tr"
    ? `${fmtUsd(usd)} USD`
    : `USD ${usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
