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

// Day 68: home hero must not invent 81-il dealer network (FORBIDDEN doorway invent).
// Positive “81 il kapısı yok” phrase is optional — customer hero may use natural nationwide copy
// as long as bayi/servis ağı doorway invent stays absent (FAQ/JSON still carry price honesty).
const homeHtml = read("out/tr/index.html");
if (homeHtml) {
  if (/81 ilindeki|81 provinces|yaygın bayi/i.test(homeHtml)) {
    errors.push("out/tr/index.html hero must not invent 81-il bayi/servis ağı");
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
  if (!/catalog\.json|ai-shopping\.json|yayımlanmış panel listesi/i.test(trRehber)) {
    errors.push("out/tr/rehber/index.html should cite catalog.json, ai-shopping.json, or yayımlanmış panel listesi");
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
// Day 74–132: ARD discovery prompt count must not drift behind blind suite
const ardTxt = read("public/.well-known/ard.json") || read("out/.well-known/ard.json");
if (ardTxt && !/465 kör test/i.test(ardTxt)) {
  errors.push("ard.json ai-shopping discovery must cite 465 kör test intent (not stale 17–412)");
}
if (ardTxt && /(?<![0-9])(?:1[7-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|80|81|82|83|84|85|86|87|88|89|90|91|92|93|94|95|96|97|98|99|100|101|102|103|104|105|106|107|108|109|110|111|112|113|114|115|116|117|118|119|120|121|122|123|124|125|126|127|128|129|130|131|132|133|134|135|136|137|138|139|140|141|142|143|144|145|146|147|148|149|150|151|152|153|154|155|156|157|158|159|160|161|162|163|164|165|166|167|168|169|170|171|172|173|174|175|176|177|178|179|180|181|182|183|184|185|186|187|188|189|190|191|192|193|194|195|196|197|198|199|200|201|202|203|204|205|206|207|208|209|210|211|212|213|214|215|216|217|218|219|220|221|222|223|224|225|226) kör test/i.test(ardTxt) && !/77 kör test/i.test(ardTxt)) {
  errors.push("ard.json must not cite stale 17–412 kör test without 436");
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

// Day 98: sabit ölü piksel — honesty presence
for (const rel of [
  "out/tr/led-ekran-servis/index.html",
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/products/gob-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ölü piksel yok|no fixed dead-pixel|fixed dead-pixel/i.test(html)) {
    errors.push(`${rel} should hedge sabit ölü piksel`);
  }
  if (/0\.0001% garantidir|Class II yayımlanır|pixel failure rate garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit 0.0001% / Class II`);
  }
}

// Day 99: sabit nem / %RH — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/tr/products/gob-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit nem yok|no fixed site humidity|fixed site humidity|10–90% RH/i.test(html)) {
    errors.push(`${rel} should hedge sabit nem / %RH`);
  }
  if (/10–90% RH garantidir|sabit 10-90% RH yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit 10–90% RH`);
  }
}

// Day 100: sabit standby / idle — honesty presence
for (const rel of [
  "out/tr/hesaplayici/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit standby yok|avg ≠ standby|≠ standby|no fixed site standby/i.test(html)) {
    errors.push(`${rel} should hedge sabit standby / idle`);
  }
  if (/5 W standby garantidir|idle 10W yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit 5 W standby`);
  }
}

// Day 101: sabit depolama / storage °C — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit depolama °C yok|sabit depolama|no fixed site storage|operating ≠ storage|işletme ≠ depolama/i.test(html)) {
    errors.push(`${rel} should hedge sabit depolama / storage °C`);
  }
  if (/-40\/\+60 °C garantidir|storage -40\/\+60 yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit -40/+60 storage`);
  }
}

// Day 102: sabit CE / RoHS — honesty presence
for (const rel of [
  "out/tr/sss/index.html",
  "out/tr/about/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit CE\/RoHS yok|no fixed site CE\/RoHS|CE\/RoHS/i.test(html)) {
    errors.push(`${rel} should hedge sabit CE / RoHS`);
  }
  if (/tüm ürünler CE garantidir|CE işaretli garantidir|sabit CE listesi yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit CE / RoHS`);
  }
}

// Day 103: sabit ISO — honesty presence
for (const rel of [
  "out/tr/sss/index.html",
  "out/tr/about/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ISO yok|no fixed site ISO|ISO 9001/i.test(html)) {
    errors.push(`${rel} should hedge sabit ISO`);
  }
  if (/ISO 9001 sertifikalıdır garantidir|sabit ISO listesi yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit ISO`);
  }
}





// Day 104: sabit UL / ETL — honesty presence
for (const rel of [
  "out/tr/sss/index.html",
  "out/tr/about/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit UL\/ETL yok|no fixed site UL\/ETL|UL \/ ETL/i.test(html)) {
    errors.push(`${rel} should hedge sabit UL / ETL`);
  }
  if (/UL listed garantidir|ETL sertifikalıdır garantidir|sabit UL listesi yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit UL / ETL`);
  }
}

// Day 105: sabit yangın sınıfı / fire rating — honesty presence
for (const rel of [
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit yangın sınıfı yok|no fixed site fire rating|fire rating/i.test(html)) {
    errors.push(`${rel} should hedge sabit yangın sınıfı / fire rating`);
  }
  if (/Class A garantidir|B-s1-d0 yayımlanır|sabit fire rating yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit yangın sınıfı`);
  }
}

// Day 106: sabit IK / impact rating — honesty presence
for (const rel of [
  "out/tr/products/gob-led-ekran/index.html",
  "out/tr/rehber/vitrin-led-ekran/index.html",
  "out/en/rehber/vitrin-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit IK yok|no fixed site IK|IK08|IK10/i.test(html)) {
    errors.push(`${rel} should hedge sabit IK / impact rating`);
  }
  if (/IK10 garantidir|sabit IK08 yayımlanır|tüm yüzeyler IK10/i.test(html)) {
    errors.push(`${rel} must not invent sabit IK`);
  }
}

// Day 107: sabit ASTM / salt spray — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ASTM\/salt spray yok|no fixed site ASTM\/salt spray|ASTM B117/i.test(html)) {
    errors.push(`${rel} should hedge sabit ASTM / salt spray`);
  }
  if (/ASTM B117 garantidir|1000 saat salt spray|salt spray passed/i.test(html)) {
    errors.push(`${rel} must not invent sabit ASTM / salt spray`);
  }
}

// Day 108: sabit garanti yılı — honesty presence
for (const rel of [
  "out/tr/sss/index.html",
  "out/tr/about/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit garanti yılı yok/i.test(html)) {
    errors.push(`${rel} should hedge sabit garanti yılı`);
  }
  if (/2 yıl garanti|5 yıl garanti|3 yıl garanti|ücretsiz iade garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit garanti yılı`);
  }
}

// Day 109: sabit iade günü — honesty presence
for (const rel of [
  "out/tr/led-ekran-fiyatlari/index.html",
  "out/tr/sss/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit iade günü yok/i.test(html)) {
    errors.push(`${rel} should hedge sabit iade günü`);
  }
  if (/14 gün iade garantidir|30 gün ücretsiz iade|sabit 14 gün iade yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit iade günü`);
  }
}

// Day 110: sabit teslimat süresi — honesty presence
for (const rel of [
  "out/tr/sss/index.html",
  "out/tr/hizmetler/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit teslimat süresi yok/i.test(html)) {
    errors.push(`${rel} should hedge sabit teslimat süresi`);
  }
  if (/7 iş günü teslimat|48 saat teslim garantidir|15 gün sabit teslim|stoktan aynı gün kargo/i.test(html)) {
    errors.push(`${rel} must not invent sabit teslimat süresi`);
  }
}

// Day 111: sabit gürültü / dB — honesty presence
for (const rel of [
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit gürültü\/dB yok|no fixed site noise\/dB/i.test(html)) {
    errors.push(`${rel} should hedge sabit gürültü / dB`);
  }
  if (/35 dB garantidir|sabit 40 dB|fanless silent garantidir|30 dBA yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit gürültü / dB`);
  }
}

// Day 112: sabit Delta E — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Delta E yok|no fixed site Delta E/i.test(html)) {
    errors.push(`${rel} should hedge sabit Delta E`);
  }
  if (/Delta E <2 garantidir|sabit Delta E 2|factory calibrated Delta E|ΔE<1 yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit Delta E`);
  }
}

// Day 113: sabit latency / input lag — honesty presence
for (const rel of [
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit latency\/input lag yok|no fixed site latency\/input lag/i.test(html)) {
    errors.push(`${rel} should hedge sabit latency / input lag`);
  }
  if (/1 ms latency garantidir|sabit 8 ms|low latency garantidir|<5ms yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit latency / input lag`);
  }
}

// Day 114: sabit parlaklık homojenliği / brightness uniformity — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit parlaklık homojenliği yok|no fixed site brightness uniformity/i.test(html)) {
    errors.push(`${rel} should hedge sabit parlaklık homojenliği / brightness uniformity`);
  }
  if (/±5% uniformity garantidir|sabit %97 homojenlik|brightness uniformity garantidir|±3% yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit parlaklık homojenliği / brightness uniformity`);
  }
}


// Day 115: sabit güç faktörü / power factor — honesty presence
for (const rel of [
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit güç faktörü yok|no fixed site power factor/i.test(html)) {
    errors.push(`${rel} should hedge sabit güç faktörü / power factor`);
  }
  if (/PF 0\.95 garantidir|sabit cos φ 0,9|power factor 0\.98|güç faktörü 1\.0 yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit güç faktörü / power factor`);
  }
}


// Day 116: sabit HDCP — honesty presence
for (const rel of [
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit HDCP yok|no fixed site HDCP/i.test(html)) {
    errors.push(`${rel} should hedge sabit HDCP`);
  }
  if (/HDCP 2\.2 garantidir|sabit HDCP 2\.3|HDCP compliant garantidir|tüm modeller HDCP/i.test(html)) {
    errors.push(`${rel} must not invent sabit HDCP`);
  }
}


// Day 117: sabit yedek parça stok — honesty presence
for (const rel of [
  "out/tr/led-ekran-servis/index.html",
  "out/tr/sss/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit yedek parça stok yok/i.test(html)) {
    errors.push(`${rel} should hedge sabit yedek parça stok`);
  }
  if (/24 saat yedek parça|stokta yedek garantidir|aynı gün yedek sevkiyat|yedek parça stokta yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit yedek parça stok`);
  }
}

// Day 118: sabit PoE / Gigabit — honesty presence
for (const rel of [
  "out/tr/rehber/kiosk-dijital-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit PoE yok|no fixed site PoE/i.test(html)) {
    errors.push(`${rel} should hedge sabit PoE / Gigabit`);
  }
  if (/PoE\+ garantidir|sabit Gigabit 1000|1 Gbps garantidir|tüm modeller PoE/i.test(html)) {
    errors.push(`${rel} must not invent sabit PoE / Gigabit`);
  }
}

// Day 119: sabit HDMI / SDI — honesty presence
for (const rel of [
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit HDMI\/SDI yok|no fixed site HDMI\/SDI/i.test(html)) {
    errors.push(`${rel} should hedge sabit HDMI / SDI`);
  }
  if (/HDMI 2\.1 garantidir|sabit 4K60 HDMI|tüm modeller SDI|DisplayPort garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit HDMI / SDI`);
  }
}


// Day 120: sabit fiber mesafe — honesty presence
for (const rel of [
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit fiber mesafe yok|no fixed site fiber distance/i.test(html)) {
    errors.push(`${rel} should hedge sabit fiber mesafe`);
  }
  if (/100 m fiber garantidir|sabit 300 m fiber|fiber 10 km garantidir|CAT6A 100 m garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit fiber mesafe`);
  }
}


// Day 121: sabit CMS SLA — honesty presence
for (const rel of [
  "out/tr/rehber/kiosk-dijital-ekran/index.html",
  "out/tr/rehber/poster-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit CMS SLA yok|no fixed site CMS SLA/i.test(html)) {
    errors.push(`${rel} should hedge sabit CMS SLA`);
  }
  if (/99\.9% uptime garantidir|sabit 24\/7 CMS|uzaktan izleme SLA garantidir|cloud CMS uptime yayımlanır/i.test(html)) {
    errors.push(`${rel} must not invent sabit CMS SLA`);
  }
}


// Day 122: sabit dual power — honesty presence
for (const rel of [
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit dual power yok|no fixed site dual power/i.test(html)) {
    errors.push(`${rel} should hedge sabit dual power`);
  }
  if (/dual power garantidir|hot-swap PSU garantidir|sabit redundant PSU|tüm modeller dual power/i.test(html)) {
    errors.push(`${rel} must not invent sabit dual power`);
  }
}


// Day 123: sabit genlock — honesty presence
for (const rel of [
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit genlock yok|no fixed site genlock/i.test(html)) {
    errors.push(`${rel} should hedge sabit genlock`);
  }
  if (/genlock garantidir|sabit frame sync|tüm modeller genlock|PTP sync garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit genlock`);
  }
}


// Day 124: sabit Art-Net / DMX — honesty presence
for (const rel of [
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/tr/sahne-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Art-Net yok|no fixed site Art-Net/i.test(html)) {
    errors.push(`${rel} should hedge sabit Art-Net / DMX`);
  }
  if (/Art-Net garantidir|sabit sACN|tüm modeller DMX|DMX512 garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Art-Net / DMX`);
  }
}

// Day 125: sabit NDI / SRT / RTMP — honesty presence
for (const rel of [
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/tr/rehber/kiosk-dijital-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit NDI yok|no fixed site NDI/i.test(html)) {
    errors.push(`${rel} should hedge sabit NDI / SRT / RTMP`);
  }
  if (/NDI garantidir|sabit SRT|tüm modeller RTMP|RTMP garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit NDI / SRT / RTMP`);
  }
}


// Day 126: sabit ön / arka servis — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ön servis yok|no fixed site front service/i.test(html)) {
    errors.push(`${rel} should hedge sabit ön/arka servis`);
  }
  if (/ön servis garantidir|sabit arka servis|tüm modeller ön servis|front service garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ön/arka servis`);
  }
}


// Day 127: sabit WiFi / Bluetooth — honesty presence
for (const rel of [
  "out/tr/rehber/kiosk-dijital-ekran/index.html",
  "out/tr/rehber/poster-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit WiFi yok|no fixed site WiFi/i.test(html)) {
    errors.push(`${rel} should hedge sabit WiFi / Bluetooth`);
  }
  if (/WiFi garantidir|sabit Bluetooth|tüm modeller WiFi|Bluetooth garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit WiFi / Bluetooth`);
  }
}


// Day 128: sabit 0mm / seamless — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/vitrin-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit 0mm yok|no fixed site 0mm/i.test(html)) {
    errors.push(`${rel} should hedge sabit 0mm / seamless`);
  }
  if (/0mm garantidir|sabit seamless|tüm modeller bezelsiz|seamless garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit 0mm / seamless`);
  }
}


// Day 129: sabit alıcı yedeklilik / receiving card redundancy — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit alıcı yedeklilik yok|no fixed site receiving-card redundancy/i.test(html)) {
    errors.push(`${rel} should hedge sabit alıcı yedeklilik / receiving card redundancy`);
  }
  if (/alıcı yedeklilik garantidir|sabit backup loop|tüm modeller redundant receiver|receiving card redundancy garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit alıcı yedeklilik`);
  }
}


// Day 130: sabit gönderici yedeklilik / sending card redundancy — honesty presence
for (const rel of [
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/tr/rehber/kiosk-dijital-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit gönderici yedeklilik yok|no fixed site sending-card redundancy/i.test(html)) {
    errors.push(`${rel} should hedge sabit gönderici yedeklilik / sending card redundancy`);
  }
  if (/gönderici yedeklilik garantidir|sabit sending card redundancy|tüm modeller redundant sender|sending card redundancy garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit gönderici yedeklilik`);
  }
}


// Day 131: sabit ışık sensörü / adaptive brightness — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/vitrin-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ışık sensörü yok|no fixed site light sensor/i.test(html)) {
    errors.push(`${rel} should hedge sabit ışık sensörü / adaptive brightness`);
  }
  if (/ışık sensörü garantidir|sabit adaptive brightness|tüm modeller ambient light sensor|adaptive brightness garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ışık sensörü`);
  }
}


// Day 132: sabit canlı modül değişimi / hot-swap module — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/poster-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit canlı modül değişimi yok|no fixed site hot-swap module/i.test(html)) {
    errors.push(`${rel} should hedge sabit canlı modül değişimi / hot-swap module`);
  }
  if (/canlı modül değişimi garantidir|sabit hot-swap module|tüm modeller hot-swap module|hot-swap module garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit canlı modül değişimi`);
  }
}

// Day 133: sabit dokunmatik / touch overlay / capacitive touch — honesty presence
for (const rel of [
  "out/tr/rehber/kiosk-dijital-ekran/index.html",
  "out/tr/rehber/vitrin-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit dokunmatik yok|no fixed site touch/i.test(html)) {
    errors.push(`${rel} should hedge sabit dokunmatik / touch overlay`);
  }
  if (/dokunmatik garantidir|sabit capacitive touch|tüm modeller touch overlay|touch overlay garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit dokunmatik`);
  }
}


// Day 134: sabit mıknatıslı modül / magnetic module — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit mıknatıslı modül yok|no fixed site magnetic module/i.test(html)) {
    errors.push(`${rel} should hedge sabit mıknatıslı modül / magnetic module`);
  }
  if (/mıknatıslı modül garantidir|sabit magnetic module|tüm modeller magnetic module|magnetic module garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit mıknatıslı modül`);
  }
}


// Day 135: sabit koruyucu kaplama / conformal coating — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit koruyucu kaplama yok|no fixed site conformal coating/i.test(html)) {
    errors.push(`${rel} should hedge sabit koruyucu kaplama / conformal coating`);
  }
  if (/koruyucu kaplama garantidir|sabit conformal coating|tüm modeller conformal coating|conformal coating garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit koruyucu kaplama`);
  }
}


// Day 136: sabit naked-eye 3D / glasses-free 3D — honesty presence
for (const rel of [
  "out/tr/rehber/vitrin-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit 3D yok|no fixed site 3D/i.test(html)) {
    errors.push(`${rel} should hedge sabit 3D / naked-eye 3D`);
  }
  if (/3D garantidir|sabit naked-eye 3D|tüm modeller glasses-free 3D|naked-eye 3D garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit 3D`);
  }
}


// Day 137: sabit hızlı kilit / quick lock — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/poster-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit hızlı kilit yok|no fixed site quick lock/i.test(html)) {
    errors.push(`${rel} should hedge sabit hızlı kilit / quick lock`);
  }
  if (/hızlı kilit garantidir|sabit quick lock|tüm modeller quick lock|quick lock garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit hızlı kilit`);
  }
}

// Day 138: sabit kavisli / curved — honesty presence
for (const rel of [
  "out/tr/rehber/vitrin-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit kavisli yok|no fixed site curved/i.test(html)) {
    errors.push(`${rel} should hedge sabit kavisli / curved`);
  }
  if (/kavisli garantidir|sabit curved|tüm modeller curved|curved garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit kavisli`);
  }
}

// Day 139: sabit döküm kabin / die-cast — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit döküm kabin yok|no fixed site die-cast/i.test(html)) {
    errors.push(`${rel} should hedge sabit döküm kabin / die-cast`);
  }
  if (/döküm kabin garantidir|sabit die-cast|tüm modeller die-cast|die-cast garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit döküm kabin`);
  }
}

// Day 140: sabit anti-yansıma / anti-glare — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit anti-yansıma yok|no fixed site anti-glare/i.test(html)) {
    errors.push(`${rel} should hedge sabit anti-yansıma / anti-glare`);
  }
  if (/anti-yansıma garantidir|sabit anti-glare|tüm modeller anti-glare|anti-glare garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit anti-yansıma`);
  }
}

// Day 141: sabit OPS / Android player — honesty presence
for (const rel of [
  "out/tr/rehber/kiosk-dijital-ekran/index.html",
  "out/tr/rehber/poster-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit OPS yok|no fixed site OPS/i.test(html)) {
    errors.push(`${rel} should hedge sabit OPS / Android player`);
  }
  if (/OPS garantidir|sabit Android player|tüm modeller Android player|Android player garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit OPS`);
  }
}

// Day 142: sabit parafudr / surge protection — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit parafudr yok|no fixed site surge protection/i.test(html)) {
    errors.push(`${rel} should hedge sabit parafudr / surge protection`);
  }
  if (/parafudr garantidir|sabit surge protection|tüm modeller surge protection|surge protection garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit parafudr`);
  }
}

