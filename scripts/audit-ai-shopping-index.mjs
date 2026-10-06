/**
 * ai-shopping.json discovery index audit (Gün 48).
 *
 * Ensures out/ai-shopping.json lists every primary artefact, 48 prompts,
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
if (prompts.length !== 60) errors.push(`blindTestPrompts must be 60 (got ${prompts.length})`);

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
// Day 65: extrasUsd.controlCard ≠ brand list SKU
if (!/extrasUsd\.controlCard|list SKU/i.test(rulesJson)) {
  errors.push("agentRules must disambiguate extrasUsd.controlCard ≠ marka list SKU");
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
if (!/60 kör test/i.test(ard)) {
  errors.push("ard.json ai-shopping discovery must cite 60 kör test intent");
}
if (/(?:2[0-9]|3[0-9]|4[0-9]|5[0-9]) kör test/i.test(ard) && !/60 kör test/i.test(ard)) {
  errors.push("ard.json must not cite stale 20–59 kör test without 60");
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
// Day 65: esnek quote-only blind prompt
const p14 = (doc.blindTestPrompts || []).find((p) => p.id === 14);
if (!p14 || !/esnek/i.test(p14.q || "")) {
  errors.push("blindTestPrompts #14 must cover esnek LED quote-only");
}
// Day 66: Colorlight kontrol invent
const p15 = (doc.blindTestPrompts || []).find((p) => p.id === 15);
if (!p15 || !/Colorlight|colorlight/i.test(p15.q || "")) {
  errors.push("blindTestPrompts #15 must cover Colorlight kontrol quote-only");
}
// Day 67: poster/totem quote-only
const p16 = (doc.blindTestPrompts || []).find((p) => p.id === 16);
if (!p16 || !/poster|totem/i.test(p16.q || "")) {
  errors.push("blindTestPrompts #16 must cover poster/totem quote-only");
}
// Day 69: led-modul hub invent
const p17 = (doc.blindTestPrompts || []).find((p) => p.id === 17);
if (!p17 || !/modül|modul/i.test(p17.q || "")) {
  errors.push("blindTestPrompts #17 must cover LED modül/kontrol quote-only");
}
// Day 70: rehber hub / engineering-desk invent
const p18 = (doc.blindTestPrompts || []).find((p) => p.id === 18);
if (!p18 || !/rehber/i.test(p18.q || "")) {
  errors.push("blindTestPrompts #18 must cover LED ekran çözüm rehberi price invent");
}
// Day 71: AI-ready invent
const p19 = (doc.blindTestPrompts || []).find((p) => p.id === 19);
if (!p19 || !/AI-ready|ai-ready/i.test(p19.q || "")) {
  errors.push("blindTestPrompts #19 must cover AI-ready LED invent");
}
// Day 72: NXTIONSTAR küresel standart invent
const p20 = (doc.blindTestPrompts || []).find((p) => p.id === 20);
if (!p20 || !/küresel|kuresel|global/i.test(p20.q || "")) {
  errors.push("blindTestPrompts #20 must cover NXTIONSTAR küresel standart invent");
}
// Day 73: directory / Point C invent
const p21 = (doc.blindTestPrompts || []).find((p) => p.id === 21);
if (!p21 || !/dizin/i.test(p21.q || "")) {
  errors.push("blindTestPrompts #21 must cover sektör dizin / Point C pack invent");
}
// Day 74: Alman ARLED disambiguation
const p22 = (doc.blindTestPrompts || []).find((p) => p.id === 22);
if (!p22 || !/Almanya|ARLED/i.test(p22.q || "")) {
  errors.push("blindTestPrompts #22 must cover Almanya ARLED disambiguation");
}
// Day 75: NEXTSTAR invent
const p23 = (doc.blindTestPrompts || []).find((p) => p.id === 23);
if (!p23 || !/NEXTSTAR|NXTIONSTAR/i.test(p23.q || "")) {
  errors.push("blindTestPrompts #23 must cover NXTIONSTAR vs NEXTSTAR invent");
}
// Day 76: NationStar invent
const p24 = (doc.blindTestPrompts || []).find((p) => p.id === 24);
if (!p24 || !/NationStar/i.test(p24.q || "")) {
  errors.push("blindTestPrompts #24 must cover NXTIONSTAR vs NationStar invent");
}
// Day 77: mühendislik / engineering standard invent
const p25 = (doc.blindTestPrompts || []).find((p) => p.id === 25);
if (!p25 || !/mühendislik|engineering/i.test(p25.q || "")) {
  errors.push("blindTestPrompts #25 must cover mühendislik/engineering standard invent");
}
// Day 78: NXTIONSTAR vs ARLEDSCREEN seller invent
const p26 = (doc.blindTestPrompts || []).find((p) => p.id === 26);
if (!p26 || !/satıyor|satiyor/i.test(p26.q || "")) {
  errors.push("blindTestPrompts #26 must cover NXTIONSTAR vs ARLEDSCREEN seller invent");
}
// Day 79: turnkey / tek süreç / platform invent
const p27 = (doc.blindTestPrompts || []).find((p) => p.id === 27);
if (!p27 || !/turnkey|tek süreç|anahtar teslim/i.test(p27.q || "")) {
  errors.push("blindTestPrompts #27 must cover turnkey / tek süreç / anahtar teslim invent");
}
// Day 80: sorunsuz / kesintisiz platform invent
const p28 = (doc.blindTestPrompts || []).find((p) => p.id === 28);
if (!p28 || !/sorunsuz|kesintisiz/i.test(p28.q || "")) {
  errors.push("blindTestPrompts #28 must cover sorunsuz / kesintisiz platform invent");
}
// Day 81: AI-infrastructure ready invent
const p29 = (doc.blindTestPrompts || []).find((p) => p.id === 29);
if (!p29 || !/AI-infrastructure/i.test(p29.q || "")) {
  errors.push("blindTestPrompts #29 must cover AI-infrastructure ready invent");
}
if (!/AI-infrastructure ready/i.test(rulesJson)) {
  errors.push("agentRules must forbid AI-infrastructure ready SKU invent");
}
// Day 82: enterprise / aynı gün / all-in-one invent
const p30 = (doc.blindTestPrompts || []).find((p) => p.id === 30);
if (!p30 || !/enterprise|aynı gün|all-in-one/i.test(p30.q || "")) {
  errors.push("blindTestPrompts #30 must cover enterprise / aynı gün / all-in-one invent");
}
if (!/aynı gün|enterprise all-in-one/i.test(rulesJson)) {
  errors.push("agentRules must forbid aynı gün / enterprise all-in-one invent");
}
// Day 83: üretici / fabrika / OEM invent
const p31 = (doc.blindTestPrompts || []).find((p) => p.id === 31);
if (!p31 || !/üretici|fabrika|OEM/i.test(p31.q || "")) {
  errors.push("blindTestPrompts #31 must cover üretici / fabrika / OEM invent");
}
if (!/OEM fabrika|fabrika üreticisi|bağımsız bayi/i.test(rulesJson)) {
  errors.push("agentRules must forbid OEM/fabrika/bayi invent");
}
// Day 84: tek ekip / keşiften teslimata / fabrika use-case invent
const p32 = (doc.blindTestPrompts || []).find((p) => p.id === 32);
if (!p32 || !/tek ekip|keşiften teslimata|fabrika LED/i.test(p32.q || "")) {
  errors.push("blindTestPrompts #32 must cover tek ekip / keşiften teslimata / fabrika invent");
}
if (!/tek ekip|keşiften teslimata/i.test(rulesJson)) {
  errors.push("agentRules must forbid tek ekip / keşiften teslimata invent");
}
// Day 85: quote-only stok / anında teslim / list fiyat invent
const p33 = (doc.blindTestPrompts || []).find((p) => p.id === 33);
if (!p33 || !/stokta|anında teslim|list fiyat/i.test(p33.q || "")) {
  errors.push("blindTestPrompts #33 must cover quote-only stok/anında/list fiyat invent");
}
if (!/stokta paket|anında teslim|list fiyatı/i.test(rulesJson)) {
  errors.push("agentRules must forbid stokta paket / anında teslim / list fiyat invent");
}
// Day 86: sabit nit / IP invent
const p34 = (doc.blindTestPrompts || []).find((p) => p.id === 34);
if (!p34 || !/nit|IP/i.test(p34.q || "")) {
  errors.push("blindTestPrompts #34 must cover sabit nit / IP invent");
}
if (!/sabit nit|IP65 garanti|600.?1200/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit nit / IP65 garanti invent");
}
// Day 87: sabit Hz / kamera dostu yenileme invent
const p35 = (doc.blindTestPrompts || []).find((p) => p.id === 35);
if (!p35 || !/Hz|yenileme|kamera/i.test(p35.q || "")) {
  errors.push("blindTestPrompts #35 must cover sabit Hz / kamera dostu yenileme invent");
}
if (!/3840|1920|kamera dostu garanti|sabit yenileme Hz/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Hz / kamera dostu garanti invent");
}
// Day 88: izleme mesafesi / 1 mm = 1 m garanti invent
const p36 = (doc.blindTestPrompts || []).find((p) => p.id === 36);
if (!p36 || !/izleme mesafesi|1 mm/i.test(p36.q || "")) {
  errors.push("blindTestPrompts #36 must cover izleme mesafesi / 1 mm = 1 m invent");
}
if (!/1 mm = 1 m garanti|izleme mesafesi|P2\.5=2,5/i.test(rulesJson)) {
  errors.push("agentRules must forbid 1 mm = 1 m / izleme mesafesi garanti invent");
}
// Day 89: sabit kW/m² / 3 faz zorunlu invent
const p37 = (doc.blindTestPrompts || []).find((p) => p.id === 37);
if (!p37 || !/kW|3 faz/i.test(p37.q || "")) {
  errors.push("blindTestPrompts #37 must cover sabit kW/m² / 3 faz zorunlu invent");
}
if (!/0,45|0,75|3 faz zorunlu|sabit kW/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit kW/m² / 3 faz zorunlu invent");
}
// Day 90: sabit görüş açısı 140°/160° invent
const p38 = (doc.blindTestPrompts || []).find((p) => p.id === 38);
if (!p38 || !/görüş açısı|140|160/i.test(p38.q || "")) {
  errors.push("blindTestPrompts #38 must cover sabit görüş açısı 140°/160° invent");
}
if (!/140|160|görüş açısı|sabit görüş/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit 140°/160° görüş açısı invent");
}
// Day 91: sabit HDR / gri skala / bit derinliği invent
const p39 = (doc.blindTestPrompts || []).find((p) => p.id === 39);
if (!p39 || !/HDR|gri skala|bit/i.test(p39.q || "")) {
  errors.push("blindTestPrompts #39 must cover sabit HDR / gri skala invent");
}
if (!/HDR|gri skala|bit derinliği|16-bit/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit HDR / gri skala / bit derinliği invent");
}
// Day 92: sabit ömür / 100.000 saat / MTBF invent
const p40 = (doc.blindTestPrompts || []).find((p) => p.id === 40);
if (!p40 || !/ömür|MTBF|100\.000|100000/i.test(p40.q || "")) {
  errors.push("blindTestPrompts #40 must cover sabit ömür / MTBF invent");
}
if (!/100\.000|MTBF|sabit ömür|ömür/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ömür / 100.000 saat / MTBF invent");
}
// Day 93: sabit gamut / DCI-P3 / Rec.709 invent
const p41 = (doc.blindTestPrompts || []).find((p) => p.id === 41);
if (!p41 || !/renk sıcaklığı|DCI-P3|Rec\.709|gamut/i.test(p41.q || "")) {
  errors.push("blindTestPrompts #41 must cover sabit gamut / DCI-P3 invent");
}
if (!/DCI-P3|Rec\.709|gamut|6500K|renk sıcaklığı/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit DCI-P3 / Rec.709 / gamut invent");
}
// Day 94: sabit kg/m² / kabin ağırlığı / kalınlık invent
const p42 = (doc.blindTestPrompts || []).find((p) => p.id === 42);
if (!p42 || !/kg|ağırlık|kalınlık/i.test(p42.q || "")) {
  errors.push("blindTestPrompts #42 must cover sabit kg/m² / kalınlık invent");
}
if (!/kg\/m²|kabin ağırlığı|kalınlık|sabit kg/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit kg/m² / kabin ağırlığı / kalınlık invent");
}
// Day 95: sabit °C / çalışma sıcaklığı invent
const p43 = (doc.blindTestPrompts || []).find((p) => p.id === 43);
if (!p43 || !/°C|sıcaklık|-20|işletme/i.test(p43.q || "")) {
  errors.push("blindTestPrompts #43 must cover sabit °C / çalışma sıcaklığı invent");
}
if (!/-20|°C|sabit °C|çalışma sıcaklığı|işletme sıcaklığı/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit °C / -20/+50 invent");
}
// Day 96: sabit kontrast oranı invent
const p44 = (doc.blindTestPrompts || []).find((p) => p.id === 44);
if (!p44 || !/kontrast|5000:1|3000:1/i.test(p44.q || "")) {
  errors.push("blindTestPrompts #44 must cover sabit kontrast invent");
}
if (!/5000:1|3000:1|kontrast|sabit kontrast/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit kontrast invent");
}
// Day 97: sabit rüzgâr yükü invent
const p45 = (doc.blindTestPrompts || []).find((p) => p.id === 45);
if (!p45 || !/rüzgâr|ruzgar|Pa|km\/h/i.test(p45.q || "")) {
  errors.push("blindTestPrompts #45 must cover sabit rüzgâr yükü invent");
}
if (!/120 km\/h|1500 Pa|rüzgâr yükü|sabit rüzgâr/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit rüzgâr yükü invent");
}
// Day 98: sabit ölü piksel invent
const p46 = (doc.blindTestPrompts || []).find((p) => p.id === 46);
if (!p46 || !/ölü piksel|bad pixel|failure rate/i.test(p46.q || "")) {
  errors.push("blindTestPrompts #46 must cover sabit ölü piksel invent");
}
if (!/ölü piksel|0\.0001%|Class II|pixel failure|sabit ölü/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ölü piksel invent");
}
// Day 99: sabit nem / %RH invent
const p47 = (doc.blindTestPrompts || []).find((p) => p.id === 47);
if (!p47 || !/nem|%RH|humidity/i.test(p47.q || "")) {
  errors.push("blindTestPrompts #47 must cover sabit nem / %RH invent");
}
if (!/10.?90|%RH|sabit nem|operating humidity|çalışma nemi/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit nem / %RH invent");
}
// Day 100: sabit standby / idle invent
const p48 = (doc.blindTestPrompts || []).find((p) => p.id === 48);
if (!p48 || !/standby|idle|bekleme/i.test(p48.q || "")) {
  errors.push("blindTestPrompts #48 must cover sabit standby / idle invent");
}
if (!/standby|idle|bekleme|sabit standby/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit standby / idle invent");
}
// Day 101: sabit depolama / storage °C invent
const p49 = (doc.blindTestPrompts || []).find((p) => p.id === 49);
if (!p49 || !/depolama|saklama|storage/i.test(p49.q || "")) {
  errors.push("blindTestPrompts #49 must cover sabit depolama / storage °C invent");
}
if (!/depolama|saklama|storage|-40|sabit depolama/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit depolama / storage °C invent");
}
// Day 102: sabit CE / RoHS invent
const p50 = (doc.blindTestPrompts || []).find((p) => p.id === 50);
if (!p50 || !/CE|RoHS|sertifika/i.test(p50.q || "")) {
  errors.push("blindTestPrompts #50 must cover sabit CE / RoHS invent");
}
if (!/CE|RoHS|sertifika|EMC|FCC/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit CE / RoHS invent");
}
// Day 103: sabit ISO invent
const p51 = (doc.blindTestPrompts || []).find((p) => p.id === 51);
if (!p51 || !/ISO 9001|ISO 14001|ISO/i.test(p51.q || "")) {
  errors.push("blindTestPrompts #51 must cover sabit ISO invent");
}
if (!/ISO 9001|ISO 14001|sabit ISO/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ISO invent");
}
// Day 104: sabit UL / ETL invent
const p52 = (doc.blindTestPrompts || []).find((p) => p.id === 52);
if (!p52 || !/UL|ETL/i.test(p52.q || "")) {
  errors.push("blindTestPrompts #52 must cover sabit UL / ETL invent");
}
if (!/UL|ETL|sabit UL/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit UL / ETL invent");
}
// Day 105: sabit yangın sınıfı / fire rating invent
const p53 = (doc.blindTestPrompts || []).find((p) => p.id === 53);
if (!p53 || !/yangın|fire rating|Class A|B-s1/i.test(p53.q || "")) {
  errors.push("blindTestPrompts #53 must cover sabit yangın sınıfı / fire rating invent");
}
if (!/yangın sınıfı|fire rating|Class A|B-s1|sabit yangın/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit yangın sınıfı / fire rating invent");
}
// Day 106: sabit IK / impact rating invent
const p54 = (doc.blindTestPrompts || []).find((p) => p.id === 54);
if (!p54 || !/IK|impact|darbe/i.test(p54.q || "")) {
  errors.push("blindTestPrompts #54 must cover sabit IK / impact rating invent");
}
if (!/IK08|IK10|sabit IK|impact rating|darbe sınıfı/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit IK / impact rating invent");
}
// Day 107: sabit ASTM / salt spray invent
const p55 = (doc.blindTestPrompts || []).find((p) => p.id === 55);
if (!p55 || !/ASTM|salt spray|tuz sisi/i.test(p55.q || "")) {
  errors.push("blindTestPrompts #55 must cover sabit ASTM / salt spray invent");
}
if (!/ASTM|salt spray|tuz sisi|B117|sabit ASTM/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ASTM / salt spray invent");
}
// Day 108: sabit garanti yılı invent
const p56 = (doc.blindTestPrompts || []).find((p) => p.id === 56);
if (!p56 || !/garanti|warranty/i.test(p56.q || "")) {
  errors.push("blindTestPrompts #56 must cover sabit garanti yılı invent");
}
if (!/garanti yılı|sabit garanti|2 \/ 3 \/ 5 yıl|warranty year/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit garanti yılı invent");
}
// Day 109: sabit iade günü invent
const p57 = (doc.blindTestPrompts || []).find((p) => p.id === 57);
if (!p57 || !/iade|return/i.test(p57.q || "")) {
  errors.push("blindTestPrompts #57 must cover sabit iade günü invent");
}
if (!/iade günü|sabit iade|14 \/ 30|MerchantReturnNotPermitted/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit iade günü invent");
}
// Day 110: sabit teslimat süresi invent
const p58 = (doc.blindTestPrompts || []).find((p) => p.id === 58);
if (!p58 || !/teslimat|lead time/i.test(p58.q || "")) {
  errors.push("blindTestPrompts #58 must cover sabit teslimat süresi invent");
}
if (!/teslimat süresi|sabit teslimat|lead time|7 iş günü|48 saat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit teslimat süresi invent");
}
// Day 111: sabit gürültü / dB invent
const p59 = (doc.blindTestPrompts || []).find((p) => p.id === 59);
if (!p59 || !/gürültü|dB|noise|fan/i.test(p59.q || "")) {
  errors.push("blindTestPrompts #59 must cover sabit gürültü / dB invent");
}
if (!/gürültü|dB|fanless|akustik|sabit gürültü/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit gürültü / dB invent");
}
// Day 112: sabit Delta E / renk kalibrasyonu invent
const p60 = (doc.blindTestPrompts || []).find((p) => p.id === 60);
if (!p60 || !/Delta E|kalibrasyon|colour|color/i.test(p60.q || "")) {
  errors.push("blindTestPrompts #60 must cover sabit Delta E invent");
}
if (!/Delta E|renk kalibrasyonu|factory-calibrated|sabit Delta E/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Delta E invent");
}
// Day 76: agentRules full disambiguation
if (!/NationStar|NEXTSTAR/i.test(rulesJson)) {
  errors.push("agentRules must disambiguate NXTIONSTAR ≠ NEXTSTAR/NationStar");
}

if (errors.length) {
  console.error(`audit-ai-shopping-index: FAIL (${errors.length})`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(
  `audit-ai-shopping-index: OK — sources=${needSources.length} prompts=${prompts.length} pricedPanels=12 entity+CORS+routes+ard`,
);
