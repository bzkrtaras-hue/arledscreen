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
import { BLIND_TEST_PROMPTS } from "./lib/ai-shopping-prompts.mjs";

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

/** 15 prompts — shared module (Gün 55 + 63 kontrol + 65 esnek + 66 Colorlight) */
const PROMPTS = BLIND_TEST_PROMPTS;

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
  const withShip = dataset.filter((d) => d.offers?.shippingDetails);
  if (withShip.length !== 12) {
    errors.push(`catalog offers.shippingDetails expected on 12 panels (got ${withShip.length})`);
  }
  const withReturn = dataset.filter(
    (d) =>
      d.offers?.hasMerchantReturnPolicy?.["@type"] === "MerchantReturnPolicy" &&
      /MerchantReturnNotPermitted/i.test(String(d.offers.hasMerchantReturnPolicy.returnPolicyCategory || "")),
  );
  if (withReturn.length !== 12) {
    errors.push(
      `catalog offers.hasMerchantReturnPolicy (MerchantReturnNotPermitted) expected on 12 panels (got ${withReturn.length})`,
    );
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

const aiShopping = readJson("ai-shopping.json");
if (aiShopping) {
  if (!Array.isArray(aiShopping.pricedPanels) || aiShopping.pricedPanels.length !== 12) {
    errors.push(`ai-shopping.pricedPanels must be 12 (got ${aiShopping.pricedPanels?.length})`);
  }
  if (!Array.isArray(aiShopping.agentRules) || aiShopping.agentRules.length < 4) {
    errors.push("ai-shopping.agentRules missing");
  }
  if (Number(aiShopping.shoppingPolicy?.extrasUsd?.workshopLaborPerM2) !== 100) {
    errors.push("ai-shopping.shoppingPolicy.extrasUsd.workshopLaborPerM2 must be 100");
  }
  if (!/quote-and-contract-only/i.test(String(aiShopping.shoppingPolicy?.returnPolicy || ""))) {
    errors.push("ai-shopping.shoppingPolicy.returnPolicy must be quote-and-contract-only");
  }
  if (!/ücretsiz kargo yok/i.test(JSON.stringify(aiShopping.agentRules || []))) {
    errors.push("ai-shopping.agentRules must forbid ücretsiz kargo");
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
  for (const needle of [
    "catalog.json",
    "entity.json",
    "ard.json",
    "ai-shopping.json",
    "pricedPanels",
    "priceValidUntil",
    "ücretsiz kargo yok",
  ]) {
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
  if (!String(profiles.packs?.linkedinAbout || "").includes("ai-shopping.json")) {
    errors.push("entity-profiles.json linkedinAbout must cite ai-shopping.json");
  }
  if (!profiles.sameAsReadiness?.live || !Array.isArray(profiles.sameAsReadiness.blockedUntil301)) {
    errors.push("entity-profiles.json sameAsReadiness must list live + blockedUntil301");
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

// Day 58: prompt honesty mustSay (ücretsiz kargo yok / teklif / ai-shopping) must be present on price intents
for (const id of [2, 3, 4, 5, 6]) {
  const p = PROMPTS.find((x) => x.id === id);
  if (!p?.mustSay?.some((s) => /ücretsiz kargo yok|quote-and-contract/i.test(s))) {
    errors.push(`blind prompt #${id} mustSay must include ücretsiz kargo yok or quote-and-contract`);
  }
}
for (const id of [9, 10, 13, 14, 15]) {
  const p = PROMPTS.find((x) => x.id === id);
  if (!p?.mustSay?.includes("ai-shopping.json") || !p?.mustSay?.includes("teklif")) {
    errors.push(`blind prompt #${id} mustSay must include teklif + ai-shopping.json`);
  }
}
const p13 = PROMPTS.find((x) => x.id === 13);
if (!p13 || !/kontrol/i.test(p13.q)) {
  errors.push("blind prompt #13 must cover kontrol kartı quote-only invent");
}
const p14 = PROMPTS.find((x) => x.id === 14);
if (!p14 || !/esnek/i.test(p14.q)) {
  errors.push("blind prompt #14 must cover esnek LED quote-only invent");
}
const p15 = PROMPTS.find((x) => x.id === 15);
if (!p15 || !/Colorlight|colorlight/i.test(p15.q)) {
  errors.push("blind prompt #15 must cover Colorlight kontrol quote-only invent");
}
if (!PROMPTS.every((p) => Array.isArray(p.mustSay) && p.mustSay.length > 0)) {
  errors.push("every blind prompt must declare non-empty mustSay");
}

// Day 56: docs/ai-shopping-blind-test.md must not drift from shared prompts module
const blindDoc = path.join(root, "docs/ai-shopping-blind-test.md");
if (fs.existsSync(blindDoc)) {
  const doc = fs.readFileSync(blindDoc, "utf8");
  if (!doc.includes("scripts/lib/ai-shopping-prompts.mjs")) {
    errors.push("docs/ai-shopping-blind-test.md must cite scripts/lib/ai-shopping-prompts.mjs as source of truth");
  }
  if (!doc.includes("ücretsiz kargo yok") || !doc.includes("mustSay")) {
    errors.push("docs/ai-shopping-blind-test.md must document mustSay honesty (ücretsiz kargo yok)");
  }
  for (const p of PROMPTS) {
    if (!doc.includes(p.q)) {
      errors.push(`docs/ai-shopping-blind-test.md missing prompt #${p.id} text: ${p.q}`);
    }
    // Primary path (first) must appear in the doc table / text
    const primary = p.paths[0];
    if (primary && !doc.includes(primary) && !doc.includes(primary.replace(/\/$/, ""))) {
      // Allow short segment for product hubs (e.g. seffaf)
      const seg = primary.split("/").filter(Boolean).pop();
      if (!seg || !doc.includes(seg)) {
        errors.push(`docs/ai-shopping-blind-test.md missing primary path for #${p.id}: ${primary}`);
      }
    }
  }
} else {
  errors.push("missing docs/ai-shopping-blind-test.md");
}

if (errors.length) {
  console.error(`audit-blind-test: FAIL (${errors.length})`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(
  `audit-blind-test: OK — prompts=${PROMPTS.length} entity+catalog+llms+profiles cite facts ready`,
);