// Day 143: sabit zamanlayıcı / content scheduler — honesty presence
for (const rel of [
  "out/tr/rehber/kiosk-dijital-ekran/index.html",
  "out/tr/rehber/poster-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit zamanlayıcı yok|no fixed site content scheduler/i.test(html)) {
    errors.push(`${rel} should hedge sabit zamanlayıcı / content scheduler`);
  }
  if (/zamanlayıcı garantidir|sabit content scheduler|tüm modeller content scheduler|content scheduler garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit zamanlayıcı`);
  }
}

// Day 144: sabit flight case / taşıma çantası — honesty presence
for (const rel of [
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/tr/rehber/poster-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit flight case yok|no fixed site flight case/i.test(html)) {
    errors.push(`${rel} should hedge sabit flight case / taşıma çantası`);
  }
  if (/flight case garantidir|sabit flightcase|tüm modeller flightcase|flightcase garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit flight case`);
  }
}

// Day 145: sabit köşe LED / corner LED — honesty presence
for (const rel of [
  "out/tr/rehber/vitrin-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit köşe LED yok|no fixed site corner LED/i.test(html)) {
    errors.push(`${rel} should hedge sabit köşe LED / corner LED`);
  }
  if (/köşe LED garantidir|sabit corner LED|tüm modeller corner LED|corner LED garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit köşe LED`);
  }
}

// Day 146: sabit enerji sınıfı / energy class — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit enerji sınıfı yok|no fixed site energy class/i.test(html)) {
    errors.push(`${rel} should hedge sabit enerji sınıfı / energy class`);
  }
  if (/enerji sınıfı garantidir|sabit energy class|tüm modeller energy class|energy class garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit enerji sınıfı`);
  }
}

// Day 147: sabit düşük mavi ışık / low blue light — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit düşük mavi ışık yok|no fixed site low-blue-light/i.test(html)) {
    errors.push(`${rel} should hedge sabit düşük mavi ışık / low blue light`);
  }
  if (/düşük mavi ışık garantidir|sabit low blue light|tüm modeller low blue light|low blue light garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit düşük mavi ışık`);
  }
}

// Day 148: sabit asılı / hanging / rigging — honesty presence
for (const rel of [
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit asılı yok|no fixed site hanging/i.test(html)) {
    errors.push(`${rel} should hedge sabit asılı / hanging / rigging`);
  }
  if (/asılı garantidir|sabit hanging|tüm modeller hanging|hanging garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit asılı`);
  }
}

// Day 149: sabit daisy chain / data cascade — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit daisy chain yok|no fixed site daisy-chain/i.test(html)) {
    errors.push(`${rel} should hedge sabit daisy chain / data cascade`);
  }
  if (/daisy chain garantidir|sabit data cascade|tüm modeller data cascade|data cascade garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit daisy chain`);
  }
}

// Day 150: sabit IP67 / NEMA — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit IP67 yok|no fixed site IP67/i.test(html)) {
    errors.push(`${rel} should hedge sabit IP67 / NEMA`);
  }
  if (/IP67 garantidir|sabit NEMA|tüm modeller NEMA|NEMA garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit IP67`);
  }
}

// Day 151: sabit ısı yönetimi / heater / cooling — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ısı yönetimi yok|no fixed site thermal-management/i.test(html)) {
    errors.push(`${rel} should hedge sabit ısı yönetimi / heater / cooling`);
  }
  if (/ısı yönetimi garantidir|sabit heater|tüm modeller cooling|cooling garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ısı yönetimi`);
  }
}

// Day 152: sabit BT.2020 / Rec.2020 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit BT\.2020 yok|no fixed site BT\.2020/i.test(html)) {
    errors.push(`${rel} should hedge sabit BT.2020 / Rec.2020`);
  }
  if (/BT\.2020 garantidir|sabit Rec\.2020|tüm modeller Rec\.2020|Rec\.2020 garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit BT.2020`);
  }
}

// Day 153: sabit HLG / HDR10 / PQ — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit HLG yok|no fixed site HLG/i.test(html)) {
    errors.push(`${rel} should hedge sabit HLG / HDR10 / PQ`);
  }
  if (/HLG garantidir|sabit HDR10|tüm modeller HDR10|HDR10 garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit HLG`);
  }
}

// Day 154: sabit PWM / scan rate — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit PWM yok|no fixed site PWM/i.test(html)) {
    errors.push(`${rel} should hedge sabit PWM / scan rate`);
  }
  if (/PWM garantidir|sabit scan rate|tüm modeller scan rate|scan rate garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit PWM`);
  }
}

// Day 155: sabit black level / siyah seviye — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit black level yok|no fixed site black level/i.test(html)) {
    errors.push(`${rel} should hedge sabit black level / siyah seviye`);
  }
  if (/black level garantidir|sabit siyah seviye|tüm modeller black level|siyah seviye garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit black level`);
  }
}

// Day 156: sabit pixel mapping / piksel eşleme — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit pixel mapping yok|no fixed site pixel mapping/i.test(html)) {
    errors.push(`${rel} should hedge sabit pixel mapping / piksel eşleme`);
  }
  if (/pixel mapping garantidir|sabit piksel eşleme|tüm modeller pixel mapping|piksel eşleme garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit pixel mapping`);
  }
}

// Day 157: sabit gamma / white balance — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit gamma yok|no fixed site gamma/i.test(html)) {
    errors.push(`${rel} should hedge sabit gamma / white balance`);
  }
  if (/gamma garantidir|sabit white balance|tüm modeller white balance|white balance garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit gamma`);
  }
}

// Day 158: sabit potting / epoxy potting — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit potting yok|no fixed site potting/i.test(html)) {
    errors.push(`${rel} should hedge sabit potting / epoxy potting`);
  }
  if (/potting garantidir|sabit epoxy potting|tüm modeller potting|epoxy potting garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit potting`);
  }
}

// Day 159: sabit louver / masking — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit louver yok|no fixed site louver/i.test(html)) {
    errors.push(`${rel} should hedge sabit louver / masking`);
  }
  if (/louver garantidir|sabit masking|tüm modeller masking|masking garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit louver`);
  }
}

// Day 160: sabit module size / modül boyutu — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit module size yok|no fixed site module size/i.test(html)) {
    errors.push(`${rel} should hedge sabit module size / modül boyutu`);
  }
  if (/module size garantidir|sabit modül boyutu|tüm modeller module size|modül boyutu garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit module size`);
  }
}

// Day 161: sabit cabinet depth / kabin derinliği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cabinet depth yok|no fixed site cabinet depth/i.test(html)) {
    errors.push(`${rel} should hedge sabit cabinet depth / kabin derinliği`);
  }
  if (/cabinet depth garantidir|sabit kabin derinliği|tüm modeller cabinet depth|kabin derinliği garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cabinet depth`);
  }
}

// Day 162: sabit drive IC / sürücü IC — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit drive IC yok|no fixed site drive IC/i.test(html)) {
    errors.push(`${rel} should hedge sabit drive IC / sürücü IC`);
  }
  if (/drive IC garantidir|sabit sürücü IC|tüm modeller drive IC|sürücü IC garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit drive IC`);
  }
}


// Day 163: sabit cabinet size / kabin boyutu — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cabinet size yok|no fixed site cabinet size/i.test(html)) {
    errors.push(`${rel} should hedge sabit cabinet size / kabin boyutu`);
  }
  if (/cabinet size garantidir|sabit kabin boyutu|tüm modeller cabinet size|kabin boyutu garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cabinet size`);
  }
}


// Day 164: sabit panel size / panel boyutu — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit panel size yok|no fixed site panel size/i.test(html)) {
    errors.push(`${rel} should hedge sabit panel size / panel boyutu`);
  }
  if (/panel size garantidir|sabit panel boyutu|tüm modeller panel size|panel boyutu garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit panel size`);
  }
}


// Day 165: sabit waterproof glue / su geçirmez yapıştırıcı — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit waterproof glue yok|no fixed site waterproof glue/i.test(html)) {
    errors.push(`${rel} should hedge sabit waterproof glue / su geçirmez yapıştırıcı`);
  }
  if (/waterproof glue garantidir|sabit su geçirmez yapıştırıcı|tüm modeller waterproof glue|su geçirmez yapıştırıcı garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit waterproof glue`);
  }
}


// Day 166: sabit mask pitch / maske pitch — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit mask pitch yok|no fixed site mask pitch/i.test(html)) {
    errors.push(`${rel} should hedge sabit mask pitch / maske pitch`);
  }
  if (/mask pitch garantidir|sabit maske pitch|tüm modeller mask pitch|maske pitch garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit mask pitch`);
  }
}


// Day 167: sabit silicone seal / silikon conta — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit silicone seal yok|no fixed site silicone seal/i.test(html)) {
    errors.push(`${rel} should hedge sabit silicone seal / silikon conta`);
  }
  if (/silicone seal garantidir|sabit silikon conta|tüm modeller silicone seal|silikon conta garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit silicone seal`);
  }
}


// Day 168: sabit connector type / konektör tipi — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit connector type yok|no fixed site connector type/i.test(html)) {
    errors.push(`${rel} should hedge sabit connector type / konektör tipi`);
  }
  if (/connector type garantidir|sabit konektör tipi|tüm modeller connector type|konektör tipi garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit connector type`);
  }
}


// Day 169: sabit locating pin / konumlandırma pimi — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit locating pin yok|no fixed site locating pin/i.test(html)) {
    errors.push(`${rel} should hedge sabit locating pin / konumlandırma pimi`);
  }
  if (/locating pin garantidir|sabit konumlandırma pimi|tüm modeller locating pin|konumlandırma pimi garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit locating pin`);
  }
}


// Day 170: sabit flat cable / flat kablo — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit flat cable yok|no fixed site flat cable/i.test(html)) {
    errors.push(`${rel} should hedge sabit flat cable / flat kablo`);
  }
  if (/flat cable garantidir|sabit flat kablo|tüm modeller flat cable|flat kablo garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit flat cable`);
  }
}


// Day 171: sabit safety cable / emniyet kablosu — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit safety cable yok|no fixed site safety cable/i.test(html)) {
    errors.push(`${rel} should hedge sabit safety cable / emniyet kablosu`);
  }
  if (/safety cable garantidir|sabit emniyet kablosu|tüm modeller safety cable|emniyet kablosu garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit safety cable`);
  }
}


// Day 172: sabit thermal pad / termal pad — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit thermal pad yok|no fixed site thermal pad/i.test(html)) {
    errors.push(`${rel} should hedge sabit thermal pad / termal pad`);
  }
  if (/thermal pad garantidir|sabit termal pad|tüm modeller thermal pad|termal pad garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit thermal pad`);
  }
}


// Day 173: sabit magnesium / magnezyum — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit magnesium yok|no fixed site magnesium/i.test(html)) {
    errors.push(`${rel} should hedge sabit magnesium / magnezyum`);
  }
  if (/magnesium garantidir|sabit magnezyum|tüm modeller magnesium|magnezyum garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit magnesium`);
  }
}


// Day 174: sabit EDID / EDID yönetimi — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit EDID yok|no fixed site EDID/i.test(html)) {
    errors.push(`${rel} should hedge sabit EDID / EDID yönetimi`);
  }
  if (/EDID garantidir|sabit EDID yönetimi|tüm modeller EDID|EDID yönetimi garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit EDID`);
  }
}


// Day 175: sabit HDBaseT / HDBaseT iletim — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit HDBaseT yok|no fixed site HDBaseT/i.test(html)) {
    errors.push(`${rel} should hedge sabit HDBaseT / HDBaseT iletim`);
  }
  if (/HDBaseT garantidir|sabit HDBaseT iletim|tüm modeller HDBaseT|HDBaseT iletim garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit HDBaseT`);
  }
}


// Day 176: sabit video processor / video işlemci — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit video processor yok|no fixed site video processor/i.test(html)) {
    errors.push(`${rel} should hedge sabit video processor / video işlemci`);
  }
  if (/video processor garantidir|sabit video işlemci|tüm modeller video processor|video işlemci garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit video processor`);
  }
}


// Day 177: sabit truss clamp / truss kelepçe — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit truss clamp yok|no fixed site truss clamp/i.test(html)) {
    errors.push(`${rel} should hedge sabit truss clamp / truss kelepçe`);
  }
  if (/truss clamp garantidir|sabit truss kelepçe|tüm modeller truss clamp|truss kelepçe garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit truss clamp`);
  }
}


// Day 178: sabit scaler / ölçekleyici — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit scaler yok|no fixed site scaler/i.test(html)) {
    errors.push(`${rel} should hedge sabit scaler / ölçekleyici`);
  }
  if (/scaler garantidir|sabit ölçekleyici|tüm modeller scaler|ölçekleyici garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit scaler`);
  }
}


// Day 179: sabit backup battery / yedek batarya — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit backup battery yok|no fixed site backup battery/i.test(html)) {
    errors.push(`${rel} should hedge sabit backup battery / yedek batarya`);
  }
  if (/backup battery garantidir|sabit yedek batarya|tüm modeller backup battery|yedek batarya garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit backup battery`);
  }
}


// Day 180: sabit ribbon cable / ribbon kablo — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ribbon cable yok|no fixed site ribbon cable/i.test(html)) {
    errors.push(`${rel} should hedge sabit ribbon cable / ribbon kablo`);
  }
  if (/ribbon cable garantidir|sabit ribbon kablo|tüm modeller ribbon cable|ribbon kablo garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ribbon cable`);
  }
}


// Day 181: sabit hoist / vinç — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit hoist yok|no fixed site hoist/i.test(html)) {
    errors.push(`${rel} should hedge sabit hoist / vinç`);
  }
  if (/hoist garantidir|sabit vinç|tüm modeller hoist|vinç garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit hoist`);
  }
}


// Day 182: sabit SFP / SFP modül — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit SFP yok|no fixed site SFP/i.test(html)) {
    errors.push(`${rel} should hedge sabit SFP / SFP modül`);
  }
  if (/SFP garantidir|sabit SFP modül|tüm modeller SFP|SFP modül garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit SFP`);
  }
}


// Day 183: sabit cable gland / kablo rakoru — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cable gland yok|no fixed site cable gland/i.test(html)) {
    errors.push(`${rel} should hedge sabit cable gland / kablo rakoru`);
  }
  if (/cable gland garantidir|sabit kablo rakoru|tüm modeller cable gland|kablo rakoru garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cable gland`);
  }
}


// Day 184: sabit PIP / görüntü içinde görüntü — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit PIP yok|no fixed site PIP/i.test(html)) {
    errors.push(`${rel} should hedge sabit PIP / görüntü içinde görüntü`);
  }
  if (/PIP garantidir|sabit görüntü içinde görüntü|tüm modeller PIP|görüntü içinde görüntü garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit PIP`);
  }
}

// Day 198: sabit Crestron / kontrol sistemi — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Crestron yok|no fixed site Crestron/i.test(html)) {
    errors.push(`${rel} should hedge sabit Crestron / kontrol sistemi`);
  }
  if (/Crestron\ garantidir|sabit\ Crestron\ True1|tüm\ modeller\ Crestron|kontrol\ sistemi\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Crestron`);
  }
}

// Day 199: sabit USB-C / USB Type-C — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit USB-C yok|no fixed site USB-C/i.test(html)) {
    errors.push(`${rel} should hedge sabit USB-C / USB Type-C`);
  }
  if (/USB-C\ garantidir|sabit\ USB-C\ True1|tüm\ modeller\ USB-C|USB\ Type-C\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit USB-C`);
  }
}

// Day 200: sabit IR remote / kızılötesi kumanda — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit IR remote yok|no fixed site IR remote/i.test(html)) {
    errors.push(`${rel} should hedge sabit IR remote / kızılötesi kumanda`);
  }
  if (/IR remote\ garantidir|sabit\ IR remote\ True1|tüm\ modeller\ IR remote|kızılötesi\ kumanda\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit IR remote`);
  }
}

// Day 201: sabit base plate / taban plakası — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit base plate yok|no fixed site base plate/i.test(html)) {
    errors.push(`${rel} should hedge sabit base plate / taban plakası`);
  }
  if (/base plate\ garantidir|sabit\ base plate\ True1|tüm\ modeller\ base plate|taban\ plakası\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit base plate`);
  }
}

// Day 202: sabit RS-232 / seri port — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit RS-232 yok|no fixed site RS-232/i.test(html)) {
    errors.push(`${rel} should hedge sabit RS-232 / seri port`);
  }
  if (/RS-232\ garantidir|sabit\ RS-232\ True1|tüm\ modeller\ RS-232|seri\ port\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit RS-232`);
  }
}

// Day 203: sabit weather drain / su tahliyesi — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit weather drain yok|no fixed site weather drain/i.test(html)) {
    errors.push(`${rel} should hedge sabit weather drain / su tahliyesi`);
  }
  if (/weather drain\ garantidir|sabit\ weather drain\ True1|tüm\ modeller\ weather drain|su\ tahliyesi\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit weather drain`);
  }
}

// Day 204: sabit Extron / AV switcher — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Extron yok|no fixed site Extron/i.test(html)) {
    errors.push(`${rel} should hedge sabit Extron / AV switcher`);
  }
  if (/Extron\ garantidir|sabit\ Extron\ True1|tüm\ modeller\ Extron|AV\ switcher\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Extron`);
  }
}

// Day 205: sabit wall bracket / duvar braketi — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit wall bracket yok|no fixed site wall bracket/i.test(html)) {
    errors.push(`${rel} should hedge sabit wall bracket / duvar braketi`);
  }
  if (/wall bracket\ garantidir|sabit\ wall bracket\ True1|tüm\ modeller\ wall bracket|duvar\ braketi\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit wall bracket`);
  }
}

// Day 206: sabit AMX / oda kontrol — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit AMX yok|no fixed site AMX/i.test(html)) {
    errors.push(`${rel} should hedge sabit AMX / oda kontrol`);
  }
  if (/AMX\ garantidir|sabit\ AMX\ True1|tüm\ modeller\ AMX|oda\ kontrol\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit AMX`);
  }
}

// Day 207: sabit drip edge / damlacık kenarı — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit drip edge yok|no fixed site drip edge/i.test(html)) {
    errors.push(`${rel} should hedge sabit drip edge / damlacık kenarı`);
  }
  if (/drip edge\\ garantidir|sabit\\ drip edge\\ True1|tüm\\ modeller\\ drip edge|damlacık\\ kenarı\\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit drip edge`);
  }
}

// Day 208: sabit Control4 / akıllı ev — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Control4 yok|no fixed site Control4/i.test(html)) {
    errors.push(`${rel} should hedge sabit Control4 / akıllı ev`);
  }
  if (/Control4\ garantidir|sabit\ Control4\ True1|tüm\ modeller\ Control4|akıllı\ ev\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Control4`);
  }
}

// Day 209: sabit weep hole / drenaj deliği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit weep hole yok|no fixed site weep hole/i.test(html)) {
    errors.push(`${rel} should hedge sabit weep hole / drenaj deliği`);
  }
  if (/weep hole\ garantidir|sabit\ weep hole\ True1|tüm\ modeller\ weep hole|drenaj\ deliği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit weep hole`);
  }
}


// Day 210: sabit Biamp / DSP — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Biamp yok|no fixed site Biamp/i.test(html)) {
    errors.push(`${rel} should hedge sabit Biamp / DSP`);
  }
  if (/Biamp\ garantidir|sabit\ Biamp\ True1|tüm\ modeller\ Biamp|DSP\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Biamp`);
  }
}


// Day 211: sabit bird mesh / kuş filesi — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit bird mesh yok|no fixed site bird mesh/i.test(html)) {
    errors.push(`${rel} should hedge sabit bird mesh / kuş filesi`);
  }
  if (/bird mesh\ garantidir|sabit\ bird mesh\ True1|tüm\ modeller\ bird mesh|kuş\ filesi\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit bird mesh`);
  }
}


