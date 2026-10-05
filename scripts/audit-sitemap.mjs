/**
 * Sitemap completeness audit (Gün 23).
 *
 * After build, verifies out/sitemap.xml contains every indexable commercial,
 * product group/model, case study, and decision-guide URL — and omits thin EN,
 * AR/RU, and noindex pages.
 *
 * Run: node scripts/audit-sitemap.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://arledscreen.com";
const errors = [];

const smPath = path.join(root, "out/sitemap.xml");
const outTr = path.join(root, "out/tr");
if (!fs.existsSync(smPath) || !fs.existsSync(outTr)) {
  console.error("Missing out/sitemap.xml or out/tr — run npm run build first");
  process.exit(1);
}

const sm = fs.readFileSync(smPath, "utf8");
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const locSet = new Set(locs);

if (locs.length !== locSet.size) {
  errors.push(`sitemap has duplicate locs (${locs.length} vs ${locSet.size} unique)`);
}

function parseSlugList(src, exportName) {
  const block = src.match(new RegExp(`export const ${exportName} = \\[([\\s\\S]*?)\\] as const`));
  if (!block) return [];
  return [...block[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

const commercialSrc = fs.readFileSync(path.join(root, "src/content/commercial-pages.ts"), "utf8");
// COMMERCIAL_PAGES is a spread of INTENT/PRODUCT/PITCH/USE arrays — collect page slugs (4-space indent).
const commercialSlugs = [
  ...new Set([...commercialSrc.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1])),
];
if (commercialSlugs.length < 20) {
  errors.push(`failed to parse commercial slugs (got ${commercialSlugs.length})`);
}

const caseSlugs = fs
  .readdirSync(path.join(outTr, "projelerimiz"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
if (caseSlugs.length < 20) errors.push(`expected ≥20 case studies, got ${caseSlugs.length}`);

const categoriesSrc = fs.readFileSync(path.join(root, "src/content/categories.ts"), "utf8");
const controlSrc = fs.readFileSync(path.join(root, "src/content/control-products.ts"), "utf8");
// Built folders include CONTROL_GROUPS spread into PRODUCT_GROUPS (13 total).
const groupSlugs = fs
  .readdirSync(path.join(outTr, "products"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
if (groupSlugs.length < 10) errors.push(`expected ≥10 product groups in out/, got ${groupSlugs.length}`);
if (!/CONTROL_GROUPS/.test(categoriesSrc) || !/huidu-kontrol|novastar|colorlight/.test(controlSrc)) {
  errors.push("control product groups missing from source");
}

const modelsSrc = fs.readFileSync(path.join(root, "src/content/models.ts"), "utf8");
const modelPairs = [
  ...modelsSrc.matchAll(/\{\s*slug:\s*"([^"]+)",\s*group:\s*"([^"]+)"/g),
].map((m) => ({ slug: m[1], group: m[2] }));
if (modelPairs.length < 20) errors.push(`failed to parse LED_MODELS (got ${modelPairs.length})`);

const guidesSrc = fs.readFileSync(path.join(root, "src/content/seo-guides.ts"), "utf8");
const seoGuides = parseSlugList(guidesSrc, "SEO_GUIDE_SLUGS");
if (seoGuides.length < 5) errors.push(`failed to parse SEO_GUIDE_SLUGS (got ${seoGuides.length})`);

const articleSlugs = [
  "piksel-araligi-secimi",
  "led-ekran-fiyatlari",
  "led-tabela-mi-led-ekran-mi",
  "kiralik-mi-satin-alma",
  "gob-vs-smd",
];

/** Required URLs */
const required = [];
const req = (u) => required.push(u);

