/**
 * Cite parity smoke (Gün 26).
 *
 * Ensures ENTITY_CITE_* from src/lib/entity.ts appear verbatim in:
 * - public/entity.json + out/entity.json
 * - public/llms.txt + llms-full.txt (+ out copies)
 * - key TR HTML surfaces (about, yapay-zeka)
 *
 * Also checks NAP + disambiguation tokens stay aligned.
 *
 * Run after build: node scripts/audit-cite-parity.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

function read(rel) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) {
    errors.push(`missing ${rel}`);
    return null;
  }
  return fs.readFileSync(p, "utf8");
}

function extractCite(src, name) {
  const m = src.match(new RegExp(`export const ${name} =\\s*"([\\s\\S]*?)";`));
  if (!m) {
    errors.push(`entity.ts missing ${name}`);
    return null;
  }
  return m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"');
}

const entitySrc = read("src/lib/entity.ts");
if (!entitySrc) {
  console.error("audit-cite-parity: FAIL");
  process.exit(1);
}

const ONE = extractCite(entitySrc, "ENTITY_CITE_ONE_LINER");
const SHORT = extractCite(entitySrc, "ENTITY_CITE_SHORT");
const MEDIUM = extractCite(entitySrc, "ENTITY_CITE_MEDIUM");
const SHORT_EN = extractCite(entitySrc, "ENTITY_CITE_SHORT_EN");

function checkEntityJson(rel) {
  const raw = read(rel);
  if (!raw) return;
  let doc;
  try {
    doc = JSON.parse(raw);
  } catch (e) {
    errors.push(`${rel} invalid JSON: ${e.message}`);
    return;
  }
  if (doc.citeOneLiner !== ONE) errors.push(`${rel} citeOneLiner ≠ ENTITY_CITE_ONE_LINER`);
  if (doc.citeShort !== SHORT) errors.push(`${rel} citeShort ≠ ENTITY_CITE_SHORT`);
  if (doc.citeMedium !== MEDIUM) errors.push(`${rel} citeMedium ≠ ENTITY_CITE_MEDIUM`);
  if (doc.citeShortEn !== SHORT_EN) errors.push(`${rel} citeShortEn ≠ ENTITY_CITE_SHORT_EN`);
  if (doc.description !== MEDIUM) errors.push(`${rel} description must equal citeMedium`);
  if (!/Almanya ARLED Solutions/.test(doc.disambiguatingDescription || "")) {
    errors.push(`${rel} missing ARLED Solutions disambiguation`);
  }
  if (!/905305078834/.test(String(doc.telephone || ""))) {
    errors.push(`${rel} telephone must be E.164 +905305078834`);
  }
}

checkEntityJson("public/entity.json");
checkEntityJson("out/entity.json");

function checkLlms(rel) {
  const text = read(rel);
  if (!text) return;
  if (!text.includes(ONE)) errors.push(`${rel} missing verbatim citeOneLiner`);
  if (!text.includes(SHORT)) errors.push(`${rel} missing verbatim citeShort`);
  if (!text.includes(MEDIUM)) errors.push(`${rel} missing verbatim citeMedium`);
  for (const needle of [
    "Gaziosmanpaşa",
    "NXTIONSTAR",
    "tek satış noktası",
    "+90 530 507 88 34",
    "entity.json",
    "catalog.json",
    "ARLED Solutions",
    "NationStar",
  ]) {
    if (!text.includes(needle)) errors.push(`${rel} missing fact token: ${needle}`);
  }
}

checkLlms("public/llms.txt");
checkLlms("public/llms-full.txt");
checkLlms("out/llms.txt");
checkLlms("out/llms-full.txt");

function checkHtml(rel, mustInclude) {
  const html = read(rel);
  if (!html) return;
  for (const s of mustInclude) {
    if (!html.includes(s)) errors.push(`${rel} missing cite fragment`);
  }
}

if (MEDIUM) {
  checkHtml("out/tr/about/index.html", [MEDIUM]);
  checkHtml("out/tr/about/aras-bozkurt/index.html", [MEDIUM]);
}
// yapay-zeka must point agents at entity + catalog
checkHtml("out/tr/yapay-zeka/index.html", ["entity.json", "catalog.json", "llms.txt"]);

// Point C packs must reuse citeMedium verbatim
if (MEDIUM) {
  const profiles = read("public/entity-profiles.json");
  if (profiles) {
    for (const key of ["gbpDescription", "facebookAbout", "linkedinAbout", "directoryLong"]) {
      if (!profiles.includes(MEDIUM)) {
        errors.push(`entity-profiles.json packs must include ENTITY_CITE_MEDIUM (${key} check)`);
        break;
      }
    }
    if (!profiles.includes("entity-profiles.json") && !profiles.includes('"@type": "Dataset"')) {
      errors.push("entity-profiles.json malformed Dataset");
    }
  }
  const outProfiles = read("out/entity-profiles.json");
  if (outProfiles && !outProfiles.includes(MEDIUM)) {
    errors.push("out/entity-profiles.json missing ENTITY_CITE_MEDIUM");
  }
}

// seo.ts about fields should import entity cites (string presence after build is in HTML meta)
const seoSrc = read("src/content/seo.ts");
if (seoSrc) {
  if (!/ENTITY_CITE_SHORT/.test(seoSrc) || !/ENTITY_CITE_MEDIUM/.test(seoSrc)) {
    errors.push("seo.ts about must import ENTITY_CITE_SHORT + ENTITY_CITE_MEDIUM");
  }
}

// Day 47: every PANEL_PRICES USD must appear in llms-full (agent prose cite parity)
const pricesSrc = read("src/content/prices.ts");
const llmsFull = read("public/llms-full.txt");
if (pricesSrc && llmsFull) {
  if (!llmsFull.includes("<!-- AUTO:PANEL_PRICES_BEGIN -->") || !llmsFull.includes("<!-- AUTO:PANEL_PRICES_END -->")) {
    errors.push("llms-full.txt missing AUTO:PANEL_PRICES markers (run npm run llms-prices)");
  }
  const usdRe =
    /\{\s*id:\s*"([^"]+)",\s*pitch:\s*"([^"]+)",\s*pitchMm:\s*([\d.]+),\s*use:\s*"(ic|dis)",\s*(?:surface:\s*"GOB",\s*)?(?:frontService:\s*true,\s*)?usd:\s*([\d.]+)/g;
  for (const m of pricesSrc.matchAll(usdRe)) {
    const id = m[1];
    const usd = Number(m[5]);
    const comma = usd.toFixed(2).replace(".", ",");
    const dot = usd.toFixed(2);
    if (!llmsFull.includes(comma) && !llmsFull.includes(dot)) {
      errors.push(`llms-full.txt missing PANEL_PRICES ${id} USD ${comma}`);
    }
  }
  if (!llmsFull.includes("priceValidUntil: 2026-12-31") && !llmsFull.includes("2026-12-31")) {
    errors.push("llms-full.txt AUTO price block should cite priceValidUntil 2026-12-31");
  }
}

if (errors.length) {
  console.error(`audit-cite-parity: FAIL (${errors.length})`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log("audit-cite-parity: OK — entity↔llms↔about cite strings verbatim + PANEL USD");
