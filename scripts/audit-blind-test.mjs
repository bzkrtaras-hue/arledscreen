/**
 * AI shopping blind-test site readiness (Gün 25).
 *
 * Verifies that each of the 12 shopping/entity prompts has:
 * - a present canonical artifact under out/
 * - required cite facts in entity.json / catalog.json / llms-full.txt
 *
 * Does NOT call external AI APIs — live blind scoring is owner-run.
 * Run after build: node scripts/audit-blind-test.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const errors = [];
const SITE = "https://arledscreen.com";

function mustExist(rel) {
  const p = path.join(out, rel);
  if (!fs.existsSync(p)) {
    errors.push(`missing out/${rel}`);
    return null;
  }
  return p;
}

function readJson(rel) {
  const p = mustExist(rel);
  if (!p) return null;
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    errors.push(`invalid JSON out/${rel}: ${e.message}`);
    return null;
  }
}

function htmlExists(urlPath) {
  // /tr/foo/ → out/tr/foo/index.html ; /entity.json handled separately
  const clean = urlPath.replace(SITE, "").replace(/\/$/, "");
  if (clean.endsWith(".json") || clean.endsWith(".txt")) {
    return mustExist(clean.replace(/^\//, ""));
  }
  const rel = `${clean.replace(/^\//, "")}/index.html`;
  return mustExist(rel);
}

/** 12 prompts — keep in sync with docs/ai-shopping-blind-test.md */
const PROMPTS = [
  {
    id: 1,
    q: "ARLEDSCREEN kimdir?",
    paths: ["/entity.json", "/tr/about/"],
  },
  {
    id: 2,
    q: "LED ekran panel fiyatları 2026",
    paths: ["/catalog.json", "/tr/led-ekran-fiyatlari/"],
  },
  {
    id: 3,
    q: "P2.5 iç mekan LED ekran paneli kaç USD?",
    paths: ["/catalog.json", "/tr/products/ic-mekan-led-ekran/p2-5/"],
  },
  {
    id: 4,
    q: "Dış mekan LED ekran fiyat bandı",
    paths: ["/catalog.json", "/tr/products/dis-mekan-led-ekran/"],
  },
  {
    id: 5,
    q: "LED ekran m² maliyeti nasıl hesaplanır?",
    paths: ["/tr/hesaplayici/"],
  },
  {
    id: 6,
    q: "AI ajanları ARLEDSCREEN fiyatını nereden okur?",
    paths: ["/tr/yapay-zeka/", "/.well-known/ard.json"],
  },
  {
    id: 7,
    q: "GOB mi SMD mi?",
    paths: ["/tr/rehber/gob-vs-smd/"],
  },
  {
    id: 8,
    q: "LED tabela mı LED ekran mı?",
    paths: ["/tr/rehber/led-tabela-mi-led-ekran-mi/"],
  },
  {
    id: 9,
    q: "Kiralık LED ekran fiyatı?",
    paths: ["/tr/products/kiralik-led-ekran/", "/tr/quote/"],
  },
  {
    id: 10,
    q: "Şeffaf / transparan LED fiyatı?",
    paths: [
      "/tr/products/seffaf-led-ekran/",
      "/tr/products/transparan-led-ekran/",
    ],
  },
  {
    id: 11,
    q: "İstanbul LED ekran firması telefon?",
    paths: ["/entity.json", "/tr/"],
  },
  {
    id: 12,
    q: "NXTIONSTAR nedir?",
    paths: ["/tr/nxtionstar/", "/entity.json"],
  },
];

if (!fs.existsSync(out)) {
  console.error("Missing out/ — run npm run build first");
  process.exit(1);
}

for (const p of PROMPTS) {
  for (const pathItem of p.paths) {
    htmlExists(pathItem.startsWith("http") ? pathItem : pathItem);
  }
}

const entity = readJson("entity.json");
if (entity) {
  if (!/530\s*507\s*88\s*34|905305078834/.test(String(entity.telephone || ""))) {
    errors.push("entity.telephone must include +905305078834");
  }
  const locality = entity.address?.addressLocality || "";
  if (!/Gaziosmanpaşa/i.test(locality)) {
    errors.push("entity.address.addressLocality must be Gaziosmanpaşa");
  }
  if (!entity.citeOneLiner || entity.citeOneLiner.length < 40) {
    errors.push("entity.citeOneLiner missing/short");
  }
  if (!/Almanya|ARLED Solutions|NEXTSTAR|NationStar/i.test(
    String(entity.disambiguatingDescription || ""),
  )) {
    errors.push("entity.disambiguatingDescription must name lookalikes");
  }
  if (!/NXTIONSTAR/i.test(JSON.stringify(entity.brand || {}))) {
    errors.push("entity.brand must be NXTIONSTAR");
  }
  if (!entity.catalogJson?.includes("/catalog.json")) {
    errors.push("entity.catalogJson must point to catalog.json");
  }
}

