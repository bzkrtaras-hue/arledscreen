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
    "ai-shopping.json",
    "pricedPanels",
    "ücretsiz kargo yok",
    "priceValidUntil",
    "hasMerchantReturnPolicy",
    "MerchantReturnNotPermitted",
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

// Day 64: llms must close kontrol invent (extrasUsd 500 ≠ marka list; quote-only Huidu)
for (const rel of ["public/llms.txt", "public/llms-full.txt", "out/llms.txt", "out/llms-full.txt"]) {
  const txt = read(rel);
  if (!txt) continue;
  if (!/Huidu/i.test(txt) || !/kontrol/i.test(txt)) {
    errors.push(`${rel} must mention Huidu + kontrol quote-only honesty`);
  }
  if (rel.includes("llms.txt") && !rel.includes("full") && !/list SKU|list fiyatı değildir|≠ marka/i.test(txt)) {
    // short llms must disambiguate extrasUsd controlCard
    if (!/list SKU fiyatı değildir|marka\/model teklifle/i.test(txt)) {
      errors.push(`${rel} must clarify extrasUsd kontrol kartı is not Huidu/NovaStar list SKU`);
    }
  }
  if (rel.includes("llms-full") && !/huidu-kontrol-kartlari/i.test(txt)) {
    errors.push(`${rel} §5 must include huidu-kontrol-kartlari intent row`);
  }
}

function checkHtml(rel, mustInclude) {
  const html = read(rel);
  if (!html) return;
  for (const s of mustInclude) {
    if (!html.includes(s)) errors.push(`${rel} missing: ${s}`);
  }
}

if (MEDIUM) {
  checkHtml("out/tr/about/index.html", [MEDIUM]);
  checkHtml("out/tr/about/aras-bozkurt/index.html", [MEDIUM]);
}
// yapay-zeka must point agents at honesty contracts (Gün 53)
checkHtml("out/tr/yapay-zeka/index.html", [
  "entity.json",
  "catalog.json",
  "llms.txt",
  "ai-shopping.json",
  "pricedPanels",
  "priceValidUntil",
  "ücretsiz kargo yok",
]);

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

// Day 51–52: entity FAQ parity with ENTITY_FAQS (single source via sync-entity)
const entityJson = read("public/entity.json");
const entityTs = read("src/lib/entity.ts");
if (entityJson && entityTs) {
  if (!entityJson.includes("priceValidUntil") || !entityJson.includes("2026-12-31")) {
    errors.push("entity.json FAQs should cite priceValidUntil 2026-12-31");
  }
  if (!entityJson.includes("ai-shopping.json")) {
    errors.push("entity.json FAQs should cite ai-shopping.json");
  }
  if (!/iade|garanti/i.test(entityJson)) {
    errors.push("entity.json FAQs should cover iade/garanti honesty");
  }
  const faqBlock = entityTs.match(/export const ENTITY_FAQS = \[([\s\S]*?)\] as const/);
  if (!faqBlock) {
    errors.push("src/lib/entity.ts missing ENTITY_FAQS");
  } else {
    const questions = [...faqBlock[1].matchAll(/question:\s*"((?:\\.|[^"\\])*)"/g)].map((m) =>
      m[1].replace(/\\"/g, '"'),
    );
    if (questions.length < 7) {
      errors.push(`ENTITY_FAQS expected ≥7 questions (got ${questions.length})`);
    }
    for (const q of questions) {
      if (!entityJson.includes(q)) {
        errors.push(`entity.json missing ENTITY_FAQS question: ${q}`);
      }
    }
  }
}

