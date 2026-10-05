/**
 * ai-shopping.json discovery index audit (Gün 48).
 *
 * Ensures out/ai-shopping.json lists every primary artefact, 13 prompts,
 * cite facts, and catalog priced count — single-fetch agent entry point.
 *
 * Run after build: node scripts/audit-ai-shopping-index.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const errors = [];
const SITE = "https://arledscreen.com";

if (!fs.existsSync(out)) {
  console.error("audit-ai-shopping-index: missing out/ — run npm run build first");
  process.exit(1);
}

const file = path.join(out, "ai-shopping.json");
if (!fs.existsSync(file)) {
  console.error("audit-ai-shopping-index: missing out/ai-shopping.json");
  process.exit(1);
}

let doc;
try {
  doc = JSON.parse(fs.readFileSync(file, "utf8"));
} catch (e) {
  console.error(`audit-ai-shopping-index: invalid JSON: ${e.message}`);
  process.exit(1);
}

if (doc["@type"] !== "Dataset") errors.push("@type must be Dataset");
if (doc["@id"] !== `${SITE}/ai-shopping.json`) errors.push("@id must be ai-shopping.json");

const needSources = [
  "entity.json",
  "catalog.json",
  "entity-profiles.json",
  "ard.json",
  "llms.txt",
  "llms-full.txt",
  "merchant-priced-panels.tsv",
];
const primary = doc.primarySources || {};
for (const name of needSources) {
  if (!primary[name] || !String(primary[name]).includes(SITE)) {
    errors.push(`primarySources missing ${name}`);
  }
}

const prompts = doc.blindTestPrompts || [];
if (prompts.length !== 13) errors.push(`blindTestPrompts must be 13 (got ${prompts.length})`);

if (!doc.cite?.oneLiner || String(doc.cite.oneLiner).length < 40) {
  errors.push("cite.oneLiner missing/short");
}
if (!/Gaziosmanpaşa/i.test(String(doc.cite?.addressLocality || ""))) {
  errors.push("cite.addressLocality must be Gaziosmanpaşa");
}
if (String(doc.mustKnowFacts?.p25IcUsd) !== "32.18") {
  errors.push(`mustKnowFacts.p25IcUsd must be 32.18 (got ${doc.mustKnowFacts?.p25IcUsd})`);
}
if (Number(doc.shoppingPolicy?.pricedSkuCount) !== 12) {
  errors.push(`shoppingPolicy.pricedSkuCount must be 12`);
}
if (doc.shoppingPolicy?.priceValidUntil !== "2026-12-31") {
  errors.push(`shoppingPolicy.priceValidUntil must be 2026-12-31`);
}
if (!Array.isArray(doc.pricedPanels) || doc.pricedPanels.length !== 12) {
  errors.push(`pricedPanels must list 12 SKUs (got ${doc.pricedPanels?.length})`);
} else {
  const p25 = doc.pricedPanels.find((p) => p.sku === "p2-5-ic");
  if (!p25 || String(p25.price) !== "32.18") {
    errors.push("pricedPanels must include p2-5-ic @ 32.18");
  }
  for (const p of doc.pricedPanels) {
    if (!p.url || !String(p.url).includes("/tr/products/")) {
      errors.push(`pricedPanels ${p.sku} missing product url`);
      break;
    }
  }
}
const quoteGroups = doc.shoppingPolicy?.quoteOnlyProductGroups || [];
if (quoteGroups.length < 9) {
  errors.push(`quoteOnlyProductGroups must be ≥9 incl. kontrol (got ${quoteGroups.length})`);
} else if (!quoteGroups.every((g) => g.url && g.name)) {
  errors.push("quoteOnlyProductGroups entries need name+url");
}
const quoteFlat = JSON.stringify(quoteGroups);
for (const need of ["kontrol", "huidu", "novastar", "colorlight", "kiralik", "seffaf"]) {
  if (!new RegExp(need, "i").test(quoteFlat)) {
    errors.push(`quoteOnlyProductGroups must include ${need}`);
  }
}
if (!doc.shoppingPolicy?.quoteUrl?.includes("/tr/quote/")) {
  errors.push("shoppingPolicy.quoteUrl missing");
}
if (!Array.isArray(doc.agentRules) || doc.agentRules.length < 4) {
  errors.push("agentRules must list ≥4 rules");
}
const rulesJson = JSON.stringify(doc.agentRules || []);
if (!/kontrol/i.test(rulesJson)) {
  errors.push("agentRules must mention kontrol as quote-only");
}
if (!/MerchantReturnNotPermitted|hasMerchantReturnPolicy/i.test(rulesJson)) {
  errors.push("agentRules must mention hasMerchantReturnPolicy / MerchantReturnNotPermitted");
}
if (String(doc.mustKnowFacts?.priceValidUntil) !== "2026-12-31") {
  errors.push("mustKnowFacts.priceValidUntil must be 2026-12-31");
}
const extras = doc.shoppingPolicy?.extrasUsd || {};
if (Number(extras.workshopLaborPerM2) !== 100) {
  errors.push("shoppingPolicy.extrasUsd.workshopLaborPerM2 must be 100");
}
if (Number(extras.controlCard) !== 500 || Number(extras.driverSoftware) !== 500) {
  errors.push("shoppingPolicy.extrasUsd controlCard/driverSoftware must be 500");
}
if (!/iade|garanti/i.test(JSON.stringify(doc.agentRules || []))) {
  errors.push("agentRules must mention iade/garanti honesty");
}
if (!/ücretsiz kargo yok/i.test(JSON.stringify(doc.agentRules || []))) {
  errors.push("agentRules must forbid fake free shipping");
}
if (!/quote-and-contract-only/i.test(String(doc.shoppingPolicy?.returnPolicy || ""))) {
  errors.push("shoppingPolicy.returnPolicy must be quote-and-contract-only");
}

const entity = JSON.parse(fs.readFileSync(path.join(out, "entity.json"), "utf8"));
if (!entity.aiShoppingJson?.includes("/ai-shopping.json")) {
  errors.push("entity.json missing aiShoppingJson");
}
if (!entity.hasOfferCatalog?.url?.includes("/catalog.json")) {
  errors.push("entity.json missing hasOfferCatalog → catalog.json");
}
// Day 63: hasOfferCatalog description must close kontrol invent
if (!/kontrol/i.test(entity.hasOfferCatalog?.description || "")) {
  errors.push("entity.json hasOfferCatalog.description must mention kontrol quote-only");
}

const headers = fs.readFileSync(path.join(out, "_headers"), "utf8");
if (!/\/ai-shopping\.json[\s\S]*?Access-Control-Allow-Origin:\s*\*/.test(headers)) {
  errors.push("_headers missing ai-shopping.json CORS");
}

