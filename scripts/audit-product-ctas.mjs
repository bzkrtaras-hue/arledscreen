/**
 * Product CTA consistency audit (Gün 22).
 *
 * Every TR product hub / group / model page must expose:
 * - data-cta="quote" (or /tr/quote/ link)
 * - data-cta="whatsapp" (or wa.me link)
 * - Canonical order on ProductCtaRow: quote before whatsapp
 *
 * Run after build: node scripts/audit-product-ctas.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outProducts = path.join(root, "out/tr/products");
const errors = [];

if (!fs.existsSync(outProducts)) {
  console.error("Missing out/tr/products — run npm run build first");
  process.exit(1);
}

function collect(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) collect(full, acc);
    else if (ent.name === "index.html") acc.push(full);
  }
  return acc;
}

const files = collect(outProducts);
let hub = 0;
let group = 0;
let model = 0;

for (const file of files) {
  const rel = path.relative(path.join(root, "out/tr"), file).replace(/\\/g, "/");
  const depth = rel.split("/").length; // products/index.html=2, group=3, model=4
  if (depth === 2) hub += 1;
  else if (depth === 3) group += 1;
  else model += 1;

  const html = fs.readFileSync(file, "utf8");
  const hasQuoteAttr = /data-cta="quote"/.test(html);
  const hasWaAttr = /data-cta="whatsapp"/.test(html);
  const hasQuoteHref = /\/tr\/quote\/?/.test(html);
  const hasWaHref = /wa\.me\//.test(html);

  if (!(hasQuoteAttr || hasQuoteHref)) errors.push(`${rel}: missing quote CTA`);
  if (!(hasWaAttr || hasWaHref)) errors.push(`${rel}: missing WhatsApp CTA`);

  // Group/model pages must use ProductCtaRow with quote → WhatsApp order
  if (depth >= 3) {
    const rowIdx = html.indexOf("data-product-cta-row");
    if (rowIdx < 0) {
      errors.push(`${rel}: missing data-product-cta-row`);
    } else {
      const slice = html.slice(rowIdx, rowIdx + 8000);
      const q = slice.indexOf('data-cta="quote"');
      const w = slice.indexOf('data-cta="whatsapp"');
      if (q < 0 || w < 0) errors.push(`${rel}: ProductCtaRow incomplete`);
      else if (q > w) errors.push(`${rel}: CTA order must be quote → WhatsApp`);
    }
  }
}

if (errors.length) {
  console.error(`audit-product-ctas: FAIL (${errors.length})`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … +${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `audit-product-ctas: OK — hub=${hub} groups=${group} models=${model} (quote+WhatsApp, order quote→WA)`,
);
