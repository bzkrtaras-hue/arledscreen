/**
 * Locale / canonical / hreflang regression guard (Gün 18).
 *
 * After build, verifies:
 * - Every out/ar|ru page is noindex
 * - Thin EN shells (/products, /about, /hesaplayici, /quote) are noindex
 *   and canonicalize to the TR counterpart
 * - Every out/tr page self-canonicalizes to https://arledscreen.com/tr/...
 * - sitemap.xml omits /ar/, /ru/, and thin EN paths
 * - Indexable EN pages (home, yapay-zeka, rehber) are index,follow with self-canonical
 *
 * Run: node scripts/audit-locale-canonical.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = path.join(root, "out");
const SITE = "https://arledscreen.com";
const errors = [];

const guidesSrc = fs.readFileSync(path.join(root, "src/content/seo-guides.ts"), "utf8");
const exportBlock = guidesSrc.match(/export const SEO_GUIDE_SLUGS = \[([\s\S]*?)\] as const/);
const GUIDE_SLUGS = exportBlock
  ? [...exportBlock[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
  : [];
if (GUIDE_SLUGS.length < 5) {
  console.error("Could not parse SEO_GUIDE_SLUGS from seo-guides.ts");
  process.exit(1);
}

const THIN_EN = ["products", "about", "hesaplayici", "quote"];
const INDEXABLE_EN = new Set([
  "en/index.html",
  "en/yapay-zeka/index.html",
  "en/rehber/index.html",
  ...GUIDE_SLUGS.map((s) => `en/rehber/${s}/index.html`),
]);

if (!fs.existsSync(outRoot)) {
  console.error("Missing out/ — run npm run build first");
  process.exit(1);
}

function robotsContent(html) {
  const m = html.match(/<meta[^>]+name=["']robots["'][^>]*>/i);
  if (!m) return "";
  const c = m[0].match(/content=["']([^"']+)["']/i);
  return (c?.[1] || "").toLowerCase();
}

function canonicalHref(html) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (!m) return null;
  const h = m[0].match(/href=["']([^"']+)["']/i);
  return h?.[1] || null;
}

function hasNoindex(html) {
  return robotsContent(html).includes("noindex");
}

function collectHtml(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) collectHtml(full, acc);
    else if (ent.name === "index.html") acc.push(full);
  }
  return acc;
}

function rel(file) {
  return path.relative(outRoot, file).replace(/\\/g, "/");
}

// --- AR / RU: all noindex ---
for (const loc of ["ar", "ru"]) {
  const dir = path.join(outRoot, loc);
  if (!fs.existsSync(dir)) {
    errors.push(`missing out/${loc}/`);
    continue;
  }
  for (const file of collectHtml(dir)) {
    const html = fs.readFileSync(file, "utf8");
    if (!hasNoindex(html)) errors.push(`${rel(file)}: expected noindex`);
  }
}

// --- Thin EN: noindex + canonical → TR ---
for (const slug of THIN_EN) {
  const file = path.join(outRoot, "en", slug, "index.html");
  if (!fs.existsSync(file)) {
    errors.push(`missing en/${slug}/`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  if (!hasNoindex(html)) errors.push(`en/${slug}/: expected noindex (thin shell)`);
  const canon = canonicalHref(html);
  const expected = `${SITE}/tr/${slug}/`;
  if (canon !== expected) {
    errors.push(`en/${slug}/: canonical ${canon} ≠ ${expected}`);
  }
  if (/hreflang=["']en["']/i.test(html)) {
    errors.push(`en/${slug}/: must not emit hreflang (thin)`);
  }
}

// --- TR: self-canonical ---
const trDir = path.join(outRoot, "tr");
let trChecked = 0;
for (const file of collectHtml(trDir)) {
  const html = fs.readFileSync(file, "utf8");
  const r = rel(file); // e.g. tr/about/index.html
  const urlPath = "/" + r.replace(/index\.html$/, "");
  const expected = `${SITE}${urlPath}`;
  const canon = canonicalHref(html);
  if (!canon) {
    errors.push(`${r}: missing canonical`);
    continue;
  }
  if (canon !== expected) {
    errors.push(`${r}: canonical ${canon} ≠ ${expected}`);
  }
  trChecked += 1;
}

// Thin TR counterparts must not advertise EN hreflang
for (const slug of THIN_EN) {
  const file = path.join(outRoot, "tr", slug, "index.html");
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, "utf8");
  if (/hreflang=["']en["']/i.test(html)) {
    errors.push(`tr/${slug}/: must not hreflang en (EN is noindex thin)`);
  }
}

// --- Indexable EN ---
for (const relPath of INDEXABLE_EN) {
  const file = path.join(outRoot, relPath);
  if (!fs.existsSync(file)) {
    errors.push(`missing indexable ${relPath}`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  if (hasNoindex(html)) errors.push(`${relPath}: should be indexable`);
  const canon = canonicalHref(html);
  const urlPath = "/" + relPath.replace(/index\.html$/, "");
  const expected = `${SITE}${urlPath}`;
  if (canon !== expected) errors.push(`${relPath}: canonical ${canon} ≠ ${expected}`);
}

// --- Sitemap ---
const smPath = path.join(outRoot, "sitemap.xml");
if (!fs.existsSync(smPath)) {
  errors.push("missing sitemap.xml");
} else {
  const sm = fs.readFileSync(smPath, "utf8");
  for (const bad of [
    `${SITE}/ar/`,
    `${SITE}/ru/`,
    ...THIN_EN.map((s) => `${SITE}/en/${s}/`),
  ]) {
    if (sm.includes(`<loc>${bad}</loc>`) || sm.includes(`<loc>${bad}`) ) {
      // also match without requiring exact close if trailing
      errors.push(`sitemap includes non-indexable ${bad}`);
    }
  }
  // softer: any /en/about etc
  for (const slug of THIN_EN) {
    if (sm.includes(`/en/${slug}/`)) {
      errors.push(`sitemap includes thin /en/${slug}/`);
    }
  }
  if (sm.includes("/ar/") || sm.includes("/ru/")) {
    errors.push("sitemap includes /ar/ or /ru/");
  }
  // Require /en/ path segment — do NOT match /entity.json (substring "en")
  const enUrls = [
    ...sm.matchAll(/<loc>(https:\/\/arledscreen\.com\/en\/[^<]*)<\/loc>/g),
  ].map((m) => m[1]);
  const expectedEnCount = 1 + 1 + 1 + GUIDE_SLUGS.length; // home + yapay-zeka + rehber hub + guides
  if (enUrls.length !== expectedEnCount) {
    errors.push(`sitemap EN count ${enUrls.length} ≠ ${expectedEnCount} (${enUrls.join(", ")})`);
  }
}

if (errors.length) {
  console.error(`audit-locale-canonical: FAIL (${errors.length})`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … +${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `audit-locale-canonical: OK — tr_canonical=${trChecked} thin_en_noindex=${THIN_EN.length} indexable_en=${INDEXABLE_EN.size}`,
);
