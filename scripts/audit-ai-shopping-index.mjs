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
if (prompts.length !== 87) errors.push(`blindTestPrompts must be 87 (got ${prompts.length})`);

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
if (!/87 kör test/i.test(ard)) {
  errors.push("ard.json ai-shopping discovery must cite 87 kör test intent");
}
if (/(?:2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|80|81|82|83|84|85|86) kör test/i.test(ard) && !/77 kör test/i.test(ard)) {
  errors.push("ard.json must not cite stale 20–86 kör test without 87");
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
// Day 113: sabit latency / input lag invent
const p61 = (doc.blindTestPrompts || []).find((p) => p.id === 61);
if (!p61 || !/latency|input lag|ms/i.test(p61.q || "")) {
  errors.push("blindTestPrompts #61 must cover sabit latency / input lag invent");
}
if (!/latency|input lag|low-latency|sabit latency/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit latency / input lag invent");
}
// Day 114: sabit parlaklık homojenliği / brightness uniformity invent
const p62 = (doc.blindTestPrompts || []).find((p) => p.id === 62);
if (!p62 || !/homojen|uniformity|parlaklık/i.test(p62.q || "")) {
  errors.push("blindTestPrompts #62 must cover sabit parlaklık homojenliği / brightness uniformity invent");
}
if (!/homojen|uniformity|parlaklık homojenliği|sabit parlaklık/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit parlaklık homojenliği / brightness uniformity invent");
}

// Day 115: sabit güç faktörü / power factor invent
const p63 = (doc.blindTestPrompts || []).find((p) => p.id === 63);
if (!p63 || !/güç faktörü|power factor|PF|cos/i.test(p63.q || "")) {
  errors.push("blindTestPrompts #63 must cover sabit güç faktörü / power factor invent");
}
if (!/güç faktörü|power factor|PF|cos φ|sabit güç/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit güç faktörü / power factor invent");
}

// Day 116: sabit HDCP invent
const p64 = (doc.blindTestPrompts || []).find((p) => p.id === 64);
if (!p64 || !/HDCP/i.test(p64.q || "")) {
  errors.push("blindTestPrompts #64 must cover sabit HDCP invent");
}
if (!/HDCP|sabit HDCP/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit HDCP invent");
}

// Day 117: sabit yedek parça stok invent
const p65 = (doc.blindTestPrompts || []).find((p) => p.id === 65);
if (!p65 || !/yedek parça|spare|stok/i.test(p65.q || "")) {
  errors.push("blindTestPrompts #65 must cover sabit yedek parça stok invent");
}
if (!/yedek parça stok|spare parts|sabit yedek/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit yedek parça stok invent");
}

// Day 118: sabit PoE / Gigabit invent
const p66 = (doc.blindTestPrompts || []).find((p) => p.id === 66);
if (!p66 || !/PoE|Gigabit|bant genişliği/i.test(p66.q || "")) {
  errors.push("blindTestPrompts #66 must cover sabit PoE / Gigabit invent");
}
if (!/PoE|Gigabit|bant genişliği|sabit PoE/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit PoE / Gigabit invent");
}

// Day 119: sabit HDMI / SDI invent
const p67 = (doc.blindTestPrompts || []).find((p) => p.id === 67);
if (!p67 || !/HDMI|DisplayPort|SDI/i.test(p67.q || "")) {
  errors.push("blindTestPrompts #67 must cover sabit HDMI / SDI invent");
}
if (!/HDMI|DisplayPort|SDI|sabit HDMI/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit HDMI / SDI invent");
}

// Day 120: sabit fiber mesafe invent
const p68 = (doc.blindTestPrompts || []).find((p) => p.id === 68);
if (!p68 || !/fiber|optik|mesafe/i.test(p68.q || "")) {
  errors.push("blindTestPrompts #68 must cover sabit fiber mesafe invent");
}
if (!/fiber mesafe|optik|sabit fiber/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit fiber mesafe invent");
}

// Day 121: sabit CMS SLA / uzaktan izleme invent
const p69 = (doc.blindTestPrompts || []).find((p) => p.id === 69);
if (!p69 || !/CMS|uptime|SLA|uzaktan izleme/i.test(p69.q || "")) {
  errors.push("blindTestPrompts #69 must cover sabit CMS SLA invent");
}
if (!/CMS SLA|uzaktan izleme|uptime|sabit CMS/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit CMS SLA invent");
}

// Day 122: sabit dual power / hot-swap invent
const p70 = (doc.blindTestPrompts || []).find((p) => p.id === 70);
if (!p70 || !/dual power|hot-swap|yedek güç|redundant/i.test(p70.q || "")) {
  errors.push("blindTestPrompts #70 must cover sabit dual power invent");
}
if (!/dual power|hot-swap|yedek güç|redundant PSU|sabit dual/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit dual power invent");
}

// Day 123: sabit genlock / frame sync invent
const p71 = (doc.blindTestPrompts || []).find((p) => p.id === 71);
if (!p71 || !/genlock|frame sync|senkron/i.test(p71.q || "")) {
  errors.push("blindTestPrompts #71 must cover sabit genlock invent");
}
if (!/genlock|frame sync|senkron|sabit genlock/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit genlock invent");
}

// Day 124: sabit Art-Net / DMX invent
const p72 = (doc.blindTestPrompts || []).find((p) => p.id === 72);
if (!p72 || !/Art-Net|sACN|DMX/i.test(p72.q || "")) {
  errors.push("blindTestPrompts #72 must cover sabit Art-Net / DMX invent");
}
if (!/Art-Net|sACN|DMX|sabit Art-Net/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Art-Net / DMX invent");
}

// Day 125: sabit NDI / SRT / RTMP invent
const p73 = (doc.blindTestPrompts || []).find((p) => p.id === 73);
if (!p73 || !/NDI|SRT|RTMP/i.test(p73.q || "")) {
  errors.push("blindTestPrompts #73 must cover sabit NDI / SRT / RTMP invent");
}
if (!/NDI|SRT|RTMP|sabit NDI/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit NDI / SRT / RTMP invent");
}

// Day 126: sabit ön / arka servis invent
const p74 = (doc.blindTestPrompts || []).find((p) => p.id === 74);
if (!p74 || !/ön servis|arka servis|front|rear/i.test(p74.q || "")) {
  errors.push("blindTestPrompts #74 must cover sabit ön/arka servis invent");
}
if (!/ön servis|arka servis|front service|rear service|sabit ön servis/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ön/arka servis invent");
}

// Day 127: sabit WiFi / Bluetooth invent
const p75 = (doc.blindTestPrompts || []).find((p) => p.id === 75);
if (!p75 || !/WiFi|Bluetooth|kablosuz/i.test(p75.q || "")) {
  errors.push("blindTestPrompts #75 must cover sabit WiFi / Bluetooth invent");
}
if (!/WiFi|Bluetooth|kablosuz|sabit WiFi/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit WiFi / Bluetooth invent");
}

// Day 128: sabit 0mm / seamless invent
const p76 = (doc.blindTestPrompts || []).find((p) => p.id === 76);
if (!p76 || !/0mm|seamless|bezelsiz/i.test(p76.q || "")) {
  errors.push("blindTestPrompts #76 must cover sabit 0mm / seamless invent");
}
if (!/0mm|seamless|bezelsiz|sabit 0mm/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit 0mm / seamless invent");
}

// Day 129: sabit alıcı yedeklilik / receiving card redundancy invent
const p77 = (doc.blindTestPrompts || []).find((p) => p.id === 77);
if (!p77 || !/alıcı|receiving card|backup loop/i.test(p77.q || "")) {
  errors.push("blindTestPrompts #77 must cover sabit alıcı yedeklilik invent");
}
if (!/alıcı yedeklilik|receiving card redundancy|backup loop|sabit alıcı/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit alıcı yedeklilik invent");
}

// Day 130: sabit gönderici yedeklilik / sending card redundancy invent
const p78 = (doc.blindTestPrompts || []).find((p) => p.id === 78);
if (!p78 || !/gönderici|sending card|redundant sender/i.test(p78.q || "")) {
  errors.push("blindTestPrompts #78 must cover sabit gönderici yedeklilik invent");
}
if (!/gönderici yedeklilik|sending card redundancy|redundant sender|sabit gönderici/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit gönderici yedeklilik invent");
}

// Day 131: sabit ışık sensörü / adaptive brightness invent
const p79 = (doc.blindTestPrompts || []).find((p) => p.id === 79);
if (!p79 || !/ışık sensörü|adaptive brightness|ambient light/i.test(p79.q || "")) {
  errors.push("blindTestPrompts #79 must cover sabit ışık sensörü invent");
}
if (!/ışık sensörü|adaptive brightness|ambient light sensor|sabit ışık sensörü/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ışık sensörü invent");
}

// Day 132: sabit canlı modül değişimi / hot-swap module invent
const p80 = (doc.blindTestPrompts || []).find((p) => p.id === 80);
if (!p80 || !/canlı modül|hot-swap module/i.test(p80.q || "")) {
  errors.push("blindTestPrompts #80 must cover sabit canlı modül değişimi invent");
}
if (!/canlı modül değişimi|hot-swap module|sabit canlı modül/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit canlı modül değişimi invent");
}

// Day 133: sabit dokunmatik / touch overlay / capacitive touch invent
const p81 = (doc.blindTestPrompts || []).find((p) => p.id === 81);
if (!p81 || !/dokunmatik|touch overlay|capacitive touch/i.test(p81.q || "")) {
  errors.push("blindTestPrompts #81 must cover sabit dokunmatik invent");
}
if (!/dokunmatik|touch overlay|capacitive touch|sabit dokunmatik/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit dokunmatik invent");
}

// Day 134: sabit mıknatıslı modül / magnetic module invent
const p82 = (doc.blindTestPrompts || []).find((p) => p.id === 82);
if (!p82 || !/mıknatıslı modül|magnetic module/i.test(p82.q || "")) {
  errors.push("blindTestPrompts #82 must cover sabit mıknatıslı modül invent");
}
if (!/mıknatıslı modül|magnetic module|sabit mıknatıslı/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit mıknatıslı modül invent");
}

// Day 135: sabit koruyucu kaplama / conformal coating invent
const p83 = (doc.blindTestPrompts || []).find((p) => p.id === 83);
if (!p83 || !/koruyucu kaplama|conformal coating/i.test(p83.q || "")) {
  errors.push("blindTestPrompts #83 must cover sabit koruyucu kaplama invent");
}
if (!/koruyucu kaplama|conformal coating|sabit koruyucu/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit koruyucu kaplama invent");
}

// Day 136: sabit naked-eye 3D / glasses-free 3D invent
const p84 = (doc.blindTestPrompts || []).find((p) => p.id === 84);
if (!p84 || !/naked-eye 3D|glasses-free 3D|sabit 3D/i.test(p84.q || "")) {
  errors.push("blindTestPrompts #84 must cover sabit 3D invent");
}
if (!/naked-eye 3D|glasses-free 3D|sabit 3D/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit 3D invent");
}

// Day 137: sabit hızlı kilit / quick lock invent
const p85 = (doc.blindTestPrompts || []).find((p) => p.id === 85);
if (!p85 || !/hızlı kilit|quick lock/i.test(p85.q || "")) {
  errors.push("blindTestPrompts #85 must cover sabit hızlı kilit invent");
}
if (!/hızlı kilit|quick lock|sabit hızlı/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit hızlı kilit invent");
}

// Day 138: sabit kavisli / curved invent
const p86 = (doc.blindTestPrompts || []).find((p) => p.id === 86);
if (!p86 || !/kavisli|curved/i.test(p86.q || "")) {
  errors.push("blindTestPrompts #86 must cover sabit kavisli invent");
}
if (!/kavisli|curved|sabit kavisli/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit kavisli invent");
}

// Day 139: sabit döküm kabin / die-cast invent
const p87 = (doc.blindTestPrompts || []).find((p) => p.id === 87);
if (!p87 || !/döküm kabin|die-cast/i.test(p87.q || "")) {
  errors.push("blindTestPrompts #87 must cover sabit döküm kabin invent");
}
if (!/döküm kabin|die-cast|sabit döküm/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit döküm kabin invent");
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