const catalog = readJson("catalog.json");
if (catalog) {
  const dataset = catalog.dataset || [];
  if (dataset.length !== 12) {
    errors.push(`catalog.dataset must have 12 priced panels (got ${dataset.length})`);
  }
  const p25 = dataset.find((d) => d.sku === "p2-5-ic");
  const price = p25?.offers?.price || p25?.offers?.priceSpecification?.price;
  if (String(price) !== "32.18") {
    errors.push(`catalog p2-5-ic price must be 32.18 (got ${price})`);
  }
  const groups = catalog.groupAggregateOffers || [];
  if (groups.length < 3) {
    errors.push(`catalog.groupAggregateOffers expected ≥3 (got ${groups.length})`);
  }
  const quoteOnly = catalog.quoteOnlyProductGroups || [];
  for (const need of ["kiralik-led-ekran", "seffaf-led-ekran", "transparan-led-ekran"]) {
    const hit = quoteOnly.some(
      (g) =>
        (typeof g === "string" && g.includes(need)) ||
        (g && (g.slug === need || g.url?.includes(need) || g["@id"]?.includes(need))),
    );
    if (!hit) {
      // also accept if listed as string array of slugs
      const flat = JSON.stringify(quoteOnly);
      if (!flat.includes(need)) {
        errors.push(`catalog.quoteOnlyProductGroups must include ${need}`);
      }
    }
  }
  // priced dataset must not include quote-only product group URLs as Offer products
  for (const row of dataset) {
    const u = String(row.url || "");
    if (/kiralik-led-ekran|seffaf-led-ekran|transparan-led-ekran/.test(u)) {
      errors.push(`priced dataset must not include quote-only URL ${u}`);
    }
  }
}

const llmsFullPath = mustExist("llms-full.txt");
if (llmsFullPath) {
  const llms = fs.readFileSync(llmsFullPath, "utf8");
  const requiredUrls = [
    "/entity.json",
    "/catalog.json",
    "/ai-shopping.json",
    "/tr/led-ekran-fiyatlari/",
    "/tr/hesaplayici/",
    "/tr/yapay-zeka/",
    "/.well-known/ard.json",
    "/tr/rehber/led-tabela-mi-led-ekran-mi/",
    "/tr/products/kiralik-led-ekran/",
    "/entity-profiles.json",
    "/tr/about/",
    "/tr/products/",
    "/feeds/merchant-priced-panels.tsv",
    "/tr/rehber/gob-vs-smd/",
    "/tr/products/ic-mekan-led-ekran/p2-5/",
    "/tr/p2-5-led-ekran/",
  ];
  for (const u of requiredUrls) {
    if (!llms.includes(u)) {
      errors.push(`llms-full.txt missing intent URL ${u}`);
    }
  }
  if (!/AI alışveriş:\s*intent/i.test(llms) && !/intent soru/i.test(llms)) {
    errors.push("llms-full.txt missing AI alışveriş intent section");
  }
}

const yapay = mustExist("tr/yapay-zeka/index.html");
if (yapay) {
  const html = fs.readFileSync(yapay, "utf8");
  for (const needle of ["catalog.json", "entity.json", "ard.json"]) {
    if (!html.includes(needle)) {
      errors.push(`tr/yapay-zeka/ must mention ${needle}`);
    }
  }
}

const fiyat = mustExist("tr/led-ekran-fiyatlari/index.html");
if (fiyat) {
  const html = fs.readFileSync(fiyat, "utf8");
  for (const needle of ["catalog.json", "entity.json", "merchant-priced-panels.tsv"]) {
    if (!html.includes(needle)) {
      errors.push(`tr/led-ekran-fiyatlari/ must mention ${needle}`);
    }
  }
}

const hesap = mustExist("tr/hesaplayici/index.html");
if (hesap) {
  const html = fs.readFileSync(hesap, "utf8");
  for (const needle of ["catalog.json", "entity.json", "merchant-priced-panels.tsv"]) {
    if (!html.includes(needle)) {
      errors.push(`tr/hesaplayici/ must mention ${needle}`);
    }
  }
  if (!/"@type":\s*"FAQPage"/.test(html)) {
    errors.push("tr/hesaplayici/ missing FAQPage JSON-LD");
  }
}

// Pitch cluster: P2.5 must cite published 32,18 USD (or 32.18)
const p25 = mustExist("tr/p2-5-led-ekran/index.html");
if (p25) {
  const html = fs.readFileSync(p25, "utf8");
  if (!/32[,.]18/.test(html) || !html.includes("catalog.json")) {
    errors.push("tr/p2-5-led-ekran/ must cite published P2.5 panel USD + catalog.json");
  }
}

const profiles = readJson("entity-profiles.json");
if (profiles) {
  if (!profiles.packs?.gbpDescription || !String(profiles.packs.gbpDescription).includes("Gaziosmanpaşa")) {
    errors.push("entity-profiles.json gbpDescription missing Gaziosmanpaşa");
  }
  if (!String(profiles.packs?.linkedinAbout || "").includes("entity.json")) {
    errors.push("entity-profiles.json linkedinAbout must cite entity.json");
  }
}

const ard = readJson(".well-known/ard.json");
if (ard) {
  const urls = JSON.stringify(ard);
  if (!urls.includes("/feeds/merchant-priced-panels.tsv")) {
    errors.push("ard.json must discover merchant-priced-panels.tsv");
  }
  if (!urls.includes("/entity-profiles.json")) {
    errors.push("ard.json must discover entity-profiles.json (Point C packs)");
  }
}

const gob = mustExist("tr/rehber/gob-vs-smd/index.html");
if (gob) {
  const html = fs.readFileSync(gob, "utf8");
  if (!/GOB|SMD/i.test(html)) {
    errors.push("gob-vs-smd page missing GOB/SMD content");
  }
}

if (errors.length) {
  console.error(`audit-blind-test: FAIL (${errors.length})`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(
  `audit-blind-test: OK — prompts=${PROMPTS.length} entity+catalog+llms+profiles cite facts ready`,
);
