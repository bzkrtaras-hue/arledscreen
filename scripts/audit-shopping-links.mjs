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
  "/ai-shopping.json",
  "/tr/quote/",
  "/tr/hesaplayici/",
  "/entity.json",
  "/entity-profiles.json",
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

const modelPages = [];
for (const groupRel of productDirs) {
  const groupAbs = path.join(outTr, groupRel);
  for (const d of fs.readdirSync(groupAbs, { withFileTypes: true })) {
    if (d.isDirectory()) modelPages.push(path.join(groupAbs, d.name, "index.html"));
  }
}

const rehberExtras = [
  "rehber/gob-vs-smd",
  "rehber/piksel-araligi-secimi",
  "rehber/kiralik-mi-satin-alma",
  "rehber/led-tabela-mi-led-ekran-mi",
];

const seoGuideSrc = fs.readFileSync(path.join(root, "src/content/seo-guides.ts"), "utf8");
const seoGuideBlock = seoGuideSrc.match(/export const SEO_GUIDE_SLUGS = \[([\s\S]*?)\] as const/);
const seoGuideSlugs = seoGuideBlock
  ? [...seoGuideBlock[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
  : [];
const seoGuidePages = seoGuideSlugs.map((s) => `rehber/${s}`);

const regionDirs = fs
  .readdirSync(path.join(outTr, "bolgeler"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => `bolgeler/${d.name}`);

const caseDirs = fs.existsSync(path.join(outTr, "projelerimiz"))
  ? fs
      .readdirSync(path.join(outTr, "projelerimiz"), { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => `projelerimiz/${d.name}`)
  : [];

const blogDirs = fs.existsSync(path.join(outTr, "blog"))
  ? fs
      .readdirSync(path.join(outTr, "blog"), { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => `blog/${d.name}`)
  : [];

/** Paths that use CommercialLanding, product group template, or ShoppingLinkCloud */
const pages = [
  ...unique.map((s) => path.join(outTr, s, "index.html")),
  ...productDirs.map((s) => path.join(outTr, s, "index.html")),
  ...modelPages,
  ...rehberExtras.map((s) => path.join(outTr, s, "index.html")),
  ...seoGuidePages.map((s) => path.join(outTr, s, "index.html")),
  ...regionDirs.map((s) => path.join(outTr, s, "index.html")),
  ...caseDirs.map((s) => path.join(outTr, s, "index.html")),
  ...blogDirs.map((s) => path.join(outTr, s, "index.html")),
  path.join(outTr, "index.html"), // TR home
  path.join(outTr, "led-ekran-fiyatlari", "index.html"),
  path.join(outTr, "hesaplayici", "index.html"),
  path.join(outTr, "quote", "index.html"),
  path.join(outTr, "about", "index.html"),
  path.join(outTr, "nxtionstar", "index.html"),
  path.join(outTr, "products", "index.html"),
  path.join(outTr, "about", "aras-bozkurt", "index.html"),
  path.join(outTr, "yapay-zeka", "index.html"),
  path.join(outTr, "sss", "index.html"),
  path.join(outTr, "hizmetler", "index.html"),
  path.join(outTr, "bolgeler", "index.html"),
  path.join(outTr, "rehber", "index.html"),
  path.join(outTr, "projelerimiz", "index.html"),
  path.join(outTr, "galeri", "index.html"),
  path.join(outTr, "blog", "index.html"),
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
  `Checked ${checked} shopping surfaces (home/commercial/product/models/rehber+seo-guides/regions/cases/blog/about/hubs) for fiyat+catalog+quote+hesaplayici+entity links`,
);
if (errors.length) {
  console.error("FAIL:");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}
console.log("OK: shopping internal links present");
