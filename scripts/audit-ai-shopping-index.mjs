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
if (prompts.length !== 291) errors.push(`blindTestPrompts must be 291 (got ${prompts.length})`);

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
if (!/291 kör test/i.test(ard)) {
  errors.push("ard.json ai-shopping discovery must cite 291 kör test intent");
}
if (/(?<![0-9])(?:2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|99|100|101|102|103|104|105|106|107|108|109|110|111|112|113|114|115|116|117|118|119|120|121|122|123|124|125|126|127|128|129|130|131|132|133|134|135|136|137|138|139|140|141|142|143|144|145|146|147|148|149|150|151|152|153|154|155|156|157|158|159|160|161|162|163|164|165|166|167|168|169|170|171|172|173|174|175|176|177|178|179|180|181|182|183|184|185|186|187|188|189|190|191|192|193|194|195|196|197|198|199|200|201|202|203|204|205|206|207|208|209|210|211|212|213|214|215|216|217|218|219|220|221|222|223|224|225|226) kör test/i.test(ard) && !/77 kör test/i.test(ard)) {
  errors.push("ard.json must not cite stale 20–290 kör test without 291");
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

// Day 140: sabit anti-yansıma / anti-glare invent
const p88 = (doc.blindTestPrompts || []).find((p) => p.id === 88);
if (!p88 || !/anti-yansıma|anti-glare/i.test(p88.q || "")) {
  errors.push("blindTestPrompts #88 must cover sabit anti-yansıma invent");
}
if (!/anti-yansıma|anti-glare|sabit anti-yansıma/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit anti-yansıma invent");
}

// Day 141: sabit OPS / Android player invent
const p89 = (doc.blindTestPrompts || []).find((p) => p.id === 89);
if (!p89 || !/OPS|Android player/i.test(p89.q || "")) {
  errors.push("blindTestPrompts #89 must cover sabit OPS invent");
}
if (!/OPS|Android player|sabit OPS/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit OPS invent");
}

// Day 142: sabit parafudr / surge protection invent
const p90 = (doc.blindTestPrompts || []).find((p) => p.id === 90);
if (!p90 || !/parafudr|surge protection/i.test(p90.q || "")) {
  errors.push("blindTestPrompts #90 must cover sabit parafudr invent");
}
if (!/parafudr|surge protection|sabit parafudr/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit parafudr invent");
}

// Day 143: sabit zamanlayıcı / content scheduler invent
const p91 = (doc.blindTestPrompts || []).find((p) => p.id === 91);
if (!p91 || !/zamanlayıcı|content scheduler/i.test(p91.q || "")) {
  errors.push("blindTestPrompts #91 must cover sabit zamanlayıcı invent");
}
if (!/zamanlayıcı|content scheduler|sabit zamanlayıcı/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit zamanlayıcı invent");
}

// Day 144: sabit flight case / taşıma çantası invent
const p92 = (doc.blindTestPrompts || []).find((p) => p.id === 92);
if (!p92 || !/flight case|taşıma çantası/i.test(p92.q || "")) {
  errors.push("blindTestPrompts #92 must cover sabit flight case invent");
}
if (!/flight case|taşıma çantası|sabit flight case/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit flight case invent");
}

// Day 145: sabit köşe LED / corner LED invent
const p93 = (doc.blindTestPrompts || []).find((p) => p.id === 93);
if (!p93 || !/köşe LED|corner LED/i.test(p93.q || "")) {
  errors.push("blindTestPrompts #93 must cover sabit köşe LED invent");
}
if (!/köşe LED|corner LED|sabit köşe LED/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit köşe LED invent");
}

// Day 146: sabit enerji sınıfı / energy class invent
const p94 = (doc.blindTestPrompts || []).find((p) => p.id === 94);
if (!p94 || !/enerji sınıfı|energy class/i.test(p94.q || "")) {
  errors.push("blindTestPrompts #94 must cover sabit enerji sınıfı invent");
}
if (!/enerji sınıfı|energy class|sabit enerji sınıfı/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit enerji sınıfı invent");
}

// Day 147: sabit düşük mavi ışık / low blue light invent
const p95 = (doc.blindTestPrompts || []).find((p) => p.id === 95);
if (!p95 || !/düşük mavi ışık|low blue light/i.test(p95.q || "")) {
  errors.push("blindTestPrompts #95 must cover sabit düşük mavi ışık invent");
}
if (!/düşük mavi ışık|low blue light|sabit düşük mavi ışık/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit düşük mavi ışık invent");
}

// Day 148: sabit asılı / hanging / rigging invent
const p96 = (doc.blindTestPrompts || []).find((p) => p.id === 96);
if (!p96 || !/asılı|hanging|rigging/i.test(p96.q || "")) {
  errors.push("blindTestPrompts #96 must cover sabit asılı invent");
}
if (!/asılı|hanging|rigging|sabit asılı/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit asılı invent");
}

// Day 149: sabit daisy chain / data cascade invent
const p97 = (doc.blindTestPrompts || []).find((p) => p.id === 97);
if (!p97 || !/daisy chain|data cascade/i.test(p97.q || "")) {
  errors.push("blindTestPrompts #97 must cover sabit daisy chain invent");
}
if (!/daisy chain|data cascade|sabit daisy chain/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit daisy chain invent");
}

// Day 150: sabit IP67 / NEMA invent
const p98 = (doc.blindTestPrompts || []).find((p) => p.id === 98);
if (!p98 || !/IP67|NEMA/i.test(p98.q || "")) {
  errors.push("blindTestPrompts #98 must cover sabit IP67 invent");
}
if (!/IP67|NEMA|sabit IP67/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit IP67 invent");
}

// Day 151: sabit ısı yönetimi / heater / cooling invent
const p99 = (doc.blindTestPrompts || []).find((p) => p.id === 99);
if (!p99 || !/ısıtıcı|heater|soğutma|cooling|ısı yönetimi/i.test(p99.q || "")) {
  errors.push("blindTestPrompts #99 must cover sabit ısı yönetimi invent");
}
if (!/ısı yönetimi|heater|cooling|sabit ısı yönetimi/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ısı yönetimi invent");
}

// Day 152: sabit BT.2020 / Rec.2020 invent
const p100 = (doc.blindTestPrompts || []).find((p) => p.id === 100);
if (!p100 || !/BT\.2020|Rec\.2020/i.test(p100.q || "")) {
  errors.push("blindTestPrompts #100 must cover sabit BT.2020 invent");
}
if (!/BT\.2020|Rec\.2020|sabit BT\.2020/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit BT.2020 invent");
}

// Day 153: sabit HLG / HDR10 / PQ invent
const p101 = (doc.blindTestPrompts || []).find((p) => p.id === 101);
if (!p101 || !/HLG|HDR10|PQ/i.test(p101.q || "")) {
  errors.push("blindTestPrompts #101 must cover sabit HLG invent");
}
if (!/HLG|HDR10|PQ|sabit HLG/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit HLG invent");
}

// Day 154: sabit PWM / scan rate invent
const p102 = (doc.blindTestPrompts || []).find((p) => p.id === 102);
if (!p102 || !/PWM|scan rate/i.test(p102.q || "")) {
  errors.push("blindTestPrompts #102 must cover sabit PWM invent");
}
if (!/PWM|scan rate|sabit PWM/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit PWM invent");
}

// Day 155: sabit black level / siyah seviye invent
const p103 = (doc.blindTestPrompts || []).find((p) => p.id === 103);
if (!p103 || !/black level|siyah seviye/i.test(p103.q || "")) {
  errors.push("blindTestPrompts #103 must cover sabit black level invent");
}
if (!/black level|siyah seviye|sabit black level/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit black level invent");
}

// Day 156: sabit pixel mapping / piksel eşleme invent
const p104 = (doc.blindTestPrompts || []).find((p) => p.id === 104);
if (!p104 || !/pixel mapping|piksel eşleme/i.test(p104.q || "")) {
  errors.push("blindTestPrompts #104 must cover sabit pixel mapping invent");
}
if (!/pixel mapping|piksel eşleme|sabit pixel mapping/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit pixel mapping invent");
}

// Day 157: sabit gamma / white balance invent
const p105 = (doc.blindTestPrompts || []).find((p) => p.id === 105);
if (!p105 || !/gamma|white balance|beyaz dengesi/i.test(p105.q || "")) {
  errors.push("blindTestPrompts #105 must cover sabit gamma invent");
}
if (!/gamma|white balance|beyaz dengesi|sabit gamma/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit gamma invent");
}

// Day 158: sabit potting / epoxy potting invent
const p106 = (doc.blindTestPrompts || []).find((p) => p.id === 106);
if (!p106 || !/potting|epoxy/i.test(p106.q || "")) {
  errors.push("blindTestPrompts #106 must cover sabit potting invent");
}
if (!/potting|epoxy potting|sabit potting/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit potting invent");
}

// Day 159: sabit louver / masking invent
const p107 = (doc.blindTestPrompts || []).find((p) => p.id === 107);
if (!p107 || !/louver|masking|güneş panjuru/i.test(p107.q || "")) {
  errors.push("blindTestPrompts #107 must cover sabit louver invent");
}
if (!/louver|masking|güneş panjuru|sabit louver/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit louver invent");
}

// Day 160: sabit module size / modül boyutu invent
const p108 = (doc.blindTestPrompts || []).find((p) => p.id === 108);
if (!p108 || !/module size|modül boyutu/i.test(p108.q || "")) {
  errors.push("blindTestPrompts #108 must cover sabit module size invent");
}
if (!/module size|modül boyutu|sabit module size/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit module size invent");
}

// Day 161: sabit cabinet depth / kabin derinliği invent
const p109 = (doc.blindTestPrompts || []).find((p) => p.id === 109);
if (!p109 || !/cabinet depth|kabin derinliği/i.test(p109.q || "")) {
  errors.push("blindTestPrompts #109 must cover sabit cabinet depth invent");
}
if (!/cabinet depth|kabin derinliği|sabit cabinet depth/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit cabinet depth invent");
}

// Day 162: sabit drive IC / sürücü IC invent
const p110 = (doc.blindTestPrompts || []).find((p) => p.id === 110);
if (!p110 || !/drive IC|sürücü IC/i.test(p110.q || "")) {
  errors.push("blindTestPrompts #110 must cover sabit drive IC invent");
}
if (!/drive IC|sürücü IC|sabit drive IC/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit drive IC invent");
}

// Day 163: sabit cabinet size / kabin boyutu invent
const p111 = (doc.blindTestPrompts || []).find((p) => p.id === 111);
if (!p111 || !/cabinet size|kabin boyutu/i.test(p111.q || "")) {
  errors.push("blindTestPrompts #111 must cover sabit cabinet size invent");
}
if (!/cabinet size|kabin boyutu|sabit cabinet size/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit cabinet size invent");
}

// Day 164: sabit panel size / panel boyutu invent
const p112 = (doc.blindTestPrompts || []).find((p) => p.id === 112);
if (!p112 || !/panel size|panel boyutu/i.test(p112.q || "")) {
  errors.push("blindTestPrompts #112 must cover sabit panel size invent");
}
if (!/panel size|panel boyutu|sabit panel size/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit panel size invent");
}

// Day 165: sabit waterproof glue / su geçirmez yapıştırıcı invent
const p113 = (doc.blindTestPrompts || []).find((p) => p.id === 113);
if (!p113 || !/waterproof glue|su geçirmez yapıştırıcı/i.test(p113.q || "")) {
  errors.push("blindTestPrompts #113 must cover sabit waterproof glue invent");
}
if (!/waterproof glue|su geçirmez yapıştırıcı|sabit waterproof glue/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit waterproof glue invent");
}

// Day 166: sabit mask pitch / maske pitch invent
const p114 = (doc.blindTestPrompts || []).find((p) => p.id === 114);
if (!p114 || !/mask pitch|maske pitch/i.test(p114.q || "")) {
  errors.push("blindTestPrompts #114 must cover sabit mask pitch invent");
}
if (!/mask pitch|maske pitch|sabit mask pitch/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit mask pitch invent");
}

// Day 167: sabit silicone seal / silikon conta invent
const p115 = (doc.blindTestPrompts || []).find((p) => p.id === 115);
if (!p115 || !/silicone seal|silikon conta/i.test(p115.q || "")) {
  errors.push("blindTestPrompts #115 must cover sabit silicone seal invent");
}
if (!/silicone seal|silikon conta|sabit silicone seal/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit silicone seal invent");
}

// Day 168: sabit connector type / konektör tipi invent
const p116 = (doc.blindTestPrompts || []).find((p) => p.id === 116);
if (!p116 || !/connector type|konektör tipi/i.test(p116.q || "")) {
  errors.push("blindTestPrompts #116 must cover sabit connector type invent");
}
if (!/connector type|konektör tipi|sabit connector type/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit connector type invent");
}

// Day 169: sabit locating pin / konumlandırma pimi invent
const p117 = (doc.blindTestPrompts || []).find((p) => p.id === 117);
if (!p117 || !/locating pin|konumlandırma pimi/i.test(p117.q || "")) {
  errors.push("blindTestPrompts #117 must cover sabit locating pin invent");
}
if (!/locating pin|konumlandırma pimi|sabit locating pin/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit locating pin invent");
}

// Day 170: sabit flat cable / flat kablo invent
const p118 = (doc.blindTestPrompts || []).find((p) => p.id === 118);
if (!p118 || !/flat cable|flat kablo/i.test(p118.q || "")) {
  errors.push("blindTestPrompts #118 must cover sabit flat cable invent");
}
if (!/flat cable|flat kablo|sabit flat cable/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit flat cable invent");
}

// Day 171: sabit safety cable / emniyet kablosu invent
const p119 = (doc.blindTestPrompts || []).find((p) => p.id === 119);
if (!p119 || !/safety cable|emniyet kablosu/i.test(p119.q || "")) {
  errors.push("blindTestPrompts #119 must cover sabit safety cable invent");
}
if (!/safety cable|emniyet kablosu|sabit safety cable/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit safety cable invent");
}

// Day 172: sabit thermal pad / termal pad invent
const p120 = (doc.blindTestPrompts || []).find((p) => p.id === 120);
if (!p120 || !/thermal pad|termal pad/i.test(p120.q || "")) {
  errors.push("blindTestPrompts #120 must cover sabit thermal pad invent");
}
if (!/thermal pad|termal pad|sabit thermal pad/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit thermal pad invent");
}


// Day 173: sabit magnesium / magnezyum invent
const p121 = (doc.blindTestPrompts || []).find((p) => p.id === 121);
if (!p121 || !/magnesium|magnezyum/i.test(p121.q || "")) {
  errors.push("blindTestPrompts #121 must cover sabit magnesium invent");
}
if (!/magnesium|magnezyum|sabit magnesium/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit magnesium invent");
}


// Day 174: sabit EDID / EDID yönetimi invent
const p122 = (doc.blindTestPrompts || []).find((p) => p.id === 122);
if (!p122 || !/EDID/i.test(p122.q || "")) {
  errors.push("blindTestPrompts #122 must cover sabit EDID invent");
}
if (!/EDID|sabit EDID/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit EDID invent");
}


// Day 175: sabit HDBaseT / HDBaseT iletim invent
const p123 = (doc.blindTestPrompts || []).find((p) => p.id === 123);
if (!p123 || !/HDBaseT/i.test(p123.q || "")) {
  errors.push("blindTestPrompts #123 must cover sabit HDBaseT invent");
}
if (!/HDBaseT|sabit HDBaseT/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit HDBaseT invent");
}


// Day 176: sabit video processor / video işlemci invent
const p124 = (doc.blindTestPrompts || []).find((p) => p.id === 124);
if (!p124 || !/video processor|video işlemci/i.test(p124.q || "")) {
  errors.push("blindTestPrompts #124 must cover sabit video processor invent");
}
if (!/video processor|video işlemci|sabit video processor/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit video processor invent");
}


// Day 177: sabit truss clamp / truss kelepçe invent
const p125 = (doc.blindTestPrompts || []).find((p) => p.id === 125);
if (!p125 || !/truss clamp|truss kelepçe/i.test(p125.q || "")) {
  errors.push("blindTestPrompts #125 must cover sabit truss clamp invent");
}
if (!/truss clamp|truss kelepçe|sabit truss clamp/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit truss clamp invent");
}


// Day 178: sabit scaler / ölçekleyici invent
const p126 = (doc.blindTestPrompts || []).find((p) => p.id === 126);
if (!p126 || !/scaler|ölçekleyici/i.test(p126.q || "")) {
  errors.push("blindTestPrompts #126 must cover sabit scaler invent");
}
if (!/scaler|ölçekleyici|sabit scaler/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit scaler invent");
}


// Day 179: sabit backup battery / yedek batarya invent
const p127 = (doc.blindTestPrompts || []).find((p) => p.id === 127);
if (!p127 || !/backup battery|yedek batarya/i.test(p127.q || "")) {
  errors.push("blindTestPrompts #127 must cover sabit backup battery invent");
}
if (!/backup battery|yedek batarya|sabit backup battery/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit backup battery invent");
}


// Day 180: sabit ribbon cable / ribbon kablo invent
const p128 = (doc.blindTestPrompts || []).find((p) => p.id === 128);
if (!p128 || !/ribbon cable|ribbon kablo/i.test(p128.q || "")) {
  errors.push("blindTestPrompts #128 must cover sabit ribbon cable invent");
}
if (!/ribbon cable|ribbon kablo|sabit ribbon cable/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ribbon cable invent");
}


// Day 181: sabit hoist / vinç invent
const p129 = (doc.blindTestPrompts || []).find((p) => p.id === 129);
if (!p129 || !/hoist|vinç/i.test(p129.q || "")) {
  errors.push("blindTestPrompts #129 must cover sabit hoist invent");
}
if (!/hoist|vinç|sabit hoist/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit hoist invent");
}


// Day 182: sabit SFP / SFP modül invent
const p130 = (doc.blindTestPrompts || []).find((p) => p.id === 130);
if (!p130 || !/SFP/i.test(p130.q || "")) {
  errors.push("blindTestPrompts #130 must cover sabit SFP invent");
}
if (!/SFP|sabit SFP/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit SFP invent");
}


// Day 183: sabit cable gland / kablo rakoru invent
const p131 = (doc.blindTestPrompts || []).find((p) => p.id === 131);
if (!p131 || !/cable gland|kablo rakoru/i.test(p131.q || "")) {
  errors.push("blindTestPrompts #131 must cover sabit cable gland invent");
}
if (!/cable gland|kablo rakoru|sabit cable gland/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit cable gland invent");
}


// Day 184: sabit PIP / görüntü içinde görüntü invent
const p132 = (doc.blindTestPrompts || []).find((p) => p.id === 132);
if (!p132 || !/PIP|görüntü içinde görüntü/i.test(p132.q || "")) {
  errors.push("blindTestPrompts #132 must cover sabit PIP invent");
}
if (!/PIP|görüntü içinde görüntü|sabit PIP/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit PIP invent");
}

// Day 185: sabit grounding / topraklama invent
const p133 = (doc.blindTestPrompts || []).find((p) => p.id === 133);
if (!p133 || !/grounding|topraklama/i.test(p133.q || "")) {
  errors.push("blindTestPrompts #133 must cover sabit grounding invent");
}
if (!/grounding|topraklama|sabit grounding/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit grounding invent");
}

// Day 186: sabit Dante / Dante audio invent
const p134 = (doc.blindTestPrompts || []).find((p) => p.id === 134);
if (!p134 || !/Dante/i.test(p134.q || "")) {
  errors.push("blindTestPrompts #134 must cover sabit Dante invent");
}
if (!/Dante|sabit Dante/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Dante invent");
}

// Day 187: sabit powerCON / PowerCON invent
const p135 = (doc.blindTestPrompts || []).find((p) => p.id === 135);
if (!p135 || !/powerCON|PowerCON/i.test(p135.q || "")) {
  errors.push("blindTestPrompts #135 must cover sabit powerCON invent");
}
if (!/powerCON|PowerCON|sabit powerCON/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit powerCON invent");
}

// Day 188: sabit KVM / KVM switch invent
const p136 = (doc.blindTestPrompts || []).find((p) => p.id === 136);
if (!p136 || !/KVM/i.test(p136.q || "")) {
  errors.push("blindTestPrompts #136 must cover sabit KVM invent");
}
if (!/KVM|sabit KVM/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit KVM invent");
}

// Day 189: sabit Neutrik / Neutrik connector invent
const p137 = (doc.blindTestPrompts || []).find((p) => p.id === 137);
if (!p137 || !/Neutrik/i.test(p137.q || "")) {
  errors.push("blindTestPrompts #137 must cover sabit Neutrik invent");
}
if (!/Neutrik|sabit Neutrik/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Neutrik invent");
}

// Day 190: sabit multi-window / çoklu pencere invent
const p138 = (doc.blindTestPrompts || []).find((p) => p.id === 138);
if (!p138 || !/multi-window|çoklu pencere/i.test(p138.q || "")) {
  errors.push("blindTestPrompts #138 must cover sabit multi-window invent");
}
if (!/multi-window|çoklu pencere|sabit multi-window/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit multi-window invent");
}

// Day 191: sabit guy wire / gergi teli invent
const p139 = (doc.blindTestPrompts || []).find((p) => p.id === 139);
if (!p139 || !/guy wire|gergi teli/i.test(p139.q || "")) {
  errors.push("blindTestPrompts #139 must cover sabit guy wire invent");
}
if (!/guy wire|gergi teli|sabit guy wire/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit guy wire invent");
}

// Day 192: sabit junction box / buat invent
const p140 = (doc.blindTestPrompts || []).find((p) => p.id === 140);
if (!p140 || !/junction box|buat/i.test(p140.q || "")) {
  errors.push("blindTestPrompts #140 must cover sabit junction box invent");
}
if (!/junction box|buat|sabit junction box/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit junction box invent");
}

// Day 193: sabit leveling foot / ayar ayağı invent
const p141 = (doc.blindTestPrompts || []).find((p) => p.id === 141);
if (!p141 || !/leveling foot|ayar ayağı/i.test(p141.q || "")) {
  errors.push("blindTestPrompts #141 must cover sabit leveling foot invent");
}
if (!/leveling foot|ayar ayağı|sabit leveling foot/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit leveling foot invent");
}

// Day 194: sabit matrix switcher / matris switch invent
const p142 = (doc.blindTestPrompts || []).find((p) => p.id === 142);
if (!p142 || !/matrix switcher|matris switch/i.test(p142.q || "")) {
  errors.push("blindTestPrompts #142 must cover sabit matrix switcher invent");
}
if (!/matrix switcher|matris switch|sabit matrix switcher/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit matrix switcher invent");
}

// Day 195: sabit ballast / karşı ağırlık invent
const p143 = (doc.blindTestPrompts || []).find((p) => p.id === 143);
if (!p143 || !/ballast|karşı ağırlık/i.test(p143.q || "")) {
  errors.push("blindTestPrompts #143 must cover sabit ballast invent");
}
if (!/ballast|karşı ağırlık|sabit ballast/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ballast invent");
}

// Day 196: sabit BYOD / kablosuz sunum invent
const p144 = (doc.blindTestPrompts || []).find((p) => p.id === 144);
if (!p144 || !/BYOD|kablosuz sunum/i.test(p144.q || "")) {
  errors.push("blindTestPrompts #144 must cover sabit BYOD invent");
}
if (!/BYOD|kablosuz sunum|sabit BYOD/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit BYOD invent");
}

// Day 197: sabit outrigger / payanda invent
const p145 = (doc.blindTestPrompts || []).find((p) => p.id === 145);
if (!p145 || !/outrigger|payanda/i.test(p145.q || "")) {
  errors.push("blindTestPrompts #145 must cover sabit outrigger invent");
}
if (!/outrigger|payanda|sabit outrigger/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit outrigger invent");
}

// Day 198: sabit Crestron / kontrol sistemi invent
const p146 = (doc.blindTestPrompts || []).find((p) => p.id === 146);
if (!p146 || !/Crestron|kontrol sistemi/i.test(p146.q || "")) {
  errors.push("blindTestPrompts #146 must cover sabit Crestron invent");
}
if (!/Crestron|kontrol sistemi|sabit Crestron/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Crestron invent");

const p147 = (doc.blindTestPrompts || []).find((p) => p.id === 147);
if (!p147 || !/USB-C|USB Type-C/i.test(p147.q || "")) {
  errors.push("blindTestPrompts #147 must cover sabit USB-C invent");
}
if (!/USB-C|USB Type-C|sabit USB-C/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit USB-C invent");

const p148 = (doc.blindTestPrompts || []).find((p) => p.id === 148);
if (!p148 || !/IR remote|kızılötesi kumanda/i.test(p148.q || "")) {
  errors.push("blindTestPrompts #148 must cover sabit IR remote invent");
}
if (!/IR remote|kızılötesi kumanda|sabit IR remote/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit IR remote invent");

const p149 = (doc.blindTestPrompts || []).find((p) => p.id === 149);
if (!p149 || !/base plate|taban plakası/i.test(p149.q || "")) {
  errors.push("blindTestPrompts #149 must cover sabit base plate invent");
}
if (!/base plate|taban plakası|sabit base plate/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit base plate invent");

const p150 = (doc.blindTestPrompts || []).find((p) => p.id === 150);
if (!p150 || !/RS-232|seri port/i.test(p150.q || "")) {
  errors.push("blindTestPrompts #150 must cover sabit RS-232 invent");
}
if (!/RS-232|seri port|sabit RS-232/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit RS-232 invent");

const p151 = (doc.blindTestPrompts || []).find((p) => p.id === 151);
if (!p151 || !/weather drain|su tahliyesi/i.test(p151.q || "")) {
  errors.push("blindTestPrompts #151 must cover sabit weather drain invent");
}
if (!/weather drain|su tahliyesi|sabit weather drain/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit weather drain invent");

const p152 = (doc.blindTestPrompts || []).find((p) => p.id === 152);
if (!p152 || !/Extron|AV switcher/i.test(p152.q || "")) {
  errors.push("blindTestPrompts #152 must cover sabit Extron invent");
}
if (!/Extron|AV switcher|sabit Extron/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Extron invent");

const p153 = (doc.blindTestPrompts || []).find((p) => p.id === 153);
if (!p153 || !/wall bracket|duvar braketi/i.test(p153.q || "")) {
  errors.push("blindTestPrompts #153 must cover sabit wall bracket invent");
}
if (!/wall bracket|duvar braketi|sabit wall bracket/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit wall bracket invent");

const p154 = (doc.blindTestPrompts || []).find((p) => p.id === 154);
if (!p154 || !/AMX|oda kontrol/i.test(p154.q || "")) {
  errors.push("blindTestPrompts #154 must cover sabit AMX invent");
}
if (!/AMX|oda kontrol|sabit AMX/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit AMX invent");

const p155 = (doc.blindTestPrompts || []).find((p) => p.id === 155);
if (!p155 || !/drip edge|damlacık kenarı/i.test(p155.q || "")) {
  errors.push("blindTestPrompts #155 must cover sabit drip edge invent");
}
if (!/drip edge|damlacık kenarı|sabit drip edge/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit drip edge invent");

const p156 = (doc.blindTestPrompts || []).find((p) => p.id === 156);
if (!p156 || !/Control4|akıllı ev/i.test(p156.q || "")) {
  errors.push("blindTestPrompts #156 must cover sabit Control4 invent");
}
if (!/Control4|akıllı ev|sabit Control4/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Control4 invent");

const p157 = (doc.blindTestPrompts || []).find((p) => p.id === 157);
if (!p157 || !/weep hole|drenaj deliği/i.test(p157.q || "")) {
  errors.push("blindTestPrompts #157 must cover sabit weep hole invent");
}
if (!/weep hole|drenaj deliği|sabit weep hole/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit weep hole invent");
}

const p158 = (doc.blindTestPrompts || []).find((p) => p.id === 158);
if (!p158 || !/Biamp|DSP/i.test(p158.q || "")) {
  errors.push("blindTestPrompts #158 must cover sabit Biamp invent");
}
if (!/Biamp|DSP|sabit Biamp/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Biamp invent");
}

const p159 = (doc.blindTestPrompts || []).find((p) => p.id === 159);
if (!p159 || !/bird mesh|kuş filesi/i.test(p159.q || "")) {
  errors.push("blindTestPrompts #159 must cover sabit bird mesh invent");
}
if (!/bird mesh|kuş filesi|sabit bird mesh/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit bird mesh invent");
}

const p160 = (doc.blindTestPrompts || []).find((p) => p.id === 160);
if (!p160 || !/QSC|amfi/i.test(p160.q || "")) {
  errors.push("blindTestPrompts #160 must cover sabit QSC invent");
}
if (!/QSC|amfi|sabit QSC/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit QSC invent");
}

const p161 = (doc.blindTestPrompts || []).find((p) => p.id === 161);
if (!p161 || !/anti-theft screw|hırsızlık önleyici vida/i.test(p161.q || "")) {
  errors.push("blindTestPrompts #161 must cover sabit anti-theft screw invent");
}
if (!/anti-theft screw|hırsızlık önleyici vida|sabit anti-theft screw/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit anti-theft screw invent");
}

const p162 = (doc.blindTestPrompts || []).find((p) => p.id === 162);
if (!p162 || !/RS-485|seri bus/i.test(p162.q || "")) {
  errors.push("blindTestPrompts #162 must cover sabit RS-485 invent");
}
if (!/RS-485|seri bus|sabit RS-485/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit RS-485 invent");
}

const p163 = (doc.blindTestPrompts || []).find((p) => p.id === 163);
if (!p163 || !/bird spike|kuş dikeni/i.test(p163.q || "")) {
  errors.push("blindTestPrompts #163 must cover sabit bird spike invent");
}
if (!/bird spike|kuş dikeni|sabit bird spike/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit bird spike invent");
}

const p164 = (doc.blindTestPrompts || []).find((p) => p.id === 164);
if (!p164 || !/Kramer|AV matrix/i.test(p164.q || "")) {
  errors.push("blindTestPrompts #164 must cover sabit Kramer invent");
}
if (!/Kramer|AV matrix|sabit Kramer/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Kramer invent");
}

const p165 = (doc.blindTestPrompts || []).find((p) => p.id === 165);
if (!p165 || !/expansion joint|genleşme derzi/i.test(p165.q || "")) {
  errors.push("blindTestPrompts #165 must cover sabit expansion joint invent");
}
if (!/expansion joint|genleşme derzi|sabit expansion joint/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit expansion joint invent");
}

const p166 = (doc.blindTestPrompts || []).find((p) => p.id === 166);
if (!p166 || !/Shure|mikrofon/i.test(p166.q || "")) {
  errors.push("blindTestPrompts #166 must cover sabit Shure invent");
}
if (!/Shure|mikrofon|sabit Shure/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Shure invent");
}

const p167 = (doc.blindTestPrompts || []).find((p) => p.id === 167);
if (!p167 || !/snow load|kar yükü/i.test(p167.q || "")) {
  errors.push("blindTestPrompts #167 must cover sabit snow load invent");
}
if (!/snow load|kar yükü|sabit snow load/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit snow load invent");
}

const p168 = (doc.blindTestPrompts || []).find((p) => p.id === 168);
if (!p168 || !/Symetrix|DSP/i.test(p168.q || "")) {
  errors.push("blindTestPrompts #168 must cover sabit Symetrix invent");
}
if (!/Symetrix|sabit Symetrix/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Symetrix invent");
}

const p169 = (doc.blindTestPrompts || []).find((p) => p.id === 169);
if (!p169 || !/cable tray|kablo kanalı/i.test(p169.q || "")) {
  errors.push("blindTestPrompts #169 must cover sabit cable tray invent");
}
if (!/cable tray|kablo kanalı|sabit cable tray/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit cable tray invent");
}

const p170 = (doc.blindTestPrompts || []).find((p) => p.id === 170);
if (!p170 || !/Atlona|AV over IP/i.test(p170.q || "")) {
  errors.push("blindTestPrompts #170 must cover sabit Atlona invent");
}
if (!/Atlona|AV over IP|sabit Atlona/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Atlona invent");
}

const p171 = (doc.blindTestPrompts || []).find((p) => p.id === 171);
if (!p171 || !/sun shade|güneş siperi/i.test(p171.q || "")) {
  errors.push("blindTestPrompts #171 must cover sabit sun shade invent");
}
if (!/sun shade|güneş siperi|sabit sun shade/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit sun shade invent");
}

const p172 = (doc.blindTestPrompts || []).find((p) => p.id === 172);
if (!p172 || !/Zoom Room|soft codec/i.test(p172.q || "")) {
  errors.push("blindTestPrompts #172 must cover sabit Zoom Room invent");
}
if (!/Zoom Room|soft codec|sabit Zoom Room/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Zoom Room invent");
}

const p173 = (doc.blindTestPrompts || []).find((p) => p.id === 173);
if (!p173 || !/vandal guard|vandal koruma/i.test(p173.q || "")) {
  errors.push("blindTestPrompts #173 must cover sabit vandal guard invent");
}
if (!/vandal guard|vandal koruma|sabit vandal guard/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit vandal guard invent");
}

const p174 = (doc.blindTestPrompts || []).find((p) => p.id === 174);
if (!p174 || !/Teams Room|soft conferencing/i.test(p174.q || "")) {
  errors.push("blindTestPrompts #174 must cover sabit Teams Room invent");
}
if (!/Teams Room|soft conferencing|sabit Teams Room/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Teams Room invent");
}

const p175 = (doc.blindTestPrompts || []).find((p) => p.id === 175);
if (!p175 || !/lightning rod|paratoner/i.test(p175.q || "")) {
  errors.push("blindTestPrompts #175 must cover sabit lightning rod invent");
}
if (!/lightning rod|paratoner|sabit lightning rod/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit lightning rod invent");
}

const p176 = (doc.blindTestPrompts || []).find((p) => p.id === 176);
if (!p176 || !/Webex Room|soft conferencing/i.test(p176.q || "")) {
  errors.push("blindTestPrompts #176 must cover sabit Webex Room invent");
}
if (!/Webex Room|soft conferencing|sabit Webex Room/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Webex Room invent");
}

const p177 = (doc.blindTestPrompts || []).find((p) => p.id === 177);
if (!p177 || !/sill flashing|eşik flaşörü/i.test(p177.q || "")) {
  errors.push("blindTestPrompts #177 must cover sabit sill flashing invent");
}
if (!/sill flashing|eşik flaşörü|sabit sill flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit sill flashing invent");
}

const p178 = (doc.blindTestPrompts || []).find((p) => p.id === 178);
if (!p178 || !/ClickShare|kablosuz sunum/i.test(p178.q || "")) {
  errors.push("blindTestPrompts #178 must cover sabit ClickShare invent");
}
if (!/ClickShare|kablosuz sunum|sabit ClickShare/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ClickShare invent");
}

const p179 = (doc.blindTestPrompts || []).find((p) => p.id === 179);
if (!p179 || !/seismic brace|sismik destek/i.test(p179.q || "")) {
  errors.push("blindTestPrompts #179 must cover sabit seismic brace invent");
}
if (!/seismic brace|sismik destek|sabit seismic brace/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit seismic brace invent");
}

const p180 = (doc.blindTestPrompts || []).find((p) => p.id === 180);
if (!p180 || !/AirMedia|kablosuz paylaşım/i.test(p180.q || "")) {
  errors.push("blindTestPrompts #180 must cover sabit AirMedia invent");
}
if (!/AirMedia|kablosuz paylaşım|sabit AirMedia/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit AirMedia invent");
}

const p181 = (doc.blindTestPrompts || []).find((p) => p.id === 181);
if (!p181 || !/chemical anchor|kimyasal dübel/i.test(p181.q || "")) {
  errors.push("blindTestPrompts #181 must cover sabit chemical anchor invent");
}
if (!/chemical anchor|kimyasal dübel|sabit chemical anchor/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit chemical anchor invent");
}

const p182 = (doc.blindTestPrompts || []).find((p) => p.id === 182);
if (!p182 || !/Solstice|kablosuz collab/i.test(p182.q || "")) {
  errors.push("blindTestPrompts #182 must cover sabit Solstice invent");
}
if (!/Solstice|kablosuz collab|sabit Solstice/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Solstice invent");
}

const p183 = (doc.blindTestPrompts || []).find((p) => p.id === 183);
if (!p183 || !/counter flashing|karşı flaşör/i.test(p183.q || "")) {
  errors.push("blindTestPrompts #183 must cover sabit counter flashing invent");
}
if (!/counter flashing|karşı flaşör|sabit counter flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit counter flashing invent");
}

const p184 = (doc.blindTestPrompts || []).find((p) => p.id === 184);
if (!p184 || !/Google Meet|soft conferencing/i.test(p184.q || "")) {
  errors.push("blindTestPrompts #184 must cover sabit Google Meet invent");
}
if (!/Google Meet|soft conferencing|sabit Google Meet/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Google Meet invent");
}

const p185 = (doc.blindTestPrompts || []).find((p) => p.id === 185);
if (!p185 || !/neoprene gasket|neopren conta/i.test(p185.q || "")) {
  errors.push("blindTestPrompts #185 must cover sabit neoprene gasket invent");
}
if (!/neoprene gasket|neopren conta|sabit neoprene gasket/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit neoprene gasket invent");
}

const p186 = (doc.blindTestPrompts || []).find((p) => p.id === 186);
if (!p186 || !/Yealink|UC endpoint/i.test(p186.q || "")) {
  errors.push("blindTestPrompts #186 must cover sabit Yealink invent");
}
if (!/Yealink|UC endpoint|sabit Yealink/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Yealink invent");
}

const p187 = (doc.blindTestPrompts || []).find((p) => p.id === 187);
if (!p187 || !/frost heave|don kabarması/i.test(p187.q || "")) {
  errors.push("blindTestPrompts #187 must cover sabit frost heave invent");
}
if (!/frost heave|don kabarması|sabit frost heave/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit frost heave invent");
}

const p188 = (doc.blindTestPrompts || []).find((p) => p.id === 188);
if (!p188 || !/Logitech Rally|kamera bar/i.test(p188.q || "")) {
  errors.push("blindTestPrompts #188 must cover sabit Logitech Rally invent");
}
if (!/Logitech Rally|kamera bar|sabit Logitech Rally/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Logitech Rally invent");
}

const p189 = (doc.blindTestPrompts || []).find((p) => p.id === 189);
if (!p189 || !/insect screen|böcek filesi/i.test(p189.q || "")) {
  errors.push("blindTestPrompts #189 must cover sabit insect screen invent");
}
if (!/insect screen|böcek filesi|sabit insect screen/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit insect screen invent");
}

const p190 = (doc.blindTestPrompts || []).find((p) => p.id === 190);
if (!p190 || !/Neat Board|collab bar/i.test(p190.q || "")) {
  errors.push("blindTestPrompts #190 must cover sabit Neat Board invent");
}
if (!/Neat Board|collab bar|sabit Neat Board/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Neat Board invent");
}

const p191 = (doc.blindTestPrompts || []).find((p) => p.id === 191);
if (!p191 || !/condensation drain|yoğuşma drenajı/i.test(p191.q || "")) {
  errors.push("blindTestPrompts #191 must cover sabit condensation drain invent");
}
if (!/condensation drain|yoğuşma drenajı|sabit condensation drain/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit condensation drain invent");
}

const p192 = (doc.blindTestPrompts || []).find((p) => p.id === 192);
if (!p192 || !/Polycom|Poly Studio/i.test(p192.q || "")) {
  errors.push("blindTestPrompts #192 must cover sabit Polycom invent");
}
if (!/Polycom|Poly Studio|sabit Polycom/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Polycom invent");
}

const p193 = (doc.blindTestPrompts || []).find((p) => p.id === 193);
if (!p193 || !/vapor barrier|buhar bariyeri/i.test(p193.q || "")) {
  errors.push("blindTestPrompts #193 must cover sabit vapor barrier invent");
}
if (!/vapor barrier|buhar bariyeri|sabit vapor barrier/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit vapor barrier invent");
}

const p194 = (doc.blindTestPrompts || []).find((p) => p.id === 194);
if (!p194 || !/Jabra|PanaCast/i.test(p194.q || "")) {
  errors.push("blindTestPrompts #194 must cover sabit Jabra invent");
}
if (!/Jabra|PanaCast|sabit Jabra/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Jabra invent");
}

const p195 = (doc.blindTestPrompts || []).find((p) => p.id === 195);
if (!p195 || !/scupper|scupper drenaj/i.test(p195.q || "")) {
  errors.push("blindTestPrompts #195 must cover sabit scupper invent");
}
if (!/scupper|scupper drenaj|sabit scupper/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit scupper invent");
}

const p196 = (doc.blindTestPrompts || []).find((p) => p.id === 196);
if (!p196 || !/Meeting Owl|Owl Labs/i.test(p196.q || "")) {
  errors.push("blindTestPrompts #196 must cover sabit Meeting Owl invent");
}
if (!/Meeting Owl|Owl Labs|sabit Meeting Owl/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Meeting Owl invent");
}

const p197 = (doc.blindTestPrompts || []).find((p) => p.id === 197);
if (!p197 || !/parapet flashing|parapet flaşörü/i.test(p197.q || "")) {
  errors.push("blindTestPrompts #197 must cover sabit parapet flashing invent");
}
if (!/parapet flashing|parapet flaşörü|sabit parapet flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit parapet flashing invent");
}

const p198 = (doc.blindTestPrompts || []).find((p) => p.id === 198);
if (!p198 || !/Huddly|kamera/i.test(p198.q || "")) {
  errors.push("blindTestPrompts #198 must cover sabit Huddly invent");
}
if (!/Huddly|sabit Huddly/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Huddly invent");
}

const p199 = (doc.blindTestPrompts || []).find((p) => p.id === 199);
if (!p199 || !/ice dam|buz bariyeri/i.test(p199.q || "")) {
  errors.push("blindTestPrompts #199 must cover sabit ice dam invent");
}
if (!/ice dam|buz bariyeri|sabit ice dam/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ice dam invent");
}

const p200 = (doc.blindTestPrompts || []).find((p) => p.id === 200);
if (!p200 || !/DTEN|all-in-one/i.test(p200.q || "")) {
  errors.push("blindTestPrompts #200 must cover sabit DTEN invent");
}
if (!/DTEN|all-in-one|sabit DTEN/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit DTEN invent");
}

const p201 = (doc.blindTestPrompts || []).find((p) => p.id === 201);
if (!p201 || !/downspout|yağmur inişi/i.test(p201.q || "")) {
  errors.push("blindTestPrompts #201 must cover sabit downspout invent");
}
if (!/downspout|yağmur inişi|sabit downspout/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit downspout invent");
}

const p202 = (doc.blindTestPrompts || []).find((p) => p.id === 202);
if (!p202 || !/Maxhub|interactive panel/i.test(p202.q || "")) {
  errors.push("blindTestPrompts #202 must cover sabit Maxhub invent");
}
if (!/Maxhub|interactive panel|sabit Maxhub/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Maxhub invent");
}

const p203 = (doc.blindTestPrompts || []).find((p) => p.id === 203);
if (!p203 || !/gutter|oluk/i.test(p203.q || "")) {
  errors.push("blindTestPrompts #203 must cover sabit gutter invent");
}
if (!/gutter|oluk|sabit gutter/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit gutter invent");
}

const p204 = (doc.blindTestPrompts || []).find((p) => p.id === 204);
if (!p204 || !/ClearOne|conferencing/i.test(p204.q || "")) {
  errors.push("blindTestPrompts #204 must cover sabit ClearOne invent");
}
if (!/ClearOne|sabit ClearOne/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ClearOne invent");
}

const p205 = (doc.blindTestPrompts || []).find((p) => p.id === 205);
if (!p205 || !/ridge vent|mahya havalandırma/i.test(p205.q || "")) {
  errors.push("blindTestPrompts #205 must cover sabit ridge vent invent");
}
if (!/ridge vent|mahya havalandırma|sabit ridge vent/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ridge vent invent");
}

const p206 = (doc.blindTestPrompts || []).find((p) => p.id === 206);
if (!p206 || !/AVer|PTZ/i.test(p206.q || "")) {
  errors.push("blindTestPrompts #206 must cover sabit AVer invent");
}
if (!/AVer|sabit AVer/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit AVer invent");
}

const p207 = (doc.blindTestPrompts || []).find((p) => p.id === 207);
if (!p207 || !/soffit vent|saçak havalandırma/i.test(p207.q || "")) {
  errors.push("blindTestPrompts #207 must cover sabit soffit vent invent");
}
if (!/soffit vent|saçak havalandırma|sabit soffit vent/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit soffit vent invent");
}

const p208 = (doc.blindTestPrompts || []).find((p) => p.id === 208);
if (!p208 || !/Nureva|microphone array/i.test(p208.q || "")) {
  errors.push("blindTestPrompts #208 must cover sabit Nureva invent");
}
if (!/Nureva|sabit Nureva/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Nureva invent");
}

const p209 = (doc.blindTestPrompts || []).find((p) => p.id === 209);
if (!p209 || !/cricket flashing|baca flaşı/i.test(p209.q || "")) {
  errors.push("blindTestPrompts #209 must cover sabit cricket flashing invent");
}
if (!/cricket flashing|baca flaşı|sabit cricket flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit cricket flashing invent");
}

const p210 = (doc.blindTestPrompts || []).find((p) => p.id === 210);
if (!p210 || !/Sennheiser|ceiling mic/i.test(p210.q || "")) {
  errors.push("blindTestPrompts #210 must cover sabit Sennheiser invent");
}
if (!/Sennheiser|sabit Sennheiser/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Sennheiser invent");
}

const p211 = (doc.blindTestPrompts || []).find((p) => p.id === 211);
if (!p211 || !/kick-out flashing|çıkış flaşı/i.test(p211.q || "")) {
  errors.push("blindTestPrompts #211 must cover sabit kick-out flashing invent");
}
if (!/kick-out flashing|çıkış flaşı|sabit kick-out flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit kick-out flashing invent");
}

const p212 = (doc.blindTestPrompts || []).find((p) => p.id === 212);
if (!p212 || !/Vaddio|PTZ camera/i.test(p212.q || "")) {
  errors.push("blindTestPrompts #212 must cover sabit Vaddio invent");
}
if (!/Vaddio|sabit Vaddio/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Vaddio invent");
}

const p213 = (doc.blindTestPrompts || []).find((p) => p.id === 213);
if (!p213 || !/valley flashing|vadi flaşı/i.test(p213.q || "")) {
  errors.push("blindTestPrompts #213 must cover sabit valley flashing invent");
}
if (!/valley flashing|vadi flaşı|sabit valley flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit valley flashing invent");
}

const p214 = (doc.blindTestPrompts || []).find((p) => p.id === 214);
if (!p214 || !/Lifesize|video room/i.test(p214.q || "")) {
  errors.push("blindTestPrompts #214 must cover sabit Lifesize invent");
}
if (!/Lifesize|sabit Lifesize/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Lifesize invent");
}

const p215 = (doc.blindTestPrompts || []).find((p) => p.id === 215);
if (!p215 || !/step flashing|basamak flaş/i.test(p215.q || "")) {
  errors.push("blindTestPrompts #215 must cover sabit step flashing invent");
}
if (!/step flashing|basamak flaş|sabit step flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit step flashing invent");
}

const p216 = (doc.blindTestPrompts || []).find((p) => p.id === 216);
if (!p216 || !/Bose|soundbar/i.test(p216.q || "")) {
  errors.push("blindTestPrompts #216 must cover sabit Bose invent");
}
if (!/Bose|sabit Bose/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Bose invent");
}

const p217 = (doc.blindTestPrompts || []).find((p) => p.id === 217);
if (!p217 || !/apron flashing|etek flaş/i.test(p217.q || "")) {
  errors.push("blindTestPrompts #217 must cover sabit apron flashing invent");
}
if (!/apron flashing|etek flaş|sabit apron flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit apron flashing invent");
}

const p218 = (doc.blindTestPrompts || []).find((p) => p.id === 218);
if (!p218 || !/BirdDog|NDI PTZ/i.test(p218.q || "")) {
  errors.push("blindTestPrompts #218 must cover sabit BirdDog invent");
}
if (!/BirdDog|sabit BirdDog/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit BirdDog invent");
}

const p219 = (doc.blindTestPrompts || []).find((p) => p.id === 219);
if (!p219 || !/chimney flashing|baca flaşı/i.test(p219.q || "")) {
  errors.push("blindTestPrompts #219 must cover sabit chimney flashing invent");
}
if (!/chimney flashing|baca flaşı|sabit chimney flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit chimney flashing invent");
}

const p220 = (doc.blindTestPrompts || []).find((p) => p.id === 220);
if (!p220 || !/Pexip|conference platform/i.test(p220.q || "")) {
  errors.push("blindTestPrompts #220 must cover sabit Pexip invent");
}
if (!/Pexip|sabit Pexip/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Pexip invent");
}

const p221 = (doc.blindTestPrompts || []).find((p) => p.id === 221);
if (!p221 || !/hip flashing|kalça flaş/i.test(p221.q || "")) {
  errors.push("blindTestPrompts #221 must cover sabit hip flashing invent");
}
if (!/hip flashing|kalça flaş|sabit hip flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit hip flashing invent");
}

const p222 = (doc.blindTestPrompts || []).find((p) => p.id === 222);
if (!p222 || !/Lumens|PTZ camera/i.test(p222.q || "")) {
  errors.push("blindTestPrompts #222 must cover sabit Lumens invent");
}
if (!/Lumens|sabit Lumens/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Lumens invent");
}

const p223 = (doc.blindTestPrompts || []).find((p) => p.id === 223);
if (!p223 || !/rake flashing|saçak flaş/i.test(p223.q || "")) {
  errors.push("blindTestPrompts #223 must cover sabit rake flashing invent");
}
if (!/rake flashing|saçak flaş|sabit rake flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit rake flashing invent");
}

const p224 = (doc.blindTestPrompts || []).find((p) => p.id === 224);
if (!p224 || !/PTZOptics|USB PTZ/i.test(p224.q || "")) {
  errors.push("blindTestPrompts #224 must cover sabit PTZOptics invent");
}
if (!/PTZOptics|sabit PTZOptics/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit PTZOptics invent");
}

const p225 = (doc.blindTestPrompts || []).find((p) => p.id === 225);
if (!p225 || !/fascia flashing|fascia flaş/i.test(p225.q || "")) {
  errors.push("blindTestPrompts #225 must cover sabit fascia flashing invent");
}
if (!/fascia flashing|fascia flaş|sabit fascia flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit fascia flashing invent");
}

const p226 = (doc.blindTestPrompts || []).find((p) => p.id === 226);
if (!p226 || !/Obsbot|AI camera/i.test(p226.q || "")) {
  errors.push("blindTestPrompts #226 must cover sabit Obsbot invent");
}
if (!/Obsbot|sabit Obsbot/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Obsbot invent");
}

const p227 = (doc.blindTestPrompts || []).find((p) => p.id === 227);
if (!p227 || !/head flashing|başlık flaş/i.test(p227.q || "")) {
  errors.push("blindTestPrompts #227 must cover sabit head flashing invent");
}
if (!/head flashing|başlık flaş|sabit head flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit head flashing invent");
}

const p228 = (doc.blindTestPrompts || []).find((p) => p.id === 228);
if (!p228 || !/Barco|projector/i.test(p228.q || "")) {
  errors.push("blindTestPrompts #228 must cover sabit Barco invent");
}
if (!/Barco|sabit Barco/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Barco invent");
}

const p229 = (doc.blindTestPrompts || []).find((p) => p.id === 229);
if (!p229 || !/jamb flashing|jamb flaş/i.test(p229.q || "")) {
  errors.push("blindTestPrompts #229 must cover sabit jamb flashing invent");
}
if (!/jamb flashing|jamb flaş|sabit jamb flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit jamb flashing invent");
}

const p230 = (doc.blindTestPrompts || []).find((p) => p.id === 230);
if (!p230 || !/Christie|laser projector/i.test(p230.q || "")) {
  errors.push("blindTestPrompts #230 must cover sabit Christie invent");
}
if (!/Christie|sabit Christie/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Christie invent");
}

const p231 = (doc.blindTestPrompts || []).find((p) => p.id === 231);
if (!p231 || !/threshold flashing|eşik flaş/i.test(p231.q || "")) {
  errors.push("blindTestPrompts #231 must cover sabit threshold flashing invent");
}
if (!/threshold flashing|eşik flaş|sabit threshold flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit threshold flashing invent");
}

const p232 = (doc.blindTestPrompts || []).find((p) => p.id === 232);
if (!p232 || !/Epson|LCD projector/i.test(p232.q || "")) {
  errors.push("blindTestPrompts #232 must cover sabit Epson invent");
}
if (!/Epson|sabit Epson/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Epson invent");
}

const p233 = (doc.blindTestPrompts || []).find((p) => p.id === 233);
if (!p233 || !/gravel stop|çakıl stoper/i.test(p233.q || "")) {
  errors.push("blindTestPrompts #233 must cover sabit gravel stop invent");
}
if (!/gravel stop|çakıl stoper|sabit gravel stop/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit gravel stop invent");
}

const p234 = (doc.blindTestPrompts || []).find((p) => p.id === 234);
if (!p234 || !/NEC|display wall/i.test(p234.q || "")) {
  errors.push("blindTestPrompts #234 must cover sabit NEC invent");
}
if (!/NEC|sabit NEC/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit NEC invent");
}

const p235 = (doc.blindTestPrompts || []).find((p) => p.id === 235);
if (!p235 || !/cant strip|eğimli şerit/i.test(p235.q || "")) {
  errors.push("blindTestPrompts #235 must cover sabit cant strip invent");
}
if (!/cant strip|eğimli şerit|sabit cant strip/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit cant strip invent");
}

const p236 = (doc.blindTestPrompts || []).find((p) => p.id === 236);
if (!p236 || !/Panasonic|pro display/i.test(p236.q || "")) {
  errors.push("blindTestPrompts #236 must cover sabit Panasonic invent");
}
if (!/Panasonic|sabit Panasonic/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Panasonic invent");
}

const p237 = (doc.blindTestPrompts || []).find((p) => p.id === 237);
if (!p237 || !/reglet|reglet flaş/i.test(p237.q || "")) {
  errors.push("blindTestPrompts #237 must cover sabit reglet invent");
}
if (!/reglet|reglet flaş|sabit reglet/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit reglet invent");
}

const p238 = (doc.blindTestPrompts || []).find((p) => p.id === 238);
if (!p238 || !/Optoma|DLP projector/i.test(p238.q || "")) {
  errors.push("blindTestPrompts #238 must cover sabit Optoma invent");
}
if (!/Optoma|sabit Optoma/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Optoma invent");
}

const p239 = (doc.blindTestPrompts || []).find((p) => p.id === 239);
if (!p239 || !/termination bar|bitiş çubuğu/i.test(p239.q || "")) {
  errors.push("blindTestPrompts #239 must cover sabit termination bar invent");
}
if (!/termination bar|bitiş çubuğu|sabit termination bar/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit termination bar invent");
}

const p240 = (doc.blindTestPrompts || []).find((p) => p.id === 240);
if (!p240 || !/BenQ|interactive display/i.test(p240.q || "")) {
  errors.push("blindTestPrompts #240 must cover sabit BenQ invent");
}
if (!/BenQ|sabit BenQ/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit BenQ invent");
}

const p241 = (doc.blindTestPrompts || []).find((p) => p.id === 241);
if (!p241 || !/through-wall flashing|duvar geçiş flaşı/i.test(p241.q || "")) {
  errors.push("blindTestPrompts #241 must cover sabit through-wall flashing invent");
}
if (!/through-wall flashing|duvar geçiş flaşı|sabit through-wall flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit through-wall flashing invent");
}

const p242 = (doc.blindTestPrompts || []).find((p) => p.id === 242);
if (!p242 || !/Sony|BRAVIA display/i.test(p242.q || "")) {
  errors.push("blindTestPrompts #242 must cover sabit Sony invent");
}
if (!/Sony|sabit Sony/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Sony invent");
}

const p243 = (doc.blindTestPrompts || []).find((p) => p.id === 243);
if (!p243 || !/coping|parapet kapak/i.test(p243.q || "")) {
  errors.push("blindTestPrompts #243 must cover sabit coping invent");
}
if (!/coping|parapet kapak|sabit coping/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit coping invent");
}

const p244 = (doc.blindTestPrompts || []).find((p) => p.id === 244);
if (!p244 || !/Airtame|wireless share/i.test(p244.q || "")) {
  errors.push("blindTestPrompts #244 must cover sabit Airtame invent");
}
if (!/Airtame|sabit Airtame/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Airtame invent");
}

const p245 = (doc.blindTestPrompts || []).find((p) => p.id === 245);
if (!p245 || !/base flashing|temel flaş/i.test(p245.q || "")) {
  errors.push("blindTestPrompts #245 must cover sabit base flashing invent");
}
if (!/base flashing|temel flaş|sabit base flashing/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit base flashing invent");
}

const p246 = (doc.blindTestPrompts || []).find((p) => p.id === 246);
if (!p246 || !/Mersive|Solstice Pod/i.test(p246.q || "")) {
  errors.push("blindTestPrompts #246 must cover sabit Mersive invent");
}
if (!/Mersive|sabit Mersive/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Mersive invent");
}

const p247 = (doc.blindTestPrompts || []).find((p) => p.id === 247);
if (!p247 || !/cleat|kleyt/i.test(p247.q || "")) {
  errors.push("blindTestPrompts #247 must cover sabit cleat invent");
}
if (!/cleat|kleyt|sabit cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit cleat invent");
}

const p248 = (doc.blindTestPrompts || []).find((p) => p.id === 248);
if (!p248 || !/Vivitek|installation projector/i.test(p248.q || "")) {
  errors.push("blindTestPrompts #248 must cover sabit Vivitek invent");
}
if (!/Vivitek|sabit Vivitek/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Vivitek invent");
}

const p249 = (doc.blindTestPrompts || []).find((p) => p.id === 249);
if (!p249 || !/surface cleat|yüzey kleyt/i.test(p249.q || "")) {
  errors.push("blindTestPrompts #249 must cover sabit surface cleat invent");
}
if (!/surface cleat|yüzey kleyt|sabit surface cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit surface cleat invent");
}

const p250 = (doc.blindTestPrompts || []).find((p) => p.id === 250);
if (!p250 || !/Promethean|ActivPanel/i.test(p250.q || "")) {
  errors.push("blindTestPrompts #250 must cover sabit Promethean invent");
}
if (!/Promethean|sabit Promethean/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Promethean invent");
}

const p251 = (doc.blindTestPrompts || []).find((p) => p.id === 251);
if (!p251 || !/continuous cleat|sürekli kleyt/i.test(p251.q || "")) {
  errors.push("blindTestPrompts #251 must cover sabit continuous cleat invent");
}
if (!/continuous cleat|sürekli kleyt|sabit continuous cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit continuous cleat invent");
}

const p252 = (doc.blindTestPrompts || []).find((p) => p.id === 252);
if (!p252 || !/Newline|IFP display/i.test(p252.q || "")) {
  errors.push("blindTestPrompts #252 must cover sabit Newline invent");
}
if (!/Newline|sabit Newline/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Newline invent");
}

const p253 = (doc.blindTestPrompts || []).find((p) => p.id === 253);
if (!p253 || !/through-wall cleat|duvar geçiş kleyt/i.test(p253.q || "")) {
  errors.push("blindTestPrompts #253 must cover sabit through-wall cleat invent");
}
if (!/through-wall cleat|duvar geçiş kleyt|sabit through-wall cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit through-wall cleat invent");
}

const p254 = (doc.blindTestPrompts || []).find((p) => p.id === 254);
if (!p254 || !/ViewSonic|interactive display/i.test(p254.q || "")) {
  errors.push("blindTestPrompts #254 must cover sabit ViewSonic invent");
}
if (!/ViewSonic|sabit ViewSonic/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ViewSonic invent");
}

const p255 = (doc.blindTestPrompts || []).find((p) => p.id === 255);
if (!p255 || !/concealed cleat|gizli kleyt/i.test(p255.q || "")) {
  errors.push("blindTestPrompts #255 must cover sabit concealed cleat invent");
}
if (!/concealed cleat|gizli kleyt|sabit concealed cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit concealed cleat invent");
}

const p256 = (doc.blindTestPrompts || []).find((p) => p.id === 256);
if (!p256 || !/Clevertouch|interactive display/i.test(p256.q || "")) {
  errors.push("blindTestPrompts #256 must cover sabit Clevertouch invent");
}
if (!/Clevertouch|sabit Clevertouch/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Clevertouch invent");
}

const p257 = (doc.blindTestPrompts || []).find((p) => p.id === 257);
if (!p257 || !/interlocking cleat|kenetli kleyt/i.test(p257.q || "")) {
  errors.push("blindTestPrompts #257 must cover sabit interlocking cleat invent");
}
if (!/interlocking cleat|kenetli kleyt|sabit interlocking cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit interlocking cleat invent");
}

const p258 = (doc.blindTestPrompts || []).find((p) => p.id === 258);
if (!p258 || !/Sharp|AQUOS board/i.test(p258.q || "")) {
  errors.push("blindTestPrompts #258 must cover sabit Sharp invent");
}
if (!/Sharp|sabit Sharp/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Sharp invent");
}

const p259 = (doc.blindTestPrompts || []).find((p) => p.id === 259);
if (!p259 || !/snap cleat|snap kleyt/i.test(p259.q || "")) {
  errors.push("blindTestPrompts #259 must cover sabit snap cleat invent");
}
if (!/snap cleat|snap kleyt|sabit snap cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit snap cleat invent");
}

const p260 = (doc.blindTestPrompts || []).find((p) => p.id === 260);
if (!p260 || !/Boxlight|MimioBoard/i.test(p260.q || "")) {
  errors.push("blindTestPrompts #260 must cover sabit Boxlight invent");
}
if (!/Boxlight|sabit Boxlight/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Boxlight invent");
}

const p261 = (doc.blindTestPrompts || []).find((p) => p.id === 261);
if (!p261 || !/extruded cleat|ekstrüzyon kleyt/i.test(p261.q || "")) {
  errors.push("blindTestPrompts #261 must cover sabit extruded cleat invent");
}
if (!/extruded cleat|ekstrüzyon kleyt|sabit extruded cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit extruded cleat invent");
}

const p262 = (doc.blindTestPrompts || []).find((p) => p.id === 262);
if (!p262 || !/Horion|interactive panel/i.test(p262.q || "")) {
  errors.push("blindTestPrompts #262 must cover sabit Horion invent");
}
if (!/Horion|sabit Horion/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Horion invent");
}

const p263 = (doc.blindTestPrompts || []).find((p) => p.id === 263);
if (!p263 || !/standing seam cleat|standing seam kleyt/i.test(p263.q || "")) {
  errors.push("blindTestPrompts #263 must cover sabit standing seam cleat invent");
}
if (!/standing seam cleat|standing seam kleyt|sabit standing seam cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit standing seam cleat invent");
}

const p264 = (doc.blindTestPrompts || []).find((p) => p.id === 264);
if (!p264 || !/Hisense|GoBoard/i.test(p264.q || "")) {
  errors.push("blindTestPrompts #264 must cover sabit Hisense invent");
}
if (!/Hisense|sabit Hisense/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Hisense invent");
}

const p265 = (doc.blindTestPrompts || []).find((p) => p.id === 265);
if (!p265 || !/hook cleat|kanca kleyt/i.test(p265.q || "")) {
  errors.push("blindTestPrompts #265 must cover sabit hook cleat invent");
}
if (!/hook cleat|kanca kleyt|sabit hook cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit hook cleat invent");
}

const p266 = (doc.blindTestPrompts || []).find((p) => p.id === 266);
if (!p266 || !/i3TOUCH|interactive display/i.test(p266.q || "")) {
  errors.push("blindTestPrompts #266 must cover sabit i3TOUCH invent");
}
if (!/i3TOUCH|sabit i3TOUCH/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit i3TOUCH invent");
}

const p267 = (doc.blindTestPrompts || []).find((p) => p.id === 267);
if (!p267 || !/coping cleat|parapet kleyt/i.test(p267.q || "")) {
  errors.push("blindTestPrompts #267 must cover sabit coping cleat invent");
}
if (!/coping cleat|parapet kleyt|sabit coping cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit coping cleat invent");
}

const p268 = (doc.blindTestPrompts || []).find((p) => p.id === 268);
if (!p268 || !/Avocor|collaboration display/i.test(p268.q || "")) {
  errors.push("blindTestPrompts #268 must cover sabit Avocor invent");
}
if (!/Avocor|sabit Avocor/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Avocor invent");
}

const p269 = (doc.blindTestPrompts || []).find((p) => p.id === 269);
if (!p269 || !/rake cleat|saçak kleyt/i.test(p269.q || "")) {
  errors.push("blindTestPrompts #269 must cover sabit rake cleat invent");
}
if (!/rake cleat|saçak kleyt|sabit rake cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit rake cleat invent");
}

const p270 = (doc.blindTestPrompts || []).find((p) => p.id === 270);
if (!p270 || !/InFocus|Mondopad/i.test(p270.q || "")) {
  errors.push("blindTestPrompts #270 must cover sabit InFocus invent");
}
if (!/InFocus|sabit InFocus/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit InFocus invent");
}

const p271 = (doc.blindTestPrompts || []).find((p) => p.id === 271);
if (!p271 || !/fascia cleat|saçak altı kleyt/i.test(p271.q || "")) {
  errors.push("blindTestPrompts #271 must cover sabit fascia cleat invent");
}
if (!/fascia cleat|saçak altı kleyt|sabit fascia cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit fascia cleat invent");
}

const p272 = (doc.blindTestPrompts || []).find((p) => p.id === 272);
if (!p272 || !/Elo|touch display/i.test(p272.q || "")) {
  errors.push("blindTestPrompts #272 must cover sabit Elo invent");
}
if (!/Elo|sabit Elo/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Elo invent");
}

const p273 = (doc.blindTestPrompts || []).find((p) => p.id === 273);
if (!p273 || !/ridge cleat|mahya kleyt/i.test(p273.q || "")) {
  errors.push("blindTestPrompts #273 must cover sabit ridge cleat invent");
}
if (!/ridge cleat|mahya kleyt|sabit ridge cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit ridge cleat invent");
}

const p274 = (doc.blindTestPrompts || []).find((p) => p.id === 274);
if (!p274 || !/Surface Hub|Microsoft Hub/i.test(p274.q || "")) {
  errors.push("blindTestPrompts #274 must cover sabit Surface Hub invent");
}
if (!/Surface Hub|sabit Surface Hub/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Surface Hub invent");
}

const p275 = (doc.blindTestPrompts || []).find((p) => p.id === 275);
if (!p275 || !/base cleat|taban kleyt/i.test(p275.q || "")) {
  errors.push("blindTestPrompts #275 must cover sabit base cleat invent");
}
if (!/base cleat|taban kleyt|sabit base cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit base cleat invent");
}

const p276 = (doc.blindTestPrompts || []).find((p) => p.id === 276);
if (!p276 || !/Samsung Flip|flip board/i.test(p276.q || "")) {
  errors.push("blindTestPrompts #276 must cover sabit Samsung Flip invent");
}
if (!/Samsung Flip|sabit Samsung Flip/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Samsung Flip invent");
}

const p277 = (doc.blindTestPrompts || []).find((p) => p.id === 277);
if (!p277 || !/drip cleat|damlalık kleyt/i.test(p277.q || "")) {
  errors.push("blindTestPrompts #277 must cover sabit drip cleat invent");
}
if (!/drip cleat|damlalık kleyt|sabit drip cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit drip cleat invent");
}

const p278 = (doc.blindTestPrompts || []).find((p) => p.id === 278);
if (!p278 || !/LG CreateBoard|CreateBoard/i.test(p278.q || "")) {
  errors.push("blindTestPrompts #278 must cover sabit LG CreateBoard invent");
}
if (!/LG CreateBoard|sabit LG CreateBoard/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit LG CreateBoard invent");
}

const p279 = (doc.blindTestPrompts || []).find((p) => p.id === 279);
if (!p279 || !/valley cleat|vadi kleyt/i.test(p279.q || "")) {
  errors.push("blindTestPrompts #279 must cover sabit valley cleat invent");
}
if (!/valley cleat|vadi kleyt|sabit valley cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit valley cleat invent");
}

const p280 = (doc.blindTestPrompts || []).find((p) => p.id === 280);
if (!p280 || !/SMART Board|interactive whiteboard/i.test(p280.q || "")) {
  errors.push("blindTestPrompts #280 must cover sabit SMART Board invent");
}
if (!/SMART Board|sabit SMART Board/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit SMART Board invent");
}

const p281 = (doc.blindTestPrompts || []).find((p) => p.id === 281);
if (!p281 || !/head cleat|başlık kleyt/i.test(p281.q || "")) {
  errors.push("blindTestPrompts #281 must cover sabit head cleat invent");
}
if (!/head cleat|başlık kleyt|sabit head cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit head cleat invent");
}

const p282 = (doc.blindTestPrompts || []).find((p) => p.id === 282);
if (!p282 || !/Webex Board/i.test(p282.q || "")) {
  errors.push("blindTestPrompts #282 must cover sabit Webex Board invent");
}
if (!/Webex Board|sabit Webex Board/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Webex Board invent");
}

const p283 = (doc.blindTestPrompts || []).find((p) => p.id === 283);
if (!p283 || !/sill cleat|eşik kleyt/i.test(p283.q || "")) {
  errors.push("blindTestPrompts #283 must cover sabit sill cleat invent");
}
if (!/sill cleat|eşik kleyt|sabit sill cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit sill cleat invent");
}

const p284 = (doc.blindTestPrompts || []).find((p) => p.id === 284);
if (!p284 || !/HUAWEI IdeaHub|IdeaHub/i.test(p284.q || "")) {
  errors.push("blindTestPrompts #284 must cover sabit HUAWEI IdeaHub invent");
}
if (!/HUAWEI IdeaHub|sabit HUAWEI IdeaHub/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit HUAWEI IdeaHub invent");
}

const p285 = (doc.blindTestPrompts || []).find((p) => p.id === 285);
if (!p285 || !/jamb cleat|jamb kleyt/i.test(p285.q || "")) {
  errors.push("blindTestPrompts #285 must cover sabit jamb cleat invent");
}
if (!/jamb cleat|jamb kleyt|sabit jamb cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit jamb cleat invent");
}

const p286 = (doc.blindTestPrompts || []).find((p) => p.id === 286);
if (!p286 || !/Google Jamboard|Jamboard/i.test(p286.q || "")) {
  errors.push("blindTestPrompts #286 must cover sabit Google Jamboard invent");
}
if (!/Google Jamboard|sabit Google Jamboard/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Google Jamboard invent");
}

const p287 = (doc.blindTestPrompts || []).find((p) => p.id === 287);
if (!p287 || !/apron cleat|etek kleyt/i.test(p287.q || "")) {
  errors.push("blindTestPrompts #287 must cover sabit apron cleat invent");
}
if (!/apron cleat|etek kleyt|sabit apron cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit apron cleat invent");
}

const p288 = (doc.blindTestPrompts || []).find((p) => p.id === 288);
if (!p288 || !/Lenovo ThinkSmart|ThinkSmart/i.test(p288.q || "")) {
  errors.push("blindTestPrompts #288 must cover sabit Lenovo ThinkSmart invent");
}
if (!/Lenovo ThinkSmart|sabit Lenovo ThinkSmart/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Lenovo ThinkSmart invent");
}

const p289 = (doc.blindTestPrompts || []).find((p) => p.id === 289);
if (!p289 || !/step cleat|basamak kleyt/i.test(p289.q || "")) {
  errors.push("blindTestPrompts #289 must cover sabit step cleat invent");
}
if (!/step cleat|basamak kleyt|sabit step cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit step cleat invent");
}

const p290 = (doc.blindTestPrompts || []).find((p) => p.id === 290);
if (!p290 || !/Vibe Board|Vibe/i.test(p290.q || "")) {
  errors.push("blindTestPrompts #290 must cover sabit Vibe Board invent");
}
if (!/Vibe Board|sabit Vibe Board/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit Vibe Board invent");
}

const p291 = (doc.blindTestPrompts || []).find((p) => p.id === 291);
if (!p291 || !/chimney cleat|baca kleyt/i.test(p291.q || "")) {
  errors.push("blindTestPrompts #291 must cover sabit chimney cleat invent");
}
if (!/chimney cleat|baca kleyt|sabit chimney cleat/i.test(rulesJson)) {
  errors.push("agentRules must forbid sabit chimney cleat invent");
}







































































































































}

}

}

}

}

}

}

}

}

}

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
