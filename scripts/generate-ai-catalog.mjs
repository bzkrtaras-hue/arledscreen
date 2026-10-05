/**
 * Build public/catalog.json for AI shopping / agent discovery.
 * Source of truth: src/content/prices.ts + src/content/models.ts (no invented prices).
 * Run: node scripts/generate-ai-catalog.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://arledscreen.com";

const pricesSrc = fs.readFileSync(path.join(root, "src/content/prices.ts"), "utf8");
const modelsSrc = fs.readFileSync(path.join(root, "src/content/models.ts"), "utf8");

const priceRe =
  /\{\s*id:\s*"([^"]+)",\s*pitch:\s*"([^"]+)",\s*pitchMm:\s*([\d.]+),\s*use:\s*"(ic|dis)",\s*(?:surface:\s*"GOB",\s*)?(?:frontService:\s*true,\s*)?usd:\s*([\d.]+),\s*groups:\s*\[([^\]]+)\](?:,\s*moduleMm:\s*"([^"]+)")?\s*\}/g;

const prices = [];
for (const m of pricesSrc.matchAll(priceRe)) {
  prices.push({
    id: m[1],
    pitch: m[2],
    pitchMm: Number(m[3]),
    use: m[4],
    surface: /surface:\s*"GOB"/.test(m[0]) ? "GOB" : undefined,
    frontService: /frontService:\s*true/.test(m[0]),
    usd: Number(m[5]),
    groups: [...m[6].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
    moduleMm: m[7] || "320 × 160 mm",
  });
}

const modelBlocks = [
  ...modelsSrc.matchAll(
    /\{\s*slug:\s*"([^"]+)",\s*group:\s*"([^"]+)"([\s\S]*?)(?=\n  \{\s*slug:|\n];)/g,
  ),
];
const byPriceId = new Map();
for (const m of modelBlocks) {
  const priceId = m[3].match(/priceId:\s*"([^"]+)"/)?.[1];
  if (!priceId) continue;
  const image = m[3].match(/image:\s*"([^"]+)"/)?.[1];
  const imageAlt = m[3].match(/imageAlt:\s*"([^"]+)"/)?.[1];
  byPriceId.set(priceId, { slug: m[1], group: m[2], image, imageAlt });
}

const laborPerM2 = 100;
const controlCard = 500;
const driverSoftware = 500;

const products = prices.map((p) => {
  const model = byPriceId.get(p.id);
  const useLabel = p.use === "ic" ? "İç mekân" : "Dış mekân";
  const extras = [p.surface, p.frontService ? "önden servis" : ""].filter(Boolean).join(", ");
  const name = `NXTIONSTAR ${p.pitch} ${useLabel}${extras ? ` (${extras})` : ""} LED Modül`;
  const url = model
    ? `${SITE}/tr/products/${model.group}/${model.slug}/`
    : `${SITE}/tr/products/${p.groups[0]}/`;
  const groupUrl = `${SITE}/tr/products/${p.groups[0]}/`;
  const image = model?.image ? `${SITE}${model.image}` : undefined;
  return {
    "@type": "Product",
    sku: p.id,
    name,
    brand: { "@type": "Brand", name: "NXTIONSTAR" },
    category: "LED ekran modülü",
    url,
    groupUrl,
    ...(image ? { image, imageAlt: model.imageAlt } : {}),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Piksel aralığı", value: p.pitchMm, unitText: "mm" },
      { "@type": "PropertyValue", name: "Modül ölçüsü", value: p.moduleMm },
      { "@type": "PropertyValue", name: "Kullanım", value: useLabel },
      ...(p.surface
        ? [{ "@type": "PropertyValue", name: "Yüzey", value: p.surface }]
        : []),
      ...(p.frontService
        ? [{ "@type": "PropertyValue", name: "Servis", value: "Önden servis" }]
        : []),
    ],
    offers: {
      "@type": "Offer",
      url,
      price: p.usd.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.usd.toFixed(2),
        priceCurrency: "USD",
        valueAddedTaxIncluded: false,
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "C62",
          unitText: "panel",
        },
      },
      seller: { "@id": `${SITE}/#organization` },
    },
  };
});

const quoteOnlyGroups = [
  {
    name: "Şeffaf LED ekran",
    url: `${SITE}/tr/products/seffaf-led-ekran/`,
    note: "Panel list fiyatı yayımlanmaz; yazılı teklif.",
  },
  {
    name: "Transparan (mesh) LED ekran",
    url: `${SITE}/tr/products/transparan-led-ekran/`,
    note: "Panel list fiyatı yayımlanmaz; yazılı teklif.",
  },
  {
    name: "Esnek LED ekran",
    url: `${SITE}/tr/products/esnek-led-ekran/`,
    note: "Panel list fiyatı yayımlanmaz; yazılı teklif.",
  },
  {
    name: "Poster / totem LED ekran",
    url: `${SITE}/tr/products/poster-led-ekran/`,
    note: "Panel list fiyatı yayımlanmaz; yazılı teklif.",
  },
  {
    name: "Kiralık LED ekran",
    url: `${SITE}/tr/products/kiralik-led-ekran/`,
    note: "Kiralama bedeli projeye göre teklif.",
  },
];

const catalog = {
  "@context": "https://schema.org",
  "@type": "DataCatalog",
  "@id": `${SITE}/catalog.json`,
  name: "ARLEDSCREEN / NXTIONSTAR LED panel katalog (AI alışveriş)",
  description:
    "Yayımlanmış 2026 panel (modül) USD listesi. AI alışveriş ve ajan sistemleri için makinece okunur. KDV ve nakliye hariç; nihai tutar keşif ve yazılı teklifle kesinleşir. Uydurma fiyat yoktur.",
  url: `${SITE}/catalog.json`,
  creator: { "@id": `${SITE}/#organization` },
  dateModified: new Date().toISOString().slice(0, 10),
  inLanguage: "tr",
  isBasedOn: [
    `${SITE}/tr/led-ekran-fiyatlari/`,
    `${SITE}/tr/hesaplayici/`,
    "https://fiyat.arledscreen.com/",
    `${SITE}/entity.json`,
  ],
  shoppingPolicy: {
    currency: "USD",
    priceUnit: "panel",
    standardModule: "320 × 160 mm",
    vatIncluded: false,
    shippingIncluded: false,
    extrasUsd: {
      workshopLaborPerM2: laborPerM2,
      controlCard: controlCard,
      driverSoftware: driverSoftware,
    },
    finalPrice: "Keşif sonrası yazılı teklif",
    quoteUrl: `${SITE}/tr/quote/`,
    calculatorUrl: `${SITE}/tr/hesaplayici/`,
    whatsapp: "https://wa.me/905305078834",
  },
  disambiguation: [
    "ARLEDSCREEN ≠ Almanya ARLED Solutions GmbH / ARLED Cinema",
    "NXTIONSTAR ≠ Next&NextStar (NEXTSTAR) TV ≠ NationStar LED bileşen",
  ],
  dataset: products,
  quoteOnlyProductGroups: quoteOnlyGroups,
};

const out = path.join(root, "public/catalog.json");
fs.writeFileSync(out, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Wrote ${out} (${products.length} priced panels, ${quoteOnlyGroups.length} quote-only groups)`);
if (products.length < 10) {
  console.error("Expected ≥10 priced panels from prices.ts");
  process.exit(1);
}