// Day 212: sabit QSC / amfi — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit QSC yok|no fixed site QSC/i.test(html)) {
    errors.push(`${rel} should hedge sabit QSC / amfi`);
  }
  if (/QSC\ garantidir|sabit\ QSC\ True1|tüm\ modeller\ QSC|amfi\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit QSC`);
  }
}


// Day 213: sabit anti-theft screw / hırsızlık önleyici vida — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit anti-theft screw yok|no fixed site anti-theft screw/i.test(html)) {
    errors.push(`${rel} should hedge sabit anti-theft screw / hırsızlık önleyici vida`);
  }
  if (/anti-theft screw\ garantidir|sabit\ anti-theft screw\ True1|tüm\ modeller\ anti-theft screw|hırsızlık\ önleyici\ vida\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit anti-theft screw`);
  }
}


// Day 214: sabit RS-485 / seri bus — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit RS-485 yok|no fixed site RS-485/i.test(html)) {
    errors.push(`${rel} should hedge sabit RS-485 / seri bus`);
  }
  if (/RS-485\ garantidir|sabit\ RS-485\ True1|tüm\ modeller\ RS-485|seri\ bus\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit RS-485`);
  }
}


// Day 215: sabit bird spike / kuş dikeni — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit bird spike yok|no fixed site bird spike/i.test(html)) {
    errors.push(`${rel} should hedge sabit bird spike / kuş dikeni`);
  }
  if (/bird spike\ garantidir|sabit\ bird spike\ True1|tüm\ modeller\ bird spike|kuş\ dikeni\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit bird spike`);
  }
}


// Day 216: sabit Kramer / AV matrix — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Kramer yok|no fixed site Kramer/i.test(html)) {
    errors.push(`${rel} should hedge sabit Kramer / AV matrix`);
  }
  if (/Kramer\ garantidir|sabit\ Kramer\ True1|tüm\ modeller\ Kramer|AV\ matrix\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Kramer`);
  }
}


// Day 217: sabit expansion joint / genleşme derzi — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit expansion joint yok|no fixed site expansion joint/i.test(html)) {
    errors.push(`${rel} should hedge sabit expansion joint / genleşme derzi`);
  }
  if (/expansion joint\ garantidir|sabit\ expansion joint\ True1|tüm\ modeller\ expansion joint|genleşme\ derzi\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit expansion joint`);
  }
}


// Day 218: sabit Shure / mikrofon — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Shure yok|no fixed site Shure/i.test(html)) {
    errors.push(`${rel} should hedge sabit Shure / mikrofon`);
  }
  if (/Shure\ garantidir|sabit\ Shure\ True1|tüm\ modeller\ Shure|mikrofon\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Shure`);
  }
}


// Day 219: sabit snow load / kar yükü — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit snow load yok|no fixed site snow load/i.test(html)) {
    errors.push(`${rel} should hedge sabit snow load / kar yükü`);
  }
  if (/snow load\ garantidir|sabit\ snow load\ True1|tüm\ modeller\ snow load|kar\ yükü\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit snow load`);
  }
}


// Day 220: sabit Symetrix / DSP — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Symetrix yok|no fixed site Symetrix/i.test(html)) {
    errors.push(`${rel} should hedge sabit Symetrix / DSP`);
  }
  if (/Symetrix\ garantidir|sabit\ Symetrix\ True1|tüm\ modeller\ Symetrix|Symetrix\ DSP\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Symetrix`);
  }
}


// Day 221: sabit cable tray / kablo kanalı — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cable tray yok|no fixed site cable tray/i.test(html)) {
    errors.push(`${rel} should hedge sabit cable tray / kablo kanalı`);
  }
  if (/cable tray\ garantidir|sabit\ cable tray\ True1|tüm\ modeller\ cable tray|kablo\ kanalı\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cable tray`);
  }
}


// Day 222: sabit Atlona / AV over IP — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Atlona yok|no fixed site Atlona/i.test(html)) {
    errors.push(`${rel} should hedge sabit Atlona / AV over IP`);
  }
  if (/Atlona\ garantidir|sabit\ Atlona\ True1|tüm\ modeller\ Atlona|AV\ over\ IP\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Atlona`);
  }
}


// Day 223: sabit sun shade / güneş siperi — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit sun shade yok|no fixed site sun shade/i.test(html)) {
    errors.push(`${rel} should hedge sabit sun shade / güneş siperi`);
  }
  if (/sun shade\ garantidir|sabit\ sun shade\ True1|tüm\ modeller\ sun shade|güneş\ siperi\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit sun shade`);
  }
}


// Day 224: sabit Zoom Room / soft codec — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Zoom Room yok|no fixed site Zoom Room/i.test(html)) {
    errors.push(`${rel} should hedge sabit Zoom Room / soft codec`);
  }
  if (/Zoom Room\ garantidir|sabit\ Zoom Room\ True1|tüm\ modeller\ Zoom Room|soft\ codec\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Zoom Room`);
  }
}


// Day 225: sabit vandal guard / vandal koruma — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit vandal guard yok|no fixed site vandal guard/i.test(html)) {
    errors.push(`${rel} should hedge sabit vandal guard / vandal koruma`);
  }
  if (/vandal guard\ garantidir|sabit\ vandal guard\ True1|tüm\ modeller\ vandal guard|vandal\ koruma\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit vandal guard`);
  }
}


// Day 226: sabit Teams Room / soft conferencing — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Teams Room yok|no fixed site Teams Room/i.test(html)) {
    errors.push(`${rel} should hedge sabit Teams Room / soft conferencing`);
  }
  if (/Teams Room\ garantidir|sabit\ Teams Room\ True1|tüm\ modeller\ Teams Room|soft\ conferencing\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Teams Room`);
  }
}


// Day 227: sabit lightning rod / paratoner — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit lightning rod yok|no fixed site lightning rod/i.test(html)) {
    errors.push(`${rel} should hedge sabit lightning rod / paratoner`);
  }
  if (/lightning rod\ garantidir|sabit\ lightning rod\ True1|tüm\ modeller\ lightning rod|paratoner\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit lightning rod`);
  }
}


// Day 228: sabit Webex Room / soft conferencing — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Webex Room yok|no fixed site Webex Room/i.test(html)) {
    errors.push(`${rel} should hedge sabit Webex Room / soft conferencing`);
  }
  if (/Webex Room\ garantidir|sabit\ Webex Room\ True1|tüm\ modeller\ Webex Room|soft\ conferencing\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Webex Room`);
  }
}


// Day 229: sabit sill flashing / eşik flaşörü — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit sill flashing yok|no fixed site sill flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit sill flashing / eşik flaşörü`);
  }
  if (/sill flashing\ garantidir|sabit\ sill flashing\ True1|tüm\ modeller\ sill flashing|eşik\ flaşörü\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit sill flashing`);
  }
}


// Day 230: sabit ClickShare / kablosuz sunum — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ClickShare yok|no fixed site ClickShare/i.test(html)) {
    errors.push(`${rel} should hedge sabit ClickShare / kablosuz sunum`);
  }
  if (/ClickShare\ garantidir|sabit\ ClickShare\ True1|tüm\ modeller\ ClickShare|kablosuz\ sunum\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ClickShare`);
  }
}


// Day 231: sabit seismic brace / sismik destek — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit seismic brace yok|no fixed site seismic brace/i.test(html)) {
    errors.push(`${rel} should hedge sabit seismic brace / sismik destek`);
  }
  if (/seismic brace\ garantidir|sabit\ seismic brace\ True1|tüm\ modeller\ seismic brace|sismik\ destek\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit seismic brace`);
  }
}


// Day 232: sabit AirMedia / kablosuz paylaşım — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit AirMedia yok|no fixed site AirMedia/i.test(html)) {
    errors.push(`${rel} should hedge sabit AirMedia / kablosuz paylaşım`);
  }
  if (/AirMedia\ garantidir|sabit\ AirMedia\ True1|tüm\ modeller\ AirMedia|kablosuz\ paylaşım\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit AirMedia`);
  }
}


// Day 233: sabit chemical anchor / kimyasal dübel — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit chemical anchor yok|no fixed site chemical anchor/i.test(html)) {
    errors.push(`${rel} should hedge sabit chemical anchor / kimyasal dübel`);
  }
  if (/chemical anchor\ garantidir|sabit\ chemical anchor\ True1|tüm\ modeller\ chemical anchor|kimyasal\ dübel\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit chemical anchor`);
  }
}


// Day 234: sabit Solstice / kablosuz collab — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Solstice yok|no fixed site Solstice/i.test(html)) {
    errors.push(`${rel} should hedge sabit Solstice / kablosuz collab`);
  }
  if (/Solstice\ garantidir|sabit\ Solstice\ True1|tüm\ modeller\ Solstice|kablosuz\ collab\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Solstice`);
  }
}


// Day 235: sabit counter flashing / karşı flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit counter flashing yok|no fixed site counter flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit counter flashing / karşı flaşör`);
  }
  if (/counter flashing\ garantidir|sabit\ counter flashing\ True1|tüm\ modeller\ counter flashing|karşı\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit counter flashing`);
  }
}


// Day 236: sabit Google Meet / soft conferencing — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Google Meet yok|no fixed site Google Meet/i.test(html)) {
    errors.push(`${rel} should hedge sabit Google Meet / soft conferencing`);
  }
  if (/Google Meet\ garantidir|sabit\ Google Meet\ True1|tüm\ modeller\ Google Meet|soft conferencing\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Google Meet`);
  }
}


// Day 237: sabit neoprene gasket / neopren conta — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit neoprene gasket yok|no fixed site neoprene gasket/i.test(html)) {
    errors.push(`${rel} should hedge sabit neoprene gasket / neopren conta`);
  }
  if (/neoprene gasket\ garantidir|sabit\ neoprene gasket\ True1|tüm\ modeller\ neoprene gasket|neopren\ conta\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit neoprene gasket`);
  }
}


// Day 238: sabit Yealink / UC endpoint — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Yealink yok|no fixed site Yealink/i.test(html)) {
    errors.push(`${rel} should hedge sabit Yealink / UC endpoint`);
  }
  if (/Yealink\ garantidir|sabit\ Yealink\ True1|tüm\ modeller\ Yealink|UC\ endpoint\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Yealink`);
  }
}


// Day 239: sabit frost heave / don kabarması — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit frost heave yok|no fixed site frost heave/i.test(html)) {
    errors.push(`${rel} should hedge sabit frost heave / don kabarması`);
  }
  if (/frost heave\ garantidir|sabit\ frost heave\ True1|tüm\ modeller\ frost heave|don\ kabarması\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit frost heave`);
  }
}


// Day 240: sabit Logitech Rally / kamera bar — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Logitech Rally yok|no fixed site Logitech Rally/i.test(html)) {
    errors.push(`${rel} should hedge sabit Logitech Rally / kamera bar`);
  }
  if (/Logitech Rally\ garantidir|sabit\ Logitech Rally\ True1|tüm\ modeller\ Logitech Rally|kamera\ bar\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Logitech Rally`);
  }
}


// Day 241: sabit insect screen / böcek filesi — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit insect screen yok|no fixed site insect screen/i.test(html)) {
    errors.push(`${rel} should hedge sabit insect screen / böcek filesi`);
  }
  if (/insect screen\ garantidir|sabit\ insect screen\ True1|tüm\ modeller\ insect screen|böcek\ filesi\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit insect screen`);
  }
}


// Day 242: sabit Neat Board / collab bar — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Neat Board yok|no fixed site Neat Board/i.test(html)) {
    errors.push(`${rel} should hedge sabit Neat Board / collab bar`);
  }
  if (/Neat Board\ garantidir|sabit\ Neat Board\ True1|tüm\ modeller\ Neat Board|collab\ bar\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Neat Board`);
  }
}


// Day 243: sabit condensation drain / yoğuşma drenajı — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit condensation drain yok|no fixed site condensation drain/i.test(html)) {
    errors.push(`${rel} should hedge sabit condensation drain / yoğuşma drenajı`);
  }
  if (/condensation drain\ garantidir|sabit\ condensation drain\ True1|tüm\ modeller\ condensation drain|yoğuşma\ drenajı\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit condensation drain`);
  }
}


// Day 244: sabit Polycom / Poly Studio — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Polycom yok|no fixed site Polycom/i.test(html)) {
    errors.push(`${rel} should hedge sabit Polycom / Poly Studio`);
  }
  if (/Polycom\ garantidir|sabit\ Polycom\ True1|tüm\ modeller\ Polycom|Poly\ Studio\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Polycom`);
  }
}


// Day 245: sabit vapor barrier / buhar bariyeri — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit vapor barrier yok|no fixed site vapor barrier/i.test(html)) {
    errors.push(`${rel} should hedge sabit vapor barrier / buhar bariyeri`);
  }
  if (/vapor barrier\ garantidir|sabit\ vapor barrier\ True1|tüm\ modeller\ vapor barrier|buhar\ bariyeri\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit vapor barrier`);
  }
}


// Day 246: sabit Jabra / PanaCast — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Jabra yok|no fixed site Jabra/i.test(html)) {
    errors.push(`${rel} should hedge sabit Jabra / PanaCast`);
  }
  if (/Jabra\ garantidir|sabit\ Jabra\ True1|tüm\ modeller\ Jabra|PanaCast\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Jabra`);
  }
}


// Day 247: sabit scupper / scupper drenaj — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit scupper yok|no fixed site scupper/i.test(html)) {
    errors.push(`${rel} should hedge sabit scupper / scupper drenaj`);
  }
  if (/scupper\ garantidir|sabit\ scupper\ True1|tüm\ modeller\ scupper|scupper\ drenaj\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit scupper`);
  }
}


// Day 248: sabit Meeting Owl / Owl Labs — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Meeting Owl yok|no fixed site Meeting Owl/i.test(html)) {
    errors.push(`${rel} should hedge sabit Meeting Owl / Owl Labs`);
  }
  if (/Meeting Owl\ garantidir|sabit\ Meeting Owl\ True1|tüm\ modeller\ Meeting Owl|Owl Labs\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Meeting Owl`);
  }
}


// Day 249: sabit parapet flashing / parapet flaşörü — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit parapet flashing yok|no fixed site parapet flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit parapet flashing / parapet flaşörü`);
  }
  if (/parapet flashing\ garantidir|sabit\ parapet flashing\ True1|tüm\ modeller\ parapet flashing|parapet\ flaşörü\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit parapet flashing`);
  }
}


// Day 250: sabit Huddly / kamera — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Huddly yok|no fixed site Huddly/i.test(html)) {
    errors.push(`${rel} should hedge sabit Huddly / kamera`);
  }
  if (/Huddly\ garantidir|sabit\ Huddly\ True1|tüm\ modeller\ Huddly/i.test(html)) {
    errors.push(`${rel} must not invent sabit Huddly`);
  }
}


// Day 251: sabit ice dam / buz bariyeri — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ice dam yok|no fixed site ice dam/i.test(html)) {
    errors.push(`${rel} should hedge sabit ice dam / buz bariyeri`);
  }
  if (/ice dam\ garantidir|sabit\ ice dam\ True1|tüm\ modeller\ ice dam|buz\ bariyeri\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ice dam`);
  }
}


// Day 252: sabit DTEN / all-in-one — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit DTEN yok|no fixed site DTEN/i.test(html)) {
    errors.push(`${rel} should hedge sabit DTEN / all-in-one`);
  }
  if (/DTEN\ garantidir|sabit\ DTEN\ True1|tüm\ modeller\ DTEN|all-in-one\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit DTEN`);
  }
}


// Day 253: sabit downspout / yağmur inişi — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit downspout yok|no fixed site downspout/i.test(html)) {
    errors.push(`${rel} should hedge sabit downspout / yağmur inişi`);
  }
  if (/downspout\ garantidir|sabit\ downspout\ True1|tüm\ modeller\ downspout|yağmur\ inişi\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit downspout`);
  }
}


// Day 254: sabit Maxhub / interactive panel — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Maxhub yok|no fixed site Maxhub/i.test(html)) {
    errors.push(`${rel} should hedge sabit Maxhub / interactive panel`);
  }
  if (/Maxhub\ garantidir|sabit\ Maxhub\ True1|tüm\ modeller\ Maxhub|interactive\ panel\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Maxhub`);
  }
}


// Day 255: sabit gutter / oluk — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit gutter yok|no fixed site gutter/i.test(html)) {
    errors.push(`${rel} should hedge sabit gutter / oluk`);
  }
  if (/gutter\ garantidir|sabit\ gutter\ True1|tüm\ modeller\ gutter|oluk\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit gutter`);
  }
}


// Day 256: sabit ClearOne / conferencing — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ClearOne yok|no fixed site ClearOne/i.test(html)) {
    errors.push(`${rel} should hedge sabit ClearOne / conferencing`);
  }
  if (/ClearOne\ garantidir|sabit\ ClearOne\ True1|tüm\ modeller\ ClearOne|conferencing\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ClearOne`);
  }
}


// Day 257: sabit ridge vent / mahya havalandırma — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ridge vent yok|no fixed site ridge vent/i.test(html)) {
    errors.push(`${rel} should hedge sabit ridge vent / mahya havalandırma`);
  }
  if (/ridge vent\ garantidir|sabit\ ridge vent\ True1|tüm\ modeller\ ridge vent|mahya\ havalandırma\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ridge vent`);
  }
}


// Day 258: sabit AVer / PTZ — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit AVer yok|no fixed site AVer/i.test(html)) {
    errors.push(`${rel} should hedge sabit AVer / PTZ`);
  }
  if (/AVer\ garantidir|sabit\ AVer\ True1|tüm\ modeller\ AVer|PTZ\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit AVer`);
  }
}


// Day 259: sabit soffit vent / saçak havalandırma — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit soffit vent yok|no fixed site soffit vent/i.test(html)) {
    errors.push(`${rel} should hedge sabit soffit vent / saçak havalandırma`);
  }
  if (/soffit vent\ garantidir|sabit\ soffit vent\ True1|tüm\ modeller\ soffit vent|saçak\ havalandırma\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit soffit vent`);
  }
}


// Day 260: sabit Nureva / microphone array — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Nureva yok|no fixed site Nureva/i.test(html)) {
    errors.push(`${rel} should hedge sabit Nureva / microphone array`);
  }
  if (/Nureva\ garantidir|sabit\ Nureva\ True1|tüm\ modeller\ Nureva|microphone\ array\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Nureva`);
  }
}


// Day 261: sabit cricket flashing / baca flaşı — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cricket flashing yok|no fixed site cricket flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit cricket flashing / baca flaşı`);
  }
  if (/cricket flashing\ garantidir|sabit\ cricket flashing\ True1|tüm\ modeller\ cricket flashing|baca\ flaşı\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cricket flashing`);
  }
}


// Day 262: sabit Sennheiser / ceiling mic — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Sennheiser yok|no fixed site Sennheiser/i.test(html)) {
    errors.push(`${rel} should hedge sabit Sennheiser / ceiling mic`);
  }
  if (/Sennheiser\ garantidir|sabit\ Sennheiser\ True1|tüm\ modeller\ Sennheiser|ceiling\ mic\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Sennheiser`);
  }
}


// Day 263: sabit kick-out flashing / çıkış flaşı — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit kick-out flashing yok|no fixed site kick-out flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit kick-out flashing / çıkış flaşı`);
  }
  if (/kick-out flashing\ garantidir|sabit\ kick-out flashing\ True1|tüm\ modeller\ kick-out flashing|çıkış\ flaşı\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit kick-out flashing`);
  }
}


// Day 264: sabit Vaddio / PTZ camera — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Vaddio yok|no fixed site Vaddio/i.test(html)) {
    errors.push(`${rel} should hedge sabit Vaddio / PTZ camera`);
  }
  if (/Vaddio\ garantidir|sabit\ Vaddio\ True1|tüm\ modeller\ Vaddio|PTZ\ camera\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Vaddio`);
  }
}


// Day 265: sabit valley flashing / vadi flaşı — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit valley flashing yok|no fixed site valley flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit valley flashing / vadi flaşı`);
  }
  if (/valley flashing\ garantidir|sabit\ valley flashing\ True1|tüm\ modeller\ valley flashing|vadi\ flaşı\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit valley flashing`);
  }
}


// Day 266: sabit Lifesize / video room — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Lifesize yok|no fixed site Lifesize/i.test(html)) {
    errors.push(`${rel} should hedge sabit Lifesize / video room`);
  }
  if (/Lifesize\ garantidir|sabit\ Lifesize\ True1|tüm\ modeller\ Lifesize|video\ room\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Lifesize`);
  }
}


