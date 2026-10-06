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

const pBlind102 = PROMPTS.find((x) => x.id === 102);
if (!pBlind102 || !/PWM|scan rate/i.test(pBlind102.q)) {
  errors.push("blind prompt #102 must cover sabit PWM invent");
}
if (
  pBlind102 &&
  (!pBlind102.mustSay?.includes("yazılı teklif") ||
    !pBlind102.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind102.mustSay?.includes("sabit PWM yok"))
) {
  errors.push("blind prompt #102 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit PWM yok");
}

const pBlind103 = PROMPTS.find((x) => x.id === 103);
if (!pBlind103 || !/black level|siyah seviye/i.test(pBlind103.q)) {
  errors.push("blind prompt #103 must cover sabit black level invent");
}
if (
  pBlind103 &&
  (!pBlind103.mustSay?.includes("yazılı teklif") ||
    !pBlind103.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind103.mustSay?.includes("sabit black level yok"))
) {
  errors.push("blind prompt #103 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit black level yok");
}

const pBlind104 = PROMPTS.find((x) => x.id === 104);
if (!pBlind104 || !/pixel mapping|piksel eşleme/i.test(pBlind104.q)) {
  errors.push("blind prompt #104 must cover sabit pixel mapping invent");
}
if (
  pBlind104 &&
  (!pBlind104.mustSay?.includes("yazılı teklif") ||
    !pBlind104.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind104.mustSay?.includes("sabit pixel mapping yok"))
) {
  errors.push("blind prompt #104 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit pixel mapping yok");
}

const pBlind105 = PROMPTS.find((x) => x.id === 105);
if (!pBlind105 || !/gamma|white balance|beyaz dengesi/i.test(pBlind105.q)) {
  errors.push("blind prompt #105 must cover sabit gamma invent");
}
if (
  pBlind105 &&
  (!pBlind105.mustSay?.includes("yazılı teklif") ||
    !pBlind105.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind105.mustSay?.includes("sabit gamma yok"))
) {
  errors.push("blind prompt #105 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit gamma yok");
}

const pBlind106 = PROMPTS.find((x) => x.id === 106);
if (!pBlind106 || !/potting|epoxy/i.test(pBlind106.q)) {
  errors.push("blind prompt #106 must cover sabit potting invent");
}
if (
  pBlind106 &&
  (!pBlind106.mustSay?.includes("yazılı teklif") ||
    !pBlind106.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind106.mustSay?.includes("sabit potting yok"))
) {
  errors.push("blind prompt #106 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit potting yok");
}

const pBlind107 = PROMPTS.find((x) => x.id === 107);
if (!pBlind107 || !/louver|masking|güneş panjuru/i.test(pBlind107.q)) {
  errors.push("blind prompt #107 must cover sabit louver invent");
}
if (
  pBlind107 &&
  (!pBlind107.mustSay?.includes("yazılı teklif") ||
    !pBlind107.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind107.mustSay?.includes("sabit louver yok"))
) {
  errors.push("blind prompt #107 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit louver yok");
}

const pBlind108 = PROMPTS.find((x) => x.id === 108);
if (!pBlind108 || !/module size|modül boyutu/i.test(pBlind108.q)) {
  errors.push("blind prompt #108 must cover sabit module size invent");
}
if (
  pBlind108 &&
  (!pBlind108.mustSay?.includes("yazılı teklif") ||
    !pBlind108.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind108.mustSay?.includes("sabit module size yok"))
) {
  errors.push("blind prompt #108 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit module size yok");
}

const pBlind109 = PROMPTS.find((x) => x.id === 109);
if (!pBlind109 || !/cabinet depth|kabin derinliği/i.test(pBlind109.q)) {
  errors.push("blind prompt #109 must cover sabit cabinet depth invent");
}
if (
  pBlind109 &&
  (!pBlind109.mustSay?.includes("yazılı teklif") ||
    !pBlind109.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind109.mustSay?.includes("sabit cabinet depth yok"))
) {
  errors.push("blind prompt #109 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit cabinet depth yok");
}

const pBlind110 = PROMPTS.find((x) => x.id === 110);
if (!pBlind110 || !/drive IC|sürücü IC/i.test(pBlind110.q)) {
  errors.push("blind prompt #110 must cover sabit drive IC invent");
}
if (
  pBlind110 &&
  (!pBlind110.mustSay?.includes("yazılı teklif") ||
    !pBlind110.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind110.mustSay?.includes("sabit drive IC yok"))
) {
  errors.push("blind prompt #110 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit drive IC yok");
}


const pBlind111 = PROMPTS.find((x) => x.id === 111);
if (!pBlind111 || !/cabinet size|kabin boyutu/i.test(pBlind111.q)) {
  errors.push("blind prompt #111 must cover sabit cabinet size invent");
}
if (
  pBlind111 &&
  (!pBlind111.mustSay?.includes("yazılı teklif") ||
    !pBlind111.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind111.mustSay?.includes("sabit cabinet size yok"))
) {
  errors.push("blind prompt #111 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit cabinet size yok");
}


const pBlind112 = PROMPTS.find((x) => x.id === 112);
if (!pBlind112 || !/panel size|panel boyutu/i.test(pBlind112.q)) {
  errors.push("blind prompt #112 must cover sabit panel size invent");
}
if (
  pBlind112 &&
  (!pBlind112.mustSay?.includes("yazılı teklif") ||
    !pBlind112.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind112.mustSay?.includes("sabit panel size yok"))
) {
  errors.push("blind prompt #112 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit panel size yok");
}


const pBlind113 = PROMPTS.find((x) => x.id === 113);
if (!pBlind113 || !/waterproof glue|su geçirmez yapıştırıcı/i.test(pBlind113.q)) {
  errors.push("blind prompt #113 must cover sabit waterproof glue invent");
}
if (
  pBlind113 &&
  (!pBlind113.mustSay?.includes("yazılı teklif") ||
    !pBlind113.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind113.mustSay?.includes("sabit waterproof glue yok"))
) {
  errors.push("blind prompt #113 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit waterproof glue yok");
}


const pBlind114 = PROMPTS.find((x) => x.id === 114);
if (!pBlind114 || !/mask pitch|maske pitch/i.test(pBlind114.q)) {
  errors.push("blind prompt #114 must cover sabit mask pitch invent");
}
if (
  pBlind114 &&
  (!pBlind114.mustSay?.includes("yazılı teklif") ||
    !pBlind114.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind114.mustSay?.includes("sabit mask pitch yok"))
) {
  errors.push("blind prompt #114 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit mask pitch yok");
}


const pBlind115 = PROMPTS.find((x) => x.id === 115);
if (!pBlind115 || !/silicone seal|silikon conta/i.test(pBlind115.q)) {
  errors.push("blind prompt #115 must cover sabit silicone seal invent");
}
if (
  pBlind115 &&
  (!pBlind115.mustSay?.includes("yazılı teklif") ||
    !pBlind115.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind115.mustSay?.includes("sabit silicone seal yok"))
) {
  errors.push("blind prompt #115 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit silicone seal yok");
}


const pBlind116 = PROMPTS.find((x) => x.id === 116);
if (!pBlind116 || !/connector type|konektör tipi/i.test(pBlind116.q)) {
  errors.push("blind prompt #116 must cover sabit connector type invent");
}
if (
  pBlind116 &&
  (!pBlind116.mustSay?.includes("yazılı teklif") ||
    !pBlind116.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind116.mustSay?.includes("sabit connector type yok"))
) {
  errors.push("blind prompt #116 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit connector type yok");
}


const pBlind117 = PROMPTS.find((x) => x.id === 117);
if (!pBlind117 || !/locating pin|konumlandırma pimi/i.test(pBlind117.q)) {
  errors.push("blind prompt #117 must cover sabit locating pin invent");
}
if (
  pBlind117 &&
  (!pBlind117.mustSay?.includes("yazılı teklif") ||
    !pBlind117.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind117.mustSay?.includes("sabit locating pin yok"))
) {
  errors.push("blind prompt #117 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit locating pin yok");
}


const pBlind118 = PROMPTS.find((x) => x.id === 118);
if (!pBlind118 || !/flat cable|flat kablo/i.test(pBlind118.q)) {
  errors.push("blind prompt #118 must cover sabit flat cable invent");
}
if (
  pBlind118 &&
  (!pBlind118.mustSay?.includes("yazılı teklif") ||
    !pBlind118.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind118.mustSay?.includes("sabit flat cable yok"))
) {
  errors.push("blind prompt #118 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit flat cable yok");
}


const pBlind119 = PROMPTS.find((x) => x.id === 119);
if (!pBlind119 || !/safety cable|emniyet kablosu/i.test(pBlind119.q)) {
  errors.push("blind prompt #119 must cover sabit safety cable invent");
}
if (
  pBlind119 &&
  (!pBlind119.mustSay?.includes("yazılı teklif") ||
    !pBlind119.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind119.mustSay?.includes("sabit safety cable yok"))
) {
  errors.push("blind prompt #119 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit safety cable yok");
}


const pBlind120 = PROMPTS.find((x) => x.id === 120);
if (!pBlind120 || !/thermal pad|termal pad/i.test(pBlind120.q)) {
  errors.push("blind prompt #120 must cover sabit thermal pad invent");
}
if (
  pBlind120 &&
  (!pBlind120.mustSay?.includes("yazılı teklif") ||
    !pBlind120.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind120.mustSay?.includes("sabit thermal pad yok"))
) {
  errors.push("blind prompt #120 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit thermal pad yok");
}


const pBlind121 = PROMPTS.find((x) => x.id === 121);
if (!pBlind121 || !/magnesium|magnezyum/i.test(pBlind121.q)) {
  errors.push("blind prompt #121 must cover sabit magnesium invent");
}
if (
  pBlind121 &&
  (!pBlind121.mustSay?.includes("yazılı teklif") ||
    !pBlind121.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind121.mustSay?.includes("sabit magnesium yok"))
) {
  errors.push("blind prompt #121 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit magnesium yok");
}


const pBlind122 = PROMPTS.find((x) => x.id === 122);
if (!pBlind122 || !/EDID/i.test(pBlind122.q)) {
  errors.push("blind prompt #122 must cover sabit EDID invent");
}
if (
  pBlind122 &&
  (!pBlind122.mustSay?.includes("yazılı teklif") ||
    !pBlind122.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind122.mustSay?.includes("sabit EDID yok"))
) {
  errors.push("blind prompt #122 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit EDID yok");
}


