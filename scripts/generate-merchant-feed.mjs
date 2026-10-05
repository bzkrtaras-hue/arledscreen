/**
 * Google Merchant Center dry-run feed — ONLY the 12 priced panels.
 * Source: public/catalog.json (PANEL_PRICES). Never invents TL packages.
 *
 * Output: public/feeds/merchant-priced-panels.tsv (tab-separated, UTF-8)
 * Run: node scripts/generate-merchant-feed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = path.join(root, "public/catalog.json");
const outDir = path.join(root, "public/feeds");
const outPath = path.join(outDir, "merchant-priced-panels.tsv");

if (!fs.existsSync(catalogPath)) {
  console.error("Missing public/catalog.json — run npm run catalog first");
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const dataset = catalog.dataset || [];
if (dataset.length !== 12) {
  console.error(`Expected 12 priced panels in catalog.dataset, got ${dataset.length}`);
  process.exit(1);
}

/** @param {string} s */
function cell(s) {
  return String(s ?? "")
    .replace(/\t/g, " ")
    .replace(/\r?\n/g, " ")
    .trim();
}

const HEADER = [
  "id",
  "title",
  "description",
  "link",
  "image_link",
  "availability",
  "price",
  "brand",
  "condition",
  "gtin",
  "mpn",
  "google_product_category",
  "product_type",
  "identifier_exists",
  "shipping",
  "tax",
];

const rows = [HEADER.join("\t")];

for (const p of dataset) {
  const price = p.offers?.price;
  const currency = p.offers?.priceCurrency || "USD";
  if (!price || !p.image || !p.url || !p.sku) {
    console.error(`Incomplete product for Merchant feed: ${p.sku || "?"}`);
    process.exit(1);
  }
  // Reject quote-only URLs if they ever leak into dataset
  if (/kiralik-led-ekran|seffaf-led-ekran|transparan-led-ekran|poster-led-ekran|esnek-led-ekran/.test(p.url)) {
    console.error(`Quote-only URL in priced dataset: ${p.url}`);
    process.exit(1);
  }

  const desc = [
    p.name,
    "Panel (modül) list fiyatı USD; KDV ve nakliye hariç.",
    "Nihai tutar keşif ve yazılı teklifle kesinleşir.",
    "ARLEDSCREEN / NXTIONSTAR — İstanbul Gaziosmanpaşa.",
  ].join(" ");

  rows.push(
    [
      cell(p.sku),
      cell(p.name),
      cell(desc),
      cell(p.url),
      cell(p.image),
      "in_stock",
      cell(`${price} ${currency}`),
      "NXTIONSTAR",
      "new",
      "", // no GTIN — identifier_exists=no
      cell(p.sku), // mpn = sku
      "4044", // Electronics > Video > Televisions (closest GMC taxonomy for LED display modules)
      cell(`LED Screens > ${p.category || "LED module"}`),
      "no",
      "TR:::0 USD", // shipping placeholder; owner overrides in Merchant
      "TR:0:n", // VAT not included in list price
    ].join("\t"),
  );
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, rows.join("\n") + "\n", "utf8");
console.log(
  `Wrote ${path.relative(root, outPath)} (${dataset.length} priced SKUs, quote-only excluded)`,
);