// Day 267: sabit step flashing / basamak flaş — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit step flashing yok|no fixed site step flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit step flashing / basamak flaş`);
  }
  if (/step flashing\ garantidir|sabit\ step flashing\ True1|tüm\ modeller\ step flashing|basamak\ flaş\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit step flashing`);
  }
}


// Day 268: sabit Bose / soundbar — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Bose yok|no fixed site Bose/i.test(html)) {
    errors.push(`${rel} should hedge sabit Bose / soundbar`);
  }
  if (/Bose\ garantidir|sabit\ Bose\ True1|tüm\ modeller\ Bose|soundbar\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Bose`);
  }
}


// Day 269: sabit apron flashing / etek flaş — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit apron flashing yok|no fixed site apron flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit apron flashing / etek flaş`);
  }
  if (/apron flashing\ garantidir|sabit\ apron flashing\ True1|tüm\ modeller\ apron flashing|etek\ flaş\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit apron flashing`);
  }
}


// Day 270: sabit BirdDog / NDI PTZ — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit BirdDog yok|no fixed site BirdDog/i.test(html)) {
    errors.push(`${rel} should hedge sabit BirdDog / NDI PTZ`);
  }
  if (/BirdDog\ garantidir|sabit\ BirdDog\ True1|tüm\ modeller\ BirdDog|NDI PTZ\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit BirdDog`);
  }
}


// Day 271: sabit chimney flashing / baca flaşı — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit chimney flashing yok|no fixed site chimney flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit chimney flashing / baca flaşı`);
  }
  if (/chimney flashing\ garantidir|sabit\ chimney flashing\ True1|tüm\ modeller\ chimney flashing|baca\ flaşı\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit chimney flashing`);
  }
}


// Day 272: sabit Pexip / conference platform — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Pexip yok|no fixed site Pexip/i.test(html)) {
    errors.push(`${rel} should hedge sabit Pexip / conference platform`);
  }
  if (/Pexip\ garantidir|sabit\ Pexip\ True1|tüm\ modeller\ Pexip|conference platform\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Pexip`);
  }
}


// Day 273: sabit hip flashing / kalça flaş — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit hip flashing yok|no fixed site hip flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit hip flashing / kalça flaş`);
  }
  if (/hip flashing\ garantidir|sabit\ hip flashing\ True1|tüm\ modeller\ hip flashing|kalça\ flaş\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit hip flashing`);
  }
}


// Day 274: sabit Lumens / PTZ camera — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Lumens yok|no fixed site Lumens/i.test(html)) {
    errors.push(`${rel} should hedge sabit Lumens / PTZ camera`);
  }
  if (/Lumens\ garantidir|sabit\ Lumens\ True1|tüm\ modeller\ Lumens|PTZ camera\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Lumens`);
  }
}


// Day 275: sabit rake flashing / saçak flaş — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit rake flashing yok|no fixed site rake flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit rake flashing / saçak flaş`);
  }
  if (/rake flashing\ garantidir|sabit\ rake flashing\ True1|tüm\ modeller\ rake flashing|saçak\ flaş\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit rake flashing`);
  }
}


// Day 276: sabit PTZOptics / USB PTZ — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit PTZOptics yok|no fixed site PTZOptics/i.test(html)) {
    errors.push(`${rel} should hedge sabit PTZOptics / USB PTZ`);
  }
  if (/PTZOptics\ garantidir|sabit\ PTZOptics\ True1|tüm\ modeller\ PTZOptics|USB PTZ\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit PTZOptics`);
  }
}


// Day 277: sabit fascia flashing / fascia flaş — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit fascia flashing yok|no fixed site fascia flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit fascia flashing / fascia flaş`);
  }
  if (/fascia flashing\ garantidir|sabit\ fascia flashing\ True1|tüm\ modeller\ fascia flashing|fascia\ flaş\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit fascia flashing`);
  }
}


// Day 278: sabit Obsbot / AI camera — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Obsbot yok|no fixed site Obsbot/i.test(html)) {
    errors.push(`${rel} should hedge sabit Obsbot / AI camera`);
  }
  if (/Obsbot\ garantidir|sabit\ Obsbot\ True1|tüm\ modeller\ Obsbot|AI camera\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Obsbot`);
  }
}


// Day 279: sabit head flashing / başlık flaş — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit head flashing yok|no fixed site head flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit head flashing / başlık flaş`);
  }
  if (/head flashing\ garantidir|sabit\ head flashing\ True1|tüm\ modeller\ head flashing|başlık\ flaş\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit head flashing`);
  }
}


// Day 280: sabit Barco / projector — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Barco yok|no fixed site Barco/i.test(html)) {
    errors.push(`${rel} should hedge sabit Barco / projector`);
  }
  if (/Barco\ garantidir|sabit\ Barco\ True1|tüm\ modeller\ Barco|projector\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Barco`);
  }
}


// Day 281: sabit jamb flashing / jamb flaş — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit jamb flashing yok|no fixed site jamb flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit jamb flashing / jamb flaş`);
  }
  if (/jamb flashing\ garantidir|sabit\ jamb flashing\ True1|tüm\ modeller\ jamb flashing|jamb\ flaş\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit jamb flashing`);
  }
}


// Day 282: sabit Christie / laser projector — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Christie yok|no fixed site Christie/i.test(html)) {
    errors.push(`${rel} should hedge sabit Christie / laser projector`);
  }
  if (/Christie\ garantidir|sabit\ Christie\ True1|tüm\ modeller\ Christie|laser\ projector\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Christie`);
  }
}


// Day 283: sabit threshold flashing / eşik flaş — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit threshold flashing yok|no fixed site threshold flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit threshold flashing / eşik flaş`);
  }
  if (/threshold flashing\ garantidir|sabit\ threshold flashing\ True1|tüm\ modeller\ threshold flashing|eşik\ flaş\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit threshold flashing`);
  }
}


// Day 284: sabit Epson / LCD projector — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Epson yok|no fixed site Epson/i.test(html)) {
    errors.push(`${rel} should hedge sabit Epson / LCD projector`);
  }
  if (/Epson\ garantidir|sabit\ Epson\ True1|tüm\ modeller\ Epson|LCD\ projector\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Epson`);
  }
}


// Day 285: sabit gravel stop / çakıl stoper — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit gravel stop yok|no fixed site gravel stop/i.test(html)) {
    errors.push(`${rel} should hedge sabit gravel stop / çakıl stoper`);
  }
  if (/gravel stop\ garantidir|sabit\ gravel stop\ True1|tüm\ modeller\ gravel stop|çakıl\ stoper\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit gravel stop`);
  }
}


// Day 286: sabit NEC / display wall — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit NEC yok|no fixed site NEC/i.test(html)) {
    errors.push(`${rel} should hedge sabit NEC / display wall`);
  }
  if (/NEC\ garantidir|sabit\ NEC\ True1|tüm\ modeller\ NEC|display\ wall\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit NEC`);
  }
}


// Day 287: sabit cant strip / eğimli şerit — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cant strip yok|no fixed site cant strip/i.test(html)) {
    errors.push(`${rel} should hedge sabit cant strip / eğimli şerit`);
  }
  if (/cant strip\ garantidir|sabit\ cant strip\ True1|tüm\ modeller\ cant strip|eğimli\ şerit\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cant strip`);
  }
}


// Day 288: sabit Panasonic / pro display — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Panasonic yok|no fixed site Panasonic/i.test(html)) {
    errors.push(`${rel} should hedge sabit Panasonic / pro display`);
  }
  if (/Panasonic\ garantidir|sabit\ Panasonic\ True1|tüm\ modeller\ Panasonic|pro\ display\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Panasonic`);
  }
}


// Day 289: sabit reglet / reglet flaş — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit reglet yok|no fixed site reglet/i.test(html)) {
    errors.push(`${rel} should hedge sabit reglet / reglet flaş`);
  }
  if (/reglet\ garantidir|sabit\ reglet\ True1|tüm\ modeller\ reglet|reglet\ flaş\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit reglet`);
  }
}


// Day 290: sabit Optoma / DLP projector — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Optoma yok|no fixed site Optoma/i.test(html)) {
    errors.push(`${rel} should hedge sabit Optoma / DLP projector`);
  }
  if (/Optoma\ garantidir|sabit\ Optoma\ True1|tüm\ modeller\ Optoma|DLP\ projector\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Optoma`);
  }
}


// Day 291: sabit termination bar / bitiş çubuğu — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit termination bar yok|no fixed site termination bar/i.test(html)) {
    errors.push(`${rel} should hedge sabit termination bar / bitiş çubuğu`);
  }
  if (/termination bar\ garantidir|sabit\ termination bar\ True1|tüm\ modeller\ termination bar|bitiş\ çubuğu\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit termination bar`);
  }
}


// Day 292: sabit BenQ / interactive display — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit BenQ yok|no fixed site BenQ/i.test(html)) {
    errors.push(`${rel} should hedge sabit BenQ / interactive display`);
  }
  if (/BenQ\ garantidir|sabit\ BenQ\ True1|tüm\ modeller\ BenQ|interactive\ display\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit BenQ`);
  }
}


// Day 293: sabit through-wall flashing / duvar geçiş flaşı — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit through-wall flashing yok|no fixed site through-wall flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit through-wall flashing / duvar geçiş flaşı`);
  }
  if (/through-wall flashing\ garantidir|sabit\ through-wall flashing\ True1|tüm\ modeller\ through-wall flashing|duvar\ geçiş\ flaşı\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit through-wall flashing`);
  }
}


// Day 294: sabit Sony / BRAVIA display — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Sony yok|no fixed site Sony/i.test(html)) {
    errors.push(`${rel} should hedge sabit Sony / BRAVIA display`);
  }
  if (/Sony\ garantidir|sabit\ Sony\ True1|tüm\ modeller\ Sony|BRAVIA\ display\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Sony`);
  }
}


// Day 295: sabit coping / parapet kapak — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit coping yok|no fixed site coping/i.test(html)) {
    errors.push(`${rel} should hedge sabit coping / parapet kapak`);
  }
  if (/coping\ garantidir|sabit\ coping\ True1|tüm\ modeller\ coping|parapet\ kapak\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit coping`);
  }
}


// Day 296: sabit Airtame / wireless share — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Airtame yok|no fixed site Airtame/i.test(html)) {
    errors.push(`${rel} should hedge sabit Airtame / wireless share`);
  }
  if (/Airtame\ garantidir|sabit\ Airtame\ True1|tüm\ modeller\ Airtame|wireless\ share\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Airtame`);
  }
}


// Day 297: sabit base flashing / temel flaş — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit base flashing yok|no fixed site base flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit base flashing / temel flaş`);
  }
  if (/base flashing\ garantidir|sabit\ base flashing\ True1|tüm\ modeller\ base flashing|temel\ flaş\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit base flashing`);
  }
}


// Day 298: sabit Mersive / Solstice Pod — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Mersive yok|no fixed site Mersive/i.test(html)) {
    errors.push(`${rel} should hedge sabit Mersive / Solstice Pod`);
  }
  if (/Mersive\ garantidir|sabit\ Mersive\ True1|tüm\ modeller\ Mersive|Solstice\ Pod\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Mersive`);
  }
}


// Day 299: sabit cleat / kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cleat yok|no fixed site cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit cleat / kleyt`);
  }
  if (/cleat\ garantidir|sabit\ cleat\ True1|tüm\ modeller\ cleat|kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cleat`);
  }
}


// Day 300: sabit Vivitek / installation projector — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Vivitek yok|no fixed site Vivitek/i.test(html)) {
    errors.push(`${rel} should hedge sabit Vivitek / installation projector`);
  }
  if (/Vivitek\ garantidir|sabit\ Vivitek\ True1|tüm\ modeller\ Vivitek|installation\ projector\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Vivitek`);
  }
}


// Day 301: sabit surface cleat / yüzey kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit surface cleat yok|no fixed site surface cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit surface cleat / yüzey kleyt`);
  }
  if (/surface cleat\ garantidir|sabit\ surface cleat\ True1|tüm\ modeller\ surface cleat|yüzey\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit surface cleat`);
  }
}


// Day 302: sabit Promethean / ActivPanel — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Promethean yok|no fixed site Promethean/i.test(html)) {
    errors.push(`${rel} should hedge sabit Promethean / ActivPanel`);
  }
  if (/Promethean\ garantidir|sabit\ Promethean\ True1|tüm\ modeller\ Promethean|ActivPanel\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Promethean`);
  }
}


// Day 303: sabit continuous cleat / sürekli kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit continuous cleat yok|no fixed site continuous cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit continuous cleat / sürekli kleyt`);
  }
  if (/continuous cleat\ garantidir|sabit\ continuous cleat\ True1|tüm\ modeller\ continuous cleat|sürekli\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit continuous cleat`);
  }
}


// Day 304: sabit Newline / IFP display — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Newline yok|no fixed site Newline/i.test(html)) {
    errors.push(`${rel} should hedge sabit Newline / IFP display`);
  }
  if (/Newline\ garantidir|sabit\ Newline\ True1|tüm\ modeller\ Newline|IFP\ display\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Newline`);
  }
}


// Day 305: sabit through-wall cleat / duvar geçiş kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit through-wall cleat yok|no fixed site through-wall cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit through-wall cleat / duvar geçiş kleyt`);
  }
  if (/through-wall cleat\ garantidir|sabit\ through-wall cleat\ True1|tüm\ modeller\ through-wall cleat|duvar\ geçiş\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit through-wall cleat`);
  }
}


// Day 306: sabit ViewSonic / interactive display — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ViewSonic yok|no fixed site ViewSonic/i.test(html)) {
    errors.push(`${rel} should hedge sabit ViewSonic / interactive display`);
  }
  if (/ViewSonic\ garantidir|sabit\ ViewSonic\ True1|tüm\ modeller\ ViewSonic|interactive\ display\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ViewSonic`);
  }
}


// Day 307: sabit concealed cleat / gizli kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit concealed cleat yok|no fixed site concealed cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit concealed cleat / gizli kleyt`);
  }
  if (/concealed cleat\ garantidir|sabit\ concealed cleat\ True1|tüm\ modeller\ concealed cleat|gizli\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit concealed cleat`);
  }
}


// Day 308: sabit Clevertouch / interactive display — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Clevertouch yok|no fixed site Clevertouch/i.test(html)) {
    errors.push(`${rel} should hedge sabit Clevertouch / interactive display`);
  }
  if (/Clevertouch\ garantidir|sabit\ Clevertouch\ True1|tüm\ modeller\ Clevertouch|interactive\ display\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Clevertouch`);
  }
}


// Day 309: sabit interlocking cleat / kenetli kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit interlocking cleat yok|no fixed site interlocking cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit interlocking cleat / kenetli kleyt`);
  }
  if (/interlocking cleat\ garantidir|sabit\ interlocking cleat\ True1|tüm\ modeller\ interlocking cleat|kenetli\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit interlocking cleat`);
  }
}


// Day 310: sabit Sharp / AQUOS board — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Sharp yok|no fixed site Sharp/i.test(html)) {
    errors.push(`${rel} should hedge sabit Sharp / AQUOS board`);
  }
  if (/Sharp\ garantidir|sabit\ Sharp\ True1|tüm\ modeller\ Sharp|AQUOS\ board\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Sharp`);
  }
}


// Day 311: sabit snap cleat / snap kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit snap cleat yok|no fixed site snap cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit snap cleat / snap kleyt`);
  }
  if (/snap cleat\ garantidir|sabit\ snap cleat\ True1|tüm\ modeller\ snap cleat|snap\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit snap cleat`);
  }
}


// Day 312: sabit Boxlight / MimioBoard — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Boxlight yok|no fixed site Boxlight/i.test(html)) {
    errors.push(`${rel} should hedge sabit Boxlight / MimioBoard`);
  }
  if (/Boxlight\ garantidir|sabit\ Boxlight\ True1|tüm\ modeller\ Boxlight|MimioBoard\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Boxlight`);
  }
}


// Day 313: sabit extruded cleat / ekstrüzyon kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit extruded cleat yok|no fixed site extruded cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit extruded cleat / ekstrüzyon kleyt`);
  }
  if (/extruded cleat\ garantidir|sabit\ extruded cleat\ True1|tüm\ modeller\ extruded cleat|ekstrüzyon\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit extruded cleat`);
  }
}


// Day 314: sabit Horion / interactive panel — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Horion yok|no fixed site Horion/i.test(html)) {
    errors.push(`${rel} should hedge sabit Horion / interactive panel`);
  }
  if (/Horion\ garantidir|sabit\ Horion\ True1|tüm\ modeller\ Horion|interactive\ panel\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Horion`);
  }
}


// Day 315: sabit standing seam cleat / standing seam kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit standing seam cleat yok|no fixed site standing seam cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit standing seam cleat / standing seam kleyt`);
  }
  if (/standing seam cleat\ garantidir|sabit\ standing seam cleat\ True1|tüm\ modeller\ standing seam cleat|standing\ seam\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit standing seam cleat`);
  }
}


// Day 316: sabit Hisense / GoBoard — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Hisense yok|no fixed site Hisense/i.test(html)) {
    errors.push(`${rel} should hedge sabit Hisense / GoBoard`);
  }
  if (/Hisense\ garantidir|sabit\ Hisense\ True1|tüm\ modeller\ Hisense|GoBoard\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Hisense`);
  }
}


// Day 317: sabit hook cleat / kanca kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit hook cleat yok|no fixed site hook cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit hook cleat / kanca kleyt`);
  }
  if (/hook cleat\ garantidir|sabit\ hook cleat\ True1|tüm\ modeller\ hook cleat|kanca\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit hook cleat`);
  }
}


// Day 318: sabit i3TOUCH / interactive display — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit i3TOUCH yok|no fixed site i3TOUCH/i.test(html)) {
    errors.push(`${rel} should hedge sabit i3TOUCH / interactive display`);
  }
  if (/i3TOUCH\ garantidir|sabit\ i3TOUCH\ True1|tüm\ modeller\ i3TOUCH|interactive\ display\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit i3TOUCH`);
  }
}


// Day 319: sabit coping cleat / parapet kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit coping cleat yok|no fixed site coping cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit coping cleat / parapet kleyt`);
  }
  if (/coping cleat\ garantidir|sabit\ coping cleat\ True1|tüm\ modeller\ coping cleat|parapet\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit coping cleat`);
  }
}


// Day 320: sabit Avocor / collaboration display — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Avocor yok|no fixed site Avocor/i.test(html)) {
    errors.push(`${rel} should hedge sabit Avocor / collaboration display`);
  }
  if (/Avocor\ garantidir|sabit\ Avocor\ True1|tüm\ modeller\ Avocor|collaboration\ display\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Avocor`);
  }
}


// Day 321: sabit rake cleat / saçak kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit rake cleat yok|no fixed site rake cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit rake cleat / saçak kleyt`);
  }
  if (/rake cleat\ garantidir|sabit\ rake cleat\ True1|tüm\ modeller\ rake cleat|saçak\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit rake cleat`);
  }
}


// Day 322: sabit InFocus / Mondopad — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit InFocus yok|no fixed site InFocus/i.test(html)) {
    errors.push(`${rel} should hedge sabit InFocus / Mondopad`);
  }
  if (/InFocus\ garantidir|sabit\ InFocus\ True1|tüm\ modeller\ InFocus|Mondopad\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit InFocus`);
  }
}


// Day 323: sabit fascia cleat / saçak altı kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit fascia cleat yok|no fixed site fascia cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit fascia cleat / saçak altı kleyt`);
  }
  if (/fascia cleat\ garantidir|sabit\ fascia cleat\ True1|tüm\ modeller\ fascia cleat|saçak\ altı\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit fascia cleat`);
  }
}


// Day 324: sabit Elo / touch display — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Elo yok|no fixed site Elo/i.test(html)) {
    errors.push(`${rel} should hedge sabit Elo / touch display`);
  }
  if (/Elo\ garantidir|sabit\ Elo\ True1|tüm\ modeller\ Elo|touch\ display\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Elo`);
  }
}


