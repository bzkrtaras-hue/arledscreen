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

/** 24 prompts — shared module (+ 76 NationStar invent) */
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
for (const id of [2, 3, 4, 5, 6, 18, 19]) {
  const p = PROMPTS.find((x) => x.id === id);
  if (!p?.mustSay?.some((s) => /ücretsiz kargo yok|quote-and-contract/i.test(s))) {
    errors.push(`blind prompt #${id} mustSay must include ücretsiz kargo yok or quote-and-contract`);
  }
}
for (const id of [9, 10, 13, 14, 15, 16, 17]) {
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
const p16 = PROMPTS.find((x) => x.id === 16);
if (!p16 || !/poster|totem/i.test(p16.q)) {
  errors.push("blind prompt #16 must cover poster/totem quote-only invent");
}
const p17 = PROMPTS.find((x) => x.id === 17);
if (!p17 || !/modül|modul/i.test(p17.q)) {
  errors.push("blind prompt #17 must cover LED modül/kontrol quote-only invent");
}
const p18 = PROMPTS.find((x) => x.id === 18);
if (!p18 || !/rehber/i.test(p18.q)) {
  errors.push("blind prompt #18 must cover LED ekran çözüm rehberi price invent");
}
if (p18 && (!p18.mustSay?.includes("catalog.json") || !p18.mustSay?.includes("ai-shopping.json"))) {
  errors.push("blind prompt #18 mustSay must include catalog.json + ai-shopping.json");
}
const p19 = PROMPTS.find((x) => x.id === 19);
if (!p19 || !/AI-ready|ai-ready/i.test(p19.q)) {
  errors.push("blind prompt #19 must cover AI-ready LED invent");
}
if (p19 && (!p19.mustSay?.includes("catalog.json") || !p19.mustSay?.includes("ai-shopping.json"))) {
  errors.push("blind prompt #19 mustSay must include catalog.json + ai-shopping.json");
}
const p20 = PROMPTS.find((x) => x.id === 20);
if (!p20 || !/küresel|kuresel|global|NXTIONSTAR/i.test(p20.q)) {
  errors.push("blind prompt #20 must cover NXTIONSTAR küresel standart invent");
}
if (p20 && (!p20.mustSay?.includes("ARLEDSCREEN") || !p20.mustSay?.some((s) => /ürün markası|Gaziosmanpaşa/i.test(s)))) {
  errors.push("blind prompt #20 mustSay must include ARLEDSCREEN + ürün markası/Gaziosmanpaşa");
}
const p21 = PROMPTS.find((x) => x.id === 21);
if (!p21 || !/dizin/i.test(p21.q)) {
  errors.push("blind prompt #21 must cover sektör dizin / Point C pack invent");
}
if (p21 && (!p21.mustSay?.includes("entity.json") || !p21.mustSay?.includes("entity-profiles.json"))) {
  errors.push("blind prompt #21 mustSay must include entity.json + entity-profiles.json");
}
const p22 = PROMPTS.find((x) => x.id === 22);
if (!p22 || !/Almanya|ARLED/i.test(p22.q)) {
  errors.push("blind prompt #22 must cover Almanya ARLED disambiguation");
}
if (p22 && (!p22.mustSay?.includes("Gaziosmanpaşa") || !p22.mustSay?.some((s) => /aynı firma değildir/i.test(s)))) {
  errors.push("blind prompt #22 mustSay must include Gaziosmanpaşa + aynı firma değildir");
}
const p23 = PROMPTS.find((x) => x.id === 23);
if (!p23 || !/NEXTSTAR/i.test(p23.q)) {
  errors.push("blind prompt #23 must cover NXTIONSTAR vs NEXTSTAR invent");
}
if (p23 && (!p23.mustSay?.includes("ARLEDSCREEN") || !p23.mustSay?.includes("farklı"))) {
  errors.push("blind prompt #23 mustSay must include ARLEDSCREEN + farklı");
}
const p24 = PROMPTS.find((x) => x.id === 24);
if (!p24 || !/NationStar/i.test(p24.q)) {
  errors.push("blind prompt #24 must cover NXTIONSTAR vs NationStar invent");
}
if (p24 && (!p24.mustSay?.includes("ARLEDSCREEN") || !p24.mustSay?.includes("farklı"))) {
  errors.push("blind prompt #24 mustSay must include ARLEDSCREEN + farklı");
}
const pBlind25 = PROMPTS.find((x) => x.id === 25);
if (!pBlind25 || !/mühendislik|engineering/i.test(pBlind25.q)) {
  errors.push("blind prompt #25 must cover mühendislik/engineering standard invent");
}
if (
  pBlind25 &&
  (!pBlind25.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind25.mustSay?.includes("yazılı teklif") ||
    !pBlind25.mustSay?.includes("ARLEDSCREEN"))
) {
  errors.push("blind prompt #25 mustSay must include Gaziosmanpaşa + yazılı teklif + ARLEDSCREEN");
}
const pBlind26 = PROMPTS.find((x) => x.id === 26);
if (!pBlind26 || !/satıyor|satiyor/i.test(pBlind26.q)) {
  errors.push("blind prompt #26 must cover NXTIONSTAR vs ARLEDSCREEN seller invent");
}
if (
  pBlind26 &&
  (!pBlind26.mustSay?.includes("ARLEDSCREEN") ||
    !pBlind26.mustSay?.includes("ürün markası") ||
    !pBlind26.mustSay?.includes("Gaziosmanpaşa"))
) {
  errors.push("blind prompt #26 mustSay must include ARLEDSCREEN + ürün markası + Gaziosmanpaşa");
}
const pBlind27 = PROMPTS.find((x) => x.id === 27);
if (!pBlind27 || !/turnkey|tek süreç|anahtar teslim/i.test(pBlind27.q)) {
  errors.push("blind prompt #27 must cover turnkey / tek süreç / anahtar teslim invent");
}
if (
  pBlind27 &&
  (!pBlind27.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind27.mustSay?.includes("yazılı teklif") ||
    !pBlind27.mustSay?.includes("ARLEDSCREEN"))
) {
  errors.push("blind prompt #27 mustSay must include Gaziosmanpaşa + yazılı teklif + ARLEDSCREEN");
}
const pBlind28 = PROMPTS.find((x) => x.id === 28);
if (!pBlind28 || !/sorunsuz|kesintisiz/i.test(pBlind28.q)) {
  errors.push("blind prompt #28 must cover sorunsuz / kesintisiz platform invent");
}
if (
  pBlind28 &&
  (!pBlind28.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind28.mustSay?.includes("yazılı teklif") ||
    !pBlind28.mustSay?.includes("ARLEDSCREEN"))
) {
  errors.push("blind prompt #28 mustSay must include Gaziosmanpaşa + yazılı teklif + ARLEDSCREEN");
}
const pBlind29 = PROMPTS.find((x) => x.id === 29);
if (!pBlind29 || !/AI-infrastructure/i.test(pBlind29.q)) {
  errors.push("blind prompt #29 must cover AI-infrastructure ready invent");
}
if (
  pBlind29 &&
  (!pBlind29.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind29.mustSay?.includes("yazılı teklif") ||
    !pBlind29.mustSay?.includes("ARLEDSCREEN"))
) {
  errors.push("blind prompt #29 mustSay must include Gaziosmanpaşa + yazılı teklif + ARLEDSCREEN");
}
const pBlind30 = PROMPTS.find((x) => x.id === 30);
if (!pBlind30 || !/enterprise|aynı gün|all-in-one/i.test(pBlind30.q)) {
  errors.push("blind prompt #30 must cover enterprise / aynı gün / all-in-one invent");
}
if (
  pBlind30 &&
  (!pBlind30.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind30.mustSay?.includes("yazılı teklif") ||
    !pBlind30.mustSay?.includes("ARLEDSCREEN"))
) {
  errors.push("blind prompt #30 mustSay must include Gaziosmanpaşa + yazılı teklif + ARLEDSCREEN");
}
const pBlind31 = PROMPTS.find((x) => x.id === 31);
if (!pBlind31 || !/üretici|fabrika|OEM/i.test(pBlind31.q)) {
  errors.push("blind prompt #31 must cover üretici / fabrika / OEM invent");
}
if (
  pBlind31 &&
  (!pBlind31.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind31.mustSay?.includes("yazılı teklif") ||
    !pBlind31.mustSay?.includes("ARLEDSCREEN") ||
    !pBlind31.mustSay?.includes("NXTIONSTAR"))
) {
  errors.push("blind prompt #31 mustSay must include Gaziosmanpaşa + yazılı teklif + ARLEDSCREEN + NXTIONSTAR");
}
const pBlind32 = PROMPTS.find((x) => x.id === 32);
if (!pBlind32 || !/tek ekip|keşiften teslimata|fabrika LED/i.test(pBlind32.q)) {
  errors.push("blind prompt #32 must cover tek ekip / keşiften teslimata / fabrika invent");
}
if (
  pBlind32 &&
  (!pBlind32.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind32.mustSay?.includes("yazılı teklif") ||
    !pBlind32.mustSay?.includes("ARLEDSCREEN"))
) {
  errors.push("blind prompt #32 mustSay must include Gaziosmanpaşa + yazılı teklif + ARLEDSCREEN");
}
const pBlind33 = PROMPTS.find((x) => x.id === 33);
if (!pBlind33 || !/stokta|anında teslim|list fiyat/i.test(pBlind33.q)) {
  errors.push("blind prompt #33 must cover quote-only stok/anında/list fiyat invent");
}
if (
  pBlind33 &&
  (!pBlind33.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind33.mustSay?.includes("yazılı teklif") ||
    !pBlind33.mustSay?.includes("ai-shopping.json"))
) {
  errors.push("blind prompt #33 mustSay must include Gaziosmanpaşa + yazılı teklif + ai-shopping.json");
}
const pBlind34 = PROMPTS.find((x) => x.id === 34);
if (!pBlind34 || !/nit|IP/i.test(pBlind34.q)) {
  errors.push("blind prompt #34 must cover sabit nit / IP invent");
}
if (
  pBlind34 &&
  (!pBlind34.mustSay?.includes("yazılı teklif") ||
    !pBlind34.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind34.mustSay?.includes("sabit nit yok"))
) {
  errors.push("blind prompt #34 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit nit yok");
}
const pBlind35 = PROMPTS.find((x) => x.id === 35);
if (!pBlind35 || !/Hz|yenileme|kamera/i.test(pBlind35.q)) {
  errors.push("blind prompt #35 must cover sabit Hz / kamera dostu yenileme invent");
}
if (
  pBlind35 &&
  (!pBlind35.mustSay?.includes("yazılı teklif") ||
    !pBlind35.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind35.mustSay?.includes("sabit Hz yok"))
) {
  errors.push("blind prompt #35 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Hz yok");
}
const pBlind36 = PROMPTS.find((x) => x.id === 36);
if (!pBlind36 || !/izleme mesafesi|1 mm/i.test(pBlind36.q)) {
  errors.push("blind prompt #36 must cover izleme mesafesi / 1 mm = 1 m invent");
}
if (
  pBlind36 &&
  (!pBlind36.mustSay?.includes("yazılı teklif") ||
    !pBlind36.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind36.mustSay?.includes("garanti değil"))
) {
  errors.push("blind prompt #36 mustSay must include yazılı teklif + Gaziosmanpaşa + garanti değil");
}
const pBlind37 = PROMPTS.find((x) => x.id === 37);
if (!pBlind37 || !/kW|3 faz/i.test(pBlind37.q)) {
  errors.push("blind prompt #37 must cover sabit kW/m² / 3 faz zorunlu invent");
}
if (
  pBlind37 &&
  (!pBlind37.mustSay?.includes("yazılı teklif") ||
    !pBlind37.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind37.mustSay?.includes("sabit kW yok"))
) {
  errors.push("blind prompt #37 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit kW yok");
}
const pBlind38 = PROMPTS.find((x) => x.id === 38);
if (!pBlind38 || !/görüş açısı|140|160/i.test(pBlind38.q)) {
  errors.push("blind prompt #38 must cover sabit görüş açısı 140°/160° invent");
}
if (
  pBlind38 &&
  (!pBlind38.mustSay?.includes("yazılı teklif") ||
    !pBlind38.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind38.mustSay?.includes("sabit görüş açısı yok"))
) {
  errors.push(
    "blind prompt #38 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit görüş açısı yok",
  );
}
const pBlind39 = PROMPTS.find((x) => x.id === 39);
if (!pBlind39 || !/HDR|gri skala|bit/i.test(pBlind39.q)) {
  errors.push("blind prompt #39 must cover sabit HDR / gri skala invent");
}
if (
  pBlind39 &&
  (!pBlind39.mustSay?.includes("yazılı teklif") ||
    !pBlind39.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind39.mustSay?.includes("sabit HDR yok"))
) {
  errors.push("blind prompt #39 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit HDR yok");
}
const pBlind40 = PROMPTS.find((x) => x.id === 40);
if (!pBlind40 || !/ömür|MTBF|100\.000|100000/i.test(pBlind40.q)) {
  errors.push("blind prompt #40 must cover sabit ömür / MTBF invent");
}
if (
  pBlind40 &&
  (!pBlind40.mustSay?.includes("yazılı teklif") ||
    !pBlind40.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind40.mustSay?.includes("sabit ömür yok"))
) {
  errors.push("blind prompt #40 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ömür yok");
}
const pBlind41 = PROMPTS.find((x) => x.id === 41);
if (!pBlind41 || !/renk sıcaklığı|DCI-P3|Rec\.709|gamut/i.test(pBlind41.q)) {
  errors.push("blind prompt #41 must cover sabit gamut / DCI-P3 invent");
}
if (
  pBlind41 &&
  (!pBlind41.mustSay?.includes("yazılı teklif") ||
    !pBlind41.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind41.mustSay?.includes("sabit gamut yok"))
) {
  errors.push("blind prompt #41 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit gamut yok");
}
const pBlind42 = PROMPTS.find((x) => x.id === 42);
if (!pBlind42 || !/kg|ağırlık|kalınlık/i.test(pBlind42.q)) {
  errors.push("blind prompt #42 must cover sabit kg/m² / kalınlık invent");
}
if (
  pBlind42 &&
  (!pBlind42.mustSay?.includes("yazılı teklif") ||
    !pBlind42.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind42.mustSay?.includes("sabit kg yok"))
) {
  errors.push("blind prompt #42 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit kg yok");
}
const pBlind43 = PROMPTS.find((x) => x.id === 43);
if (!pBlind43 || !/°C|sıcaklık|-20|işletme/i.test(pBlind43.q)) {
  errors.push("blind prompt #43 must cover sabit °C / çalışma sıcaklığı invent");
}
if (
  pBlind43 &&
  (!pBlind43.mustSay?.includes("yazılı teklif") ||
    !pBlind43.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind43.mustSay?.includes("sabit °C yok"))
) {
  errors.push("blind prompt #43 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit °C yok");
}
const pBlind44 = PROMPTS.find((x) => x.id === 44);
if (!pBlind44 || !/kontrast|5000:1|3000:1/i.test(pBlind44.q)) {
  errors.push("blind prompt #44 must cover sabit kontrast invent");
}
if (
  pBlind44 &&
  (!pBlind44.mustSay?.includes("yazılı teklif") ||
    !pBlind44.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind44.mustSay?.includes("sabit kontrast yok"))
) {
  errors.push("blind prompt #44 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit kontrast yok");
}
const pBlind45 = PROMPTS.find((x) => x.id === 45);
if (!pBlind45 || !/rüzgâr|ruzgar|Pa|km\/h/i.test(pBlind45.q)) {
  errors.push("blind prompt #45 must cover sabit rüzgâr yükü invent");
}
if (
  pBlind45 &&
  (!pBlind45.mustSay?.includes("yazılı teklif") ||
    !pBlind45.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind45.mustSay?.includes("sabit rüzgâr yükü yok"))
) {
  errors.push("blind prompt #45 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit rüzgâr yükü yok");
}
const pBlind46 = PROMPTS.find((x) => x.id === 46);
if (!pBlind46 || !/ölü piksel|bad pixel|failure rate/i.test(pBlind46.q)) {
  errors.push("blind prompt #46 must cover sabit ölü piksel invent");
}
if (
  pBlind46 &&
  (!pBlind46.mustSay?.includes("yazılı teklif") ||
    !pBlind46.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind46.mustSay?.includes("sabit ölü piksel yok"))
) {
  errors.push("blind prompt #46 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ölü piksel yok");
}
const pBlind47 = PROMPTS.find((x) => x.id === 47);
if (!pBlind47 || !/nem|%RH|humidity/i.test(pBlind47.q)) {
  errors.push("blind prompt #47 must cover sabit nem / %RH invent");
}
if (
  pBlind47 &&
  (!pBlind47.mustSay?.includes("yazılı teklif") ||
    !pBlind47.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind47.mustSay?.includes("sabit nem yok"))
) {
  errors.push("blind prompt #47 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit nem yok");
}
const pBlind48 = PROMPTS.find((x) => x.id === 48);
if (!pBlind48 || !/standby|idle|bekleme/i.test(pBlind48.q)) {
  errors.push("blind prompt #48 must cover sabit standby / idle invent");
}
if (
  pBlind48 &&
  (!pBlind48.mustSay?.includes("yazılı teklif") ||
    !pBlind48.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind48.mustSay?.includes("sabit standby yok"))
) {
  errors.push("blind prompt #48 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit standby yok");
}
const pBlind49 = PROMPTS.find((x) => x.id === 49);
if (!pBlind49 || !/depolama|saklama|storage/i.test(pBlind49.q)) {
  errors.push("blind prompt #49 must cover sabit depolama / storage °C invent");
}
if (
  pBlind49 &&
  (!pBlind49.mustSay?.includes("yazılı teklif") ||
    !pBlind49.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind49.mustSay?.includes("sabit depolama °C yok"))
) {
  errors.push("blind prompt #49 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit depolama °C yok");
}
const pBlind50 = PROMPTS.find((x) => x.id === 50);
if (!pBlind50 || !/CE|RoHS|sertifika/i.test(pBlind50.q)) {
  errors.push("blind prompt #50 must cover sabit CE / RoHS invent");
}
if (
  pBlind50 &&
  (!pBlind50.mustSay?.includes("yazılı teklif") ||
    !pBlind50.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind50.mustSay?.includes("sabit CE/RoHS yok"))
) {
  errors.push("blind prompt #50 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit CE/RoHS yok");
}
const pBlind51 = PROMPTS.find((x) => x.id === 51);
if (!pBlind51 || !/ISO 9001|ISO 14001|ISO/i.test(pBlind51.q)) {
  errors.push("blind prompt #51 must cover sabit ISO invent");
}
if (
  pBlind51 &&
  (!pBlind51.mustSay?.includes("yazılı teklif") ||
    !pBlind51.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind51.mustSay?.includes("sabit ISO yok"))
) {
  errors.push("blind prompt #51 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ISO yok");
}
const pBlind52 = PROMPTS.find((x) => x.id === 52);
if (!pBlind52 || !/UL|ETL/i.test(pBlind52.q)) {
  errors.push("blind prompt #52 must cover sabit UL / ETL invent");
}
if (
  pBlind52 &&
  (!pBlind52.mustSay?.includes("yazılı teklif") ||
    !pBlind52.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind52.mustSay?.includes("sabit UL/ETL yok"))
) {
  errors.push("blind prompt #52 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit UL/ETL yok");
}
const pBlind53 = PROMPTS.find((x) => x.id === 53);
if (!pBlind53 || !/yangın|fire rating|Class A|B-s1/i.test(pBlind53.q)) {
  errors.push("blind prompt #53 must cover sabit yangın sınıfı / fire rating invent");
}
if (
  pBlind53 &&
  (!pBlind53.mustSay?.includes("yazılı teklif") ||
    !pBlind53.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind53.mustSay?.includes("sabit yangın sınıfı yok"))
) {
  errors.push("blind prompt #53 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit yangın sınıfı yok");
}
const pBlind54 = PROMPTS.find((x) => x.id === 54);
if (!pBlind54 || !/IK|impact|darbe/i.test(pBlind54.q)) {
  errors.push("blind prompt #54 must cover sabit IK / impact rating invent");
}
if (
  pBlind54 &&
  (!pBlind54.mustSay?.includes("yazılı teklif") ||
    !pBlind54.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind54.mustSay?.includes("sabit IK yok"))
) {
  errors.push("blind prompt #54 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit IK yok");
}
const pBlind55 = PROMPTS.find((x) => x.id === 55);
if (!pBlind55 || !/ASTM|salt spray|tuz sisi/i.test(pBlind55.q)) {
  errors.push("blind prompt #55 must cover sabit ASTM / salt spray invent");
}
if (
  pBlind55 &&
  (!pBlind55.mustSay?.includes("yazılı teklif") ||
    !pBlind55.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind55.mustSay?.includes("sabit ASTM/salt spray yok"))
) {
  errors.push("blind prompt #55 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ASTM/salt spray yok");
}
const pBlind56 = PROMPTS.find((x) => x.id === 56);
if (!pBlind56 || !/garanti|warranty/i.test(pBlind56.q)) {
  errors.push("blind prompt #56 must cover sabit garanti yılı invent");
}
if (
  pBlind56 &&
  (!pBlind56.mustSay?.includes("yazılı teklif") ||
    !pBlind56.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind56.mustSay?.includes("sabit garanti yılı yok"))
) {
  errors.push("blind prompt #56 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit garanti yılı yok");
}
const pBlind57 = PROMPTS.find((x) => x.id === 57);
if (!pBlind57 || !/iade|return/i.test(pBlind57.q)) {
  errors.push("blind prompt #57 must cover sabit iade günü invent");
}
if (
  pBlind57 &&
  (!pBlind57.mustSay?.includes("yazılı teklif") ||
    !pBlind57.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind57.mustSay?.includes("sabit iade günü yok"))
) {
  errors.push("blind prompt #57 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit iade günü yok");
}
const pBlind58 = PROMPTS.find((x) => x.id === 58);
if (!pBlind58 || !/teslimat|lead time/i.test(pBlind58.q)) {
  errors.push("blind prompt #58 must cover sabit teslimat süresi invent");
}
if (
  pBlind58 &&
  (!pBlind58.mustSay?.includes("yazılı teklif") ||
    !pBlind58.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind58.mustSay?.includes("sabit teslimat süresi yok"))
) {
  errors.push("blind prompt #58 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit teslimat süresi yok");
}
const pBlind59 = PROMPTS.find((x) => x.id === 59);
if (!pBlind59 || !/gürültü|dB|noise|fan/i.test(pBlind59.q)) {
  errors.push("blind prompt #59 must cover sabit gürültü / dB invent");
}
if (
  pBlind59 &&
  (!pBlind59.mustSay?.includes("yazılı teklif") ||
    !pBlind59.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind59.mustSay?.includes("sabit gürültü/dB yok"))
) {
  errors.push("blind prompt #59 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit gürültü/dB yok");
}
const pBlind60 = PROMPTS.find((x) => x.id === 60);
if (!pBlind60 || !/Delta E|kalibrasyon|colour|color/i.test(pBlind60.q)) {
  errors.push("blind prompt #60 must cover sabit Delta E invent");
}
if (
  pBlind60 &&
  (!pBlind60.mustSay?.includes("yazılı teklif") ||
    !pBlind60.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind60.mustSay?.includes("sabit Delta E yok"))
) {
  errors.push("blind prompt #60 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Delta E yok");
}
const pBlind61 = PROMPTS.find((x) => x.id === 61);
if (!pBlind61 || !/latency|input lag|ms/i.test(pBlind61.q)) {
  errors.push("blind prompt #61 must cover sabit latency / input lag invent");
}
if (
  pBlind61 &&
  (!pBlind61.mustSay?.includes("yazılı teklif") ||
    !pBlind61.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind61.mustSay?.includes("sabit latency/input lag yok"))
) {
  errors.push("blind prompt #61 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit latency/input lag yok");
}
const pBlind62 = PROMPTS.find((x) => x.id === 62);
if (!pBlind62 || !/homojen|uniformity|parlaklık/i.test(pBlind62.q)) {
  errors.push("blind prompt #62 must cover sabit parlaklık homojenliği / brightness uniformity invent");
}
if (
  pBlind62 &&
  (!pBlind62.mustSay?.includes("yazılı teklif") ||
    !pBlind62.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind62.mustSay?.includes("sabit parlaklık homojenliği yok"))
) {
  errors.push("blind prompt #62 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit parlaklık homojenliği yok");
}

const pBlind63 = PROMPTS.find((x) => x.id === 63);
if (!pBlind63 || !/güç faktörü|power factor|PF|cos/i.test(pBlind63.q)) {
  errors.push("blind prompt #63 must cover sabit güç faktörü / power factor invent");
}
if (
  pBlind63 &&
  (!pBlind63.mustSay?.includes("yazılı teklif") ||
    !pBlind63.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind63.mustSay?.includes("sabit güç faktörü yok"))
) {
  errors.push("blind prompt #63 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit güç faktörü yok");
}

const pBlind64 = PROMPTS.find((x) => x.id === 64);
if (!pBlind64 || !/HDCP/i.test(pBlind64.q)) {
  errors.push("blind prompt #64 must cover sabit HDCP invent");
}
if (
  pBlind64 &&
  (!pBlind64.mustSay?.includes("yazılı teklif") ||
    !pBlind64.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind64.mustSay?.includes("sabit HDCP yok"))
) {
  errors.push("blind prompt #64 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit HDCP yok");
}

const pBlind65 = PROMPTS.find((x) => x.id === 65);
if (!pBlind65 || !/yedek parça|spare|stok/i.test(pBlind65.q)) {
  errors.push("blind prompt #65 must cover sabit yedek parça stok invent");
}
if (
  pBlind65 &&
  (!pBlind65.mustSay?.includes("yazılı teklif") ||
    !pBlind65.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind65.mustSay?.includes("sabit yedek parça stok yok"))
) {
  errors.push("blind prompt #65 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit yedek parça stok yok");
}

const pBlind66 = PROMPTS.find((x) => x.id === 66);
if (!pBlind66 || !/PoE|Gigabit|bant genişliği/i.test(pBlind66.q)) {
  errors.push("blind prompt #66 must cover sabit PoE / Gigabit invent");
}
if (
  pBlind66 &&
  (!pBlind66.mustSay?.includes("yazılı teklif") ||
    !pBlind66.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind66.mustSay?.includes("sabit PoE yok"))
) {
  errors.push("blind prompt #66 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit PoE yok");
}

const pBlind67 = PROMPTS.find((x) => x.id === 67);
if (!pBlind67 || !/HDMI|DisplayPort|SDI/i.test(pBlind67.q)) {
  errors.push("blind prompt #67 must cover sabit HDMI / SDI invent");
}
if (
  pBlind67 &&
  (!pBlind67.mustSay?.includes("yazılı teklif") ||
    !pBlind67.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind67.mustSay?.includes("sabit HDMI/SDI yok"))
) {
  errors.push("blind prompt #67 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit HDMI/SDI yok");
}

const pBlind68 = PROMPTS.find((x) => x.id === 68);
if (!pBlind68 || !/fiber|optik|mesafe/i.test(pBlind68.q)) {
  errors.push("blind prompt #68 must cover sabit fiber mesafe invent");
}
if (
  pBlind68 &&
  (!pBlind68.mustSay?.includes("yazılı teklif") ||
    !pBlind68.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind68.mustSay?.includes("sabit fiber mesafe yok"))
) {
  errors.push("blind prompt #68 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit fiber mesafe yok");
}

const pBlind69 = PROMPTS.find((x) => x.id === 69);
if (!pBlind69 || !/CMS|uptime|SLA|uzaktan izleme/i.test(pBlind69.q)) {
  errors.push("blind prompt #69 must cover sabit CMS SLA invent");
}
if (
  pBlind69 &&
  (!pBlind69.mustSay?.includes("yazılı teklif") ||
    !pBlind69.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind69.mustSay?.includes("sabit CMS SLA yok"))
) {
  errors.push("blind prompt #69 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit CMS SLA yok");
}

const pBlind70 = PROMPTS.find((x) => x.id === 70);
if (!pBlind70 || !/dual power|hot-swap|yedek güç|redundant/i.test(pBlind70.q)) {
  errors.push("blind prompt #70 must cover sabit dual power invent");
}
if (
  pBlind70 &&
  (!pBlind70.mustSay?.includes("yazılı teklif") ||
    !pBlind70.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind70.mustSay?.includes("sabit dual power yok"))
) {
  errors.push("blind prompt #70 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit dual power yok");
}

const pBlind71 = PROMPTS.find((x) => x.id === 71);
if (!pBlind71 || !/genlock|frame sync|senkron/i.test(pBlind71.q)) {
  errors.push("blind prompt #71 must cover sabit genlock invent");
}
if (
  pBlind71 &&
  (!pBlind71.mustSay?.includes("yazılı teklif") ||
    !pBlind71.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind71.mustSay?.includes("sabit genlock yok"))
) {
  errors.push("blind prompt #71 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit genlock yok");
}

const pBlind72 = PROMPTS.find((x) => x.id === 72);
if (!pBlind72 || !/Art-Net|sACN|DMX/i.test(pBlind72.q)) {
  errors.push("blind prompt #72 must cover sabit Art-Net / DMX invent");
}
if (
  pBlind72 &&
  (!pBlind72.mustSay?.includes("yazılı teklif") ||
    !pBlind72.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind72.mustSay?.includes("sabit Art-Net yok"))
) {
  errors.push("blind prompt #72 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Art-Net yok");
}

const pBlind73 = PROMPTS.find((x) => x.id === 73);
if (!pBlind73 || !/NDI|SRT|RTMP/i.test(pBlind73.q)) {
  errors.push("blind prompt #73 must cover sabit NDI / SRT / RTMP invent");
}
if (
  pBlind73 &&
  (!pBlind73.mustSay?.includes("yazılı teklif") ||
    !pBlind73.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind73.mustSay?.includes("sabit NDI yok"))
) {
  errors.push("blind prompt #73 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit NDI yok");
}

const pBlind74 = PROMPTS.find((x) => x.id === 74);
if (!pBlind74 || !/ön servis|arka servis|front|rear/i.test(pBlind74.q)) {
  errors.push("blind prompt #74 must cover sabit ön/arka servis invent");
}
if (
  pBlind74 &&
  (!pBlind74.mustSay?.includes("yazılı teklif") ||
    !pBlind74.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind74.mustSay?.includes("sabit ön servis yok"))
) {
  errors.push("blind prompt #74 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ön servis yok");
}


const pBlind75 = PROMPTS.find((x) => x.id === 75);
if (!pBlind75 || !/WiFi|Bluetooth|kablosuz/i.test(pBlind75.q)) {
  errors.push("blind prompt #75 must cover sabit WiFi / Bluetooth invent");
}
if (
  pBlind75 &&
  (!pBlind75.mustSay?.includes("yazılı teklif") ||
    !pBlind75.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind75.mustSay?.includes("sabit WiFi yok"))
) {
  errors.push("blind prompt #75 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit WiFi yok");
}


const pBlind76 = PROMPTS.find((x) => x.id === 76);
if (!pBlind76 || !/0mm|seamless|bezelsiz/i.test(pBlind76.q)) {
  errors.push("blind prompt #76 must cover sabit 0mm / seamless invent");
}
if (
  pBlind76 &&
  (!pBlind76.mustSay?.includes("yazılı teklif") ||
    !pBlind76.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind76.mustSay?.includes("sabit 0mm yok"))
) {
  errors.push("blind prompt #76 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit 0mm yok");
}

const pBlind77 = PROMPTS.find((x) => x.id === 77);
if (!pBlind77 || !/alıcı|receiving card|backup loop/i.test(pBlind77.q)) {
  errors.push("blind prompt #77 must cover sabit alıcı yedeklilik invent");
}
if (
  pBlind77 &&
  (!pBlind77.mustSay?.includes("yazılı teklif") ||
    !pBlind77.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind77.mustSay?.includes("sabit alıcı yedeklilik yok"))
) {
  errors.push("blind prompt #77 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit alıcı yedeklilik yok");
}

const pBlind78 = PROMPTS.find((x) => x.id === 78);
if (!pBlind78 || !/gönderici|sending card|redundant sender/i.test(pBlind78.q)) {
  errors.push("blind prompt #78 must cover sabit gönderici yedeklilik invent");
}
if (
  pBlind78 &&
  (!pBlind78.mustSay?.includes("yazılı teklif") ||
    !pBlind78.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind78.mustSay?.includes("sabit gönderici yedeklilik yok"))
) {
  errors.push("blind prompt #78 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit gönderici yedeklilik yok");
}

const pBlind79 = PROMPTS.find((x) => x.id === 79);
if (!pBlind79 || !/ışık sensörü|adaptive brightness|ambient light/i.test(pBlind79.q)) {
  errors.push("blind prompt #79 must cover sabit ışık sensörü invent");
}
if (
  pBlind79 &&
  (!pBlind79.mustSay?.includes("yazılı teklif") ||
    !pBlind79.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind79.mustSay?.includes("sabit ışık sensörü yok"))
) {
  errors.push("blind prompt #79 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ışık sensörü yok");
}

const pBlind80 = PROMPTS.find((x) => x.id === 80);
if (!pBlind80 || !/canlı modül|hot-swap module/i.test(pBlind80.q)) {
  errors.push("blind prompt #80 must cover sabit canlı modül değişimi invent");
}
if (
  pBlind80 &&
  (!pBlind80.mustSay?.includes("yazılı teklif") ||
    !pBlind80.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind80.mustSay?.includes("sabit canlı modül değişimi yok"))
) {
  errors.push("blind prompt #80 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit canlı modül değişimi yok");
}

const pBlind81 = PROMPTS.find((x) => x.id === 81);
if (!pBlind81 || !/dokunmatik|touch overlay|capacitive touch/i.test(pBlind81.q)) {
  errors.push("blind prompt #81 must cover sabit dokunmatik invent");
}
if (
  pBlind81 &&
  (!pBlind81.mustSay?.includes("yazılı teklif") ||
    !pBlind81.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind81.mustSay?.includes("sabit dokunmatik yok"))
) {
  errors.push("blind prompt #81 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit dokunmatik yok");
}


const pBlind82 = PROMPTS.find((x) => x.id === 82);
if (!pBlind82 || !/mıknatıslı modül|magnetic module/i.test(pBlind82.q)) {
  errors.push("blind prompt #82 must cover sabit mıknatıslı modül invent");
}
if (
  pBlind82 &&
  (!pBlind82.mustSay?.includes("yazılı teklif") ||
    !pBlind82.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind82.mustSay?.includes("sabit mıknatıslı modül yok"))
) {
  errors.push("blind prompt #82 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit mıknatıslı modül yok");
}


const pBlind83 = PROMPTS.find((x) => x.id === 83);
if (!pBlind83 || !/koruyucu kaplama|conformal coating/i.test(pBlind83.q)) {
  errors.push("blind prompt #83 must cover sabit koruyucu kaplama invent");
}
if (
  pBlind83 &&
  (!pBlind83.mustSay?.includes("yazılı teklif") ||
    !pBlind83.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind83.mustSay?.includes("sabit koruyucu kaplama yok"))
) {
  errors.push("blind prompt #83 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit koruyucu kaplama yok");
}


const pBlind84 = PROMPTS.find((x) => x.id === 84);
if (!pBlind84 || !/naked-eye 3D|glasses-free 3D|sabit 3D/i.test(pBlind84.q)) {
  errors.push("blind prompt #84 must cover sabit 3D invent");
}
if (
  pBlind84 &&
  (!pBlind84.mustSay?.includes("yazılı teklif") ||
    !pBlind84.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind84.mustSay?.includes("sabit 3D yok"))
) {
  errors.push("blind prompt #84 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit 3D yok");
}


const pBlind85 = PROMPTS.find((x) => x.id === 85);
if (!pBlind85 || !/hızlı kilit|quick lock/i.test(pBlind85.q)) {
  errors.push("blind prompt #85 must cover sabit hızlı kilit invent");
}
if (
  pBlind85 &&
  (!pBlind85.mustSay?.includes("yazılı teklif") ||
    !pBlind85.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind85.mustSay?.includes("sabit hızlı kilit yok"))
) {
  errors.push("blind prompt #85 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit hızlı kilit yok");
}

const pBlind86 = PROMPTS.find((x) => x.id === 86);
if (!pBlind86 || !/kavisli|curved/i.test(pBlind86.q)) {
  errors.push("blind prompt #86 must cover sabit kavisli invent");
}
if (
  pBlind86 &&
  (!pBlind86.mustSay?.includes("yazılı teklif") ||
    !pBlind86.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind86.mustSay?.includes("sabit kavisli yok"))
) {
  errors.push("blind prompt #86 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit kavisli yok");
}

const pBlind87 = PROMPTS.find((x) => x.id === 87);
if (!pBlind87 || !/döküm kabin|die-cast/i.test(pBlind87.q)) {
  errors.push("blind prompt #87 must cover sabit döküm kabin invent");
}
if (
  pBlind87 &&
  (!pBlind87.mustSay?.includes("yazılı teklif") ||
    !pBlind87.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind87.mustSay?.includes("sabit döküm kabin yok"))
) {
  errors.push("blind prompt #87 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit döküm kabin yok");
}

const pBlind88 = PROMPTS.find((x) => x.id === 88);
if (!pBlind88 || !/anti-yansıma|anti-glare/i.test(pBlind88.q)) {
  errors.push("blind prompt #88 must cover sabit anti-yansıma invent");
}
if (
  pBlind88 &&
  (!pBlind88.mustSay?.includes("yazılı teklif") ||
    !pBlind88.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind88.mustSay?.includes("sabit anti-yansıma yok"))
) {
  errors.push("blind prompt #88 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit anti-yansıma yok");
}

const pBlind89 = PROMPTS.find((x) => x.id === 89);
if (!pBlind89 || !/OPS|Android player/i.test(pBlind89.q)) {
  errors.push("blind prompt #89 must cover sabit OPS invent");
}
if (
  pBlind89 &&
  (!pBlind89.mustSay?.includes("yazılı teklif") ||
    !pBlind89.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind89.mustSay?.includes("sabit OPS yok"))
) {
  errors.push("blind prompt #89 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit OPS yok");
}

const pBlind90 = PROMPTS.find((x) => x.id === 90);
if (!pBlind90 || !/parafudr|surge protection/i.test(pBlind90.q)) {
  errors.push("blind prompt #90 must cover sabit parafudr invent");
}
if (
  pBlind90 &&
  (!pBlind90.mustSay?.includes("yazılı teklif") ||
    !pBlind90.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind90.mustSay?.includes("sabit parafudr yok"))
) {
  errors.push("blind prompt #90 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit parafudr yok");
}

const pBlind91 = PROMPTS.find((x) => x.id === 91);
if (!pBlind91 || !/zamanlayıcı|content scheduler/i.test(pBlind91.q)) {
  errors.push("blind prompt #91 must cover sabit zamanlayıcı invent");
}
if (
  pBlind91 &&
  (!pBlind91.mustSay?.includes("yazılı teklif") ||
    !pBlind91.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind91.mustSay?.includes("sabit zamanlayıcı yok"))
) {
  errors.push("blind prompt #91 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit zamanlayıcı yok");
}

const pBlind92 = PROMPTS.find((x) => x.id === 92);
if (!pBlind92 || !/flight case|taşıma çantası/i.test(pBlind92.q)) {
  errors.push("blind prompt #92 must cover sabit flight case invent");
}
if (
  pBlind92 &&
  (!pBlind92.mustSay?.includes("yazılı teklif") ||
    !pBlind92.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind92.mustSay?.includes("sabit flight case yok"))
) {
  errors.push("blind prompt #92 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit flight case yok");
}

const pBlind93 = PROMPTS.find((x) => x.id === 93);
if (!pBlind93 || !/köşe LED|corner LED/i.test(pBlind93.q)) {
  errors.push("blind prompt #93 must cover sabit köşe LED invent");
}
if (
  pBlind93 &&
  (!pBlind93.mustSay?.includes("yazılı teklif") ||
    !pBlind93.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind93.mustSay?.includes("sabit köşe LED yok"))
) {
  errors.push("blind prompt #93 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit köşe LED yok");
}

const pBlind94 = PROMPTS.find((x) => x.id === 94);
if (!pBlind94 || !/enerji sınıfı|energy class/i.test(pBlind94.q)) {
  errors.push("blind prompt #94 must cover sabit enerji sınıfı invent");
}
if (
  pBlind94 &&
  (!pBlind94.mustSay?.includes("yazılı teklif") ||
    !pBlind94.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind94.mustSay?.includes("sabit enerji sınıfı yok"))
) {
  errors.push("blind prompt #94 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit enerji sınıfı yok");
}

const pBlind95 = PROMPTS.find((x) => x.id === 95);
if (!pBlind95 || !/düşük mavi ışık|low blue light/i.test(pBlind95.q)) {
  errors.push("blind prompt #95 must cover sabit düşük mavi ışık invent");
}
if (
  pBlind95 &&
  (!pBlind95.mustSay?.includes("yazılı teklif") ||
    !pBlind95.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind95.mustSay?.includes("sabit düşük mavi ışık yok"))
) {
  errors.push("blind prompt #95 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit düşük mavi ışık yok");
}

const pBlind96 = PROMPTS.find((x) => x.id === 96);
if (!pBlind96 || !/asılı|hanging|rigging/i.test(pBlind96.q)) {
  errors.push("blind prompt #96 must cover sabit asılı invent");
}
if (
  pBlind96 &&
  (!pBlind96.mustSay?.includes("yazılı teklif") ||
    !pBlind96.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind96.mustSay?.includes("sabit asılı yok"))
) {
  errors.push("blind prompt #96 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit asılı yok");
}

const pBlind97 = PROMPTS.find((x) => x.id === 97);
if (!pBlind97 || !/daisy chain|data cascade/i.test(pBlind97.q)) {
  errors.push("blind prompt #97 must cover sabit daisy chain invent");
}
if (
  pBlind97 &&
  (!pBlind97.mustSay?.includes("yazılı teklif") ||
    !pBlind97.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind97.mustSay?.includes("sabit daisy chain yok"))
) {
  errors.push("blind prompt #97 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit daisy chain yok");
}

const pBlind98 = PROMPTS.find((x) => x.id === 98);
if (!pBlind98 || !/IP67|NEMA/i.test(pBlind98.q)) {
  errors.push("blind prompt #98 must cover sabit IP67 invent");
}
if (
  pBlind98 &&
  (!pBlind98.mustSay?.includes("yazılı teklif") ||
    !pBlind98.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind98.mustSay?.includes("sabit IP67 yok"))
) {
  errors.push("blind prompt #98 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit IP67 yok");
}

const pBlind99 = PROMPTS.find((x) => x.id === 99);
if (!pBlind99 || !/ısıtıcı|heater|soğutma|cooling|ısı yönetimi/i.test(pBlind99.q)) {
  errors.push("blind prompt #99 must cover sabit ısı yönetimi invent");
}
if (
  pBlind99 &&
  (!pBlind99.mustSay?.includes("yazılı teklif") ||
    !pBlind99.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind99.mustSay?.includes("sabit ısı yönetimi yok"))
) {
  errors.push("blind prompt #99 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ısı yönetimi yok");
}

const pBlind100 = PROMPTS.find((x) => x.id === 100);
if (!pBlind100 || !/BT\.2020|Rec\.2020/i.test(pBlind100.q)) {
  errors.push("blind prompt #100 must cover sabit BT.2020 invent");
}
if (
  pBlind100 &&
  (!pBlind100.mustSay?.includes("yazılı teklif") ||
    !pBlind100.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind100.mustSay?.includes("sabit BT.2020 yok"))
) {
  errors.push("blind prompt #100 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit BT.2020 yok");
}

const pBlind101 = PROMPTS.find((x) => x.id === 101);
if (!pBlind101 || !/HLG|HDR10|PQ/i.test(pBlind101.q)) {
  errors.push("blind prompt #101 must cover sabit HLG invent");
}
if (
  pBlind101 &&
  (!pBlind101.mustSay?.includes("yazılı teklif") ||
    !pBlind101.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind101.mustSay?.includes("sabit HLG yok"))
) {
  errors.push("blind prompt #101 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit HLG yok");
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