// Day 68: home hero must not invent 81-il dealer network (FORBIDDEN doorway invent)
const homeHtml = read("out/tr/index.html");
if (homeHtml) {
  if (/81 ilindeki|81 provinces|yaygın bayi/i.test(homeHtml)) {
    errors.push("out/tr/index.html hero must not invent 81-il bayi/servis ağı");
  }
  if (!/81 il kapısı yok|no 81-city/i.test(homeHtml)) {
    errors.push("out/tr/index.html hero should state 81 il kapısı yok (honest GEO)");
  }
}
// Day 69: EN home meta must not invent “visual spaces / engineering desk”
const enHome = read("out/en/index.html");
if (enHome) {
  if (/visual spaces|engineering desk/i.test(enHome)) {
    errors.push("out/en/index.html must not invent visual spaces / engineering desk meta");
  }
  if (!/Gaziosmanpaşa|Gaziosmanpasa|quote-only/i.test(enHome)) {
    errors.push("out/en/index.html home meta should cite Gaziosmanpaşa or quote-only honesty");
  }
}
// Day 70: EN rehber hub + led-ekran guide must not invent “engineering desk”
for (const rel of ["out/en/rehber/index.html", "out/en/rehber/led-ekran/index.html"]) {
  const html = read(rel);
  if (!html) continue;
  if (/engineering desk/i.test(html)) {
    errors.push(`${rel} must not invent engineering desk`);
  }
  if (!/Gaziosmanpaşa|Gaziosmanpasa|catalog\.json|ai-shopping\.json/i.test(html)) {
    errors.push(`${rel} should cite Gaziosmanpaşa or catalog/ai-shopping honesty`);
  }
}
const trRehber = read("out/tr/rehber/index.html");
if (trRehber) {
  if (/engineering desk/i.test(trRehber)) {
    errors.push("out/tr/rehber/index.html must not invent engineering desk");
  }
  if (!/catalog\.json|ai-shopping\.json/i.test(trRehber)) {
    errors.push("out/tr/rehber/index.html should cite catalog.json or ai-shopping.json");
  }
}
// Day 71: yapay-zeka must not invent branded “AI-ready” SKU / desk
for (const rel of ["out/tr/yapay-zeka/index.html", "out/en/yapay-zeka/index.html"]) {
  const html = read(rel);
  if (!html) continue;
  if (/AI-ready standard|AI-ready LED project|on one desk/i.test(html)) {
    errors.push(`${rel} must not invent AI-ready SKU / one-desk branding`);
  }
  if (!/Gaziosmanpaşa|Gaziosmanpasa|ai-shopping\.json/i.test(html)) {
    errors.push(`${rel} should cite Gaziosmanpaşa or ai-shopping.json`);
  }
}
// Day 72–73: slogan must not invent “küresel standart / global standard” ranking
for (const rel of [
  "out/tr/index.html",
  "out/en/index.html",
  "out/tr/nxtionstar/index.html",
  "out/tr/about/index.html",
  "public/llms-full.txt",
  "out/llms-full.txt",
  "public/llms.txt",
  "out/llms.txt",
]) {
  const html = read(rel);
  if (!html) continue;
  if (/küresel standard|global standard in visual|мировой стандарт|المعيار العالمي/i.test(html)) {
    errors.push(`${rel} must not invent küresel/global standard slogan ranking`);
  }
  if (rel.includes("nxtionstar") && !/ARLEDSCREEN (ürün markası|product brand)|ürün markası/i.test(html)) {
    errors.push(`${rel} should state NXTIONSTAR as ARLEDSCREEN ürün markası`);
  }
  if (rel.includes("llms-full") && !/ARLEDSCREEN ürün markası/i.test(html)) {
    errors.push(`${rel} should cite honest slogan NXTIONSTAR — ARLEDSCREEN ürün markası`);
  }
}
// Day 74–94: ARD discovery prompt count must not drift behind blind suite
const ardTxt = read("public/.well-known/ard.json") || read("out/.well-known/ard.json");
if (ardTxt && !/45 kör test/i.test(ardTxt)) {
  errors.push("ard.json ai-shopping discovery must cite 45 kör test intent (not stale 17–44)");
}
if (ardTxt && /1[7-9] kör test|(?:2[0-9]|3[0-9]|4[0-4]) kör test/i.test(ardTxt) && !/45 kör test/i.test(ardTxt)) {
  errors.push("ard.json must not cite stale 17–44 kör test without 45");
}
// Day 77: home + rehber must not invent desk / engineering standard
for (const rel of ["out/tr/index.html", "out/en/index.html"]) {
  const html = read(rel);
  if (!html) continue;
  if (/mühendislik standardı|engineering standard/i.test(html)) {
    errors.push(`${rel} must not invent mühendislik/engineering standard`);
  }
  if (/tek masada|aynı masadan|on one desk|tek çatı|end-to-end compatibility|uçtan uca uyum/i.test(html)) {
    errors.push(`${rel} must not invent tek masa/çatı / end-to-end / uçtan uca uyum`);
  }
}
for (const rel of [
  "out/tr/rehber/led-ekran/index.html",
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (/tek masada|aynı masadan/i.test(html)) {
    errors.push(`${rel} must not invent tek masa / aynı masadan`);
  }
}
// Day 78: AR/RU about must not invent NXTIONSTAR-as-OEM / visual-spaces engineering
for (const rel of ["out/ar/index.html", "out/ru/index.html", "out/ar/about/index.html", "out/ru/about/index.html"]) {
  const html = read(rel);
  if (!html) continue;
  if (/تصمم NXTIONSTAR|NXTIONSTAR проектирует|هندسة المساحات|Инженерия визуальных|visual spaces/i.test(html)) {
    errors.push(`${rel} must not invent NXTIONSTAR-OEM / visual-spaces engineering`);
  }
  if (!/Gaziosmanpaşa|غازي عثمان باشا|Газиосманпаш/i.test(html)) {
    errors.push(`${rel} should cite Gaziosmanpaşa`);
  }
}
for (const rel of ["out/tr/yapay-zeka/index.html", "out/en/yapay-zeka/index.html"]) {
  const html = read(rel);
  if (!html) continue;
  if (/uçtan uca uyum|end-to-end (fit|compatibility)|AI-Compatible LED Display/i.test(html)) {
    errors.push(`${rel} must not invent uçtan uca / end-to-end / AI-Compatible SKU title`);
  }
}
// Day 79: turnkey / tek süreç / ücretsiz calculator invent
for (const rel of ["out/tr/index.html", "out/en/index.html"]) {
  const html = read(rel);
  if (!html) continue;
  if (/tek süreç|turnkey platform|Anahtar teslim|Turnkey/i.test(html)) {
    errors.push(`${rel} must not invent tek süreç / turnkey / Anahtar teslim`);
  }
}
for (const rel of ["out/tr/hesaplayici/index.html", "out/en/hesaplayici/index.html"]) {
  const html = read(rel);
  if (!html) continue;
  if (/Ücretsiz LED ekran fiyat|Free LED display price/i.test(html)) {
    errors.push(`${rel} must not lead with Ücretsiz/Free calculator invent`);
  }
}
for (const rel of ["out/ar/index.html", "out/ru/index.html"]) {
  const html = read(rel);
  if (!html) continue;
  if (/البيئات البصرية الحرجة|критически важных визуальных|وحدات المنصة|Модули платформы/i.test(html)) {
    errors.push(`${rel} must not invent visual-spaces / platform module invent`);
  }
}
// Day 80: sorunsuz / Küresel LED / tek merkezden / dikişsiz invent
for (const rel of [
  "out/tr/index.html",
  "out/tr/about/index.html",
  "out/tr/yapay-zeka/index.html",
  "out/tr/led-ekran/index.html",
  "out/tr/products/kiralik-led-ekran/index.html",
  "out/tr/products/ic-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (/sorunsuz|Küresel LED|tek merkezden|dikişsiz/i.test(html)) {
    errors.push(`${rel} must not invent sorunsuz / Küresel LED / tek merkezden / dikişsiz`);
  }
}
// Day 81: AI-infrastructure ready / ranking invent
for (const rel of [
  "out/en/yapay-zeka/index.html",
  "out/tr/yapay-zeka/index.html",
  "out/en/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (/AI-infrastructure ready SKU|What does AI-infrastructure ready mean|AI-compatible LED mean\?/i.test(html)) {
    errors.push(`${rel} must not invent AI-infrastructure ready / AI-compatible SKU framing`);
  }
}
for (const rel of ["out/tr/projelerimiz/index.html", "out/tr/about/index.html"]) {
  const html = read(rel);
  if (!html) continue;
  if (/Türkiye'nin en büyük mağazası|Türkiye'nin en /i.test(html)) {
    errors.push(`${rel} must not invent Türkiye'nin en ranking claim`);
  }
}
// Day 82: enterprise / aynı gün SLA invent
for (const rel of [
  "out/tr/led-ekran/index.html",
  "out/tr/hizmetler/index.html",
  "out/tr/products/colorlight-kontrolculer/index.html",
  "out/en/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (/aynı gün yapılandırma|aynı gün garanti|enterprise all-in-one|Answers enterprise buyers/i.test(html)) {
    errors.push(`${rel} must not invent aynı gün SLA / enterprise all-in-one`);
  }
}
// Day 83: üretici / fabrika / OEM invent
for (const rel of ["out/tr/led-ekran-ureticisi/index.html", "out/tr/nxtionstar/index.html"]) {
  const html = read(rel);
  if (!html) continue;
  if (rel.includes("ureticisi")) {
    if (!/Ne fabrika|uydurma OEM|yazılı teklif|NXTIONSTAR/i.test(html)) {
      errors.push(`${rel} should state ne fabrika / uydurma OEM + NXTIONSTAR + yazılı teklif honesty`);
    }
    if (/biz (?:OEM )?fabrika|fabrika olarak üretim|bağımsız bayi(?:yiz)|distribütörüz/i.test(html)) {
      errors.push(`${rel} must not invent OEM/fabrika/bayi identity`);
    }
  }
}
// Day 84: tek ekip / keşiften teslimata / fabrika use-case invent
for (const rel of [
  "out/tr/fabrika-led-ekran/index.html",
  "out/tr/blog/alanya-white-city-resort-hotel-led-ekran/index.html",
  "out/tr/hizmetler/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (/Keşiften teslimata tek ekip|tek ekip hâlinde|tek ekip garanti|keşiften teslimata platform/i.test(html)) {
    errors.push(`${rel} must not invent tek ekip / keşiften teslimata platform`);
  }
}
{
  const html = read("out/tr/fabrika-led-ekran/index.html");
  if (html && !/kullanım alanı|üretici değil|led-ekran-ureticisi/i.test(html)) {
    errors.push("out/tr/fabrika-led-ekran/ should disambiguate use-case vs üretici");
  }
}
// Day 85: quote-only stok/anında/list + TrustFacts aynı-ekip residual
for (const rel of [
  "out/tr/products/esnek-led-ekran/index.html",
  "out/tr/products/kiralik-led-ekran/index.html",
  "out/tr/products/seffaf-led-ekran/index.html",
  "out/tr/products/poster-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/yazılı teklif|ai-shopping\.json|quote-only/i.test(html)) {
    errors.push(`${rel} should cite yazılı teklif / ai-shopping quote-only honesty`);
  }
  if (/stokta paket hazır|anında teslim garant|list fiyatı vardır/i.test(html)) {
    errors.push(`${rel} must not invent stokta paket / anında teslim / list fiyat`);
  }
}
{
  const html = read("out/tr/index.html");
  if (html && /aynı ekiple planlanır|Keşiften devreye alma aynı ekiple/i.test(html)) {
    errors.push("out/tr/index.html must not invent aynı ekiple / keşiften-devreye aynı ekip");
  }
}
{
  const html = read("out/tr/blog/256x128-cm-ic-mekan-led-ekran/index.html");
  if (html && /daha çok tercih ediliyor|en çok tercih/i.test(html)) {
    errors.push("blog 256x128 must not invent preference ranking");
  }
}
// Day 86: sabit nit invent + keşiften-montaja residual
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (/600.?1.?200|600–1,200/i.test(html)) {
    errors.push(`${rel} must not invent fixed 600–1.200 nit band`);
  }
  if (!/sabit nit yok|no fixed site nit/i.test(html)) {
    errors.push(`${rel} should state sabit nit yok / no fixed site nit`);
  }
}
{
  const html = read("out/tr/hizmetler/index.html");
  if (html && /tüm adımlarını planlıyoruz|Keşiften devreye almaya/i.test(html)) {
    errors.push("out/tr/hizmetler/ must not invent keşiften–devreye tüm adımlar platform");
  }
}
// Day 87: sabit Hz / yüksek yenileme invent
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/index.html",
  "out/tr/yapay-zeka/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (/yüksek yenileme oranı|yüksek yenileme ve kararlı|kamera dostu yenileme|High refresh.*required|sabit 3840|3840 Hz garanti/i.test(html)) {
    errors.push(`${rel} must not invent yüksek yenileme / kamera dostu / sabit Hz`);
  }
}
{
  const html = read("out/tr/rehber/ic-mekan-led-ekran/index.html");
  if (html && !/sabit 3840|sabit Hz yok|no site-wide 3840/i.test(html)) {
    errors.push("out/tr/rehber/ic-mekan-led-ekran/ should state sabit Hz yok honesty");
  }
}
// Day 88: 1 mm = 1 m — require honesty hedge; forbid affirmative şart invent
for (const rel of [
  "out/tr/rehber/piksel-araligi-secimi/index.html",
  "out/tr/sss/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/garanti değil|garanti değildir|garanti» veya|iddiası yoktur/i.test(html)) {
    errors.push(`${rel} should hedge 1 mm ≈ 1 m as non-guarantee`);
  }
  if (/sabit 2,5 m şart|P2\.5 için 2\.5 m şart|sabit minimum mesafe garantisi yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit mesafe şartı`);
  }
}

// Day 89: sabit kW / 3 faz — honesty presence; forbid affirmative şart invent
for (const rel of [
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/tr/hesaplayici/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit kW|0,45\/0,75|3 faz zorunlu/i.test(html)) {
    errors.push(`${rel} should hedge sabit kW/m² / 3 faz zorunlu`);
  }
  if (/her projede 3 faz zorunludur|sabit 0,45 kW\/m² yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit kW / 3 faz şartı`);
  }
}