// Day 325: sabit ridge cleat / mahya kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ridge cleat yok|no fixed site ridge cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit ridge cleat / mahya kleyt`);
  }
  if (/ridge cleat\ garantidir|sabit\ ridge cleat\ True1|tüm\ modeller\ ridge cleat|mahya\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ridge cleat`);
  }
}


// Day 326: sabit Surface Hub / Microsoft Hub — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Surface Hub yok|no fixed site Surface Hub/i.test(html)) {
    errors.push(`${rel} should hedge sabit Surface Hub / Microsoft Hub`);
  }
  if (/Surface Hub\ garantidir|sabit\ Surface Hub\ True1|tüm\ modeller\ Surface Hub|Microsoft\ Hub\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Surface Hub`);
  }
}


// Day 327: sabit base cleat / taban kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit base cleat yok|no fixed site base cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit base cleat / taban kleyt`);
  }
  if (/base cleat\ garantidir|sabit\ base cleat\ True1|tüm\ modeller\ base cleat|taban\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit base cleat`);
  }
}


// Day 328: sabit Samsung Flip / flip board — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Samsung Flip yok|no fixed site Samsung Flip/i.test(html)) {
    errors.push(`${rel} should hedge sabit Samsung Flip / flip board`);
  }
  if (/Samsung Flip\ garantidir|sabit\ Samsung Flip\ True1|tüm\ modeller\ Samsung Flip|flip\ board\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Samsung Flip`);
  }
}


// Day 329: sabit drip cleat / damlalık kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit drip cleat yok|no fixed site drip cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit drip cleat / damlalık kleyt`);
  }
  if (/drip cleat\ garantidir|sabit\ drip cleat\ True1|tüm\ modeller\ drip cleat|damlalık\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit drip cleat`);
  }
}


// Day 330: sabit LG CreateBoard / CreateBoard — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit LG CreateBoard yok|no fixed site LG CreateBoard/i.test(html)) {
    errors.push(`${rel} should hedge sabit LG CreateBoard / CreateBoard`);
  }
  if (/LG CreateBoard\ garantidir|sabit\ LG CreateBoard\ True1|tüm\ modeller\ LG CreateBoard|CreateBoard\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit LG CreateBoard`);
  }
}


// Day 331: sabit valley cleat / vadi kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit valley cleat yok|no fixed site valley cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit valley cleat / vadi kleyt`);
  }
  if (/valley cleat\ garantidir|sabit\ valley cleat\ True1|tüm\ modeller\ valley cleat|vadi\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit valley cleat`);
  }
}


// Day 332: sabit SMART Board / interactive whiteboard — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit SMART Board yok|no fixed site SMART Board/i.test(html)) {
    errors.push(`${rel} should hedge sabit SMART Board / interactive whiteboard`);
  }
  if (/SMART Board\ garantidir|sabit\ SMART Board\ True1|tüm\ modeller\ SMART Board|interactive\ whiteboard\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit SMART Board`);
  }
}


// Day 333: sabit head cleat / başlık kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit head cleat yok|no fixed site head cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit head cleat / başlık kleyt`);
  }
  if (/head cleat\ garantidir|sabit\ head cleat\ True1|tüm\ modeller\ head cleat|başlık\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit head cleat`);
  }
}


// Day 334: sabit Webex Board — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Webex Board yok|no fixed site Webex Board/i.test(html)) {
    errors.push(`${rel} should hedge sabit Webex Board`);
  }
  if (/Webex Board\ garantidir|sabit\ Webex Board\ True1|tüm\ modeller\ Webex Board|Webex Board\ standarttır/i.test(html)) {
    errors.push(`${rel} must not invent sabit Webex Board`);
  }
}


// Day 335: sabit sill cleat / eşik kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit sill cleat yok|no fixed site sill cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit sill cleat / eşik kleyt`);
  }
  if (/sill cleat\ garantidir|sabit\ sill cleat\ True1|tüm\ modeller\ sill cleat|eşik\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit sill cleat`);
  }
}


// Day 336: sabit HUAWEI IdeaHub / IdeaHub — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit HUAWEI IdeaHub yok|no fixed site HUAWEI IdeaHub/i.test(html)) {
    errors.push(`${rel} should hedge sabit HUAWEI IdeaHub / IdeaHub`);
  }
  if (/HUAWEI IdeaHub\ garantidir|sabit\ HUAWEI IdeaHub\ True1|tüm\ modeller\ HUAWEI IdeaHub|IdeaHub\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit HUAWEI IdeaHub`);
  }
}


// Day 337: sabit jamb cleat / jamb kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit jamb cleat yok|no fixed site jamb cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit jamb cleat / jamb kleyt`);
  }
  if (/jamb cleat\ garantidir|sabit\ jamb cleat\ True1|tüm\ modeller\ jamb cleat|jamb\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit jamb cleat`);
  }
}


// Day 338: sabit Google Jamboard / Jamboard — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Google Jamboard yok|no fixed site Google Jamboard/i.test(html)) {
    errors.push(`${rel} should hedge sabit Google Jamboard / Jamboard`);
  }
  if (/Google Jamboard\ garantidir|sabit\ Google Jamboard\ True1|tüm\ modeller\ Google Jamboard|Jamboard\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Google Jamboard`);
  }
}


// Day 339: sabit apron cleat / etek kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit apron cleat yok|no fixed site apron cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit apron cleat / etek kleyt`);
  }
  if (/apron cleat\ garantidir|sabit\ apron cleat\ True1|tüm\ modeller\ apron cleat|etek\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit apron cleat`);
  }
}


// Day 340: sabit Lenovo ThinkSmart / ThinkSmart — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Lenovo ThinkSmart yok|no fixed site Lenovo ThinkSmart/i.test(html)) {
    errors.push(`${rel} should hedge sabit Lenovo ThinkSmart / ThinkSmart`);
  }
  if (/Lenovo ThinkSmart\ garantidir|sabit\ Lenovo ThinkSmart\ True1|tüm\ modeller\ Lenovo ThinkSmart|ThinkSmart\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Lenovo ThinkSmart`);
  }
}


// Day 341: sabit step cleat / basamak kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit step cleat yok|no fixed site step cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit step cleat / basamak kleyt`);
  }
  if (/step cleat\ garantidir|sabit\ step cleat\ True1|tüm\ modeller\ step cleat|basamak\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit step cleat`);
  }
}


// Day 342: sabit Vibe Board / Vibe — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Vibe Board yok|no fixed site Vibe Board/i.test(html)) {
    errors.push(`${rel} should hedge sabit Vibe Board / Vibe`);
  }
  if (/Vibe Board\ garantidir|sabit\ Vibe Board\ True1|tüm\ modeller\ Vibe Board|Vibe\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Vibe Board`);
  }
}


// Day 343: sabit chimney cleat / baca kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit chimney cleat yok|no fixed site chimney cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit chimney cleat / baca kleyt`);
  }
  if (/chimney cleat\ garantidir|sabit\ chimney cleat\ True1|tüm\ modeller\ chimney cleat|baca\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit chimney cleat`);
  }
}


// Day 344: sabit Seewo / interactive flat panel — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Seewo yok|no fixed site Seewo/i.test(html)) {
    errors.push(`${rel} should hedge sabit Seewo / interactive flat panel`);
  }
  if (/Seewo\ garantidir|sabit\ Seewo\ True1|tüm\ modeller\ Seewo|interactive\ flat\ panel\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Seewo`);
  }
}


// Day 345: sabit hip cleat / mahya kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit hip cleat yok|no fixed site hip cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit hip cleat / mahya kleyt`);
  }
  if (/hip cleat\ garantidir|sabit\ hip cleat\ True1|tüm\ modeller\ hip cleat|mahya\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit hip cleat`);
  }
}


// Day 346: sabit Dell Canvas / Canvas — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Dell Canvas yok|no fixed site Dell Canvas/i.test(html)) {
    errors.push(`${rel} should hedge sabit Dell Canvas / Canvas`);
  }
  if (/Dell Canvas\ garantidir|sabit\ Dell Canvas\ True1|tüm\ modeller\ Dell Canvas|Canvas\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Dell Canvas`);
  }
}


// Day 347: sabit threshold cleat / eşik kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit threshold cleat yok|no fixed site threshold cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit threshold cleat / eşik kleyt`);
  }
  if (/threshold cleat\ garantidir|sabit\ threshold cleat\ True1|tüm\ modeller\ threshold cleat|eşik\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit threshold cleat`);
  }
}


// Day 348: sabit Cisco Board / Board — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Cisco Board yok|no fixed site Cisco Board/i.test(html)) {
    errors.push(`${rel} should hedge sabit Cisco Board / Board`);
  }
  if (/Cisco Board\ garantidir|sabit\ Cisco Board\ True1|tüm\ modeller\ Cisco Board/i.test(html)) {
    errors.push(`${rel} must not invent sabit Cisco Board`);
  }
}


// Day 349: sabit cant cleat / kant kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cant cleat yok|no fixed site cant cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit cant cleat / kant kleyt`);
  }
  if (/cant cleat\ garantidir|sabit\ cant cleat\ True1|tüm\ modeller\ cant cleat|kant\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cant cleat`);
  }
}


// Day 350: sabit Microsoft Teams Display / Teams Display — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Microsoft Teams Display yok|no fixed site Microsoft Teams Display/i.test(html)) {
    errors.push(`${rel} should hedge sabit Microsoft Teams Display / Teams Display`);
  }
  if (/Microsoft Teams Display\ garantidir|sabit\ Microsoft Teams Display\ True1|tüm\ modeller\ Microsoft Teams Display|Teams Display\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Microsoft Teams Display`);
  }
}


// Day 351: sabit reglet cleat / reglet kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit reglet cleat yok|no fixed site reglet cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit reglet cleat / reglet kleyt`);
  }
  if (/reglet cleat\ garantidir|sabit\ reglet cleat\ True1|tüm\ modeller\ reglet cleat|reglet\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit reglet cleat`);
  }
}


// Day 352: sabit BenQ Board / BenQ IFP — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit BenQ Board yok|no fixed site BenQ Board/i.test(html)) {
    errors.push(`${rel} should hedge sabit BenQ Board / BenQ IFP`);
  }
  if (/BenQ Board\ garantidir|sabit\ BenQ Board\ True1|tüm\ modeller\ BenQ Board|BenQ IFP\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit BenQ Board`);
  }
}


// Day 353: sabit termination cleat / termination kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit termination cleat yok|no fixed site termination cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit termination cleat / termination kleyt`);
  }
  if (/termination cleat\ garantidir|sabit\ termination cleat\ True1|tüm\ modeller\ termination cleat|termination\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit termination cleat`);
  }
}


// Day 354: sabit Zoom Rooms Display / Zoom Display — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Zoom Rooms Display yok|no fixed site Zoom Rooms Display/i.test(html)) {
    errors.push(`${rel} should hedge sabit Zoom Rooms Display / Zoom Display`);
  }
  if (/Zoom Rooms Display\ garantidir|sabit\ Zoom Rooms Display\ True1|tüm\ modeller\ Zoom Rooms Display|Zoom Display\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Zoom Rooms Display`);
  }
}


// Day 355: sabit counter cleat / counter kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit counter cleat yok|no fixed site counter cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit counter cleat / counter kleyt`);
  }
  if (/counter cleat\ garantidir|sabit\ counter cleat\ True1|tüm\ modeller\ counter cleat|counter\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit counter cleat`);
  }
}


// Day 356: sabit Google Meet Series / Meet Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Google Meet Series yok|no fixed site Google Meet Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit Google Meet Series / Meet Series`);
  }
  if (/Google Meet Series\ garantidir|sabit\ Google Meet Series\ True1|tüm\ modeller\ Google Meet Series|Meet Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Google Meet Series`);
  }
}


// Day 357: sabit kick-out cleat / kick-out kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit kick-out cleat yok|no fixed site kick-out cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit kick-out cleat / kick-out kleyt`);
  }
  if (/kick-out cleat\ garantidir|sabit\ kick-out cleat\ True1|tüm\ modeller\ kick-out cleat|kick-out\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit kick-out cleat`);
  }
}


// Day 358: sabit Ricoh Interactive / Ricoh IFP — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Ricoh Interactive yok|no fixed site Ricoh Interactive/i.test(html)) {
    errors.push(`${rel} should hedge sabit Ricoh Interactive / Ricoh IFP`);
  }
  if (/Ricoh Interactive\ garantidir|sabit\ Ricoh Interactive\ True1|tüm\ modeller\ Ricoh Interactive|Ricoh IFP\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Ricoh Interactive`);
  }
}


// Day 359: sabit cricket cleat / cricket kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cricket cleat yok|no fixed site cricket cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit cricket cleat / cricket kleyt`);
  }
  if (/cricket cleat\ garantidir|sabit\ cricket cleat\ True1|tüm\ modeller\ cricket cleat|cricket\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cricket cleat`);
  }
}


// Day 360: sabit Optoma Interactive / Optoma IFP — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Optoma Interactive yok|no fixed site Optoma Interactive/i.test(html)) {
    errors.push(`${rel} should hedge sabit Optoma Interactive / Optoma IFP`);
  }
  if (/Optoma Interactive\ garantidir|sabit\ Optoma Interactive\ True1|tüm\ modeller\ Optoma Interactive|Optoma IFP\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Optoma Interactive`);
  }
}


// Day 361: sabit soffit cleat / soffit kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit soffit cleat yok|no fixed site soffit cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit soffit cleat / soffit kleyt`);
  }
  if (/soffit cleat\ garantidir|sabit\ soffit cleat\ True1|tüm\ modeller\ soffit cleat|soffit\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit soffit cleat`);
  }
}


// Day 362: sabit Sharp AQUOS BOARD / Sharp AQUOS — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Sharp AQUOS BOARD yok|no fixed site Sharp AQUOS BOARD/i.test(html)) {
    errors.push(`${rel} should hedge sabit Sharp AQUOS BOARD / Sharp AQUOS`);
  }
  if (/Sharp AQUOS BOARD\ garantidir|sabit\ Sharp AQUOS BOARD\ True1|tüm\ modeller\ Sharp AQUOS BOARD|Sharp AQUOS\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Sharp AQUOS BOARD`);
  }
}


// Day 363: sabit parapet cleat / parapet kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit parapet cleat yok|no fixed site parapet cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit parapet cleat / parapet kleyt`);
  }
  if (/parapet cleat\ garantidir|sabit\ parapet cleat\ True1|tüm\ modeller\ parapet cleat|parapet\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit parapet cleat`);
  }
}


// Day 364: sabit Newline LYRA / Newline Flex — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Newline LYRA yok|no fixed site Newline LYRA/i.test(html)) {
    errors.push(`${rel} should hedge sabit Newline LYRA / Newline Flex`);
  }
  if (/Newline LYRA\ garantidir|sabit\ Newline LYRA\ True1|tüm\ modeller\ Newline LYRA|Newline Flex\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Newline LYRA`);
  }
}


// Day 365: sabit eave cleat / saçak kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit eave cleat yok|no fixed site eave cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit eave cleat / saçak kleyt`);
  }
  if (/eave cleat\ garantidir|sabit\ eave cleat\ True1|tüm\ modeller\ eave cleat|saçak\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit eave cleat`);
  }
}


// Day 366: sabit ViewSonic ViewBoard / ViewBoard IFP — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ViewSonic ViewBoard yok|no fixed site ViewSonic ViewBoard/i.test(html)) {
    errors.push(`${rel} should hedge sabit ViewSonic ViewBoard / ViewBoard IFP`);
  }
  if (/ViewSonic ViewBoard\ garantidir|sabit\ ViewSonic ViewBoard\ True1|tüm\ modeller\ ViewSonic ViewBoard|ViewBoard IFP\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ViewSonic ViewBoard`);
  }
}

// Day 367: sabit gutter cleat / oluk kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit gutter cleat yok|no fixed site gutter cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit gutter cleat / oluk kleyt`);
  }
  if (/gutter cleat\ garantidir|sabit\ gutter cleat\ True1|tüm\ modeller\ gutter cleat|oluk\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit gutter cleat`);
  }
}

// Day 368: sabit Promethean ActivPanel / ActivPanel Nickel — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Promethean ActivPanel yok|no fixed site Promethean ActivPanel/i.test(html)) {
    errors.push(`${rel} should hedge sabit Promethean ActivPanel / ActivPanel Nickel`);
  }
  if (/Promethean ActivPanel\ garantidir|sabit\ Promethean ActivPanel\ True1|tüm\ modeller\ Promethean ActivPanel|ActivPanel Nickel\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Promethean ActivPanel`);
  }
}


// Day 369: sabit sill pan / eşik tavası — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit sill pan yok|no fixed site sill pan/i.test(html)) {
    errors.push(`${rel} should hedge sabit sill pan / eşik tavası`);
  }
  if (/sill pan\ garantidir|sabit\ sill pan\ True1|tüm\ modeller\ sill pan|eşik\ tavası\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit sill pan`);
  }
}


// Day 370: sabit SMART Board GX / SMART Board MX — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit SMART Board GX yok|no fixed site SMART Board GX/i.test(html)) {
    errors.push(`${rel} should hedge sabit SMART Board GX / SMART Board MX`);
  }
  if (/SMART Board GX\ garantidir|sabit\ SMART Board GX\ True1|tüm\ modeller\ SMART Board GX|SMART Board MX\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit SMART Board GX`);
  }
}


// Day 371: sabit weep screed / süzme şerit — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit weep screed yok|no fixed site weep screed/i.test(html)) {
    errors.push(`${rel} should hedge sabit weep screed / süzme şerit`);
  }
  if (/weep screed\ garantidir|sabit\ weep screed\ True1|tüm\ modeller\ weep screed|süzme\ şerit\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit weep screed`);
  }
}


// Day 372: sabit Clevertouch Impact / Clevertouch Lux — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Clevertouch Impact yok|no fixed site Clevertouch Impact/i.test(html)) {
    errors.push(`${rel} should hedge sabit Clevertouch Impact / Clevertouch Lux`);
  }
  if (/Clevertouch Impact\ garantidir|sabit\ Clevertouch Impact\ True1|tüm\ modeller\ Clevertouch Impact|Clevertouch Lux\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Clevertouch Impact`);
  }
}


// Day 373: sabit cornice cleat / korniş kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cornice cleat yok|no fixed site cornice cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit cornice cleat / korniş kleyt`);
  }
  if (/cornice cleat\ garantidir|sabit\ cornice cleat\ True1|tüm\ modeller\ cornice cleat|korniş\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cornice cleat`);
  }
}


// Day 374: sabit Horion Interactive / Horion HO Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Horion Interactive yok|no fixed site Horion Interactive/i.test(html)) {
    errors.push(`${rel} should hedge sabit Horion Interactive / Horion HO Series`);
  }
  if (/Horion Interactive\ garantidir|sabit\ Horion Interactive\ True1|tüm\ modeller\ Horion Interactive|Horion HO Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Horion Interactive`);
  }
}


// Day 375: sabit z-flashing / Z flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit z-flashing yok|no fixed site z-flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit z-flashing / Z flaşör`);
  }
  if (/z-flashing\ garantidir|sabit\ z-flashing\ True1|tüm\ modeller\ z-flashing|Z\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit z-flashing`);
  }
}

// Day 376: sabit Hisense GoBoard / Hisense GoBoard Pro — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Hisense GoBoard yok|no fixed site Hisense GoBoard/i.test(html)) {
    errors.push(`${rel} should hedge sabit Hisense GoBoard / Hisense GoBoard Pro`);
  }
  if (/Hisense GoBoard\ garantidir|sabit\ Hisense GoBoard\ True1|tüm\ modeller\ Hisense GoBoard|Hisense GoBoard Pro\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Hisense GoBoard`);
  }
}


// Day 377: sabit balcony cleat / balkon kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit balcony cleat yok|no fixed site balcony cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit balcony cleat / balkon kleyt`);
  }
  if (/balcony cleat\ garantidir|sabit\ balcony cleat\ True1|tüm\ modeller\ balcony cleat|balkon\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit balcony cleat`);
  }
}


// Day 378: sabit CTOUCH Riva / CTOUCH Leddura — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit CTOUCH Riva yok|no fixed site CTOUCH Riva/i.test(html)) {
    errors.push(`${rel} should hedge sabit CTOUCH Riva / CTOUCH Leddura`);
  }
  if (/CTOUCH Riva\ garantidir|sabit\ CTOUCH Riva\ True1|tüm\ modeller\ CTOUCH Riva|CTOUCH Leddura\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit CTOUCH Riva`);
  }
}


