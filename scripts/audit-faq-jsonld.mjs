/**
 * FAQPage JSON-LD audit for commercial landings + service regions.
 *
 * Requires:
 * - FAQPage present with ≥ minCount Question entities
 * - question ≥10 chars, answer ≥40 chars
 * - At least one answer on commercial/region pages mentions catalog.json
 *   or led-ekran-fiyatlari (AI shopping price source)
 * - Forbidden: fake AggregateRating-style claims / invented TL package language
 *
 * Run after build: node scripts/audit-faq-jsonld.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const outTr = path.join(root, "out/tr");

if (!fs.existsSync(outTr)) {
  console.error("Missing out/tr — run npm run build first");
  process.exit(1);
}

const commercialSrc = fs.readFileSync(path.join(root, "src/content/commercial-pages.ts"), "utf8");
const commercialSlugs = [...new Set([...commercialSrc.matchAll(/\n    slug:\s*"([^"]+)"/g)].map((m) => m[1]))];

const regionDirs = fs
  .readdirSync(path.join(outTr, "bolgeler"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const FORBIDDEN = [
  /türkiye.?nin en (büyük|iyi|çok)/i,
  /aggregateRating/i,
  /\d+\s*TL\s*\/\s*m/i,
  /garanti\s*\d+\s*yıl/i,
];

const PRICE_HINT = /catalog\.json|led-ekran-fiyatlari/;

function auditPage(rel, { minCount = 2, requirePriceHint = true } = {}) {
  const file = path.join(outTr, rel, "index.html");
  if (!fs.existsSync(file)) {
    errors.push(`missing HTML: ${rel}`);
    return;
  }
  const html = fs.readFileSync(file, "utf8");
  let faq = null;
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    let data;
    try {
      data = JSON.parse(m[1]);
    } catch {
      continue;
    }
    if (data?.["@type"] === "FAQPage") {
      faq = data;
      break;
    }
  }
  if (!faq) {
    errors.push(`${rel}: no FAQPage JSON-LD`);
    return;
  }
  const ents = faq.mainEntity || [];
  if (!Array.isArray(ents) || ents.length < minCount) {
    errors.push(`${rel}: FAQPage has ${ents.length} Qs (need ≥${minCount})`);
  }
  let priceOk = false;
  for (const q of ents) {
    const name = q?.name || "";
    const ans = q?.acceptedAnswer?.text || "";
    if (q?.["@type"] !== "Question") errors.push(`${rel}: entity not Question`);
    if (name.trim().length < 10) errors.push(`${rel}: short question "${name}"`);
    if (ans.trim().length < 40) errors.push(`${rel}: short answer for "${name.slice(0, 40)}"`);
    if (PRICE_HINT.test(ans) || PRICE_HINT.test(name)) priceOk = true;
    for (const re of FORBIDDEN) {
      if (re.test(ans) || re.test(name)) errors.push(`${rel}: forbidden claim in FAQ`);
    }
  }
  if (requirePriceHint && !priceOk) {
    errors.push(`${rel}: no FAQ answer mentions catalog.json or led-ekran-fiyatlari`);
  }
}

let checked = 0;
for (const slug of commercialSlugs) {
  checked += 1;
  auditPage(slug, { minCount: 2, requirePriceHint: true });
}
auditPage("bolgeler", { minCount: 2, requirePriceHint: false });
for (const slug of regionDirs) {
  checked += 1;
  auditPage(`bolgeler/${slug}`, { minCount: 3, requirePriceHint: true });
}

const productDirs = fs
  .readdirSync(path.join(outTr, "products"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
for (const slug of productDirs) {
  checked += 1;
  auditPage(`products/${slug}`, { minCount: 2, requirePriceHint: true });
}
auditPage("led-ekran-fiyatlari", { minCount: 3, requirePriceHint: true });
auditPage("hesaplayici", { minCount: 2, requirePriceHint: true });
auditPage("quote", { minCount: 2, requirePriceHint: true });
auditPage("about", { minCount: 4, requirePriceHint: true });
auditPage("nxtionstar", { minCount: 3, requirePriceHint: true });
auditPage("products", { minCount: 2, requirePriceHint: true });
auditPage("about/aras-bozkurt", { minCount: 3, requirePriceHint: true });
auditPage("yapay-zeka", { minCount: 3, requirePriceHint: true });
auditPage("rehber/piksel-araligi-secimi", { minCount: 2, requirePriceHint: true });
auditPage("rehber/kiralik-mi-satin-alma", { minCount: 2, requirePriceHint: true });

console.log(
  `Checked FAQ JSON-LD on ${commercialSlugs.length} commercial + ${regionDirs.length} regions + ${productDirs.length} product groups + fiyat + hesaplayici + quote + about + nxtionstar + products hub + founder + yapay-zeka + rehber`,
);
if (errors.length) {
  console.error("FAIL:");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}
console.log("OK: commercial/region/product FAQPage guards passed");