// Day 90: sabit görüş açısı 140°/160° — honesty presence; forbid affirmative şart invent
for (const rel of [
  "out/tr/rehber/led-ekran/index.html",
  "out/tr/rehber/gob-vs-smd/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit görüş açısı yok|140.?\/.?160/i.test(html)) {
    errors.push(`${rel} should hedge sabit görüş açısı / 140°/160°`);
  }
  if (/sabit 140° yayımlanır|görüş açısı 140°\/160° garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit 140°/160° görüş açısı`);
  }
}

// Day 91: sabit HDR / gri skala — honesty presence; forbid affirmative şart invent
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/products/gob-led-ekran/p1-86-gob/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit HDR yok|fixed site HDR|HDR \/ gri skala/i.test(html)) {
    errors.push(`${rel} should hedge sabit HDR / gri skala`);
  }
  if (/HDR garantidir|sabit 16-bit gri skala yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit HDR / 16-bit gri skala`);
  }
}

// Day 92: sabit ömür / MTBF — honesty presence; forbid affirmative şart invent
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/kiosk-dijital-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ömür yok|100\.000 saat|MTBF|fixed site lifespan/i.test(html)) {
    errors.push(`${rel} should hedge sabit ömür / MTBF / 100.000 saat`);
  }
  if (/100\.000 saat garantidir|sabit MTBF yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit 100.000 saat / MTBF`);
  }
}

// Day 94: sabit kg/m² / kalınlık — honesty presence
for (const rel of [
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/tr/rehber/vitrin-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit kg yok|kg\/m²|fixed site kg|sabit kabin kalınlığı/i.test(html)) {
    errors.push(`${rel} should hedge sabit kg/m² / kalınlık`);
  }
  if (/30 kg\/m² garantidir|sabit 25 kg yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit kg/m² / 25 kg`);
  }
}

