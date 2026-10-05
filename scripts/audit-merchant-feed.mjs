/**
 * Merchant feed dry-run audit (Gün 27).
 *
 * Verifies public/feeds/merchant-priced-panels.tsv (and out/ copy):
 * - exactly 12 rows (priced panels only)
 * - required GMC columns present
 * - every id matches catalog.dataset sku
 * - price format "N.NN USD"
 * - image_link + link absolute https
 * - no quote-only product URLs
 *
 * Run after generate-merchant-feed + build: node scripts/audit-merchant-feed.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const REQUIRED_COLS = [
  "id",
  "title",
  "description",
  "link",
  "image_link",
  "availability",
  "price",
  "brand",
  "condition",
];

function parseTsv(rel) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) {
    errors.push(`missing ${rel}`);
    return null;
  }
  const lines = fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n").trim().split("\n");
  if (lines.length < 2) {
    errors.push(`${rel}: empty feed`);
    return null;
  }
  const header = lines[0].split("\t");
  const rows = lines.slice(1).map((line) => {
    const cols = line.split("\t");
    const obj = {};
    header.forEach((h, i) => {
      obj[h] = cols[i] ?? "";
    });
    return obj;
  });
  return { header, rows, rel };
}

function auditFeed(parsed, catalogSkus, catalogBySku) {
  if (!parsed) return;
  const { header, rows, rel } = parsed;
  for (const c of REQUIRED_COLS) {
    if (!header.includes(c)) errors.push(`${rel}: missing column ${c}`);
  }
  if (rows.length !== 12) {
    errors.push(`${rel}: expected 12 product rows, got ${rows.length}`);
  }
  const ids = new Set();
  for (const r of rows) {
    if (!r.id) errors.push(`${rel}: empty id`);
    if (ids.has(r.id)) errors.push(`${rel}: duplicate id ${r.id}`);
    ids.add(r.id);
    if (!catalogSkus.has(r.id)) errors.push(`${rel}: id ${r.id} not in catalog.dataset`);
    if (!/^[\d.]+ USD$/.test(r.price || "")) {
      errors.push(`${rel}: ${r.id} price must look like "32.18 USD" (got ${r.price})`);
    }
    const expected = catalogBySku.get(r.id);
    if (expected && r.price !== `${expected} USD`) {
      errors.push(`${rel}: ${r.id} price ${r.price} ≠ catalog ${expected} USD`);
    }
    if (!/^https:\/\/arledscreen\.com\//.test(r.link || "")) {
      errors.push(`${rel}: ${r.id} link must be absolute arledscreen.com`);
    }
    if (!/^https:\/\/arledscreen\.com\//.test(r.image_link || "")) {
      errors.push(`${rel}: ${r.id} image_link must be absolute`);
    }
    if (r.availability !== "in_stock") {
      errors.push(`${rel}: ${r.id} availability must be in_stock`);
    }
    if (r.brand !== "NXTIONSTAR") {
      errors.push(`${rel}: ${r.id} brand must be NXTIONSTAR`);
    }
    if (r.condition !== "new") {
      errors.push(`${rel}: ${r.id} condition must be new`);
    }
    if (/kiralik-led-ekran|seffaf-led-ekran|transparan-led-ekran|poster-led-ekran|esnek-led-ekran/.test(r.link)) {
      errors.push(`${rel}: quote-only URL must not appear: ${r.link}`);
    }
    // Day 52: never claim free shipping (contradicts Offer shippingDetails / agentRules)
    if (/:::0(\s*USD)?/i.test(r.shipping || "") || /^TR:::0/i.test(r.shipping || "")) {
      errors.push(`${rel}: ${r.id} shipping must not claim free (0 USD); leave empty for owner Merchant rates`);
    }
    if (/ücretsiz kargo|free shipping/i.test(r.description || "") && !/ücretsiz kargo yok/i.test(r.description || "")) {
      errors.push(`${rel}: ${r.id} description must not claim free shipping`);
    }
    if (!/nakliye/i.test(r.description || "")) {
      errors.push(`${rel}: ${r.id} description should state nakliye excluded`);
    }
    if (!/iade/i.test(r.description || "") || !/teklif/i.test(r.description || "")) {
      errors.push(`${rel}: ${r.id} description must state iade = teklif/sözleşme (no fixed site window)`);
    }
    if (/14\s*gün.*ücretsiz iade|ücretsiz iade|free return/i.test(r.description || "") && !/iade yok|ücretsiz 14 gün iade yok/i.test(r.description || "")) {
      errors.push(`${rel}: ${r.id} must not claim free returns`);
    }
    if (r.tax && r.tax !== "TR:0:n") {
      errors.push(`${rel}: ${r.id} tax must be TR:0:n (VAT excluded from list, not tax-free)`);
    }
    if (/KDV yok|tax.?free|vergiden muaf/i.test(r.description || "")) {
      errors.push(`${rel}: ${r.id} must not claim tax-free / KDV yok`);
    }
    if (r.tax === "TR:0:n" && !/KDV/i.test(r.description || "")) {
      errors.push(`${rel}: ${r.id} description must explain KDV when tax=TR:0:n`);
    }
  }
  for (const sku of catalogSkus) {
    if (!ids.has(sku)) errors.push(`${rel}: missing catalog sku ${sku}`);
  }
}

const catalogPath = path.join(root, "public/catalog.json");
if (!fs.existsSync(catalogPath)) {
  console.error("Missing public/catalog.json");
  process.exit(1);
}
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const dataset = catalog.dataset || [];
const catalogSkus = new Set(dataset.map((d) => d.sku));
const catalogBySku = new Map(dataset.map((d) => [d.sku, d.offers?.price]));
if (catalogSkus.size !== 12) {
  errors.push(`catalog.dataset must have 12 SKUs (got ${catalogSkus.size})`);
}

auditFeed(parseTsv("public/feeds/merchant-priced-panels.tsv"), catalogSkus, catalogBySku);
auditFeed(parseTsv("out/feeds/merchant-priced-panels.tsv"), catalogSkus, catalogBySku);

if (errors.length) {
  console.error(`audit-merchant-feed: FAIL (${errors.length})`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log("audit-merchant-feed: OK — 12 priced SKUs TSV ↔ catalog parity");