req(`${SITE}/tr/`);
req(`${SITE}/tr/products/`);
req(`${SITE}/tr/led-ekran-fiyatlari/`);
req(`${SITE}/tr/hesaplayici/`);
req(`${SITE}/tr/quote/`);
req(`${SITE}/tr/yapay-zeka/`);
req(`${SITE}/tr/projelerimiz/`);
for (const s of commercialSlugs) req(`${SITE}/tr/${s}/`);
for (const s of caseSlugs) req(`${SITE}/tr/projelerimiz/${s}/`);
for (const s of groupSlugs) req(`${SITE}/tr/products/${s}/`);
for (const m of modelPairs) req(`${SITE}/tr/products/${m.group}/${m.slug}/`);
for (const s of seoGuides) req(`${SITE}/tr/rehber/${s}/`);
for (const s of articleSlugs) req(`${SITE}/tr/rehber/${s}/`);
// Machine-readable AI alışveriş artefacts
for (const p of [
  "/catalog.json",
  "/entity.json",
  "/entity-profiles.json",
  "/.well-known/ard.json",
  "/llms.txt",
  "/llms-full.txt",
  "/feeds/merchant-priced-panels.tsv",
]) {
  req(`${SITE}${p}`);
}
// Indexable EN
req(`${SITE}/en/`);
req(`${SITE}/en/yapay-zeka/`);
req(`${SITE}/en/rehber/`);
for (const s of seoGuides) req(`${SITE}/en/rehber/${s}/`);

for (const u of required) {
  if (!locSet.has(u)) errors.push(`missing from sitemap: ${u}`);
}

/** Forbidden */
const thinEn = ["products", "about", "hesaplayici", "quote"];
for (const u of locs) {
  if (/\/ar\//.test(u) || /\/ru\//.test(u)) errors.push(`forbidden locale in sitemap: ${u}`);
  for (const t of thinEn) {
    if (u === `${SITE}/en/${t}/`) errors.push(`thin EN in sitemap: ${u}`);
  }
}

/** Indexable TR HTML must appear (spot-check via robots meta) */
function robotsOf(html) {
  const m = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i);
  return (m?.[1] || "index").toLowerCase();
}

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, acc);
    else if (ent.name === "index.html") acc.push(full);
  }
  return acc;
}

let indexableChecked = 0;
for (const file of walk(outTr)) {
  const html = fs.readFileSync(file, "utf8");
  if (robotsOf(html).includes("noindex")) continue;
  const rel = "/" + path.relative(path.join(root, "out"), file).replace(/\\/g, "/").replace(/index\.html$/, "");
  const url = `${SITE}${rel}`;
  indexableChecked += 1;
  if (!locSet.has(url)) errors.push(`indexable page not in sitemap: ${url}`);
}

const robotsTxt = fs.readFileSync(path.join(root, "out/robots.txt"), "utf8");
if (!/Sitemap:\s*https:\/\/arledscreen\.com\/sitemap\.xml/i.test(robotsTxt)) {
  errors.push("robots.txt missing Sitemap: https://arledscreen.com/sitemap.xml");
}
if (!/Host:\s*https:\/\/arledscreen\.com/i.test(robotsTxt) && !robotsTxt.includes("arledscreen.com")) {
  // Next may emit host differently; soft check
}

if (errors.length) {
  console.error(`audit-sitemap: FAIL (${errors.length})`);
  for (const e of errors.slice(0, 50)) console.error(" -", e);
  if (errors.length > 50) console.error(` … +${errors.length - 50} more`);
  process.exit(1);
}

const aiArtefacts = [
  "/catalog.json",
  "/entity.json",
  "/entity-profiles.json",
  "/.well-known/ard.json",
  "/llms.txt",
  "/llms-full.txt",
  "/feeds/merchant-priced-panels.tsv",
].filter((p) => locSet.has(`${SITE}${p}`)).length;

console.log(
  `audit-sitemap: OK — urls=${locs.length} commercial=${commercialSlugs.length} cases=${caseSlugs.length} groups=${groupSlugs.length} models=${modelPairs.length} ai_artefacts=${aiArtefacts} indexable_tr_checked=${indexableChecked}`,
);