const routes = JSON.parse(fs.readFileSync(path.join(out, "_routes.json"), "utf8"));
if (!(routes.exclude || []).includes("/ai-shopping.json")) {
  errors.push("_routes.json exclude missing /ai-shopping.json");
}

const ard = fs.readFileSync(path.join(out, ".well-known", "ard.json"), "utf8");
if (!ard.includes("/ai-shopping.json")) {
  errors.push("ard.json must discover ai-shopping.json");
}
if (!ard.includes("pricedPanels") || !/ücretsiz kargo yok/i.test(ard)) {
  errors.push("ard.json discovery text must cite pricedPanels + ücretsiz kargo yok");
}
if (!/13 kör test/i.test(ard)) {
  errors.push("ard.json ai-shopping discovery must cite 13 kör test intent");
}

// Day 55: ai-catalog.json must be synced from ard.json (no hand-edit twin)
const aiCatPath = path.join(out, ".well-known", "ai-catalog.json");
if (!fs.existsSync(aiCatPath)) {
  errors.push("missing out/.well-known/ai-catalog.json");
} else {
  try {
    const aiCat = JSON.parse(fs.readFileSync(aiCatPath, "utf8"));
    const ardDoc = JSON.parse(ard);
    if (JSON.stringify(aiCat.entries) !== JSON.stringify(ardDoc.entries)) {
      errors.push("ai-catalog.json entries must equal ard.json (run sync-ai-catalog-from-ard)");
    }
    if (aiCat._syncedFrom !== "ard.json") {
      errors.push("ai-catalog.json must set _syncedFrom=ard.json");
    }
  } catch (e) {
    errors.push(`ai-catalog.json invalid: ${e.message}`);
  }
}

// Day 55: blindTestPrompts must match shared module order (#6 ai-shopping first)
const p6 = (doc.blindTestPrompts || []).find((p) => p.id === 6);
if (!p6?.urls?.[0]?.includes("/ai-shopping.json")) {
  errors.push("blindTestPrompts #6 must lead with ai-shopping.json");
}
// Day 63: kontrol invent blind prompt
const p13 = (doc.blindTestPrompts || []).find((p) => p.id === 13);
if (!p13 || !/kontrol/i.test(p13.q || "")) {
  errors.push("blindTestPrompts #13 must cover kontrol kartı quote-only");
}

if (errors.length) {
  console.error(`audit-ai-shopping-index: FAIL (${errors.length})`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(
  `audit-ai-shopping-index: OK — sources=${needSources.length} prompts=${prompts.length} pricedPanels=12 entity+CORS+routes+ard`,
);