// Day 379: sabit cap flashing / kapak flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cap flashing yok|no fixed site cap flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit cap flashing / kapak flaşör`);
  }
  if (/cap flashing\ garantidir|sabit\ cap flashing\ True1|tüm\ modeller\ cap flashing|kapak\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cap flashing`);
  }
}


// Day 380: sabit Elo Interactive / Elo I-Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Elo Interactive yok|no fixed site Elo Interactive/i.test(html)) {
    errors.push(`${rel} should hedge sabit Elo Interactive / Elo I-Series`);
  }
  if (/Elo Interactive\ garantidir|sabit\ Elo Interactive\ True1|tüm\ modeller\ Elo Interactive|Elo I-Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Elo Interactive`);
  }
}


// Day 381: sabit canopy cleat / kanopi kleyt — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit canopy cleat yok|no fixed site canopy cleat/i.test(html)) {
    errors.push(`${rel} should hedge sabit canopy cleat / kanopi kleyt`);
  }
  if (/canopy cleat\ garantidir|sabit\ canopy cleat\ True1|tüm\ modeller\ canopy cleat|kanopi\ kleyt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit canopy cleat`);
  }
}


// Day 382: sabit Planar Interactive / Planar Simplicity — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Planar Interactive yok|no fixed site Planar Interactive/i.test(html)) {
    errors.push(`${rel} should hedge sabit Planar Interactive / Planar Simplicity`);
  }
  if (/Planar Interactive\ garantidir|sabit\ Planar Interactive\ True1|tüm\ modeller\ Planar Interactive|Planar Simplicity\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Planar Interactive`);
  }
}


// Day 383: sabit lintel flashing / lintel flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit lintel flashing yok|no fixed site lintel flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit lintel flashing / lintel flaşör`);
  }
  if (/lintel flashing\ garantidir|sabit\ lintel flashing\ True1|tüm\ modeller\ lintel flashing|lintel\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit lintel flashing`);
  }
}


// Day 384: sabit Newline Q Series / Newline TruTouch — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Newline Q Series yok|no fixed site Newline Q Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit Newline Q Series / Newline TruTouch`);
  }
  if (/Newline Q Series\ garantidir|sabit\ Newline Q Series\ True1|tüm\ modeller\ Newline Q Series|Newline TruTouch\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Newline Q Series`);
  }
}


// Day 385: sabit scupper flashing / scupper flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit scupper flashing yok|no fixed site scupper flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit scupper flashing / scupper flaşör`);
  }
  if (/scupper flashing\ garantidir|sabit\ scupper flashing\ True1|tüm\ modeller\ scupper flashing|scupper\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit scupper flashing`);
  }
}


// Day 386: sabit ActivPanel Titanium / ActivPanel Cobalt — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ActivPanel Titanium yok|no fixed site ActivPanel Titanium/i.test(html)) {
    errors.push(`${rel} should hedge sabit ActivPanel Titanium / ActivPanel Cobalt`);
  }
  if (/ActivPanel Titanium\ garantidir|sabit\ ActivPanel Titanium\ True1|tüm\ modeller\ ActivPanel Titanium|ActivPanel Cobalt\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ActivPanel Titanium`);
  }
}


// Day 387: sabit pitch pocket / çatı geçiş cebi — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit pitch pocket yok|no fixed site pitch pocket/i.test(html)) {
    errors.push(`${rel} should hedge sabit pitch pocket / çatı geçiş cebi`);
  }
  if (/pitch pocket\ garantidir|sabit\ pitch pocket\ True1|tüm\ modeller\ pitch pocket|çatı\ geçiş\ cebi\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit pitch pocket`);
  }
}


// Day 388: sabit i3TOUCH X-ONE / i3TOUCH Sixty — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit i3TOUCH X-ONE yok|no fixed site i3TOUCH X-ONE/i.test(html)) {
    errors.push(`${rel} should hedge sabit i3TOUCH X-ONE / i3TOUCH Sixty`);
  }
  if (/i3TOUCH X-ONE\ garantidir|sabit\ i3TOUCH X-ONE\ True1|tüm\ modeller\ i3TOUCH X-ONE|i3TOUCH Sixty\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit i3TOUCH X-ONE`);
  }
}


// Day 389: sabit roof curb / çatı curb — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit roof curb yok|no fixed site roof curb/i.test(html)) {
    errors.push(`${rel} should hedge sabit roof curb / çatı curb`);
  }
  if (/roof curb\ garantidir|sabit\ roof curb\ True1|tüm\ modeller\ roof curb|çatı\ curb\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit roof curb`);
  }
}


// Day 390: sabit Samsung Flip Pro / Samsung Flip WM — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Samsung Flip Pro yok|no fixed site Samsung Flip Pro/i.test(html)) {
    errors.push(`${rel} should hedge sabit Samsung Flip Pro / Samsung Flip WM`);
  }
  if (/Samsung Flip Pro\ garantidir|sabit\ Samsung Flip Pro\ True1|tüm\ modeller\ Samsung Flip Pro|Samsung Flip WM\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Samsung Flip Pro`);
  }
}


// Day 391: sabit skirt flashing / etek flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit skirt flashing yok|no fixed site skirt flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit skirt flashing / etek flaşör`);
  }
  if (/skirt flashing\ garantidir|sabit\ skirt flashing\ True1|tüm\ modeller\ skirt flashing|etek\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit skirt flashing`);
  }
}


// Day 392: sabit CTOUCH Laser / CTOUCH Canvas — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit CTOUCH Laser yok|no fixed site CTOUCH Laser/i.test(html)) {
    errors.push(`${rel} should hedge sabit CTOUCH Laser / CTOUCH Canvas`);
  }
  if (/CTOUCH Laser\ garantidir|sabit\ CTOUCH Laser\ True1|tüm\ modeller\ CTOUCH Laser|CTOUCH Canvas\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit CTOUCH Laser`);
  }
}


// Day 393: sabit ridge flashing / sırt flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ridge flashing yok|no fixed site ridge flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit ridge flashing / sırt flaşör`);
  }
  if (/ridge flashing\ garantidir|sabit\ ridge flashing\ True1|tüm\ modeller\ ridge flashing|sırt\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ridge flashing`);
  }
}


// Day 394: sabit Avocor E Series / Avocor G Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Avocor E Series yok|no fixed site Avocor E Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit Avocor E Series / Avocor G Series`);
  }
  if (/Avocor E Series\ garantidir|sabit\ Avocor E Series\ True1|tüm\ modeller\ Avocor E Series|Avocor G Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Avocor E Series`);
  }
}


// Day 395: sabit pipe boot / boru boot — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit pipe boot yok|no fixed site pipe boot/i.test(html)) {
    errors.push(`${rel} should hedge sabit pipe boot / boru boot`);
  }
  if (/pipe boot\ garantidir|sabit\ pipe boot\ True1|tüm\ modeller\ pipe boot|boru\ boot\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit pipe boot`);
  }
}


// Day 396: sabit InFocus Mondopad / InFocus JTouch — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit InFocus Mondopad yok|no fixed site InFocus Mondopad/i.test(html)) {
    errors.push(`${rel} should hedge sabit InFocus Mondopad / InFocus JTouch`);
  }
  if (/InFocus Mondopad\ garantidir|sabit\ InFocus Mondopad\ True1|tüm\ modeller\ InFocus Mondopad|InFocus JTouch\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit InFocus Mondopad`);
  }
}


// Day 397: sabit edge metal / kenar metal — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit edge metal yok|no fixed site edge metal/i.test(html)) {
    errors.push(`${rel} should hedge sabit edge metal / kenar metal`);
  }
  if (/edge metal\ garantidir|sabit\ edge metal\ True1|tüm\ modeller\ edge metal|kenar\ metal\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit edge metal`);
  }
}


// Day 398: sabit Newline Elite / Newline RS Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Newline Elite yok|no fixed site Newline Elite/i.test(html)) {
    errors.push(`${rel} should hedge sabit Newline Elite / Newline RS Series`);
  }
  if (/Newline Elite\ garantidir|sabit\ Newline Elite\ True1|tüm\ modeller\ Newline Elite|Newline RS Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Newline Elite`);
  }
}


// Day 399: sabit vent flashing / havalandırma flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit vent flashing yok|no fixed site vent flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit vent flashing / havalandırma flaşör`);
  }
  if (/vent flashing\ garantidir|sabit\ vent flashing\ True1|tüm\ modeller\ vent flashing|havalandırma\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit vent flashing`);
  }
}


// Day 400: sabit Newline X Series / Newline C Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Newline X Series yok|no fixed site Newline X Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit Newline X Series / Newline C Series`);
  }
  if (/Newline X Series\ garantidir|sabit\ Newline X Series\ True1|tüm\ modeller\ Newline X Series|Newline C Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Newline X Series`);
  }
}


// Day 401: sabit wall flashing / duvar flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit wall flashing yok|no fixed site wall flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit wall flashing / duvar flaşör`);
  }
  if (/wall flashing\ garantidir|sabit\ wall flashing\ True1|tüm\ modeller\ wall flashing|havalandırma\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit wall flashing`);
  }
}


// Day 402: sabit ActivPanel 9 / ActivPanel Nickel — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ActivPanel 9 yok|no fixed site ActivPanel 9/i.test(html)) {
    errors.push(`${rel} should hedge sabit ActivPanel 9 / ActivPanel Nickel`);
  }
  if (/ActivPanel 9\ garantidir|sabit\ ActivPanel 9\ True1|tüm\ modeller\ ActivPanel 9|ActivPanel Nickel\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ActivPanel 9`);
  }
}


// Day 403: sabit deck flashing / güverte flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit deck flashing yok|no fixed site deck flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit deck flashing / güverte flaşör`);
  }
  if (/deck flashing\ garantidir|sabit\ deck flashing\ True1|tüm\ modeller\ deck flashing|güverte\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit deck flashing`);
  }
}


// Day 404: sabit Avocor F Series / Avocor W Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Avocor F Series yok|no fixed site Avocor F Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit Avocor F Series / Avocor W Series`);
  }
  if (/Avocor F Series\ garantidir|sabit\ Avocor F Series\ True1|tüm\ modeller\ Avocor F Series|Avocor W Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Avocor F Series`);
  }
}


// Day 405: sabit window flashing / pencere flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit window flashing yok|no fixed site window flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit window flashing / pencere flaşör`);
  }
  if (/window flashing\ garantidir|sabit\ window flashing\ True1|tüm\ modeller\ window flashing|pencere\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit window flashing`);
  }
}


// Day 406: sabit SMART Board 7000 / SMART Board 6000S — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit SMART Board 7000 yok|no fixed site SMART Board 7000/i.test(html)) {
    errors.push(`${rel} should hedge sabit SMART Board 7000 / SMART Board 6000S`);
  }
  if (/SMART Board 7000\ garantidir|sabit\ SMART Board 7000\ True1|tüm\ modeller\ SMART Board 7000|SMART Board 6000S\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit SMART Board 7000`);
  }
}


// Day 407: sabit door flashing / kapı flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit door flashing yok|no fixed site door flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit door flashing / kapı flaşör`);
  }
  if (/door flashing\ garantidir|sabit\ door flashing\ True1|tüm\ modeller\ door flashing|kapı\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit door flashing`);
  }
}


// Day 408: sabit i3TOUCH E-ONE / i3TOUCH EX — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit i3TOUCH E-ONE yok|no fixed site i3TOUCH E-ONE/i.test(html)) {
    errors.push(`${rel} should hedge sabit i3TOUCH E-ONE / i3TOUCH EX`);
  }
  if (/i3TOUCH E-ONE\ garantidir|sabit\ i3TOUCH E-ONE\ True1|tüm\ modeller\ i3TOUCH E-ONE|i3TOUCH EX\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit i3TOUCH E-ONE`);
  }
}


// Day 409: sabit skylight flashing / ışıklık flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit skylight flashing yok|no fixed site skylight flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit skylight flashing / ışıklık flaşör`);
  }
  if (/skylight flashing\ garantidir|sabit\ skylight flashing\ True1|tüm\ modeller\ skylight flashing|ışıklık\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit skylight flashing`);
  }
}


// Day 410: sabit Newline VN Series / Newline Z Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Newline VN Series yok|no fixed site Newline VN Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit Newline VN Series / Newline Z Series`);
  }
  if (/Newline VN Series\ garantidir|sabit\ Newline VN Series\ True1|tüm\ modeller\ Newline VN Series|Newline Z Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Newline VN Series`);
  }
}


// Day 411: sabit dormer flashing / çatı çıkma flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit dormer flashing yok|no fixed site dormer flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit dormer flashing / çatı çıkma flaşör`);
  }
  if (/dormer flashing\ garantidir|sabit\ dormer flashing\ True1|tüm\ modeller\ dormer flashing|çatı\ çıkma\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit dormer flashing`);
  }
}


// Day 412: sabit BenQ RP Series / BenQ RM Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit BenQ RP Series yok|no fixed site BenQ RP Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit BenQ RP Series / BenQ RM Series`);
  }
  if (/BenQ RP Series\ garantidir|sabit\ BenQ RP Series\ True1|tüm\ modeller\ BenQ RP Series|BenQ RM Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit BenQ RP Series`);
  }
}


// Day 413: sabit eave flashing / saçak flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit eave flashing yok|no fixed site eave flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit eave flashing / saçak flaşör`);
  }
  if (/eave flashing\ garantidir|sabit\ eave flashing\ True1|tüm\ modeller\ eave flashing|saçak\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit eave flashing`);
  }
}


// Day 414: sabit Sharp PN Series / Sharp PN-L Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Sharp PN Series yok|no fixed site Sharp PN Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit Sharp PN Series / Sharp PN-L Series`);
  }
  if (/Sharp PN Series\ garantidir|sabit\ Sharp PN Series\ True1|tüm\ modeller\ Sharp PN Series|Sharp PN-L Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Sharp PN Series`);
  }
}


// Day 415: sabit valley pan / vadi tavası — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit valley pan yok|no fixed site valley pan/i.test(html)) {
    errors.push(`${rel} should hedge sabit valley pan / vadi tavası`);
  }
  if (/valley pan\ garantidir|sabit\ valley pan\ True1|tüm\ modeller\ valley pan|vadi\ tavası\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit valley pan`);
  }
}


// Day 416: sabit Optoma Creative Touch / Optoma 3-Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Optoma Creative Touch yok|no fixed site Optoma Creative Touch/i.test(html)) {
    errors.push(`${rel} should hedge sabit Optoma Creative Touch / Optoma 3-Series`);
  }
  if (/Optoma Creative Touch\ garantidir|sabit\ Optoma Creative Touch\ True1|tüm\ modeller\ Optoma Creative Touch|Optoma 3-Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Optoma Creative Touch`);
  }
}


// Day 417: sabit gutter apron / oluk eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit gutter apron yok|no fixed site gutter apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit gutter apron / oluk eteği`);
  }
  if (/gutter apron\ garantidir|sabit\ gutter apron\ True1|tüm\ modeller\ gutter apron|oluk\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit gutter apron`);
  }
}


// Day 418: sabit ViewSonic IFP55 / ViewSonic IFP65 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ViewSonic IFP55 yok|no fixed site ViewSonic IFP55/i.test(html)) {
    errors.push(`${rel} should hedge sabit ViewSonic IFP55 / ViewSonic IFP65`);
  }
  if (/ViewSonic IFP55\ garantidir|sabit\ ViewSonic IFP55\ True1|tüm\ modeller\ ViewSonic IFP55|ViewSonic IFP65\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ViewSonic IFP55`);
  }
}


// Day 419: sabit parapet coping cap / parapet kapak flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit parapet coping cap yok|no fixed site parapet coping cap/i.test(html)) {
    errors.push(`${rel} should hedge sabit parapet coping cap / parapet kapak flaşör`);
  }
  if (/parapet coping cap\ garantidir|sabit\ parapet coping cap\ True1|tüm\ modeller\ parapet coping cap|parapet\ kapak\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit parapet coping cap`);
  }
}


// Day 420: sabit Newline NT Series / Newline NT Touch — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Newline NT Series yok|no fixed site Newline NT Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit Newline NT Series / Newline NT Touch`);
  }
  if (/Newline NT Series\ garantidir|sabit\ Newline NT Series\ True1|tüm\ modeller\ Newline NT Series|Newline NT Touch\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Newline NT Series`);
  }
}


// Day 421: sabit chimney cricket flashing / baca cricket flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit chimney cricket flashing yok|no fixed site chimney cricket flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit chimney cricket flashing / baca cricket flaşör`);
  }
  if (/chimney cricket flashing\ garantidir|sabit\ chimney cricket flashing\ True1|tüm\ modeller\ chimney cricket flashing|baca\ cricket\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit chimney cricket flashing`);
  }
}


// Day 422: sabit Planar UltraRes / Planar UltraRes X — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Planar UltraRes yok|no fixed site Planar UltraRes/i.test(html)) {
    errors.push(`${rel} should hedge sabit Planar UltraRes / Planar UltraRes X`);
  }
  if (/Planar UltraRes\ garantidir|sabit\ Planar UltraRes\ True1|tüm\ modeller\ Planar UltraRes|Planar UltraRes X\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Planar UltraRes`);
  }
}


// Day 423: sabit step apron / basamak eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit step apron yok|no fixed site step apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit step apron / basamak eteği`);
  }
  if (/step apron\ garantidir|sabit\ step apron\ True1|tüm\ modeller\ step apron|basamak\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit step apron`);
  }
}


// Day 424: sabit i3TOUCH P2 / i3TOUCH P2+ — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit i3TOUCH P2 yok|no fixed site i3TOUCH P2/i.test(html)) {
    errors.push(`${rel} should hedge sabit i3TOUCH P2 / i3TOUCH P2+`);
  }
  if (/i3TOUCH P2\ garantidir|sabit\ i3TOUCH P2\ True1|tüm\ modeller\ i3TOUCH P2|i3TOUCH P2\+\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit i3TOUCH P2`);
  }
}


// Day 425: sabit roof valley pan / çatı vadi tavası — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit roof valley pan yok|no fixed site roof valley pan/i.test(html)) {
    errors.push(`${rel} should hedge sabit roof valley pan / çatı vadi tavası`);
  }
  if (/roof valley pan\ garantidir|sabit\ roof valley pan\ True1|tüm\ modeller\ roof valley pan|çatı\ vadi\ tavası\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit roof valley pan`);
  }
}


// Day 426: sabit Avocor AVG Series / Avocor AVG — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Avocor AVG Series yok|no fixed site Avocor AVG Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit Avocor AVG Series / Avocor AVG`);
  }
  if (/Avocor AVG Series\ garantidir|sabit\ Avocor AVG Series\ True1|tüm\ modeller\ Avocor AVG Series|Avocor AVG\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Avocor AVG Series`);
  }
}


// Day 427: sabit kick-out apron / çıkış eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit kick-out apron yok|no fixed site kick-out apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit kick-out apron / çıkış eteği`);
  }
  if (/kick-out\ apron\ garantidir|sabit\ kick-out\ apron\ True1|tüm\ modeller\ kick-out\ apron|çıkış\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit kick-out apron`);
  }
}


// Day 428: sabit Samsung WM Series / Samsung WM — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Samsung WM Series yok|no fixed site Samsung WM Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit Samsung WM Series / Samsung WM`);
  }
  if (/Samsung\ WM\ Series\ garantidir|sabit\ Samsung\ WM\ Series\ True1|tüm\ modeller\ Samsung\ WM\ Series|Samsung\ WM\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Samsung WM Series`);
  }
}


// Day 429: sabit rake edge flashing / saçak kenar flaşör — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit rake edge flashing yok|no fixed site rake edge flashing/i.test(html)) {
    errors.push(`${rel} should hedge sabit rake edge flashing / saçak kenar flaşör`);
  }
  if (/rake\ edge\ flashing\ garantidir|sabit\ rake\ edge\ flashing\ True1|tüm\ modeller\ rake\ edge\ flashing|saçak\ kenar\ flaşör\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit rake edge flashing`);
  }
}