const pBlind123 = PROMPTS.find((x) => x.id === 123);
if (!pBlind123 || !/HDBaseT/i.test(pBlind123.q)) {
  errors.push("blind prompt #123 must cover sabit HDBaseT invent");
}
if (
  pBlind123 &&
  (!pBlind123.mustSay?.includes("yazılı teklif") ||
    !pBlind123.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind123.mustSay?.includes("sabit HDBaseT yok"))
) {
  errors.push("blind prompt #123 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit HDBaseT yok");
}


const pBlind124 = PROMPTS.find((x) => x.id === 124);
if (!pBlind124 || !/video processor|video işlemci/i.test(pBlind124.q)) {
  errors.push("blind prompt #124 must cover sabit video processor invent");
}
if (
  pBlind124 &&
  (!pBlind124.mustSay?.includes("yazılı teklif") ||
    !pBlind124.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind124.mustSay?.includes("sabit video processor yok"))
) {
  errors.push("blind prompt #124 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit video processor yok");
}


const pBlind125 = PROMPTS.find((x) => x.id === 125);
if (!pBlind125 || !/truss clamp|truss kelepçe/i.test(pBlind125.q)) {
  errors.push("blind prompt #125 must cover sabit truss clamp invent");
}
if (
  pBlind125 &&
  (!pBlind125.mustSay?.includes("yazılı teklif") ||
    !pBlind125.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind125.mustSay?.includes("sabit truss clamp yok"))
) {
  errors.push("blind prompt #125 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit truss clamp yok");
}


const pBlind126 = PROMPTS.find((x) => x.id === 126);
if (!pBlind126 || !/scaler|ölçekleyici/i.test(pBlind126.q)) {
  errors.push("blind prompt #126 must cover sabit scaler invent");
}
if (
  pBlind126 &&
  (!pBlind126.mustSay?.includes("yazılı teklif") ||
    !pBlind126.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind126.mustSay?.includes("sabit scaler yok"))
) {
  errors.push("blind prompt #126 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit scaler yok");
}


const pBlind127 = PROMPTS.find((x) => x.id === 127);
if (!pBlind127 || !/backup battery|yedek batarya/i.test(pBlind127.q)) {
  errors.push("blind prompt #127 must cover sabit backup battery invent");
}
if (
  pBlind127 &&
  (!pBlind127.mustSay?.includes("yazılı teklif") ||
    !pBlind127.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind127.mustSay?.includes("sabit backup battery yok"))
) {
  errors.push("blind prompt #127 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit backup battery yok");
}


const pBlind128 = PROMPTS.find((x) => x.id === 128);
if (!pBlind128 || !/ribbon cable|ribbon kablo/i.test(pBlind128.q)) {
  errors.push("blind prompt #128 must cover sabit ribbon cable invent");
}
if (
  pBlind128 &&
  (!pBlind128.mustSay?.includes("yazılı teklif") ||
    !pBlind128.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind128.mustSay?.includes("sabit ribbon cable yok"))
) {
  errors.push("blind prompt #128 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ribbon cable yok");
}


const pBlind129 = PROMPTS.find((x) => x.id === 129);
if (!pBlind129 || !/hoist|vinç/i.test(pBlind129.q)) {
  errors.push("blind prompt #129 must cover sabit hoist invent");
}
if (
  pBlind129 &&
  (!pBlind129.mustSay?.includes("yazılı teklif") ||
    !pBlind129.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind129.mustSay?.includes("sabit hoist yok"))
) {
  errors.push("blind prompt #129 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit hoist yok");
}


const pBlind130 = PROMPTS.find((x) => x.id === 130);
if (!pBlind130 || !/SFP/i.test(pBlind130.q)) {
  errors.push("blind prompt #130 must cover sabit SFP invent");
}
if (
  pBlind130 &&
  (!pBlind130.mustSay?.includes("yazılı teklif") ||
    !pBlind130.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind130.mustSay?.includes("sabit SFP yok"))
) {
  errors.push("blind prompt #130 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit SFP yok");
}


const pBlind131 = PROMPTS.find((x) => x.id === 131);
if (!pBlind131 || !/cable gland|kablo rakoru/i.test(pBlind131.q)) {
  errors.push("blind prompt #131 must cover sabit cable gland invent");
}
if (
  pBlind131 &&
  (!pBlind131.mustSay?.includes("yazılı teklif") ||
    !pBlind131.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind131.mustSay?.includes("sabit cable gland yok"))
) {
  errors.push("blind prompt #131 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit cable gland yok");
}


const pBlind132 = PROMPTS.find((x) => x.id === 132);
if (!pBlind132 || !/PIP|görüntü içinde görüntü/i.test(pBlind132.q)) {
  errors.push("blind prompt #132 must cover sabit PIP invent");
}
if (
  pBlind132 &&
  (!pBlind132.mustSay?.includes("yazılı teklif") ||
    !pBlind132.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind132.mustSay?.includes("sabit PIP yok"))
) {
  errors.push("blind prompt #132 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit PIP yok");
}

