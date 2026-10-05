/**
 * Commercial + product hub pages must expose AI-shopping internal links:
 * fiyat hub, catalog.json, quote.
 *
 * Run after build: node scripts/audit-shopping-links.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const REQUIRED = [
  "/tr/led-ekran-fiyatlari/",
  "/catalog.json",
  "/tr/quote/",
  "/tr/hesaplayici/",
  "/entity.json",
];

const commercialSrc = fs.readFileSync(path.join(root, "src/content/commercial-pages.ts"), "utf8");
const slugs = [...commercialSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const unique = [...new Set(slugs)];

const outTr = path.join(root, "out/tr");
if (!fs.existsSync(outTr)) {
  console.error("Missing out/tr — run npm run build first");
  process.exit(1);
}

const productDirs = fs
  .readdirSync(path.join(outTr, "products"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => `products/${d.name}`);

const rehberExtras = [
  "rehber/gob-vs-smd",
  "rehber/piksel-araligi-secimi",
  "rehber/kiralik-mi-satin-alma",
  "rehber/led-tabela-mi-led-ekran-mi",
];

/** Paths that use CommercialLanding, product group template, or ShoppingLinkCloud */
const pages = [
  ...unique.map((s) => path.join(outTr, s, "index.html")),
  ...productDirs.map((s) => path.join(outTr, s, "index.html")),
  ...rehberExtras.map((s) => path.join(outTr, s, "index.html")),
];

let checked = 0;
for (const file of pages) {
  if (!fs.existsSync(file)) {
    errors.push(`missing ${path.relative(root, file)}`);
    continue;
  }
  checked += 1;
  const html = fs.readFileSync(file, "utf8");
  for (const needle of REQUIRED) {
    if (!html.includes(needle) && !html.includes(needle.replace(/\/$/, ""))) {
      errors.push(`${path.relative(outTr, file)}: missing link ${needle}`);
    }
  }
}

console.log(
  `Checked ${checked} commercial/product/rehber pages for fiyat+catalog+quote+hesaplayici+entity links`,
);
if (errors.length) {
  console.error("FAIL:");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}
console.log("OK: shopping internal links present");