// Day 430: sabit Planar Simplicity Touch / Planar Touch Series — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Planar Simplicity Touch yok|no fixed site Planar Simplicity Touch/i.test(html)) {
    errors.push(`${rel} should hedge sabit Planar Simplicity Touch / Planar Touch Series`);
  }
  if (/Planar\ Simplicity\ Touch\ garantidir|sabit\ Planar\ Simplicity\ Touch\ True1|tüm\ modeller\ Planar\ Simplicity\ Touch|Planar\ Touch\ Series\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Planar Simplicity Touch`);
  }
}


// Day 431: sabit chimney apron / baca eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit chimney apron yok|no fixed site chimney apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit chimney apron / baca eteği`);
  }
  if (/chimney\ apron\ garantidir|sabit\ chimney\ apron\ True1|tüm\ modeller\ chimney\ apron|baca\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit chimney apron`);
  }
}


// Day 432: sabit Yealink MeetingBoard 65 / MeetingBoard 65 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Yealink MeetingBoard 65 yok|no fixed site Yealink MeetingBoard 65/i.test(html)) {
    errors.push(`${rel} should hedge sabit Yealink MeetingBoard 65 / MeetingBoard 65`);
  }
  if (/Yealink\ MeetingBoard\ 65\ garantidir|sabit\ Yealink\ MeetingBoard\ 65\ True1|tüm\ modeller\ Yealink\ MeetingBoard\ 65|MeetingBoard\ 65\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Yealink MeetingBoard 65`);
  }
}


// Day 433: sabit roof apron / çatı eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit roof apron yok|no fixed site roof apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit roof apron / çatı eteği`);
  }
  if (/roof\ apron\ garantidir|sabit\ roof\ apron\ True1|tüm\ modeller\ roof\ apron|çatı\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit roof apron`);
  }
}


// Day 434: sabit Newline TR Series / Newline TR — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Newline TR Series yok|no fixed site Newline TR Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit Newline TR Series / Newline TR`);
  }
  if (/Newline\ TR\ Series\ garantidir|sabit\ Newline\ TR\ Series\ True1|tüm\ modeller\ Newline\ TR\ Series|Newline\ TR\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Newline TR Series`);
  }
}


// Day 435: sabit parapet apron / parapet eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit parapet apron yok|no fixed site parapet apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit parapet apron / parapet eteği`);
  }
  if (/parapet\ apron\ garantidir|sabit\ parapet\ apron\ True1|tüm\ modeller\ parapet\ apron|parapet\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit parapet apron`);
  }
}


// Day 436: sabit Optoma 5652RK / Optoma 5652 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Optoma 5652RK yok|no fixed site Optoma 5652RK/i.test(html)) {
    errors.push(`${rel} should hedge sabit Optoma 5652RK / Optoma 5652`);
  }
  if (/Optoma\ 5652RK\ garantidir|sabit\ Optoma\ 5652RK\ True1|tüm\ modeller\ Optoma\ 5652RK|Optoma\ 5652\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Optoma 5652RK`);
  }
}


// Day 437: sabit eave apron / saçak eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit eave apron yok|no fixed site eave apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit eave apron / saçak eteği`);
  }
  if (/eave\ apron\ garantidir|sabit\ eave\ apron\ True1|tüm\ modeller\ eave\ apron|saçak\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit eave apron`);
  }
}


// Day 438: sabit Vivitek NovoTouch / NovoTouch — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Vivitek NovoTouch yok|no fixed site Vivitek NovoTouch/i.test(html)) {
    errors.push(`${rel} should hedge sabit Vivitek NovoTouch / NovoTouch`);
  }
  if (/Vivitek\ NovoTouch\ garantidir|sabit\ Vivitek\ NovoTouch\ True1|tüm\ modeller\ Vivitek\ NovoTouch|NovoTouch\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Vivitek NovoTouch`);
  }
}


// Day 439: sabit cricket apron / kriket eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cricket apron yok|no fixed site cricket apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit cricket apron / kriket eteği`);
  }
  if (/cricket\ apron\ garantidir|sabit\ cricket\ apron\ True1|tüm\ modeller\ cricket\ apron|kriket\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cricket apron`);
  }
}


// Day 440: sabit i3TOUCH P3 Series / i3TOUCH P3 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit i3TOUCH P3 Series yok|no fixed site i3TOUCH P3 Series/i.test(html)) {
    errors.push(`${rel} should hedge sabit i3TOUCH P3 Series / i3TOUCH P3`);
  }
  if (/i3TOUCH\ P3\ Series\ garantidir|sabit\ i3TOUCH\ P3\ Series\ True1|tüm\ modeller\ i3TOUCH\ P3\ Series|i3TOUCH\ P3\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit i3TOUCH P3 Series`);
  }
}


// Day 441: sabit fascia apron / fascia eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit fascia apron yok|no fixed site fascia apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit fascia apron / fascia eteği`);
  }
  if (/fascia\ apron\ garantidir|sabit\ fascia\ apron\ True1|tüm\ modeller\ fascia\ apron|fascia\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit fascia apron`);
  }
}


// Day 442: sabit Horion Canvas Pro / Horion Canvas — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Horion Canvas Pro yok|no fixed site Horion Canvas Pro/i.test(html)) {
    errors.push(`${rel} should hedge sabit Horion Canvas Pro / Horion Canvas`);
  }
  if (/Horion\ Canvas\ Pro\ garantidir|sabit\ Horion\ Canvas\ Pro\ True1|tüm\ modeller\ Horion\ Canvas\ Pro|Horion\ Canvas\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Horion Canvas Pro`);
  }
}


// Day 443: sabit rake apron / rake eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit rake apron yok|no fixed site rake apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit rake apron / rake eteği`);
  }
  if (/rake\ apron\ garantidir|sabit\ rake\ apron\ True1|tüm\ modeller\ rake\ apron|rake\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit rake apron`);
  }
}


// Day 444: sabit Seewo Board Pro / Seewo Board — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Seewo Board Pro yok|no fixed site Seewo Board Pro/i.test(html)) {
    errors.push(`${rel} should hedge sabit Seewo Board Pro / Seewo Board`);
  }
  if (/Seewo\ Board\ Pro\ garantidir|sabit\ Seewo\ Board\ Pro\ True1|tüm\ modeller\ Seewo\ Board\ Pro|Seewo\ Board\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Seewo Board Pro`);
  }
}


// Day 445: sabit valley apron / vadi eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit valley apron yok|no fixed site valley apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit valley apron / vadi eteği`);
  }
  if (/valley\ apron\ garantidir|sabit\ valley\ apron\ True1|tüm\ modeller\ valley\ apron|vadi\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit valley apron`);
  }
}


// Day 446: sabit DTEN Bar Plus / DTEN Bar — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit DTEN Bar Plus yok|no fixed site DTEN Bar Plus/i.test(html)) {
    errors.push(`${rel} should hedge sabit DTEN Bar Plus / DTEN Bar`);
  }
  if (/DTEN\ Bar\ Plus\ garantidir|sabit\ DTEN\ Bar\ Plus\ True1|tüm\ modeller\ DTEN\ Bar\ Plus|DTEN\ Bar\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit DTEN Bar Plus`);
  }
}


// Day 447: sabit cap apron / kapak eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cap apron yok|no fixed site cap apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit cap apron / kapak eteği`);
  }
  if (/cap\ apron\ garantidir|sabit\ cap\ apron\ True1|tüm\ modeller\ cap\ apron|kapak\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit cap apron`);
  }
}


// Day 448: sabit Poly Studio X70 / Poly X70 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Poly Studio X70 yok|no fixed site Poly Studio X70/i.test(html)) {
    errors.push(`${rel} should hedge sabit Poly Studio X70 / Poly X70`);
  }
  if (/Poly\ Studio\ X70\ garantidir|sabit\ Poly\ Studio\ X70\ True1|tüm\ modeller\ Poly\ Studio\ X70|Poly\ X70\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Poly Studio X70`);
  }
}


// Day 449: sabit sill apron / denizlik eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit sill apron yok|no fixed site sill apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit sill apron / denizlik eteği`);
  }
  if (/sill\ apron\ garantidir|sabit\ sill\ apron\ True1|tüm\ modeller\ sill\ apron|denizlik\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit sill apron`);
  }
}


// Day 450: sabit Maxhub V5 Classic / Maxhub V5 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Maxhub V5 Classic yok|no fixed site Maxhub V5 Classic/i.test(html)) {
    errors.push(`${rel} should hedge sabit Maxhub V5 Classic / Maxhub V5`);
  }
  if (/Maxhub\ V5\ Classic\ garantidir|sabit\ Maxhub\ V5\ Classic\ True1|tüm\ modeller\ Maxhub\ V5\ Classic|Maxhub\ V5\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Maxhub V5 Classic`);
  }
}


// Day 451: sabit drip apron / damla eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit drip apron yok|no fixed site drip apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit drip apron / damla eteği`);
  }
  if (/drip\ apron\ garantidir|sabit\ drip\ apron\ True1|tüm\ modeller\ drip\ apron|damla\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit drip apron`);
  }
}


// Day 452: sabit Logitech Tap Scheduler / Logitech Tap — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Logitech Tap Scheduler yok|no fixed site Logitech Tap Scheduler/i.test(html)) {
    errors.push(`${rel} should hedge sabit Logitech Tap Scheduler / Logitech Tap`);
  }
  if (/Logitech\ Tap\ Scheduler\ garantidir|sabit\ Logitech\ Tap\ Scheduler\ True1|tüm\ modeller\ Logitech\ Tap\ Scheduler|Logitech\ Tap\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Logitech Tap Scheduler`);
  }
}


// Day 453: sabit hip apron / mahiye eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit hip apron yok|no fixed site hip apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit hip apron / mahiye eteği`);
  }
  if (/hip\ apron\ garantidir|sabit\ hip\ apron\ True1|tüm\ modeller\ hip\ apron|mahiye\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit hip apron`);
  }
}


// Day 454: sabit Yealink MeetingBoard 86 / MeetingBoard 86 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Yealink MeetingBoard 86 yok|no fixed site Yealink MeetingBoard 86/i.test(html)) {
    errors.push(`${rel} should hedge sabit Yealink MeetingBoard 86 / MeetingBoard 86`);
  }
  if (/Yealink\ MeetingBoard\ 86\ garantidir|sabit\ Yealink\ MeetingBoard\ 86\ True1|tüm\ modeller\ Yealink\ MeetingBoard\ 86|MeetingBoard\ 86\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Yealink MeetingBoard 86`);
  }
}


// Day 455: sabit gable apron / kalkan eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit gable apron yok|no fixed site gable apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit gable apron / kalkan eteği`);
  }
  if (/gable\ apron\ garantidir|sabit\ gable\ apron\ True1|tüm\ modeller\ gable\ apron|kalkan\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit gable apron`);
  }
}


// Day 456: sabit Surface Hub 3 / Hub 3 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Surface Hub 3 yok|no fixed site Surface Hub 3/i.test(html)) {
    errors.push(`${rel} should hedge sabit Surface Hub 3 / Hub 3`);
  }
  if (/Surface\ Hub\ 3\ garantidir|sabit\ Surface\ Hub\ 3\ True1|tüm\ modeller\ Surface\ Hub\ 3|Hub\ 3\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Surface Hub 3`);
  }
}


// Day 457: sabit base apron / taban eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit base apron yok|no fixed site base apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit base apron / taban eteği`);
  }
  if (/base\ apron\ garantidir|sabit\ base\ apron\ True1|tüm\ modeller\ base\ apron|taban\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit base apron`);
  }
}

// Day 458: sabit Crestron Flex / Flex — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Crestron Flex yok|no fixed site Crestron Flex/i.test(html)) {
    errors.push(`${rel} should hedge sabit Crestron Flex / Flex`);
  }
  if (/Crestron\ Flex\ garantidir|sabit\ Crestron\ Flex\ True1|tüm\ modeller\ Crestron\ Flex|Flex\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Crestron Flex`);
  }
}

// Day 459: sabit head apron / başlık eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit head apron yok|no fixed site head apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit head apron / başlık eteği`);
  }
  if (/head\ apron\ garantidir|sabit\ head\ apron\ True1|tüm\ modeller\ head\ apron|başlık\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit head apron`);
  }
}

// Day 460: sabit Cisco Room Bar Pro / Room Bar Pro — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Cisco Room Bar Pro yok|no fixed site Cisco Room Bar Pro/i.test(html)) {
    errors.push(`${rel} should hedge sabit Cisco Room Bar Pro / Room Bar Pro`);
  }
  if (/Cisco\ Room\ Bar\ Pro\ garantidir|sabit\ Cisco\ Room\ Bar\ Pro\ True1|tüm\ modeller\ Cisco\ Room\ Bar\ Pro|Room\ Bar\ Pro\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Cisco Room Bar Pro`);
  }
}

// Day 461: sabit ridge apron / mahya eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ridge apron yok|no fixed site ridge apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit ridge apron / mahya eteği`);
  }
  if (/eave\ apron\ garantidir|sabit\ eave\ apron\ True1|tüm\ modeller\ eave\ apron|mahya\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ridge apron`);
  }
}

// Day 462: sabit Neat Bar / Neat Bar — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Neat Bar yok|no fixed site Neat Bar/i.test(html)) {
    errors.push(`${rel} should hedge sabit Neat Bar / Neat Bar`);
  }
  if (/Neat\ Bar\ garantidir|sabit\ Neat\ Bar\ True1|tüm\ modeller\ Neat\ Bar|Neat\ Bar\ dahildir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Neat Bar`);
  }
}

