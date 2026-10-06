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
