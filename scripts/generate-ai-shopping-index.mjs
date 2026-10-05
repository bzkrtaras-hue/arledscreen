/**
 * Build public/ai-shopping.json — single-fetch AI alışveriş discovery index (Gün 48).
 *
 * Agents that find this URL get every machine-readable price/entity artefact,
 * 12 blind-test intents, and cite facts without crawling the whole site.
 * No invented prices. Spam blog / 81-il yok.
 *
 * Run: node scripts/generate-ai-shopping-index.mjs
 * (also via npm run build)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://arledscreen.com";

const entityPath = path.join(root, "public/entity.json");
const catalogPath = path.join(root, "public/catalog.json");
if (!fs.existsSync(entityPath) || !fs.existsSync(catalogPath)) {
  console.error("generate-ai-shopping-index: run sync-entity + generate-ai-catalog first");
  process.exit(1);
}

const entity = JSON.parse(fs.readFileSync(entityPath, "utf8"));
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const dataset = catalog.dataset || [];
const groups = catalog.groupAggregateOffers || [];

const SOURCES = [
  {
    name: "entity.json",
    url: `${SITE}/entity.json`,
    role: "Organization NAP + cite + disambiguation + FAQs",
  },
  {
    name: "catalog.json",
    url: `${SITE}/catalog.json`,
    role: "12 priced panel USD + groupAggregateOffers",
  },
  {
    name: "entity-profiles.json",
    url: `${SITE}/entity-profiles.json`,
    role: "Point C paste packs (GBP/LinkedIn/IG/FB)",
  },
  {
    name: "ard.json",
    url: `${SITE}/.well-known/ard.json`,
    role: "Agentic Resource Discovery manifest",
  },
  {
    name: "llms.txt",
    url: `${SITE}/llms.txt`,
    role: "Short cite-aligned AI summary",
  },
  {
    name: "llms-full.txt",
    url: `${SITE}/llms-full.txt`,
    role: "Full intent→URL table + panel USD",
  },
  {
    name: "merchant-priced-panels.tsv",
    url: `${SITE}/feeds/merchant-priced-panels.tsv`,
    role: "Google Merchant dry-run feed (12 SKU, quote-only excluded)",
  },
  {
    name: "fiyat hub",
    url: `${SITE}/tr/led-ekran-fiyatlari/`,
    role: "Human + agent price table (same USD as catalog)",
  },
  {
    name: "hesaplayici",
    url: `${SITE}/tr/hesaplayici/`,
    role: "m² cost calculator from published panels",
  },
  {
    name: "yapay-zeka",
    url: `${SITE}/tr/yapay-zeka/`,
    role: "Agent discovery landing (entity/catalog/ard)",
  },
];

const PROMPTS = [
  { id: 1, q: "ARLEDSCREEN kimdir?", urls: [`${SITE}/entity.json`, `${SITE}/tr/about/`] },
  { id: 2, q: "LED ekran panel fiyatları 2026", urls: [`${SITE}/catalog.json`, `${SITE}/tr/led-ekran-fiyatlari/`] },
  { id: 3, q: "P2.5 iç mekan LED ekran paneli kaç USD?", urls: [`${SITE}/catalog.json`, `${SITE}/tr/products/ic-mekan-led-ekran/p2-5/`] },
  { id: 4, q: "Dış mekan LED ekran fiyat bandı", urls: [`${SITE}/catalog.json`, `${SITE}/tr/products/dis-mekan-led-ekran/`] },
  { id: 5, q: "LED ekran m² maliyeti nasıl hesaplanır?", urls: [`${SITE}/tr/hesaplayici/`] },
  { id: 6, q: "AI ajanları ARLEDSCREEN fiyatını nereden okur?", urls: [`${SITE}/tr/yapay-zeka/`, `${SITE}/.well-known/ard.json`, `${SITE}/ai-shopping.json`] },
  { id: 7, q: "GOB mi SMD mi?", urls: [`${SITE}/tr/rehber/gob-vs-smd/`] },
  { id: 8, q: "LED tabela mı LED ekran mı?", urls: [`${SITE}/tr/rehber/led-tabela-mi-led-ekran-mi/`] },
  { id: 9, q: "Kiralık LED ekran fiyatı?", urls: [`${SITE}/tr/products/kiralik-led-ekran/`, `${SITE}/tr/quote/`] },
  { id: 10, q: "Şeffaf / transparan LED fiyatı?", urls: [`${SITE}/tr/products/seffaf-led-ekran/`, `${SITE}/tr/products/transparan-led-ekran/`] },
  { id: 11, q: "İstanbul LED ekran firması telefon?", urls: [`${SITE}/entity.json`, `${SITE}/tr/`] },
  { id: 12, q: "NXTIONSTAR nedir?", urls: [`${SITE}/tr/nxtionstar/`, `${SITE}/entity.json`] },
];

const p25 = dataset.find((d) => d.sku === "p2-5-ic");
const p25Price = p25?.offers?.price || p25?.offers?.priceSpecification?.price;

const doc = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": `${SITE}/ai-shopping.json`,
  name: "ARLEDSCREEN AI alışveriş / GEO discovery index",
  description:
    "Tek istekte entity + fiyat kataloğu + Point C packs + ARD + llms + Merchant feed + 12 kör test intent. Uydurma TL paket / 81-il kapısı / AggregateRating yok. Quote-only gruplar teklifle netleşir.",
  url: `${SITE}/ai-shopping.json`,
  creator: { "@id": `${SITE}/#organization` },
  isBasedOn: [`${SITE}/entity.json`, `${SITE}/catalog.json`, `${SITE}/.well-known/ard.json`],
  dateModified: new Date().toISOString().slice(0, 10),
  inLanguage: "tr",
  shoppingPolicy: {
    currency: "USD",
    priceUnit: "panel",
    pricedSkuCount: dataset.length,
    quoteOnly: ["kiralik-led-ekran", "seffaf-led-ekran", "transparan-led-ekran", "esnek-led-ekran", "poster-led-ekran"],
    vatIncluded: false,
    shippingIncluded: false,
    finalPrice: "Keşif sonrası yazılı teklif",
    mustCite: [`${SITE}/catalog.json`, `${SITE}/entity.json`],
  },
  cite: {
    oneLiner: entity.citeOneLiner,
    short: entity.citeShort,
    medium: entity.citeMedium,
    telephone: entity.telephone,
    addressLocality: entity.address?.addressLocality,
  },
  mustKnowFacts: {
    p25IcUsd: p25Price != null ? String(p25Price) : null,
    brand: "NXTIONSTAR",
    notToConfuseWith: ["ARLED Solutions GmbH", "NEXTSTAR TV", "NationStar LED"],
  },
  primarySources: Object.fromEntries(SOURCES.map((s) => [s.name, s.url])),
  itemListElement: SOURCES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    url: s.url,
    description: s.role,
  })),
  groupAggregateOfferIds: groups.map((g) => g["@id"]).filter(Boolean),
  blindTestPrompts: PROMPTS,
  indexNow: {
    keyLocation: `${SITE}/e8e6f86598e94e95a323f807c39843ad.txt`,
    pingAfterDeploy: "npm run indexnow -- --live",
  },
  ownerOps: {
    mergePr: "PR #55 → Cloudflare Pages redeploy",
    smoke: "npm run smoke:live",
    pointC: `${SITE}/entity-profiles.json`,
    postDeploy: "npm run post-deploy",
  },
};

const out = path.join(root, "public/ai-shopping.json");
fs.writeFileSync(out, `${JSON.stringify(doc, null, 2)}\n`);
console.log(
  `Wrote ${path.relative(root, out)} (sources=${SOURCES.length}, prompts=${PROMPTS.length}, priced=${dataset.length})`,
);