// Day 95: sabit °C / çalışma sıcaklığı — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit °C yok|fixed site °C|no fixed site °C/i.test(html)) {
    errors.push(`${rel} should hedge sabit °C / çalışma sıcaklığı`);
  }
  if (/-20\/\+50 °C garantidir|sabit -20 °C yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit -20/+50 °C`);
  }
}

// Day 96: sabit kontrast — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit kontrast yok|fixed site contrast|no fixed site contrast/i.test(html)) {
    errors.push(`${rel} should hedge sabit kontrast`);
  }
  if (/5000:1 garantidir|sabit 3000:1 yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit 5000:1 / 3000:1`);
  }
}

// Day 97: sabit rüzgâr yükü — honesty presence
for (const rel of [
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/cephe-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit rüzgâr yükü yok|no fixed site wind load|fixed site wind load/i.test(html)) {
    errors.push(`${rel} should hedge sabit rüzgâr yükü`);
  }
  if (/120 km\/h garantidir|1500 Pa yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit 120 km/h / 1500 Pa`);
  }
}


// Day 93: sabit gamut / DCI-P3 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit gamut yok|DCI-P3|Rec\.709|fixed site gamut/i.test(html)) {
    errors.push(`${rel} should hedge sabit gamut / DCI-P3 / Rec.709`);
  }
  if (/DCI-P3 garantidir|sabit 6500K yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit DCI-P3 / 6500K`);
  }
}

if (errors.length) {
  console.error(`audit-cite-parity: FAIL (${errors.length})`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log("audit-cite-parity: OK — entity↔llms↔about cite strings verbatim + PANEL USD");