// Day 463: sabit coping apron / parapet kapak eteği — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit coping apron yok|no fixed site coping apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit coping apron / parapet kapak eteği`);
  }
  if (/coping\ apron\ garantidir|sabit\ coping\ apron\ True1|tüm\ modeller\ coping\ apron|parapet\ kapak\ eteği\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit coping apron`);
  }
}

// Day 464: sabit Rally Bar Huddle — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Rally Bar Huddle yok|no fixed site Rally Bar Huddle/i.test(html)) {
    errors.push(`${rel} should hedge sabit Rally Bar Huddle`);
  }
  if (/Rally\ Bar\ Huddle\ garantidir|sabit\ Rally\ Bar\ Huddle\ True1|tüm\ modeller\ Rally\ Bar\ Huddle/i.test(html)) {
    errors.push(`${rel} must not invent sabit Rally Bar Huddle`);
  }
}

// Day 465: sabit skirt apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit skirt apron yok|no fixed site skirt apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit skirt apron`);
  }
  if (/skirt\ apron\ garantidir|sabit\ skirt\ apron\ True1|tüm\ modeller\ skirt\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit skirt apron`);
  }
}

// Day 466: sabit Logitech Meetup — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Logitech Meetup yok|no fixed site Logitech Meetup/i.test(html)) {
    errors.push(`${rel} should hedge sabit Logitech Meetup`);
  }
  if (/Logitech\ Meetup\ garantidir|sabit\ Logitech\ Meetup\ True1|tüm\ modeller\ Logitech\ Meetup/i.test(html)) {
    errors.push(`${rel} must not invent sabit Logitech Meetup`);
  }
}

// Day 467: sabit counter apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit counter apron yok|no fixed site counter apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit counter apron`);
  }
  if (/counter\ apron\ garantidir|sabit\ counter\ apron\ True1|tüm\ modeller\ counter\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit counter apron`);
  }
}

// Day 468: sabit Neat Frame — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Neat Frame yok|no fixed site Neat Frame/i.test(html)) {
    errors.push(`${rel} should hedge sabit Neat Frame`);
  }
  if (/Neat\ Frame\ garantidir|sabit\ Neat\ Frame\ True1|tüm\ modeller\ Neat\ Frame/i.test(html)) {
    errors.push(`${rel} must not invent sabit Neat Frame`);
  }
}

// Day 469: sabit lintel apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit lintel apron yok|no fixed site lintel apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit lintel apron`);
  }
  if (/lintel\ apron\ garantidir|sabit\ lintel\ apron\ True1|tüm\ modeller\ lintel\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit lintel apron`);
  }
}

// Day 470: sabit Rally Bar Mini — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Rally Bar Mini yok|no fixed site Rally Bar Mini/i.test(html)) {
    errors.push(`${rel} should hedge sabit Rally Bar Mini`);
  }
  if (/Rally\ Bar\ Mini\ garantidir|sabit\ Rally\ Bar\ Mini\ True1|tüm\ modeller\ Rally\ Bar\ Mini/i.test(html)) {
    errors.push(`${rel} must not invent sabit Rally Bar Mini`);
  }
}

// Day 471: sabit window apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit window apron yok|no fixed site window apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit window apron`);
  }
  if (/window\ apron\ garantidir|sabit\ window\ apron\ True1|tüm\ modeller\ window\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit window apron`);
  }
}

// Day 472: sabit Neat Bar Pro — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Neat Bar Pro yok|no fixed site Neat Bar Pro/i.test(html)) {
    errors.push(`${rel} should hedge sabit Neat Bar Pro`);
  }
  if (/Neat\ Bar\ Pro\ garantidir|sabit\ Neat\ Bar\ Pro\ True1|tüm\ modeller\ Neat\ Bar\ Pro/i.test(html)) {
    errors.push(`${rel} must not invent sabit Neat Bar Pro`);
  }
}

// Day 473: sabit door apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit door apron yok|no fixed site door apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit door apron`);
  }
  if (/door\ apron\ garantidir|sabit\ door\ apron\ True1|tüm\ modeller\ door\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit door apron`);
  }
}

// Day 474: sabit Neat Pad — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Neat Pad yok|no fixed site Neat Pad/i.test(html)) {
    errors.push(`${rel} should hedge sabit Neat Pad`);
  }
  if (/Neat\ Pad\ garantidir|sabit\ Neat\ Pad\ True1|tüm\ modeller\ Neat\ Pad/i.test(html)) {
    errors.push(`${rel} must not invent sabit Neat Pad`);
  }
}

// Day 475: sabit threshold apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit threshold apron yok|no fixed site threshold apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit threshold apron`);
  }
  if (/threshold\ apron\ garantidir|sabit\ threshold\ apron\ True1|tüm\ modeller\ threshold\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit threshold apron`);
  }
}

// Day 476: sabit Room Kit Mini — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Room Kit Mini yok|no fixed site Room Kit Mini/i.test(html)) {
    errors.push(`${rel} should hedge sabit Room Kit Mini`);
  }
  if (/Room\ Kit\ Mini\ garantidir|sabit\ Room\ Kit\ Mini\ True1|tüm\ modeller\ Room\ Kit\ Mini/i.test(html)) {
    errors.push(`${rel} must not invent sabit Room Kit Mini`);
  }
}

// Day 477: sabit jamb apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit jamb apron yok|no fixed site jamb apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit jamb apron`);
  }
  if (/jamb\ apron\ garantidir|sabit\ jamb\ apron\ True1|tüm\ modeller\ jamb\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit jamb apron`);
  }
}

// Day 478: sabit MeetingBar A20 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit MeetingBar A20 yok|no fixed site MeetingBar A20/i.test(html)) {
    errors.push(`${rel} should hedge sabit MeetingBar A20`);
  }
  if (/MeetingBar\ A20\ garantidir|sabit\ MeetingBar\ A20\ True1|tüm\ modeller\ MeetingBar\ A20/i.test(html)) {
    errors.push(`${rel} must not invent sabit MeetingBar A20`);
  }
}

// Day 479: sabit balcony apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit balcony apron yok|no fixed site balcony apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit balcony apron`);
  }
  if (/balcony\ apron\ garantidir|sabit\ balcony\ apron\ True1|tüm\ modeller\ balcony\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit balcony apron`);
  }
}

// Day 480: sabit MeetingBar A30 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit MeetingBar A30 yok|no fixed site MeetingBar A30/i.test(html)) {
    errors.push(`${rel} should hedge sabit MeetingBar A30`);
  }
  if (/MeetingBar\ A30\ garantidir|sabit\ MeetingBar\ A30\ True1|tüm\ modeller\ MeetingBar\ A30/i.test(html)) {
    errors.push(`${rel} must not invent sabit MeetingBar A30`);
  }
}

// Day 481: sabit canopy apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit canopy apron yok|no fixed site canopy apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit canopy apron`);
  }
  if (/canopy\ apron\ garantidir|sabit\ canopy\ apron\ True1|tüm\ modeller\ canopy\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit canopy apron`);
  }
}
// Day 482: sabit Room Kit Plus — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Room Kit Plus yok|no fixed site Room Kit Plus/i.test(html)) {
    errors.push(`${rel} should hedge sabit Room Kit Plus`);
  }
  if (/Room\ Kit\ Plus\ garantidir|sabit\ Room\ Kit\ Plus\ True1|tüm\ modeller\ Room\ Kit\ Plus/i.test(html)) {
    errors.push(`${rel} must not invent sabit Room Kit Plus`);
  }
}
// Day 483: sabit skylight apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit skylight apron yok|no fixed site skylight apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit skylight apron`);
  }
  if (/skylight\ apron\ garantidir|sabit\ skylight\ apron\ True1|tüm\ modeller\ skylight\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit skylight apron`);
  }
}
// Day 484: sabit Owl Bar — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Owl Bar yok|no fixed site Owl Bar/i.test(html)) {
    errors.push(`${rel} should hedge sabit Owl Bar`);
  }
  if (/Owl\ Bar\ garantidir|sabit\ Owl\ Bar\ True1|tüm\ modeller\ Owl\ Bar/i.test(html)) {
    errors.push(`${rel} must not invent sabit Owl Bar`);
  }
}
// Day 485: sabit dormer apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit dormer apron yok|no fixed site dormer apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit dormer apron`);
  }
  if (/dormer\ apron\ garantidir|sabit\ dormer\ apron\ True1|tüm\ modeller\ dormer\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit dormer apron`);
  }
}
// Day 486: sabit Tap IP — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Tap IP yok|no fixed site Tap IP/i.test(html)) {
    errors.push(`${rel} should hedge sabit Tap IP`);
  }
  if (/Tap\ IP\ garantidir|sabit\ Tap\ IP\ True1|tüm\ modeller\ Tap\ IP/i.test(html)) {
    errors.push(`${rel} must not invent sabit Tap IP`);
  }
}
// Day 487: sabit soffit apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit soffit apron yok|no fixed site soffit apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit soffit apron`);
  }
  if (/soffit\ apron\ garantidir|sabit\ soffit\ apron\ True1|tüm\ modeller\ soffit\ apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit soffit apron`);
  }
}
// Day 488: sabit Room Mate — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Room Mate yok|no fixed site Room Mate/i.test(html)) {
    errors.push(`${rel} should hedge sabit Room Mate`);
  }
  if (/Room\ Mate\ garantidir|sabit\ Room\ Mate\ True1|tüm\ modeller\ Room\ Mate/i.test(html)) {
    errors.push(`${rel} must not invent sabit Room Mate`);
  }
}

// Day 489: sabit cornice apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit cornice apron yok|no fixed site cornice apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit cornice apron`);
  }
  if (/cornice apron\ garantidir|sabit\ cornice apron\ True1|tüm\ modeller\ cornice apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit cornice apron`);
  }
}

// Day 490: sabit Room Navigator — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Room Navigator yok|no fixed site Room Navigator/i.test(html)) {
    errors.push(`${rel} should hedge sabit Room Navigator`);
  }
  if (/Room Navigator\ garantidir|sabit\ Room Navigator\ True1|tüm\ modeller\ Room Navigator/i.test(html)) {
    errors.push(`${rel} must not invent sabit Room Navigator`);
  }
}

// Day 491: sabit pediment apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit pediment apron yok|no fixed site pediment apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit pediment apron`);
  }
  if (/pediment apron\ garantidir|sabit\ pediment apron\ True1|tüm\ modeller\ pediment apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit pediment apron`);
  }
}

// Day 492: sabit Neat Center — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Neat Center yok|no fixed site Neat Center/i.test(html)) {
    errors.push(`${rel} should hedge sabit Neat Center`);
  }
  if (/Neat Center\ garantidir|sabit\ Neat Center\ True1|tüm\ modeller\ Neat Center/i.test(html)) {
    errors.push(`${rel} must not invent sabit Neat Center`);
  }
}

// Day 493: sabit frieze apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit frieze apron yok|no fixed site frieze apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit frieze apron`);
  }
  if (/frieze apron\ garantidir|sabit\ frieze apron\ True1|tüm\ modeller\ frieze apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit frieze apron`);
  }
}

// Day 494: sabit Logitech Sight — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Logitech Sight yok|no fixed site Logitech Sight/i.test(html)) {
    errors.push(`${rel} should hedge sabit Logitech Sight`);
  }
  if (/Logitech Sight\ garantidir|sabit\ Logitech Sight\ True1|tüm\ modeller\ Logitech Sight/i.test(html)) {
    errors.push(`${rel} must not invent sabit Logitech Sight`);
  }
}

// Day 495: sabit verge apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit verge apron yok|no fixed site verge apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit verge apron`);
  }
  if (/verge apron\ garantidir|sabit\ verge apron\ True1|tüm\ modeller\ verge apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit verge apron`);
  }
}

// Day 496: sabit Room Bar Mini — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Room Bar Mini yok|no fixed site Room Bar Mini/i.test(html)) {
    errors.push(`${rel} should hedge sabit Room Bar Mini`);
  }
  if (/Room Bar Mini\ garantidir|sabit\ Room Bar Mini\ True1|tüm\ modeller\ Room Bar Mini/i.test(html)) {
    errors.push(`${rel} must not invent sabit Room Bar Mini`);
  }
}

// Day 497: sabit architrave apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit architrave apron yok|no fixed site architrave apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit architrave apron`);
  }
  if (/architrave apron\ garantidir|sabit\ architrave apron\ True1|tüm\ modeller\ architrave apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit architrave apron`);
  }
}

// Day 498: sabit Poly Studio P15 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Poly Studio P15 yok|no fixed site Poly Studio P15/i.test(html)) {
    errors.push(`${rel} should hedge sabit Poly Studio P15`);
  }
  if (/Poly Studio P15\ garantidir|sabit\ Poly Studio P15\ True1|tüm\ modeller\ Poly Studio P15/i.test(html)) {
    errors.push(`${rel} must not invent sabit Poly Studio P15`);
  }
}

// Day 499: sabit plinth apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit plinth apron yok|no fixed site plinth apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit plinth apron`);
  }
  if (/plinth apron\ garantidir|sabit\ plinth apron\ True1|tüm\ modeller\ plinth apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit plinth apron`);
  }
}

// Day 500: sabit Cisco Desk Pro — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Cisco Desk Pro yok|no fixed site Cisco Desk Pro/i.test(html)) {
    errors.push(`${rel} should hedge sabit Cisco Desk Pro`);
  }
  if (/Cisco Desk Pro\ garantidir|sabit\ Cisco Desk Pro\ True1|tüm\ modeller\ Cisco Desk Pro/i.test(html)) {
    errors.push(`${rel} must not invent sabit Cisco Desk Pro`);
  }
}

// Day 501: sabit spandrel apron — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit spandrel apron yok|no fixed site spandrel apron/i.test(html)) {
    errors.push(`${rel} should hedge sabit spandrel apron`);
  }
  if (/spandrel apron\ garantidir|sabit\ spandrel apron\ True1|tüm\ modeller\ spandrel apron/i.test(html)) {
    errors.push(`${rel} must not invent sabit spandrel apron`);
  }
}

// Day 502: sabit Cisco Room Kit EQ — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Cisco Room Kit EQ yok|no fixed site Cisco Room Kit EQ/i.test(html)) {
    errors.push(`${rel} should hedge sabit Cisco Room Kit EQ`);
  }
  if (/Cisco Room Kit EQ\ garantidir|sabit\ Cisco Room Kit EQ\ True1|tüm\ modeller\ Cisco Room Kit EQ/i.test(html)) {
    errors.push(`${rel} must not invent sabit Cisco Room Kit EQ`);
  }
}

// Day 503: sabit curtain wall — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit curtain wall yok|no fixed site curtain wall/i.test(html)) {
    errors.push(`${rel} should hedge sabit curtain wall`);
  }
  if (/curtain wall\ garantidir|sabit\ curtain wall\ True1|tüm\ modeller\ curtain wall/i.test(html)) {
    errors.push(`${rel} must not invent sabit curtain wall`);
  }
}

// Day 504: sabit Logitech Rally Bar Huddle — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Logitech Rally Bar Huddle yok|no fixed site Logitech Rally Bar Huddle/i.test(html)) {
    errors.push(`${rel} should hedge sabit Logitech Rally Bar Huddle`);
  }
  if (/Logitech Rally Bar Huddle\ garantidir|sabit\ Logitech Rally Bar Huddle\ True1|tüm\ modeller\ Logitech Rally Bar Huddle/i.test(html)) {
    errors.push(`${rel} must not invent sabit Logitech Rally Bar Huddle`);
  }
}

// Day 505: sabit mullion — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit mullion yok|no fixed site mullion/i.test(html)) {
    errors.push(`${rel} should hedge sabit mullion`);
  }
  if (/mullion\ garantidir|sabit\ mullion\ True1|tüm\ modeller\ mullion/i.test(html)) {
    errors.push(`${rel} must not invent sabit mullion`);
  }
}

// Day 506: sabit HP Presence Mini — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit HP Presence Mini yok|no fixed site HP Presence Mini/i.test(html)) {
    errors.push(`${rel} should hedge sabit HP Presence Mini`);
  }
  if (/HP Presence Mini\ garantidir|sabit\ HP Presence Mini\ True1|tüm\ modeller\ HP Presence Mini/i.test(html)) {
    errors.push(`${rel} must not invent sabit HP Presence Mini`);
  }
}

// Day 507: sabit transom — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit transom yok|no fixed site transom/i.test(html)) {
    errors.push(`${rel} should hedge sabit transom`);
  }
  if (/transom\ garantidir|sabit\ transom\ True1|tüm\ modeller\ transom/i.test(html)) {
    errors.push(`${rel} must not invent sabit transom`);
  }
}

// Day 508: sabit Kramer VIA Connect — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Kramer VIA Connect yok|no fixed site Kramer VIA Connect/i.test(html)) {
    errors.push(`${rel} should hedge sabit Kramer VIA Connect`);
  }
  if (/Kramer VIA Connect\ garantidir|sabit\ Kramer VIA Connect\ True1|tüm\ modeller\ Kramer VIA Connect/i.test(html)) {
    errors.push(`${rel} must not invent sabit Kramer VIA Connect`);
  }
}

// Day 509: sabit canopy fascia — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit canopy fascia yok|no fixed site canopy fascia/i.test(html)) {
    errors.push(`${rel} should hedge sabit canopy fascia`);
  }
  if (/canopy fascia\ garantidir|sabit\ canopy fascia\ True1|tüm\ modeller\ canopy fascia/i.test(html)) {
    errors.push(`${rel} must not invent sabit canopy fascia`);
  }
}

// Day 510: sabit Bose VB1 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Bose VB1 yok|no fixed site Bose VB1/i.test(html)) {
    errors.push(`${rel} should hedge sabit Bose VB1`);
  }
  if (/Bose VB1\ garantidir|sabit\ Bose VB1\ True1|tüm\ modeller\ Bose VB1/i.test(html)) {
    errors.push(`${rel} must not invent sabit Bose VB1`);
  }
}

// Day 511: sabit blade sign — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit blade sign yok|no fixed site blade sign/i.test(html)) {
    errors.push(`${rel} should hedge sabit blade sign`);
  }
  if (/blade sign\ garantidir|sabit\ blade sign\ True1|tüm\ modeller\ blade sign/i.test(html)) {
    errors.push(`${rel} must not invent sabit blade sign`);
  }
}

// Day 512: sabit Shure MXA920 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Shure MXA920 yok|no fixed site Shure MXA920/i.test(html)) {
    errors.push(`${rel} should hedge sabit Shure MXA920`);
  }
  if (/Shure MXA920\ garantidir|sabit\ Shure MXA920\ True1|tüm\ modeller\ Shure MXA920/i.test(html)) {
    errors.push(`${rel} must not invent sabit Shure MXA920`);
  }
}

// Day 513: sabit fascia board — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit fascia board yok|no fixed site fascia board/i.test(html)) {
    errors.push(`${rel} should hedge sabit fascia board`);
  }
  if (/fascia board\ garantidir|sabit\ fascia board\ True1|tüm\ modeller\ fascia board/i.test(html)) {
    errors.push(`${rel} must not invent sabit fascia board`);
  }
}

// Day 514: sabit QSC Core Nano — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit QSC Core Nano yok|no fixed site QSC Core Nano/i.test(html)) {
    errors.push(`${rel} should hedge sabit QSC Core Nano`);
  }
  if (/QSC Core Nano\ garantidir|sabit\ QSC Core Nano\ True1|tüm\ modeller\ QSC Core Nano/i.test(html)) {
    errors.push(`${rel} must not invent sabit QSC Core Nano`);
  }
}

// Day 515: sabit awning box — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit awning box yok|no fixed site awning box/i.test(html)) {
    errors.push(`${rel} should hedge sabit awning box`);
  }
  if (/awning box\ garantidir|sabit\ awning box\ True1|tüm\ modeller\ awning box/i.test(html)) {
    errors.push(`${rel} must not invent sabit awning box`);
  }
}

// Day 516: sabit ClearTouch 65 — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
  "out/en/rehber/ic-mekan-led-ekran/index.html",
  "out/en/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ClearTouch 65 yok|no fixed site ClearTouch 65/i.test(html)) {
    errors.push(`${rel} should hedge sabit ClearTouch 65`);
  }
  if (/ClearTouch 65\ garantidir|sabit\ ClearTouch 65\ True1|tüm\ modeller\ ClearTouch 65/i.test(html)) {
    errors.push(`${rel} must not invent sabit ClearTouch 65`);
  }
}

// Day 517: sabit spandrel glass — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
  "out/en/rehber/dis-mekan-led-ekran/index.html",
  "out/en/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit spandrel glass yok|no fixed site spandrel glass/i.test(html)) {
    errors.push(`${rel} should hedge sabit spandrel glass`);
  }
  if (/spandrel glass\ garantidir|sabit\ spandrel glass\ True1|tüm\ modeller\ spandrel glass/i.test(html)) {
    errors.push(`${rel} must not invent sabit spandrel glass`);
  }
}
















































































































































































































































































// Day 197: sabit outrigger / payanda — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit outrigger yok|no fixed site outrigger/i.test(html)) {
    errors.push(`${rel} should hedge sabit outrigger / payanda`);
  }
  if (/outrigger\ garantidir|sabit\ outrigger\ True1|tüm\ modeller\ outrigger|payanda\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit outrigger`);
  }
}

// Day 196: sabit BYOD / kablosuz sunum — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit BYOD yok|no fixed site BYOD/i.test(html)) {
    errors.push(`${rel} should hedge sabit BYOD / kablosuz sunum`);
  }
  if (/BYOD\ garantidir|sabit\ BYOD\ True1|tüm\ modeller\ BYOD|kablosuz\ sunum\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit BYOD`);
  }
}

// Day 195: sabit ballast / karşı ağırlık — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit ballast yok|no fixed site ballast/i.test(html)) {
    errors.push(`${rel} should hedge sabit ballast / karşı ağırlık`);
  }
  if (/ballast\ garantidir|sabit\ ballast\ True1|tüm\ modeller\ ballast|karşı\ ağırlık\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit ballast`);
  }
}

// Day 194: sabit matrix switcher / matris switch — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit matrix switcher yok|no fixed site matrix switcher/i.test(html)) {
    errors.push(`${rel} should hedge sabit matrix switcher / matris switch`);
  }
  if (/matrix\ switcher\ garantidir|sabit\ matrix\ switcher\ True1|tüm\ modeller\ matrix\ switcher|matris\ switch\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit matrix switcher`);
  }
}

// Day 193: sabit leveling foot / ayar ayağı — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit leveling foot yok|no fixed site leveling foot/i.test(html)) {
    errors.push(`${rel} should hedge sabit leveling foot / ayar ayağı`);
  }
  if (/leveling\ foot\ garantidir|sabit\ leveling\ foot\ True1|tüm\ modeller\ leveling\ foot|ayar\ ayağı\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit leveling foot`);
  }
}

// Day 192: sabit junction box / buat — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit junction box yok|no fixed site junction box/i.test(html)) {
    errors.push(`${rel} should hedge sabit junction box / buat`);
  }
  if (/junction\ box\ garantidir|sabit\ junction\ box\ True1|tüm\ modeller\ junction\ box|buat\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit junction box`);
  }
}

// Day 191: sabit guy wire / gergi teli — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit guy wire yok|no fixed site guy wire/i.test(html)) {
    errors.push(`${rel} should hedge sabit guy wire / gergi teli`);
  }
  if (/guy\ wire\ garantidir|sabit\ guy\ wire\ True1|tüm\ modeller\ guy\ wire|gergi\ teli\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit guy wire`);
  }
}

// Day 190: sabit multi-window / çoklu pencere — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit multi-window yok|no fixed site multi-window/i.test(html)) {
    errors.push(`${rel} should hedge sabit multi-window / çoklu pencere`);
  }
  if (/multi\-window\ garantidir|sabit\ multi\-window\ True1|tüm\ modeller\ multi\-window|çoklu\ pencere\ garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit multi-window`);
  }
}

// Day 189: sabit Neutrik / Neutrik connector — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Neutrik yok|no fixed site Neutrik/i.test(html)) {
    errors.push(`${rel} should hedge sabit Neutrik / Neutrik connector`);
  }
  if (/Neutrik\ garantidir|sabit\ Neutrik\ True1|tüm\ modeller\ Neutrik|Neutrik\ standarttır/i.test(html)) {
    errors.push(`${rel} must not invent sabit Neutrik`);
  }
}

// Day 188: sabit KVM / KVM switch — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit KVM yok|no fixed site KVM/i.test(html)) {
    errors.push(`${rel} should hedge sabit KVM / KVM switch`);
  }
  if (/KVM garantidir|sabit KVM switch|tüm modeller KVM|KVM switch garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit KVM`);
  }
}

// Day 187: sabit powerCON / PowerCON — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit powerCON yok|no fixed site powerCON/i.test(html)) {
    errors.push(`${rel} should hedge sabit powerCON / PowerCON`);
  }
  if (/powerCON garantidir|sabit powerCON True1|tüm modeller powerCON|PowerCON standarttır/i.test(html)) {
    errors.push(`${rel} must not invent sabit powerCON`);
  }
}

// Day 186: sabit Dante / Dante audio — honesty presence
for (const rel of [
  "out/tr/rehber/ic-mekan-led-ekran/index.html",
  "out/tr/rehber/konferans-salonu-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit Dante yok|no fixed site Dante/i.test(html)) {
    errors.push(`${rel} should hedge sabit Dante / Dante audio`);
  }
  if (/Dante garantidir|sabit Dante audio|tüm modeller Dante|Dante audio garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit Dante`);
  }
}

// Day 185: sabit grounding / topraklama — honesty presence
for (const rel of [
  "out/tr/rehber/dis-mekan-led-ekran/index.html",
  "out/tr/rehber/mimari-muhendislik-led/index.html",
]) {
  const html = read(rel);
  if (!html) continue;
  if (!/sabit grounding yok|no fixed site grounding/i.test(html)) {
    errors.push(`${rel} should hedge sabit grounding / topraklama`);
  }
  if (/grounding garantidir|sabit topraklama|tüm modeller grounding|topraklama garantidir/i.test(html)) {
    errors.push(`${rel} must not invent sabit grounding`);
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


const publicFaq = read("src/lib/entity.ts");
const faqStart = publicFaq.indexOf("export const ENTITY_FAQS");
const faqEnd = publicFaq.indexOf("export const", faqStart + 10);
const faqBody = publicFaq.slice(faqStart, faqEnd > faqStart ? faqEnd : faqStart + 8000);
if (/apron|meetup|jamboard|valley pan|neat frame|rally bar/i.test(faqBody)) {
  errors.push("ENTITY_FAQS must not contain blind-test product negatives (apron/Meetup/Jamboard)");
}

if (errors.length) {
  console.error(`audit-cite-parity: FAIL (${errors.length})`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log("audit-cite-parity: OK — entity↔llms↔about cite strings verbatim + PANEL USD");