if (!PROMPTS.every((p) => Array.isArray(p.mustSay) && p.mustSay.length > 0)) {
  
const pBlind133 = PROMPTS.find((x) => x.id === 133);
if (!pBlind133 || !/grounding|topraklama/i.test(pBlind133.q)) {
  errors.push("blind prompt #133 must cover sabit grounding invent");
}
if (
  pBlind133 &&
  (!pBlind133.mustSay?.includes("yazılı teklif") ||
    !pBlind133.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind133.mustSay?.includes("sabit grounding yok"))
) {
  errors.push("blind prompt #133 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit grounding yok");
}


const pBlind134 = PROMPTS.find((x) => x.id === 134);
if (!pBlind134 || !/Dante/i.test(pBlind134.q)) {
  errors.push("blind prompt #134 must cover sabit Dante invent");
}
if (
  pBlind134 &&
  (!pBlind134.mustSay?.includes("yazılı teklif") ||
    !pBlind134.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind134.mustSay?.includes("sabit Dante yok"))
) {
  errors.push("blind prompt #134 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Dante yok");
}


const pBlind135 = PROMPTS.find((x) => x.id === 135);
if (!pBlind135 || !/powerCON|PowerCON/i.test(pBlind135.q)) {
  errors.push("blind prompt #135 must cover sabit powerCON invent");
}
if (
  pBlind135 &&
  (!pBlind135.mustSay?.includes("yazılı teklif") ||
    !pBlind135.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind135.mustSay?.includes("sabit powerCON yok"))
) {
  errors.push("blind prompt #135 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit powerCON yok");
}


const pBlind136 = PROMPTS.find((x) => x.id === 136);
if (!pBlind136 || !/KVM/i.test(pBlind136.q)) {
  errors.push("blind prompt #136 must cover sabit KVM invent");
}
if (
  pBlind136 &&
  (!pBlind136.mustSay?.includes("yazılı teklif") ||
    !pBlind136.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind136.mustSay?.includes("sabit KVM yok"))
) {
  errors.push("blind prompt #136 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit KVM yok");
}


const pBlind137 = PROMPTS.find((x) => x.id === 137);
if (!pBlind137 || !/Neutrik/i.test(pBlind137.q)) {
  errors.push("blind prompt #137 must cover sabit Neutrik invent");
}
if (
  pBlind137 &&
  (!pBlind137.mustSay?.includes("yazılı teklif") ||
    !pBlind137.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind137.mustSay?.includes("sabit Neutrik yok"))
) {
  errors.push("blind prompt #137 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Neutrik yok");
}


const pBlind138 = PROMPTS.find((x) => x.id === 138);
if (!pBlind138 || !/multi-window|çoklu pencere/i.test(pBlind138.q)) {
  errors.push("blind prompt #138 must cover sabit multi-window invent");
}
if (
  pBlind138 &&
  (!pBlind138.mustSay?.includes("yazılı teklif") ||
    !pBlind138.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind138.mustSay?.includes("sabit multi-window yok"))
) {
  errors.push("blind prompt #138 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit multi-window yok");
}


const pBlind139 = PROMPTS.find((x) => x.id === 139);
if (!pBlind139 || !/guy wire|gergi teli/i.test(pBlind139.q)) {
  errors.push("blind prompt #139 must cover sabit guy wire invent");
}
if (
  pBlind139 &&
  (!pBlind139.mustSay?.includes("yazılı teklif") ||
    !pBlind139.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind139.mustSay?.includes("sabit guy wire yok"))
) {
  errors.push("blind prompt #139 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit guy wire yok");
}


const pBlind140 = PROMPTS.find((x) => x.id === 140);
if (!pBlind140 || !/junction box|buat/i.test(pBlind140.q)) {
  errors.push("blind prompt #140 must cover sabit junction box invent");
}
if (
  pBlind140 &&
  (!pBlind140.mustSay?.includes("yazılı teklif") ||
    !pBlind140.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind140.mustSay?.includes("sabit junction box yok"))
) {
  errors.push("blind prompt #140 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit junction box yok");
}


const pBlind141 = PROMPTS.find((x) => x.id === 141);
if (!pBlind141 || !/leveling foot|ayar ayağı/i.test(pBlind141.q)) {
  errors.push("blind prompt #141 must cover sabit leveling foot invent");
}
if (
  pBlind141 &&
  (!pBlind141.mustSay?.includes("yazılı teklif") ||
    !pBlind141.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind141.mustSay?.includes("sabit leveling foot yok"))
) {
  errors.push("blind prompt #141 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit leveling foot yok");
}


const pBlind142 = PROMPTS.find((x) => x.id === 142);
if (!pBlind142 || !/matrix switcher|matris switch/i.test(pBlind142.q)) {
  errors.push("blind prompt #142 must cover sabit matrix switcher invent");
}
if (
  pBlind142 &&
  (!pBlind142.mustSay?.includes("yazılı teklif") ||
    !pBlind142.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind142.mustSay?.includes("sabit matrix switcher yok"))
) {
  errors.push("blind prompt #142 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit matrix switcher yok");
}


const pBlind143 = PROMPTS.find((x) => x.id === 143);
if (!pBlind143 || !/ballast|karşı ağırlık/i.test(pBlind143.q)) {
  errors.push("blind prompt #143 must cover sabit ballast invent");
}
if (
  pBlind143 &&
  (!pBlind143.mustSay?.includes("yazılı teklif") ||
    !pBlind143.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind143.mustSay?.includes("sabit ballast yok"))
) {
  errors.push("blind prompt #143 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ballast yok");
}


const pBlind144 = PROMPTS.find((x) => x.id === 144);
if (!pBlind144 || !/BYOD|kablosuz sunum/i.test(pBlind144.q)) {
  errors.push("blind prompt #144 must cover sabit BYOD invent");
}
if (
  pBlind144 &&
  (!pBlind144.mustSay?.includes("yazılı teklif") ||
    !pBlind144.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind144.mustSay?.includes("sabit BYOD yok"))
) {
  errors.push("blind prompt #144 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit BYOD yok");
}


const pBlind145 = PROMPTS.find((x) => x.id === 145);
if (!pBlind145 || !/outrigger|payanda/i.test(pBlind145.q)) {
  errors.push("blind prompt #145 must cover sabit outrigger invent");
}
if (
  pBlind145 &&
  (!pBlind145.mustSay?.includes("yazılı teklif") ||
    !pBlind145.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind145.mustSay?.includes("sabit outrigger yok"))
) {
  errors.push("blind prompt #145 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit outrigger yok");
}


const pBlind146 = PROMPTS.find((x) => x.id === 146);
if (!pBlind146 || !/Crestron|kontrol sistemi/i.test(pBlind146.q)) {
  errors.push("blind prompt #146 must cover sabit Crestron invent");
}
if (
  pBlind146 &&
  (!pBlind146.mustSay?.includes("yazılı teklif") ||
    !pBlind146.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind146.mustSay?.includes("sabit Crestron yok"))
) {
  errors.push("blind prompt #146 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Crestron yok");

const pBlind147 = PROMPTS.find((x) => x.id === 147);
if (!pBlind147 || !/USB-C|USB Type-C/i.test(pBlind147.q)) {
  errors.push("blind prompt #147 must cover sabit USB-C invent");
}
if (
  pBlind147 &&
  (!pBlind147.mustSay?.includes("yazılı teklif") ||
    !pBlind147.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind147.mustSay?.includes("sabit USB-C yok"))
) {
  errors.push("blind prompt #147 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit USB-C yok");

const pBlind148 = PROMPTS.find((x) => x.id === 148);
if (!pBlind148 || !/IR remote|kızılötesi kumanda/i.test(pBlind148.q)) {
  errors.push("blind prompt #148 must cover sabit IR remote invent");
}
if (
  pBlind148 &&
  (!pBlind148.mustSay?.includes("yazılı teklif") ||
    !pBlind148.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind148.mustSay?.includes("sabit IR remote yok"))
) {
  errors.push("blind prompt #148 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit IR remote yok");

const pBlind149 = PROMPTS.find((x) => x.id === 149);
if (!pBlind149 || !/base plate|taban plakası/i.test(pBlind149.q)) {
  errors.push("blind prompt #149 must cover sabit base plate invent");
}
if (
  pBlind149 &&
  (!pBlind149.mustSay?.includes("yazılı teklif") ||
    !pBlind149.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind149.mustSay?.includes("sabit base plate yok"))
) {
  errors.push("blind prompt #149 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit base plate yok");

const pBlind150 = PROMPTS.find((x) => x.id === 150);
if (!pBlind150 || !/RS-232|seri port/i.test(pBlind150.q)) {
  errors.push("blind prompt #150 must cover sabit RS-232 invent");
}
if (
  pBlind150 &&
  (!pBlind150.mustSay?.includes("yazılı teklif") ||
    !pBlind150.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind150.mustSay?.includes("sabit RS-232 yok"))
) {
  errors.push("blind prompt #150 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit RS-232 yok");

const pBlind151 = PROMPTS.find((x) => x.id === 151);
if (!pBlind151 || !/weather drain|su tahliyesi/i.test(pBlind151.q)) {
  errors.push("blind prompt #151 must cover sabit weather drain invent");
}
if (
  pBlind151 &&
  (!pBlind151.mustSay?.includes("yazılı teklif") ||
    !pBlind151.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind151.mustSay?.includes("sabit weather drain yok"))
) {
  errors.push("blind prompt #151 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit weather drain yok");

const pBlind152 = PROMPTS.find((x) => x.id === 152);
if (!pBlind152 || !/Extron|AV switcher/i.test(pBlind152.q)) {
  errors.push("blind prompt #152 must cover sabit Extron invent");
}
if (
  pBlind152 &&
  (!pBlind152.mustSay?.includes("yazılı teklif") ||
    !pBlind152.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind152.mustSay?.includes("sabit Extron yok"))
) {
  errors.push("blind prompt #152 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Extron yok");

const pBlind153 = PROMPTS.find((x) => x.id === 153);
if (!pBlind153 || !/wall bracket|duvar braketi/i.test(pBlind153.q)) {
  errors.push("blind prompt #153 must cover sabit wall bracket invent");
}
if (
  pBlind153 &&
  (!pBlind153.mustSay?.includes("yazılı teklif") ||
    !pBlind153.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind153.mustSay?.includes("sabit wall bracket yok"))
) {
  errors.push("blind prompt #153 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit wall bracket yok");

const pBlind154 = PROMPTS.find((x) => x.id === 154);
if (!pBlind154 || !/AMX|oda kontrol/i.test(pBlind154.q)) {
  errors.push("blind prompt #154 must cover sabit AMX invent");
}
if (
  pBlind154 &&
  (!pBlind154.mustSay?.includes("yazılı teklif") ||
    !pBlind154.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind154.mustSay?.includes("sabit AMX yok"))
) {
  errors.push("blind prompt #154 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit AMX yok");

const pBlind155 = PROMPTS.find((x) => x.id === 155);
if (!pBlind155 || !/drip edge|damlacık kenarı/i.test(pBlind155.q)) {
  errors.push("blind prompt #155 must cover sabit drip edge invent");
}
if (
  pBlind155 &&
  (!pBlind155.mustSay?.includes("yazılı teklif") ||
    !pBlind155.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind155.mustSay?.includes("sabit drip edge yok"))
) {
  errors.push("blind prompt #155 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit drip edge yok");

const pBlind156 = PROMPTS.find((x) => x.id === 156);
if (!pBlind156 || !/Control4|akıllı ev/i.test(pBlind156.q)) {
  errors.push("blind prompt #156 must cover sabit Control4 invent");
}
if (
  pBlind156 &&
  (!pBlind156.mustSay?.includes("yazılı teklif") ||
    !pBlind156.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind156.mustSay?.includes("sabit Control4 yok"))
) {
  errors.push("blind prompt #156 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Control4 yok");

const pBlind157 = PROMPTS.find((x) => x.id === 157);
if (!pBlind157 || !/weep hole|drenaj deliği/i.test(pBlind157.q)) {
  errors.push("blind prompt #157 must cover sabit weep hole invent");
}
if (
  pBlind157 &&
  (!pBlind157.mustSay?.includes("yazılı teklif") ||
    !pBlind157.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind157.mustSay?.includes("sabit weep hole yok"))
) {
  errors.push("blind prompt #157 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit weep hole yok");
}

const pBlind158 = PROMPTS.find((x) => x.id === 158);
if (!pBlind158 || !/Biamp|DSP/i.test(pBlind158.q)) {
  errors.push("blind prompt #158 must cover sabit Biamp invent");
}
if (
  pBlind158 &&
  (!pBlind158.mustSay?.includes("yazılı teklif") ||
    !pBlind158.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind158.mustSay?.includes("sabit Biamp yok"))
) {
  errors.push("blind prompt #158 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Biamp yok");
}

const pBlind159 = PROMPTS.find((x) => x.id === 159);
if (!pBlind159 || !/bird mesh|kuş filesi/i.test(pBlind159.q)) {
  errors.push("blind prompt #159 must cover sabit bird mesh invent");
}
if (
  pBlind159 &&
  (!pBlind159.mustSay?.includes("yazılı teklif") ||
    !pBlind159.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind159.mustSay?.includes("sabit bird mesh yok"))
) {
  errors.push("blind prompt #159 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit bird mesh yok");
}

const pBlind160 = PROMPTS.find((x) => x.id === 160);
if (!pBlind160 || !/QSC|amfi/i.test(pBlind160.q)) {
  errors.push("blind prompt #160 must cover sabit QSC invent");
}
if (
  pBlind160 &&
  (!pBlind160.mustSay?.includes("yazılı teklif") ||
    !pBlind160.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind160.mustSay?.includes("sabit QSC yok"))
) {
  errors.push("blind prompt #160 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit QSC yok");
}

const pBlind161 = PROMPTS.find((x) => x.id === 161);
if (!pBlind161 || !/anti-theft screw|hırsızlık önleyici vida/i.test(pBlind161.q)) {
  errors.push("blind prompt #161 must cover sabit anti-theft screw invent");
}
if (
  pBlind161 &&
  (!pBlind161.mustSay?.includes("yazılı teklif") ||
    !pBlind161.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind161.mustSay?.includes("sabit anti-theft screw yok"))
) {
  errors.push("blind prompt #161 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit anti-theft screw yok");
}

const pBlind162 = PROMPTS.find((x) => x.id === 162);
if (!pBlind162 || !/RS-485|seri bus/i.test(pBlind162.q)) {
  errors.push("blind prompt #162 must cover sabit RS-485 invent");
}
if (
  pBlind162 &&
  (!pBlind162.mustSay?.includes("yazılı teklif") ||
    !pBlind162.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind162.mustSay?.includes("sabit RS-485 yok"))
) {
  errors.push("blind prompt #162 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit RS-485 yok");
}

const pBlind163 = PROMPTS.find((x) => x.id === 163);
if (!pBlind163 || !/bird spike|kuş dikeni/i.test(pBlind163.q)) {
  errors.push("blind prompt #163 must cover sabit bird spike invent");
}
if (
  pBlind163 &&
  (!pBlind163.mustSay?.includes("yazılı teklif") ||
    !pBlind163.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind163.mustSay?.includes("sabit bird spike yok"))
) {
  errors.push("blind prompt #163 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit bird spike yok");
}

const pBlind164 = PROMPTS.find((x) => x.id === 164);
if (!pBlind164 || !/Kramer|AV matrix/i.test(pBlind164.q)) {
  errors.push("blind prompt #164 must cover sabit Kramer invent");
}
if (
  pBlind164 &&
  (!pBlind164.mustSay?.includes("yazılı teklif") ||
    !pBlind164.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind164.mustSay?.includes("sabit Kramer yok"))
) {
  errors.push("blind prompt #164 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Kramer yok");
}

const pBlind165 = PROMPTS.find((x) => x.id === 165);
if (!pBlind165 || !/expansion joint|genleşme derzi/i.test(pBlind165.q)) {
  errors.push("blind prompt #165 must cover sabit expansion joint invent");
}
if (
  pBlind165 &&
  (!pBlind165.mustSay?.includes("yazılı teklif") ||
    !pBlind165.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind165.mustSay?.includes("sabit expansion joint yok"))
) {
  errors.push("blind prompt #165 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit expansion joint yok");
}

const pBlind166 = PROMPTS.find((x) => x.id === 166);
if (!pBlind166 || !/Shure|mikrofon/i.test(pBlind166.q)) {
  errors.push("blind prompt #166 must cover sabit Shure invent");
}
if (
  pBlind166 &&
  (!pBlind166.mustSay?.includes("yazılı teklif") ||
    !pBlind166.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind166.mustSay?.includes("sabit Shure yok"))
) {
  errors.push("blind prompt #166 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Shure yok");
}

const pBlind167 = PROMPTS.find((x) => x.id === 167);
if (!pBlind167 || !/snow load|kar yükü/i.test(pBlind167.q)) {
  errors.push("blind prompt #167 must cover sabit snow load invent");
}
if (
  pBlind167 &&
  (!pBlind167.mustSay?.includes("yazılı teklif") ||
    !pBlind167.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind167.mustSay?.includes("sabit snow load yok"))
) {
  errors.push("blind prompt #167 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit snow load yok");
}

const pBlind168 = PROMPTS.find((x) => x.id === 168);
if (!pBlind168 || !/Symetrix|DSP/i.test(pBlind168.q)) {
  errors.push("blind prompt #168 must cover sabit Symetrix invent");
}
if (
  pBlind168 &&
  (!pBlind168.mustSay?.includes("yazılı teklif") ||
    !pBlind168.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind168.mustSay?.includes("sabit Symetrix yok"))
) {
  errors.push("blind prompt #168 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Symetrix yok");
}

const pBlind169 = PROMPTS.find((x) => x.id === 169);
if (!pBlind169 || !/cable tray|kablo kanalı/i.test(pBlind169.q)) {
  errors.push("blind prompt #169 must cover sabit cable tray invent");
}
if (
  pBlind169 &&
  (!pBlind169.mustSay?.includes("yazılı teklif") ||
    !pBlind169.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind169.mustSay?.includes("sabit cable tray yok"))
) {
  errors.push("blind prompt #169 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit cable tray yok");
}

const pBlind170 = PROMPTS.find((x) => x.id === 170);
if (!pBlind170 || !/Atlona|AV over IP/i.test(pBlind170.q)) {
  errors.push("blind prompt #170 must cover sabit Atlona invent");
}
if (
  pBlind170 &&
  (!pBlind170.mustSay?.includes("yazılı teklif") ||
    !pBlind170.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind170.mustSay?.includes("sabit Atlona yok"))
) {
  errors.push("blind prompt #170 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Atlona yok");
}

const pBlind171 = PROMPTS.find((x) => x.id === 171);
if (!pBlind171 || !/sun shade|güneş siperi/i.test(pBlind171.q)) {
  errors.push("blind prompt #171 must cover sabit sun shade invent");
}
if (
  pBlind171 &&
  (!pBlind171.mustSay?.includes("yazılı teklif") ||
    !pBlind171.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind171.mustSay?.includes("sabit sun shade yok"))
) {
  errors.push("blind prompt #171 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit sun shade yok");
}

const pBlind172 = PROMPTS.find((x) => x.id === 172);
if (!pBlind172 || !/Zoom Room|soft codec/i.test(pBlind172.q)) {
  errors.push("blind prompt #172 must cover sabit Zoom Room invent");
}
if (
  pBlind172 &&
  (!pBlind172.mustSay?.includes("yazılı teklif") ||
    !pBlind172.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind172.mustSay?.includes("sabit Zoom Room yok"))
) {
  errors.push("blind prompt #172 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Zoom Room yok");
}

const pBlind173 = PROMPTS.find((x) => x.id === 173);
if (!pBlind173 || !/vandal guard|vandal koruma/i.test(pBlind173.q)) {
  errors.push("blind prompt #173 must cover sabit vandal guard invent");
}
if (
  pBlind173 &&
  (!pBlind173.mustSay?.includes("yazılı teklif") ||
    !pBlind173.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind173.mustSay?.includes("sabit vandal guard yok"))
) {
  errors.push("blind prompt #173 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit vandal guard yok");
}

const pBlind174 = PROMPTS.find((x) => x.id === 174);
if (!pBlind174 || !/Teams Room|soft conferencing/i.test(pBlind174.q)) {
  errors.push("blind prompt #174 must cover sabit Teams Room invent");
}
if (
  pBlind174 &&
  (!pBlind174.mustSay?.includes("yazılı teklif") ||
    !pBlind174.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind174.mustSay?.includes("sabit Teams Room yok"))
) {
  errors.push("blind prompt #174 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Teams Room yok");
}

const pBlind175 = PROMPTS.find((x) => x.id === 175);
if (!pBlind175 || !/lightning rod|paratoner/i.test(pBlind175.q)) {
  errors.push("blind prompt #175 must cover sabit lightning rod invent");
}
if (
  pBlind175 &&
  (!pBlind175.mustSay?.includes("yazılı teklif") ||
    !pBlind175.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind175.mustSay?.includes("sabit lightning rod yok"))
) {
  errors.push("blind prompt #175 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit lightning rod yok");
}

const pBlind176 = PROMPTS.find((x) => x.id === 176);
if (!pBlind176 || !/Webex Room|soft conferencing/i.test(pBlind176.q)) {
  errors.push("blind prompt #176 must cover sabit Webex Room invent");
}
if (
  pBlind176 &&
  (!pBlind176.mustSay?.includes("yazılı teklif") ||
    !pBlind176.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind176.mustSay?.includes("sabit Webex Room yok"))
) {
  errors.push("blind prompt #176 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Webex Room yok");
}

const pBlind177 = PROMPTS.find((x) => x.id === 177);
if (!pBlind177 || !/sill flashing|eşik flaşörü/i.test(pBlind177.q)) {
  errors.push("blind prompt #177 must cover sabit sill flashing invent");
}
if (
  pBlind177 &&
  (!pBlind177.mustSay?.includes("yazılı teklif") ||
    !pBlind177.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind177.mustSay?.includes("sabit sill flashing yok"))
) {
  errors.push("blind prompt #177 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit sill flashing yok");
}

const pBlind178 = PROMPTS.find((x) => x.id === 178);
if (!pBlind178 || !/ClickShare|kablosuz sunum/i.test(pBlind178.q)) {
  errors.push("blind prompt #178 must cover sabit ClickShare invent");
}
if (
  pBlind178 &&
  (!pBlind178.mustSay?.includes("yazılı teklif") ||
    !pBlind178.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind178.mustSay?.includes("sabit ClickShare yok"))
) {
  errors.push("blind prompt #178 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ClickShare yok");
}

const pBlind179 = PROMPTS.find((x) => x.id === 179);
if (!pBlind179 || !/seismic brace|sismik destek/i.test(pBlind179.q)) {
  errors.push("blind prompt #179 must cover sabit seismic brace invent");
}
if (
  pBlind179 &&
  (!pBlind179.mustSay?.includes("yazılı teklif") ||
    !pBlind179.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind179.mustSay?.includes("sabit seismic brace yok"))
) {
  errors.push("blind prompt #179 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit seismic brace yok");
}

const pBlind180 = PROMPTS.find((x) => x.id === 180);
if (!pBlind180 || !/AirMedia|kablosuz paylaşım/i.test(pBlind180.q)) {
  errors.push("blind prompt #180 must cover sabit AirMedia invent");
}
if (
  pBlind180 &&
  (!pBlind180.mustSay?.includes("yazılı teklif") ||
    !pBlind180.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind180.mustSay?.includes("sabit AirMedia yok"))
) {
  errors.push("blind prompt #180 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit AirMedia yok");
}

const pBlind181 = PROMPTS.find((x) => x.id === 181);
if (!pBlind181 || !/chemical anchor|kimyasal dübel/i.test(pBlind181.q)) {
  errors.push("blind prompt #181 must cover sabit chemical anchor invent");
}
if (
  pBlind181 &&
  (!pBlind181.mustSay?.includes("yazılı teklif") ||
    !pBlind181.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind181.mustSay?.includes("sabit chemical anchor yok"))
) {
  errors.push("blind prompt #181 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit chemical anchor yok");
}

const pBlind182 = PROMPTS.find((x) => x.id === 182);
if (!pBlind182 || !/Solstice|kablosuz collab/i.test(pBlind182.q)) {
  errors.push("blind prompt #182 must cover sabit Solstice invent");
}
if (
  pBlind182 &&
  (!pBlind182.mustSay?.includes("yazılı teklif") ||
    !pBlind182.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind182.mustSay?.includes("sabit Solstice yok"))
) {
  errors.push("blind prompt #182 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Solstice yok");
}

const pBlind183 = PROMPTS.find((x) => x.id === 183);
if (!pBlind183 || !/counter flashing|karşı flaşör/i.test(pBlind183.q)) {
  errors.push("blind prompt #183 must cover sabit counter flashing invent");
}
if (
  pBlind183 &&
  (!pBlind183.mustSay?.includes("yazılı teklif") ||
    !pBlind183.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind183.mustSay?.includes("sabit counter flashing yok"))
) {
  errors.push("blind prompt #183 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit counter flashing yok");
}

const pBlind184 = PROMPTS.find((x) => x.id === 184);
if (!pBlind184 || !/Google Meet|soft conferencing/i.test(pBlind184.q)) {
  errors.push("blind prompt #184 must cover sabit Google Meet invent");
}
if (
  pBlind184 &&
  (!pBlind184.mustSay?.includes("yazılı teklif") ||
    !pBlind184.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind184.mustSay?.includes("sabit Google Meet yok"))
) {
  errors.push("blind prompt #184 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Google Meet yok");
}

const pBlind185 = PROMPTS.find((x) => x.id === 185);
if (!pBlind185 || !/neoprene gasket|neopren conta/i.test(pBlind185.q)) {
  errors.push("blind prompt #185 must cover sabit neoprene gasket invent");
}
if (
  pBlind185 &&
  (!pBlind185.mustSay?.includes("yazılı teklif") ||
    !pBlind185.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind185.mustSay?.includes("sabit neoprene gasket yok"))
) {
  errors.push("blind prompt #185 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit neoprene gasket yok");
}

const pBlind186 = PROMPTS.find((x) => x.id === 186);
if (!pBlind186 || !/Yealink|UC endpoint/i.test(pBlind186.q)) {
  errors.push("blind prompt #186 must cover sabit Yealink invent");
}
if (
  pBlind186 &&
  (!pBlind186.mustSay?.includes("yazılı teklif") ||
    !pBlind186.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind186.mustSay?.includes("sabit Yealink yok"))
) {
  errors.push("blind prompt #186 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Yealink yok");
}

const pBlind187 = PROMPTS.find((x) => x.id === 187);
if (!pBlind187 || !/frost heave|don kabarması/i.test(pBlind187.q)) {
  errors.push("blind prompt #187 must cover sabit frost heave invent");
}
if (
  pBlind187 &&
  (!pBlind187.mustSay?.includes("yazılı teklif") ||
    !pBlind187.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind187.mustSay?.includes("sabit frost heave yok"))
) {
  errors.push("blind prompt #187 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit frost heave yok");
}

const pBlind188 = PROMPTS.find((x) => x.id === 188);
if (!pBlind188 || !/Logitech Rally|kamera bar/i.test(pBlind188.q)) {
  errors.push("blind prompt #188 must cover sabit Logitech Rally invent");
}
if (
  pBlind188 &&
  (!pBlind188.mustSay?.includes("yazılı teklif") ||
    !pBlind188.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind188.mustSay?.includes("sabit Logitech Rally yok"))
) {
  errors.push("blind prompt #188 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Logitech Rally yok");
}

const pBlind189 = PROMPTS.find((x) => x.id === 189);
if (!pBlind189 || !/insect screen|böcek filesi/i.test(pBlind189.q)) {
  errors.push("blind prompt #189 must cover sabit insect screen invent");
}
if (
  pBlind189 &&
  (!pBlind189.mustSay?.includes("yazılı teklif") ||
    !pBlind189.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind189.mustSay?.includes("sabit insect screen yok"))
) {
  errors.push("blind prompt #189 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit insect screen yok");
}

const pBlind190 = PROMPTS.find((x) => x.id === 190);
if (!pBlind190 || !/Neat Board|collab bar/i.test(pBlind190.q)) {
  errors.push("blind prompt #190 must cover sabit Neat Board invent");
}
if (
  pBlind190 &&
  (!pBlind190.mustSay?.includes("yazılı teklif") ||
    !pBlind190.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind190.mustSay?.includes("sabit Neat Board yok"))
) {
  errors.push("blind prompt #190 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Neat Board yok");
}

const pBlind191 = PROMPTS.find((x) => x.id === 191);
if (!pBlind191 || !/condensation drain|yoğuşma drenajı/i.test(pBlind191.q)) {
  errors.push("blind prompt #191 must cover sabit condensation drain invent");
}
if (
  pBlind191 &&
  (!pBlind191.mustSay?.includes("yazılı teklif") ||
    !pBlind191.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind191.mustSay?.includes("sabit condensation drain yok"))
) {
  errors.push("blind prompt #191 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit condensation drain yok");
}

const pBlind192 = PROMPTS.find((x) => x.id === 192);
if (!pBlind192 || !/Polycom|Poly Studio/i.test(pBlind192.q)) {
  errors.push("blind prompt #192 must cover sabit Polycom invent");
}
if (
  pBlind192 &&
  (!pBlind192.mustSay?.includes("yazılı teklif") ||
    !pBlind192.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind192.mustSay?.includes("sabit Polycom yok"))
) {
  errors.push("blind prompt #192 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Polycom yok");
}

const pBlind193 = PROMPTS.find((x) => x.id === 193);
if (!pBlind193 || !/vapor barrier|buhar bariyeri/i.test(pBlind193.q)) {
  errors.push("blind prompt #193 must cover sabit vapor barrier invent");
}
if (
  pBlind193 &&
  (!pBlind193.mustSay?.includes("yazılı teklif") ||
    !pBlind193.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind193.mustSay?.includes("sabit vapor barrier yok"))
) {
  errors.push("blind prompt #193 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit vapor barrier yok");
}

const pBlind194 = PROMPTS.find((x) => x.id === 194);
if (!pBlind194 || !/Jabra|PanaCast/i.test(pBlind194.q)) {
  errors.push("blind prompt #194 must cover sabit Jabra invent");
}
if (
  pBlind194 &&
  (!pBlind194.mustSay?.includes("yazılı teklif") ||
    !pBlind194.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind194.mustSay?.includes("sabit Jabra yok"))
) {
  errors.push("blind prompt #194 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Jabra yok");
}

const pBlind195 = PROMPTS.find((x) => x.id === 195);
if (!pBlind195 || !/scupper|scupper drenaj/i.test(pBlind195.q)) {
  errors.push("blind prompt #195 must cover sabit scupper invent");
}
if (
  pBlind195 &&
  (!pBlind195.mustSay?.includes("yazılı teklif") ||
    !pBlind195.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind195.mustSay?.includes("sabit scupper yok"))
) {
  errors.push("blind prompt #195 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit scupper yok");
}

const pBlind196 = PROMPTS.find((x) => x.id === 196);
if (!pBlind196 || !/Meeting Owl|Owl Labs/i.test(pBlind196.q)) {
  errors.push("blind prompt #196 must cover sabit Meeting Owl invent");
}
if (
  pBlind196 &&
  (!pBlind196.mustSay?.includes("yazılı teklif") ||
    !pBlind196.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind196.mustSay?.includes("sabit Meeting Owl yok"))
) {
  errors.push("blind prompt #196 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Meeting Owl yok");
}

const pBlind197 = PROMPTS.find((x) => x.id === 197);
if (!pBlind197 || !/parapet flashing|parapet flaşörü/i.test(pBlind197.q)) {
  errors.push("blind prompt #197 must cover sabit parapet flashing invent");
}
if (
  pBlind197 &&
  (!pBlind197.mustSay?.includes("yazılı teklif") ||
    !pBlind197.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind197.mustSay?.includes("sabit parapet flashing yok"))
) {
  errors.push("blind prompt #197 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit parapet flashing yok");
}

const pBlind198 = PROMPTS.find((x) => x.id === 198);
if (!pBlind198 || !/Huddly|kamera/i.test(pBlind198.q)) {
  errors.push("blind prompt #198 must cover sabit Huddly invent");
}
if (
  pBlind198 &&
  (!pBlind198.mustSay?.includes("yazılı teklif") ||
    !pBlind198.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind198.mustSay?.includes("sabit Huddly yok"))
) {
  errors.push("blind prompt #198 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Huddly yok");
}

const pBlind199 = PROMPTS.find((x) => x.id === 199);
if (!pBlind199 || !/ice dam|buz bariyeri/i.test(pBlind199.q)) {
  errors.push("blind prompt #199 must cover sabit ice dam invent");
}
if (
  pBlind199 &&
  (!pBlind199.mustSay?.includes("yazılı teklif") ||
    !pBlind199.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind199.mustSay?.includes("sabit ice dam yok"))
) {
  errors.push("blind prompt #199 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ice dam yok");
}

const pBlind200 = PROMPTS.find((x) => x.id === 200);
if (!pBlind200 || !/DTEN|all-in-one/i.test(pBlind200.q)) {
  errors.push("blind prompt #200 must cover sabit DTEN invent");
}
if (
  pBlind200 &&
  (!pBlind200.mustSay?.includes("yazılı teklif") ||
    !pBlind200.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind200.mustSay?.includes("sabit DTEN yok"))
) {
  errors.push("blind prompt #200 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit DTEN yok");
}

const pBlind201 = PROMPTS.find((x) => x.id === 201);
if (!pBlind201 || !/downspout|yağmur inişi/i.test(pBlind201.q)) {
  errors.push("blind prompt #201 must cover sabit downspout invent");
}
if (
  pBlind201 &&
  (!pBlind201.mustSay?.includes("yazılı teklif") ||
    !pBlind201.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind201.mustSay?.includes("sabit downspout yok"))
) {
  errors.push("blind prompt #201 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit downspout yok");
}

const pBlind202 = PROMPTS.find((x) => x.id === 202);
if (!pBlind202 || !/Maxhub|interactive panel/i.test(pBlind202.q)) {
  errors.push("blind prompt #202 must cover sabit Maxhub invent");
}
if (
  pBlind202 &&
  (!pBlind202.mustSay?.includes("yazılı teklif") ||
    !pBlind202.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind202.mustSay?.includes("sabit Maxhub yok"))
) {
  errors.push("blind prompt #202 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Maxhub yok");
}

const pBlind203 = PROMPTS.find((x) => x.id === 203);
if (!pBlind203 || !/gutter|oluk/i.test(pBlind203.q)) {
  errors.push("blind prompt #203 must cover sabit gutter invent");
}
if (
  pBlind203 &&
  (!pBlind203.mustSay?.includes("yazılı teklif") ||
    !pBlind203.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind203.mustSay?.includes("sabit gutter yok"))
) {
  errors.push("blind prompt #203 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit gutter yok");
}

const pBlind204 = PROMPTS.find((x) => x.id === 204);
if (!pBlind204 || !/ClearOne|conferencing/i.test(pBlind204.q)) {
  errors.push("blind prompt #204 must cover sabit ClearOne invent");
}
if (
  pBlind204 &&
  (!pBlind204.mustSay?.includes("yazılı teklif") ||
    !pBlind204.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind204.mustSay?.includes("sabit ClearOne yok"))
) {
  errors.push("blind prompt #204 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ClearOne yok");
}

const pBlind205 = PROMPTS.find((x) => x.id === 205);
if (!pBlind205 || !/ridge vent|mahya havalandırma/i.test(pBlind205.q)) {
  errors.push("blind prompt #205 must cover sabit ridge vent invent");
}
if (
  pBlind205 &&
  (!pBlind205.mustSay?.includes("yazılı teklif") ||
    !pBlind205.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind205.mustSay?.includes("sabit ridge vent yok"))
) {
  errors.push("blind prompt #205 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ridge vent yok");
}

const pBlind206 = PROMPTS.find((x) => x.id === 206);
if (!pBlind206 || !/AVer|PTZ/i.test(pBlind206.q)) {
  errors.push("blind prompt #206 must cover sabit AVer invent");
}
if (
  pBlind206 &&
  (!pBlind206.mustSay?.includes("yazılı teklif") ||
    !pBlind206.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind206.mustSay?.includes("sabit AVer yok"))
) {
  errors.push("blind prompt #206 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit AVer yok");
}

const pBlind207 = PROMPTS.find((x) => x.id === 207);
if (!pBlind207 || !/soffit vent|saçak havalandırma/i.test(pBlind207.q)) {
  errors.push("blind prompt #207 must cover sabit soffit vent invent");
}
if (
  pBlind207 &&
  (!pBlind207.mustSay?.includes("yazılı teklif") ||
    !pBlind207.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind207.mustSay?.includes("sabit soffit vent yok"))
) {
  errors.push("blind prompt #207 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit soffit vent yok");
}

const pBlind208 = PROMPTS.find((x) => x.id === 208);
if (!pBlind208 || !/Nureva|microphone array/i.test(pBlind208.q)) {
  errors.push("blind prompt #208 must cover sabit Nureva invent");
}
if (
  pBlind208 &&
  (!pBlind208.mustSay?.includes("yazılı teklif") ||
    !pBlind208.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind208.mustSay?.includes("sabit Nureva yok"))
) {
  errors.push("blind prompt #208 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Nureva yok");
}

const pBlind209 = PROMPTS.find((x) => x.id === 209);
if (!pBlind209 || !/cricket flashing|baca flaşı/i.test(pBlind209.q)) {
  errors.push("blind prompt #209 must cover sabit cricket flashing invent");
}
if (
  pBlind209 &&
  (!pBlind209.mustSay?.includes("yazılı teklif") ||
    !pBlind209.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind209.mustSay?.includes("sabit cricket flashing yok"))
) {
  errors.push("blind prompt #209 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit cricket flashing yok");
}

const pBlind210 = PROMPTS.find((x) => x.id === 210);
if (!pBlind210 || !/Sennheiser|ceiling mic/i.test(pBlind210.q)) {
  errors.push("blind prompt #210 must cover sabit Sennheiser invent");
}
if (
  pBlind210 &&
  (!pBlind210.mustSay?.includes("yazılı teklif") ||
    !pBlind210.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind210.mustSay?.includes("sabit Sennheiser yok"))
) {
  errors.push("blind prompt #210 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Sennheiser yok");
}

const pBlind211 = PROMPTS.find((x) => x.id === 211);
if (!pBlind211 || !/kick-out flashing|çıkış flaşı/i.test(pBlind211.q)) {
  errors.push("blind prompt #211 must cover sabit kick-out flashing invent");
}
if (
  pBlind211 &&
  (!pBlind211.mustSay?.includes("yazılı teklif") ||
    !pBlind211.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind211.mustSay?.includes("sabit kick-out flashing yok"))
) {
  errors.push("blind prompt #211 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit kick-out flashing yok");
}

const pBlind212 = PROMPTS.find((x) => x.id === 212);
if (!pBlind212 || !/Vaddio|PTZ camera/i.test(pBlind212.q)) {
  errors.push("blind prompt #212 must cover sabit Vaddio invent");
}
if (
  pBlind212 &&
  (!pBlind212.mustSay?.includes("yazılı teklif") ||
    !pBlind212.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind212.mustSay?.includes("sabit Vaddio yok"))
) {
  errors.push("blind prompt #212 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Vaddio yok");
}

const pBlind213 = PROMPTS.find((x) => x.id === 213);
if (!pBlind213 || !/valley flashing|vadi flaşı/i.test(pBlind213.q)) {
  errors.push("blind prompt #213 must cover sabit valley flashing invent");
}
if (
  pBlind213 &&
  (!pBlind213.mustSay?.includes("yazılı teklif") ||
    !pBlind213.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind213.mustSay?.includes("sabit valley flashing yok"))
) {
  errors.push("blind prompt #213 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit valley flashing yok");
}

const pBlind214 = PROMPTS.find((x) => x.id === 214);
if (!pBlind214 || !/Lifesize|video room/i.test(pBlind214.q)) {
  errors.push("blind prompt #214 must cover sabit Lifesize invent");
}
if (
  pBlind214 &&
  (!pBlind214.mustSay?.includes("yazılı teklif") ||
    !pBlind214.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind214.mustSay?.includes("sabit Lifesize yok"))
) {
  errors.push("blind prompt #214 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Lifesize yok");
}

const pBlind215 = PROMPTS.find((x) => x.id === 215);
if (!pBlind215 || !/step flashing|basamak flaş/i.test(pBlind215.q)) {
  errors.push("blind prompt #215 must cover sabit step flashing invent");
}
if (
  pBlind215 &&
  (!pBlind215.mustSay?.includes("yazılı teklif") ||
    !pBlind215.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind215.mustSay?.includes("sabit step flashing yok"))
) {
  errors.push("blind prompt #215 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit step flashing yok");
}

const pBlind216 = PROMPTS.find((x) => x.id === 216);
if (!pBlind216 || !/Bose|soundbar/i.test(pBlind216.q)) {
  errors.push("blind prompt #216 must cover sabit Bose invent");
}
if (
  pBlind216 &&
  (!pBlind216.mustSay?.includes("yazılı teklif") ||
    !pBlind216.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind216.mustSay?.includes("sabit Bose yok"))
) {
  errors.push("blind prompt #216 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Bose yok");
}

const pBlind217 = PROMPTS.find((x) => x.id === 217);
if (!pBlind217 || !/apron flashing|etek flaş/i.test(pBlind217.q)) {
  errors.push("blind prompt #217 must cover sabit apron flashing invent");
}
if (
  pBlind217 &&
  (!pBlind217.mustSay?.includes("yazılı teklif") ||
    !pBlind217.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind217.mustSay?.includes("sabit apron flashing yok"))
) {
  errors.push("blind prompt #217 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit apron flashing yok");
}

const pBlind218 = PROMPTS.find((x) => x.id === 218);
if (!pBlind218 || !/BirdDog|NDI PTZ/i.test(pBlind218.q)) {
  errors.push("blind prompt #218 must cover sabit BirdDog invent");
}
if (
  pBlind218 &&
  (!pBlind218.mustSay?.includes("yazılı teklif") ||
    !pBlind218.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind218.mustSay?.includes("sabit BirdDog yok"))
) {
  errors.push("blind prompt #218 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit BirdDog yok");
}

const pBlind219 = PROMPTS.find((x) => x.id === 219);
if (!pBlind219 || !/chimney flashing|baca flaşı/i.test(pBlind219.q)) {
  errors.push("blind prompt #219 must cover sabit chimney flashing invent");
}
if (
  pBlind219 &&
  (!pBlind219.mustSay?.includes("yazılı teklif") ||
    !pBlind219.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind219.mustSay?.includes("sabit chimney flashing yok"))
) {
  errors.push("blind prompt #219 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit chimney flashing yok");
}

const pBlind220 = PROMPTS.find((x) => x.id === 220);
if (!pBlind220 || !/Pexip|conference platform/i.test(pBlind220.q)) {
  errors.push("blind prompt #220 must cover sabit Pexip invent");
}
if (
  pBlind220 &&
  (!pBlind220.mustSay?.includes("yazılı teklif") ||
    !pBlind220.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind220.mustSay?.includes("sabit Pexip yok"))
) {
  errors.push("blind prompt #220 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Pexip yok");
}

const pBlind221 = PROMPTS.find((x) => x.id === 221);
if (!pBlind221 || !/hip flashing|kalça flaş/i.test(pBlind221.q)) {
  errors.push("blind prompt #221 must cover sabit hip flashing invent");
}
if (
  pBlind221 &&
  (!pBlind221.mustSay?.includes("yazılı teklif") ||
    !pBlind221.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind221.mustSay?.includes("sabit hip flashing yok"))
) {
  errors.push("blind prompt #221 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit hip flashing yok");
}

const pBlind222 = PROMPTS.find((x) => x.id === 222);
if (!pBlind222 || !/Lumens|PTZ camera/i.test(pBlind222.q)) {
  errors.push("blind prompt #222 must cover sabit Lumens invent");
}
if (
  pBlind222 &&
  (!pBlind222.mustSay?.includes("yazılı teklif") ||
    !pBlind222.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind222.mustSay?.includes("sabit Lumens yok"))
) {
  errors.push("blind prompt #222 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Lumens yok");
}

const pBlind223 = PROMPTS.find((x) => x.id === 223);
if (!pBlind223 || !/rake flashing|saçak flaş/i.test(pBlind223.q)) {
  errors.push("blind prompt #223 must cover sabit rake flashing invent");
}
if (
  pBlind223 &&
  (!pBlind223.mustSay?.includes("yazılı teklif") ||
    !pBlind223.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind223.mustSay?.includes("sabit rake flashing yok"))
) {
  errors.push("blind prompt #223 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit rake flashing yok");
}

const pBlind224 = PROMPTS.find((x) => x.id === 224);
if (!pBlind224 || !/PTZOptics|USB PTZ/i.test(pBlind224.q)) {
  errors.push("blind prompt #224 must cover sabit PTZOptics invent");
}
if (
  pBlind224 &&
  (!pBlind224.mustSay?.includes("yazılı teklif") ||
    !pBlind224.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind224.mustSay?.includes("sabit PTZOptics yok"))
) {
  errors.push("blind prompt #224 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit PTZOptics yok");
}

const pBlind225 = PROMPTS.find((x) => x.id === 225);
if (!pBlind225 || !/fascia flashing|fascia flaş/i.test(pBlind225.q)) {
  errors.push("blind prompt #225 must cover sabit fascia flashing invent");
}
if (
  pBlind225 &&
  (!pBlind225.mustSay?.includes("yazılı teklif") ||
    !pBlind225.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind225.mustSay?.includes("sabit fascia flashing yok"))
) {
  errors.push("blind prompt #225 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit fascia flashing yok");
}

const pBlind226 = PROMPTS.find((x) => x.id === 226);
if (!pBlind226 || !/Obsbot|AI camera/i.test(pBlind226.q)) {
  errors.push("blind prompt #226 must cover sabit Obsbot invent");
}
if (
  pBlind226 &&
  (!pBlind226.mustSay?.includes("yazılı teklif") ||
    !pBlind226.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind226.mustSay?.includes("sabit Obsbot yok"))
) {
  errors.push("blind prompt #226 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Obsbot yok");
}

const pBlind227 = PROMPTS.find((x) => x.id === 227);
if (!pBlind227 || !/head flashing|başlık flaş/i.test(pBlind227.q)) {
  errors.push("blind prompt #227 must cover sabit head flashing invent");
}
if (
  pBlind227 &&
  (!pBlind227.mustSay?.includes("yazılı teklif") ||
    !pBlind227.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind227.mustSay?.includes("sabit head flashing yok"))
) {
  errors.push("blind prompt #227 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit head flashing yok");
}

const pBlind228 = PROMPTS.find((x) => x.id === 228);
if (!pBlind228 || !/Barco|projector/i.test(pBlind228.q)) {
  errors.push("blind prompt #228 must cover sabit Barco invent");
}
if (
  pBlind228 &&
  (!pBlind228.mustSay?.includes("yazılı teklif") ||
    !pBlind228.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind228.mustSay?.includes("sabit Barco yok"))
) {
  errors.push("blind prompt #228 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Barco yok");
}

const pBlind229 = PROMPTS.find((x) => x.id === 229);
if (!pBlind229 || !/jamb flashing|jamb flaş/i.test(pBlind229.q)) {
  errors.push("blind prompt #229 must cover sabit jamb flashing invent");
}
if (
  pBlind229 &&
  (!pBlind229.mustSay?.includes("yazılı teklif") ||
    !pBlind229.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind229.mustSay?.includes("sabit jamb flashing yok"))
) {
  errors.push("blind prompt #229 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit jamb flashing yok");
}

const pBlind230 = PROMPTS.find((x) => x.id === 230);
if (!pBlind230 || !/Christie|laser projector/i.test(pBlind230.q)) {
  errors.push("blind prompt #230 must cover sabit Christie invent");
}
if (
  pBlind230 &&
  (!pBlind230.mustSay?.includes("yazılı teklif") ||
    !pBlind230.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind230.mustSay?.includes("sabit Christie yok"))
) {
  errors.push("blind prompt #230 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Christie yok");
}

const pBlind231 = PROMPTS.find((x) => x.id === 231);
if (!pBlind231 || !/threshold flashing|eşik flaş/i.test(pBlind231.q)) {
  errors.push("blind prompt #231 must cover sabit threshold flashing invent");
}
if (
  pBlind231 &&
  (!pBlind231.mustSay?.includes("yazılı teklif") ||
    !pBlind231.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind231.mustSay?.includes("sabit threshold flashing yok"))
) {
  errors.push("blind prompt #231 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit threshold flashing yok");
}

const pBlind232 = PROMPTS.find((x) => x.id === 232);
if (!pBlind232 || !/Epson|LCD projector/i.test(pBlind232.q)) {
  errors.push("blind prompt #232 must cover sabit Epson invent");
}
if (
  pBlind232 &&
  (!pBlind232.mustSay?.includes("yazılı teklif") ||
    !pBlind232.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind232.mustSay?.includes("sabit Epson yok"))
) {
  errors.push("blind prompt #232 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Epson yok");
}

const pBlind233 = PROMPTS.find((x) => x.id === 233);
if (!pBlind233 || !/gravel stop|çakıl stoper/i.test(pBlind233.q)) {
  errors.push("blind prompt #233 must cover sabit gravel stop invent");
}
if (
  pBlind233 &&
  (!pBlind233.mustSay?.includes("yazılı teklif") ||
    !pBlind233.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind233.mustSay?.includes("sabit gravel stop yok"))
) {
  errors.push("blind prompt #233 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit gravel stop yok");
}

const pBlind234 = PROMPTS.find((x) => x.id === 234);
if (!pBlind234 || !/NEC|display wall/i.test(pBlind234.q)) {
  errors.push("blind prompt #234 must cover sabit NEC invent");
}
if (
  pBlind234 &&
  (!pBlind234.mustSay?.includes("yazılı teklif") ||
    !pBlind234.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind234.mustSay?.includes("sabit NEC yok"))
) {
  errors.push("blind prompt #234 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit NEC yok");
}

const pBlind235 = PROMPTS.find((x) => x.id === 235);
if (!pBlind235 || !/cant strip|eğimli şerit/i.test(pBlind235.q)) {
  errors.push("blind prompt #235 must cover sabit cant strip invent");
}
if (
  pBlind235 &&
  (!pBlind235.mustSay?.includes("yazılı teklif") ||
    !pBlind235.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind235.mustSay?.includes("sabit cant strip yok"))
) {
  errors.push("blind prompt #235 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit cant strip yok");
}

const pBlind236 = PROMPTS.find((x) => x.id === 236);
if (!pBlind236 || !/Panasonic|pro display/i.test(pBlind236.q)) {
  errors.push("blind prompt #236 must cover sabit Panasonic invent");
}
if (
  pBlind236 &&
  (!pBlind236.mustSay?.includes("yazılı teklif") ||
    !pBlind236.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind236.mustSay?.includes("sabit Panasonic yok"))
) {
  errors.push("blind prompt #236 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Panasonic yok");
}

const pBlind237 = PROMPTS.find((x) => x.id === 237);
if (!pBlind237 || !/reglet|reglet flaş/i.test(pBlind237.q)) {
  errors.push("blind prompt #237 must cover sabit reglet invent");
}
if (
  pBlind237 &&
  (!pBlind237.mustSay?.includes("yazılı teklif") ||
    !pBlind237.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind237.mustSay?.includes("sabit reglet yok"))
) {
  errors.push("blind prompt #237 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit reglet yok");
}

const pBlind238 = PROMPTS.find((x) => x.id === 238);
if (!pBlind238 || !/Optoma|DLP projector/i.test(pBlind238.q)) {
  errors.push("blind prompt #238 must cover sabit Optoma invent");
}
if (
  pBlind238 &&
  (!pBlind238.mustSay?.includes("yazılı teklif") ||
    !pBlind238.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind238.mustSay?.includes("sabit Optoma yok"))
) {
  errors.push("blind prompt #238 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Optoma yok");
}

const pBlind239 = PROMPTS.find((x) => x.id === 239);
if (!pBlind239 || !/termination bar|bitiş çubuğu/i.test(pBlind239.q)) {
  errors.push("blind prompt #239 must cover sabit termination bar invent");
}
if (
  pBlind239 &&
  (!pBlind239.mustSay?.includes("yazılı teklif") ||
    !pBlind239.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind239.mustSay?.includes("sabit termination bar yok"))
) {
  errors.push("blind prompt #239 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit termination bar yok");
}

const pBlind240 = PROMPTS.find((x) => x.id === 240);
if (!pBlind240 || !/BenQ|interactive display/i.test(pBlind240.q)) {
  errors.push("blind prompt #240 must cover sabit BenQ invent");
}
if (
  pBlind240 &&
  (!pBlind240.mustSay?.includes("yazılı teklif") ||
    !pBlind240.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind240.mustSay?.includes("sabit BenQ yok"))
) {
  errors.push("blind prompt #240 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit BenQ yok");
}

const pBlind241 = PROMPTS.find((x) => x.id === 241);
if (!pBlind241 || !/through-wall flashing|duvar geçiş flaşı/i.test(pBlind241.q)) {
  errors.push("blind prompt #241 must cover sabit through-wall flashing invent");
}
if (
  pBlind241 &&
  (!pBlind241.mustSay?.includes("yazılı teklif") ||
    !pBlind241.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind241.mustSay?.includes("sabit through-wall flashing yok"))
) {
  errors.push("blind prompt #241 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit through-wall flashing yok");
}

const pBlind242 = PROMPTS.find((x) => x.id === 242);
if (!pBlind242 || !/Sony|BRAVIA display/i.test(pBlind242.q)) {
  errors.push("blind prompt #242 must cover sabit Sony invent");
}
if (
  pBlind242 &&
  (!pBlind242.mustSay?.includes("yazılı teklif") ||
    !pBlind242.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind242.mustSay?.includes("sabit Sony yok"))
) {
  errors.push("blind prompt #242 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Sony yok");
}

const pBlind243 = PROMPTS.find((x) => x.id === 243);
if (!pBlind243 || !/coping|parapet kapak/i.test(pBlind243.q)) {
  errors.push("blind prompt #243 must cover sabit coping invent");
}
if (
  pBlind243 &&
  (!pBlind243.mustSay?.includes("yazılı teklif") ||
    !pBlind243.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind243.mustSay?.includes("sabit coping yok"))
) {
  errors.push("blind prompt #243 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit coping yok");
}

const pBlind244 = PROMPTS.find((x) => x.id === 244);
if (!pBlind244 || !/Airtame|wireless share/i.test(pBlind244.q)) {
  errors.push("blind prompt #244 must cover sabit Airtame invent");
}
if (
  pBlind244 &&
  (!pBlind244.mustSay?.includes("yazılı teklif") ||
    !pBlind244.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind244.mustSay?.includes("sabit Airtame yok"))
) {
  errors.push("blind prompt #244 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Airtame yok");
}

const pBlind245 = PROMPTS.find((x) => x.id === 245);
if (!pBlind245 || !/base flashing|temel flaş/i.test(pBlind245.q)) {
  errors.push("blind prompt #245 must cover sabit base flashing invent");
}
if (
  pBlind245 &&
  (!pBlind245.mustSay?.includes("yazılı teklif") ||
    !pBlind245.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind245.mustSay?.includes("sabit base flashing yok"))
) {
  errors.push("blind prompt #245 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit base flashing yok");
}

const pBlind246 = PROMPTS.find((x) => x.id === 246);
if (!pBlind246 || !/Mersive|Solstice Pod/i.test(pBlind246.q)) {
  errors.push("blind prompt #246 must cover sabit Mersive invent");
}
if (
  pBlind246 &&
  (!pBlind246.mustSay?.includes("yazılı teklif") ||
    !pBlind246.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind246.mustSay?.includes("sabit Mersive yok"))
) {
  errors.push("blind prompt #246 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Mersive yok");
}

const pBlind247 = PROMPTS.find((x) => x.id === 247);
if (!pBlind247 || !/cleat|kleyt/i.test(pBlind247.q)) {
  errors.push("blind prompt #247 must cover sabit cleat invent");
}
if (
  pBlind247 &&
  (!pBlind247.mustSay?.includes("yazılı teklif") ||
    !pBlind247.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind247.mustSay?.includes("sabit cleat yok"))
) {
  errors.push("blind prompt #247 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit cleat yok");
}

const pBlind248 = PROMPTS.find((x) => x.id === 248);
if (!pBlind248 || !/Vivitek|installation projector/i.test(pBlind248.q)) {
  errors.push("blind prompt #248 must cover sabit Vivitek invent");
}
if (
  pBlind248 &&
  (!pBlind248.mustSay?.includes("yazılı teklif") ||
    !pBlind248.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind248.mustSay?.includes("sabit Vivitek yok"))
) {
  errors.push("blind prompt #248 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Vivitek yok");
}

const pBlind249 = PROMPTS.find((x) => x.id === 249);
if (!pBlind249 || !/surface cleat|yüzey kleyt/i.test(pBlind249.q)) {
  errors.push("blind prompt #249 must cover sabit surface cleat invent");
}
if (
  pBlind249 &&
  (!pBlind249.mustSay?.includes("yazılı teklif") ||
    !pBlind249.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind249.mustSay?.includes("sabit surface cleat yok"))
) {
  errors.push("blind prompt #249 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit surface cleat yok");
}

const pBlind250 = PROMPTS.find((x) => x.id === 250);
if (!pBlind250 || !/Promethean|ActivPanel/i.test(pBlind250.q)) {
  errors.push("blind prompt #250 must cover sabit Promethean invent");
}
if (
  pBlind250 &&
  (!pBlind250.mustSay?.includes("yazılı teklif") ||
    !pBlind250.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind250.mustSay?.includes("sabit Promethean yok"))
) {
  errors.push("blind prompt #250 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Promethean yok");
}

const pBlind251 = PROMPTS.find((x) => x.id === 251);
if (!pBlind251 || !/continuous cleat|sürekli kleyt/i.test(pBlind251.q)) {
  errors.push("blind prompt #251 must cover sabit continuous cleat invent");
}
if (
  pBlind251 &&
  (!pBlind251.mustSay?.includes("yazılı teklif") ||
    !pBlind251.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind251.mustSay?.includes("sabit continuous cleat yok"))
) {
  errors.push("blind prompt #251 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit continuous cleat yok");
}

const pBlind252 = PROMPTS.find((x) => x.id === 252);
if (!pBlind252 || !/Newline|IFP display/i.test(pBlind252.q)) {
  errors.push("blind prompt #252 must cover sabit Newline invent");
}
if (
  pBlind252 &&
  (!pBlind252.mustSay?.includes("yazılı teklif") ||
    !pBlind252.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind252.mustSay?.includes("sabit Newline yok"))
) {
  errors.push("blind prompt #252 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Newline yok");
}

const pBlind253 = PROMPTS.find((x) => x.id === 253);
if (!pBlind253 || !/through-wall cleat|duvar geçiş kleyt/i.test(pBlind253.q)) {
  errors.push("blind prompt #253 must cover sabit through-wall cleat invent");
}
if (
  pBlind253 &&
  (!pBlind253.mustSay?.includes("yazılı teklif") ||
    !pBlind253.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind253.mustSay?.includes("sabit through-wall cleat yok"))
) {
  errors.push("blind prompt #253 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit through-wall cleat yok");
}

const pBlind254 = PROMPTS.find((x) => x.id === 254);
if (!pBlind254 || !/ViewSonic|interactive display/i.test(pBlind254.q)) {
  errors.push("blind prompt #254 must cover sabit ViewSonic invent");
}
if (
  pBlind254 &&
  (!pBlind254.mustSay?.includes("yazılı teklif") ||
    !pBlind254.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind254.mustSay?.includes("sabit ViewSonic yok"))
) {
  errors.push("blind prompt #254 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit ViewSonic yok");
}

const pBlind255 = PROMPTS.find((x) => x.id === 255);
if (!pBlind255 || !/concealed cleat|gizli kleyt/i.test(pBlind255.q)) {
  errors.push("blind prompt #255 must cover sabit concealed cleat invent");
}
if (
  pBlind255 &&
  (!pBlind255.mustSay?.includes("yazılı teklif") ||
    !pBlind255.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind255.mustSay?.includes("sabit concealed cleat yok"))
) {
  errors.push("blind prompt #255 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit concealed cleat yok");
}

const pBlind256 = PROMPTS.find((x) => x.id === 256);
if (!pBlind256 || !/Clevertouch|interactive display/i.test(pBlind256.q)) {
  errors.push("blind prompt #256 must cover sabit Clevertouch invent");
}
if (
  pBlind256 &&
  (!pBlind256.mustSay?.includes("yazılı teklif") ||
    !pBlind256.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind256.mustSay?.includes("sabit Clevertouch yok"))
) {
  errors.push("blind prompt #256 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Clevertouch yok");
}

const pBlind257 = PROMPTS.find((x) => x.id === 257);
if (!pBlind257 || !/interlocking cleat|kenetli kleyt/i.test(pBlind257.q)) {
  errors.push("blind prompt #257 must cover sabit interlocking cleat invent");
}
if (
  pBlind257 &&
  (!pBlind257.mustSay?.includes("yazılı teklif") ||
    !pBlind257.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind257.mustSay?.includes("sabit interlocking cleat yok"))
) {
  errors.push("blind prompt #257 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit interlocking cleat yok");
}

const pBlind258 = PROMPTS.find((x) => x.id === 258);
if (!pBlind258 || !/Sharp|AQUOS board/i.test(pBlind258.q)) {
  errors.push("blind prompt #258 must cover sabit Sharp invent");
}
if (
  pBlind258 &&
  (!pBlind258.mustSay?.includes("yazılı teklif") ||
    !pBlind258.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind258.mustSay?.includes("sabit Sharp yok"))
) {
  errors.push("blind prompt #258 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Sharp yok");
}

const pBlind259 = PROMPTS.find((x) => x.id === 259);
if (!pBlind259 || !/snap cleat|snap kleyt/i.test(pBlind259.q)) {
  errors.push("blind prompt #259 must cover sabit snap cleat invent");
}
if (
  pBlind259 &&
  (!pBlind259.mustSay?.includes("yazılı teklif") ||
    !pBlind259.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind259.mustSay?.includes("sabit snap cleat yok"))
) {
  errors.push("blind prompt #259 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit snap cleat yok");
}

const pBlind260 = PROMPTS.find((x) => x.id === 260);
if (!pBlind260 || !/Boxlight|MimioBoard/i.test(pBlind260.q)) {
  errors.push("blind prompt #260 must cover sabit Boxlight invent");
}
if (
  pBlind260 &&
  (!pBlind260.mustSay?.includes("yazılı teklif") ||
    !pBlind260.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind260.mustSay?.includes("sabit Boxlight yok"))
) {
  errors.push("blind prompt #260 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Boxlight yok");
}

const pBlind261 = PROMPTS.find((x) => x.id === 261);
if (!pBlind261 || !/extruded cleat|ekstrüzyon kleyt/i.test(pBlind261.q)) {
  errors.push("blind prompt #261 must cover sabit extruded cleat invent");
}
if (
  pBlind261 &&
  (!pBlind261.mustSay?.includes("yazılı teklif") ||
    !pBlind261.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind261.mustSay?.includes("sabit extruded cleat yok"))
) {
  errors.push("blind prompt #261 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit extruded cleat yok");
}

const pBlind262 = PROMPTS.find((x) => x.id === 262);
if (!pBlind262 || !/Horion|interactive panel/i.test(pBlind262.q)) {
  errors.push("blind prompt #262 must cover sabit Horion invent");
}
if (
  pBlind262 &&
  (!pBlind262.mustSay?.includes("yazılı teklif") ||
    !pBlind262.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind262.mustSay?.includes("sabit Horion yok"))
) {
  errors.push("blind prompt #262 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Horion yok");
}

const pBlind263 = PROMPTS.find((x) => x.id === 263);
if (!pBlind263 || !/standing seam cleat|standing seam kleyt/i.test(pBlind263.q)) {
  errors.push("blind prompt #263 must cover sabit standing seam cleat invent");
}
if (
  pBlind263 &&
  (!pBlind263.mustSay?.includes("yazılı teklif") ||
    !pBlind263.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind263.mustSay?.includes("sabit standing seam cleat yok"))
) {
  errors.push("blind prompt #263 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit standing seam cleat yok");
}

const pBlind264 = PROMPTS.find((x) => x.id === 264);
if (!pBlind264 || !/Hisense|GoBoard/i.test(pBlind264.q)) {
  errors.push("blind prompt #264 must cover sabit Hisense invent");
}
if (
  pBlind264 &&
  (!pBlind264.mustSay?.includes("yazılı teklif") ||
    !pBlind264.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind264.mustSay?.includes("sabit Hisense yok"))
) {
  errors.push("blind prompt #264 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Hisense yok");
}

const pBlind265 = PROMPTS.find((x) => x.id === 265);
if (!pBlind265 || !/hook cleat|kanca kleyt/i.test(pBlind265.q)) {
  errors.push("blind prompt #265 must cover sabit hook cleat invent");
}
if (
  pBlind265 &&
  (!pBlind265.mustSay?.includes("yazılı teklif") ||
    !pBlind265.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind265.mustSay?.includes("sabit hook cleat yok"))
) {
  errors.push("blind prompt #265 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit hook cleat yok");
}

const pBlind266 = PROMPTS.find((x) => x.id === 266);
if (!pBlind266 || !/i3TOUCH|interactive display/i.test(pBlind266.q)) {
  errors.push("blind prompt #266 must cover sabit i3TOUCH invent");
}
if (
  pBlind266 &&
  (!pBlind266.mustSay?.includes("yazılı teklif") ||
    !pBlind266.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind266.mustSay?.includes("sabit i3TOUCH yok"))
) {
  errors.push("blind prompt #266 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit i3TOUCH yok");
}

const pBlind267 = PROMPTS.find((x) => x.id === 267);
if (!pBlind267 || !/coping cleat|parapet kleyt/i.test(pBlind267.q)) {
  errors.push("blind prompt #267 must cover sabit coping cleat invent");
}
if (
  pBlind267 &&
  (!pBlind267.mustSay?.includes("yazılı teklif") ||
    !pBlind267.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind267.mustSay?.includes("sabit coping cleat yok"))
) {
  errors.push("blind prompt #267 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit coping cleat yok");
}

const pBlind268 = PROMPTS.find((x) => x.id === 268);
if (!pBlind268 || !/Avocor|collaboration display/i.test(pBlind268.q)) {
  errors.push("blind prompt #268 must cover sabit Avocor invent");
}
if (
  pBlind268 &&
  (!pBlind268.mustSay?.includes("yazılı teklif") ||
    !pBlind268.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind268.mustSay?.includes("sabit Avocor yok"))
) {
  errors.push("blind prompt #268 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit Avocor yok");
}

const pBlind269 = PROMPTS.find((x) => x.id === 269);
if (!pBlind269 || !/rake cleat|saçak kleyt/i.test(pBlind269.q)) {
  errors.push("blind prompt #269 must cover sabit rake cleat invent");
}
if (
  pBlind269 &&
  (!pBlind269.mustSay?.includes("yazılı teklif") ||
    !pBlind269.mustSay?.includes("Gaziosmanpaşa") ||
    !pBlind269.mustSay?.includes("sabit rake cleat yok"))
) {
  errors.push("blind prompt #269 mustSay must include yazılı teklif + Gaziosmanpaşa + sabit rake cleat yok");
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
