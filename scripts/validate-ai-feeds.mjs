#!/usr/bin/env node
/**
 * Build-time validation and logging for AI discovery feeds.
 * Ensures all feeds are generated and accessible.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const publicDir = path.join(repoRoot, "public");

const REQUIRED_FILES = [
  "catalog.json",
  "ai-shopping.json",
  "geo-baseline.json",
  "entity.json",
  "entity-profiles.json",
  ".well-known/ard.json",
  "llms.txt",
  "llms-full.txt",
  "ai.txt",
  "feeds/merchant-priced-panels.tsv",
  "robots.txt",
  "_headers",
];

function validateAIFeeds() {
  console.log("🔍 Validating AI discovery feeds...");
  const errors = [];
  const warnings = [];

  for (const file of REQUIRED_FILES) {
    const filePath = path.join(publicDir, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`❌ Missing: ${file}`);
    } else {
      const stats = fs.statSync(filePath);
      const sizeKb = (stats.size / 1024).toFixed(1);
      console.log(`✅ ${file} (${sizeKb} KB)`);
    }
  }

  // Validate JSON structure
  const jsonFiles = [
    { path: "catalog.json", type: "Collection" },
    { path: "ai-shopping.json", type: "Dataset" },
    { path: "entity.json", type: "Organization" },
    { path: ".well-known/ard.json", type: "WebSite" },
  ];

  for (const { path: file, type } of jsonFiles) {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        if (content["@type"] !== type) {
          warnings.push(`⚠️ ${file}: Expected @type=${type}, got ${content["@type"]}`);
        }
      } catch (e) {
        errors.push(`❌ ${file}: Invalid JSON - ${e.message}`);
      }
    }
  }

  // Summary
  console.log(`\n📊 AI Discovery Feeds Validation Summary`);
  console.log(`   ✅ Files: ${REQUIRED_FILES.length - errors.length}/${REQUIRED_FILES.length}`);
  if (warnings.length) console.log(`   ⚠️ Warnings: ${warnings.length}`);
  if (errors.length) console.log(`   ❌ Errors: ${errors.length}`);

  if (errors.length) {
    console.error("\n❌ Validation failed:");
    errors.forEach(e => console.error(`   ${e}`));
    process.exit(1);
  }

  if (warnings.length) {
    console.warn("\n⚠️ Warnings:");
    warnings.forEach(w => console.warn(`   ${w}`));
  }

  console.log("\n✅ All AI discovery feeds are valid and ready for production.");
  console.log("\n📍 Feed URLs:");
  console.log("   - https://arledscreen.com/catalog.json");
  console.log("   - https://arledscreen.com/ai-shopping.json");
  console.log("   - https://arledscreen.com/geo-baseline.json");
  console.log("   - https://arledscreen.com/entity.json");
  console.log("   - https://arledscreen.com/.well-known/ard.json");
  console.log("   - https://arledscreen.com/llms.txt");
  console.log("   - https://arledscreen.com/llms-full.txt");
}


// After next build + postbuild-ai, out/ must carry deployable AI feeds.
const outDir = path.join(repoRoot, "out");
if (fs.existsSync(outDir)) {
  for (const file of [
    "catalog.json",
    "ai-shopping.json",
    "geo-baseline.json",
    "entity.json",
    "entity-profiles.json",
    "llms.txt",
    "ai.txt",
  ]) {
    const fp = path.join(outDir, file);
    if (!fs.existsSync(fp)) {
      console.error(`❌ Missing in out/: ${file} (CF deploy would wipe GEO)`);
      process.exit(1);
    }
  }
  const ai = JSON.parse(fs.readFileSync(path.join(outDir, "ai-shopping.json"), "utf8"));
  if (!Array.isArray(ai.pricedPanels) || ai.pricedPanels.length !== 12) {
    console.error("❌ out/ai-shopping.json pricedPanels must be length 12");
    process.exit(1);
  }
  if (/blindTestPrompts|kör test/i.test(JSON.stringify(ai))) {
    console.error("❌ out/ai-shopping.json must not carry blind-test payload");
    process.exit(1);
  }
  const ard = JSON.parse(fs.readFileSync(path.join(outDir, ".well-known/ard.json"), "utf8"));
  const ardMerchant = ard?.agentic?.resources?.merchantFeed;
  if (!ardMerchant?.url?.includes("/feeds/merchant-priced-panels.tsv") || ardMerchant.freeShipping !== false) {
    console.error("❌ ard.json must expose merchantFeed (TSV) with freeShipping:false");
    process.exit(1);
  }
  if (!Array.isArray(ard?.robotsPolicy?.allow) || !ard.robotsPolicy.allow.includes("/feeds/merchant-priced-panels.tsv")) {
    console.error("❌ ard.json robotsPolicy.allow must include merchant TSV path");
    process.exit(1);
  }
  if (!ard?.agentic?.cite?.en?.oneLiner) {
    console.error("❌ ard.json agentic.cite.en.oneLiner required for EN AI agents");
    process.exit(1);
  }
  const ardBrand = ard?.agentic?.resources?.brand;
  if (
    ardBrand?.["@id"] !== "https://arledscreen.com/#brand-nxtionstar" ||
    ardBrand?.name !== "NXTIONSTAR" ||
    ard?.agentic?.resources?.aiShopping?.brandId !== "https://arledscreen.com/#brand-nxtionstar" ||
    ard?.agentic?.pricedProducts?.brandId !== "https://arledscreen.com/#brand-nxtionstar"
  ) {
    console.error("❌ ard.json must expose Brand @id #brand-nxtionstar on resources.brand + aiShopping + pricedProducts");
    process.exit(1);
  }
  if (
    ard?.agentic?.resources?.aiShopping?.shippingIncluded !== false ||
    ard?.agentic?.pricedProducts?.shippingIncluded !== false
  ) {
    console.error("❌ ard.json must set shippingIncluded:false (no free-shipping invent)");
    process.exit(1);
  }
  if (!ard?.agentic?.resources?.entityProfiles?.packsEn) {
    console.error("❌ ard.json entityProfiles.packsEn pointer required for Point C EN packs");
    process.exit(1);
  }
  const tsvHead = fs.readFileSync(path.join(outDir, "feeds/merchant-priced-panels.tsv"), "utf8").split("\n")[0];
  if (!tsvHead.includes("brand_id")) {
    console.error("❌ merchant TSV must include brand_id column");
    process.exit(1);
  }
  if (!ai?.resources?.brandId?.includes("#brand-nxtionstar") || !ai?.resources?.brand?.includes("/nxtionstar/")) {
    console.error("❌ ai-shopping.json resources.brand + brandId required");
    process.exit(1);
  }
  const baseline = JSON.parse(fs.readFileSync(path.join(outDir, "geo-baseline.json"), "utf8"));
  if (
    baseline?.["@type"] !== "Dataset" ||
    baseline?.baseline?.pricedSkuCount !== 12 ||
    !baseline?.fingerprints?.merchantTsvSha256 ||
    baseline?.baseline?.freeShipping !== false ||
    !baseline?.brand?.["@id"]?.includes("#brand-nxtionstar")
  ) {
    console.error("❌ geo-baseline.json must snapshot 12 SKUs + Brand @id + fingerprints (no free shipping)");
    process.exit(1);
  }
  if (!ai?.resources?.geoBaseline?.includes("/geo-baseline.json")) {
    console.error("❌ ai-shopping.json resources.geoBaseline required");
    process.exit(1);
  }
  if (
    !ai?.agentGuidelines?.priceSource?.includes("/geo-baseline.json") ||
    !ai?.agentGuidelines?.en?.priceSource?.includes("/geo-baseline.json")
  ) {
    console.error("❌ ai-shopping.json agentGuidelines.priceSource (TR+EN) must cite geo-baseline.json");
    process.exit(1);
  }
  const catalogLive = JSON.parse(fs.readFileSync(path.join(outDir, "catalog.json"), "utf8"));
  const catalogRelated = JSON.stringify(catalogLive.isRelatedTo || []);
  if (
    !catalogRelated.includes("/geo-baseline.json") ||
    !catalogRelated.includes("/ai-shopping.json") ||
    catalogLive?.brand?.["@id"] !== "https://arledscreen.com/#brand-nxtionstar"
  ) {
    console.error("❌ catalog.json must isRelatedTo geo-baseline + ai-shopping and brand @id #brand-nxtionstar");
    process.exit(1);
  }
  // Product↔Offer identity: each catalog Offer.url must equal its Product.url (PDP),
  // not the price-hub Collection.url — keeps catalog aligned with ai-shopping + merchant TSV.
  const catalogItems = catalogLive?.mainEntity?.itemListElement || [];
  if (!Array.isArray(catalogItems) || catalogItems.length !== 12) {
    console.error(
      `❌ catalog.json mainEntity.itemListElement must list 12 products, got ${Array.isArray(catalogItems) ? catalogItems.length : typeof catalogItems}`,
    );
    process.exit(1);
  }
  for (const product of catalogItems) {
    const productUrl = product?.url;
    const offerUrl = product?.offers?.url;
    const id = product?.["@id"] || productUrl || "?";
    if (!productUrl || !offerUrl || productUrl !== offerUrl) {
      console.error(
        `❌ catalog Offer.url must equal Product.url (PDP): ${id} product=${productUrl} offer=${offerUrl}`,
      );
      process.exit(1);
    }
    if (offerUrl.includes("/led-ekran-fiyatlari/")) {
      console.error(`❌ catalog Offer.url must not point at price hub: ${id}`);
      process.exit(1);
    }
  }
  const aiBasedOn = JSON.stringify(ai?.isBasedOn || []);
  if (!aiBasedOn.includes("/geo-baseline.json")) {
    console.error("❌ ai-shopping.json isBasedOn must include geo-baseline.json");
    process.exit(1);
  }
  if (!ai?.resources?.en?.home || !ai.resources.en.calculator) {
    console.error("❌ ai-shopping.json resources.en.home + calculator required");
    process.exit(1);
  }
  for (const key of [
    "servicesHub",
    "regionsHub",
    "projectsHub",
    "gallery",
    "founder",
    "blog",
    "intentHub",
    "priceHub",
    "productsHub",
    "faq",
    "brand",
  ]) {
    const v = ai?.resources?.en?.[key];
    if (!v || !String(v).includes(`/en/`)) {
      console.error(`❌ ai-shopping.json resources.en.${key} must point at /en/ hub`);
      process.exit(1);
    }
  }
  for (const key of [
    "servicesHubEn",
    "regionsHubEn",
    "projectsHubEn",
    "galleryEn",
    "founderEn",
    "blogEn",
    "yapayZekaEn",
  ]) {
    const v = baseline?.discovery?.[key];
    if (!v || !String(v).includes("/en/")) {
      console.error(`❌ geo-baseline.json discovery.${key} must point at EN hub`);
      process.exit(1);
    }
  }
  for (const key of [
    "enServicesHub",
    "enRegionsHub",
    "enProjectsHub",
    "enGallery",
    "enFounder",
    "enBlog",
    "enIntentHub",
    "enPriceHub",
    "enProductsHub",
  ]) {
    const url = ard?.agentic?.resources?.[key]?.url;
    if (!url || !String(url).includes("/en/")) {
      console.error(`❌ ard.json agentic.resources.${key}.url must point at EN hub`);
      process.exit(1);
    }
  }
  const entity = JSON.parse(fs.readFileSync(path.join(outDir, "entity.json"), "utf8"));
  if (!entity.merchantFeed?.includes("/feeds/merchant-priced-panels.tsv")) {
    console.error("❌ entity.json must expose merchantFeed TSV URL");
    process.exit(1);
  }
  if (entity?.brand?.["@id"] !== "https://arledscreen.com/#brand-nxtionstar") {
    console.error("❌ entity.json brand.@id must be #brand-nxtionstar");
    process.exit(1);
  }
  const disambig = String(entity?.disambiguatingDescription || "");
  if (!disambig.includes("arleds.com") || !disambig.includes("arledscreen.com")) {
    console.error("❌ entity.json disambiguatingDescription must warn arleds.com vs arledscreen.com");
    process.exit(1);
  }
  if (!disambig.includes("linkedin.com/company/arleds") || !disambig.includes("web sitesi arleds.com değildir")) {
    console.error("❌ entity.json disambiguatingDescription must warn LinkedIn /company/arleds ≠ web arleds.com");
    process.exit(1);
  }
  if (JSON.stringify(entity?.sameAs || []).includes("arleds.com")) {
    console.error("❌ entity.json sameAs must NOT include legacy arleds.com (until 301)");
    process.exit(1);
  }
  if (!ai?.agentGuidelines?.roleClarity?.legacyDomainNote?.includes("arleds.com")) {
    console.error("❌ ai-shopping agentGuidelines.roleClarity.legacyDomainNote required");
    process.exit(1);
  }
  if (!ai?.agentGuidelines?.en?.roleClarity?.legacyDomainNote?.includes("arleds.com")) {
    console.error("❌ ai-shopping agentGuidelines.en.roleClarity.legacyDomainNote required");
    process.exit(1);
  }
  if (!Array.isArray(ai?.faqs) || !ai.faqs.some((f) => String(f?.question || "").includes("arleds.com"))) {
    console.error("❌ ai-shopping.json faqs must mirror entity arleds.com Q&A");
    process.exit(1);
  }
  if (!ai.faqs.some((f) => String(f?.question || "").includes("NationStar"))) {
    console.error("❌ ai-shopping.json faqs must include NXTIONSTAR ≠ NationStar Q&A");
    process.exit(1);
  }
  if (!entity.faqs?.some((f) => String(f?.question || "").includes("NationStar"))) {
    console.error("❌ entity.json faqs must include NXTIONSTAR ≠ NationStar Q&A");
    process.exit(1);
  }
  const aiTxtLive = fs.readFileSync(path.join(outDir, "ai.txt"), "utf8");
  if (
    !aiTxtLive.includes("/ai-shopping.json") ||
    !aiTxtLive.includes("/entity.json") ||
    !aiTxtLive.includes("arleds.com") ||
    !aiTxtLive.includes("NationStar")
  ) {
    console.error("❌ out/ai.txt must point to feeds and warn on arleds.com + NationStar");
    process.exit(1);
  }
  const profiles = JSON.parse(fs.readFileSync(path.join(outDir, "entity-profiles.json"), "utf8"));
  if (
    !profiles?.packsEn?.gbpDescription ||
    !profiles?.packsEn?.facebookAbout ||
    !profiles?.packsEn?.appleBusinessConnect ||
    !profiles?.packsEn?.youtubeAbout ||
    !profiles?.packsEn?.yandexBusiness ||
    !profiles?.packsEn?.instagramName
  ) {
    console.error("❌ entity-profiles.json packsEn must cover GBP/FB/Apple/YouTube/Yandex/IG name (cite-only)");
    process.exit(1);
  }
  if (profiles?.brandId !== "https://arledscreen.com/#brand-nxtionstar") {
    console.error("❌ entity-profiles.json brandId must be #brand-nxtionstar");
    process.exit(1);
  }
  if (!profiles?.canonicalUrls?.geoBaselineJson?.includes("/geo-baseline.json")) {
    console.error("❌ entity-profiles.json canonicalUrls.geoBaselineJson required");
    process.exit(1);
  }
  if (!ard?.agentic?.resources?.geoBaseline?.url?.includes("/geo-baseline.json")) {
    console.error("❌ ard.json resources.geoBaseline required");
    process.exit(1);
  }
  if (!ard?.agentic?.resources?.aiTxt?.url?.includes("/ai.txt")) {
    console.error("❌ ard.json resources.aiTxt required");
    process.exit(1);
  }
  if (!Array.isArray(ard?.robotsPolicy?.allow) || !ard.robotsPolicy.allow.includes("/geo-baseline.json")) {
    console.error("❌ ard.json robotsPolicy.allow must include /geo-baseline.json");
    process.exit(1);
  }
  if (!ard.robotsPolicy.allow.includes("/ai.txt")) {
    console.error("❌ ard.json robotsPolicy.allow must include /ai.txt");
    process.exit(1);
  }
  const subjectUrls = (entity.subjectOf || []).map((s) => s.url || "");
  if (!subjectUrls.some((u) => u.includes("/feeds/merchant-priced-panels.tsv"))) {
    console.error("❌ entity.json subjectOf must include merchant TSV Dataset");
    process.exit(1);
  }
  const tsvPath = path.join(outDir, "feeds/merchant-priced-panels.tsv");
  if (!fs.existsSync(tsvPath)) {
    console.error("❌ Missing in out/: feeds/merchant-priced-panels.tsv");
    process.exit(1);
  }
  const tsv = fs.readFileSync(tsvPath, "utf8");
  const tsvHeader = tsv.trim().split("\n")[0] || "";
  for (const col of ["title", "brand", "image_link", "condition", "shipping_included"]) {
    if (!tsvHeader.split("\t").includes(col)) {
      console.error(`❌ merchant TSV missing column: ${col}`);
      process.exit(1);
    }
  }
  const tsvRows = tsv.trim().split("\n").slice(1);
  if (tsvRows.length !== 12) {
    console.error(`❌ merchant TSV must have 12 data rows, got ${tsvRows.length}`);
    process.exit(1);
  }
  for (const panel of ai.pricedPanels) {
    if (!tsv.includes(panel.url)) {
      console.error(`❌ merchant TSV missing ai-shopping URL for ${panel.sku}: ${panel.url}`);
      process.exit(1);
    }
    if (!panel.image || !panel.brand || !tsv.includes(panel.image)) {
      console.error(`❌ pricedPanels/TSV image+brand required for ${panel.sku}`);
      process.exit(1);
    }
    if (panel["@type"] !== "Product" || panel.offers?.["@type"] !== "Offer") {
      console.error(`❌ pricedPanels ${panel.sku} must be Product with nested Offer`);
      process.exit(1);
    }
    if (panel.offers?.url !== panel.url || panel.offers?.price !== panel.price) {
      console.error(`❌ pricedPanels ${panel.sku} Offer.url/price must match flat Product fields`);
      process.exit(1);
    }
    if (panel.offers?.seller?.["@id"] !== "https://arledscreen.com/#organization") {
      console.error(`❌ pricedPanels ${panel.sku} Offer.seller must be #organization`);
      process.exit(1);
    }
    if (
      panel.offers?.hasMerchantReturnPolicy?.returnPolicyCategory !==
      "https://schema.org/MerchantReturnNotPermitted"
    ) {
      console.error(`❌ pricedPanels ${panel.sku} must declare MerchantReturnNotPermitted`);
      process.exit(1);
    }
  }
  if (tsv.includes("/ic-mekan-led-ekran/p1-25/") || tsv.includes("/p4-front/")) {
    console.error("❌ merchant TSV has stale broken product_url paths");
    process.exit(1);
  }
  if (/\ttrue(\t|$)/m.test(tsv)) {
    console.error("❌ merchant TSV must not invent tax/shipping true");
    process.exit(1);
  }
  // Local path existence under out/ (no network) — catch 404 product_url drift.
  for (const panel of ai.pricedPanels) {
    const u = new URL(panel.url);
    let rel = u.pathname.replace(/^\//, "");
    if (rel.endsWith("/")) rel += "index.html";
    const fp = path.join(outDir, rel);
    if (!fs.existsSync(fp)) {
      console.error(`❌ pricedPanels URL missing in out/: ${panel.sku} → ${rel}`);
      process.exit(1);
    }
  }
  // HTML Offer regression guard — key agent entry points must emit ≥12 Offers.
  const offerHubs = [
    "tr/index.html",
    "en/index.html",
    "tr/products/index.html",
    "en/products/index.html",
    "tr/nxtionstar/index.html",
    "en/nxtionstar/index.html",
    "tr/led-ekran/index.html",
    "en/led-ekran/index.html",
    "tr/hesaplayici/index.html",
    "en/hesaplayici/index.html",
    "tr/quote/index.html",
    "en/quote/index.html",
    "tr/yapay-zeka/index.html",
    "en/yapay-zeka/index.html",
    "tr/led-ekran-fiyatlari/index.html",
    "en/led-ekran-fiyatlari/index.html",
    "en/led-ekran-satisi/index.html",
    "en/led-ekran-ureticisi/index.html",
    "en/led-ekran-montaj/index.html",
    "en/led-ekran-kiralama/index.html",
    "en/led-ekran-servis/index.html",
  ];
  // Use/pitch/services EN hubs must exist (no ≥12 Offer requirement — Dataset/FAQ only).
  const enLeanHubs = [
    "en/hizmetler/index.html",
    "en/bolgeler/index.html",
    "en/projelerimiz/index.html",
    "en/galeri/index.html",
    "en/blog/index.html",
    "en/about/aras-bozkurt/index.html",
    "en/contact/index.html",
    "en/iletisim/index.html",
    "en/rehber/ince-pitch-led-ekran/index.html",
    "en/rehber/gob-led-ekran/index.html",
    "en/magaza-led-ekran/index.html",
    "en/avm-led-ekran/index.html",
    "en/cephe-led-ekran/index.html",
    "en/billboard-led-ekran/index.html",
    "en/vitrin-led-ekran/index.html",
    "en/otel-led-ekran/index.html",
    "en/restoran-led-ekran/index.html",
    "en/dugun-salonu-led-ekran/index.html",
    "en/konferans-salonu-led-ekran/index.html",
    "en/sahne-led-ekran/index.html",
    "en/fuar-led-ekran/index.html",
    "en/belediye-led-ekran/index.html",
    "en/fabrika-led-ekran/index.html",
    "en/spor-salonu-led-ekran/index.html",
    "en/stadyum-led-ekran/index.html",
    "en/totem-led-ekran/index.html",
    "en/p1-25-led-ekran/index.html",
    "en/p1-86-led-ekran/index.html",
    "en/p2-5-led-ekran/index.html",
    "en/p2-9-led-ekran/index.html",
    "en/p3-07-led-ekran/index.html",
    "en/p4-led-ekran/index.html",
    "en/p5-led-ekran/index.html",
  ];
  for (const rel of enLeanHubs) {
    const fp = path.join(outDir, rel);
    if (!fs.existsSync(fp)) {
      console.error(`❌ EN lean hub missing in out/: ${rel}`);
      process.exit(1);
    }
    const html = fs.readFileSync(fp, "utf8");
    // Next RSC payloads can contain the literal "This page could not be found" even on
    // real pages — trust <title> (404 pages title as "404: This page could not be found.").
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : "";
    if (!html.includes("ARLEDSCREEN") || /^404\b/i.test(title) || /could not be found/i.test(title)) {
      console.error(`❌ ${rel} must be a real EN page (not 404); title=${title.slice(0, 80)}`);
      process.exit(1);
    }
  }
  for (const rel of offerHubs) {
    const fp = path.join(outDir, rel);
    if (!fs.existsSync(fp)) {
      console.error(`❌ Offer hub missing in out/: ${rel}`);
      process.exit(1);
    }
    const html = fs.readFileSync(fp, "utf8");
    const offers = (html.match(/"@type"\s*:\s*"Offer"/g) || []).length;
    if (offers < 12) {
      console.error(`❌ ${rel} must embed ≥12 Offer JSON-LD nodes (got ${offers})`);
      process.exit(1);
    }
  }
  if (!ard?.agentic?.resources?.homeTr?.url?.includes("/tr/") || !ard?.agentic?.resources?.productsHub?.url?.includes("/tr/products/")) {
    console.error("❌ ard.json resources.homeTr + productsHub required");
    process.exit(1);
  }
  // Sitewide Organization JSON-LD + scraped about/founder HTML must warn on legacy arleds.com.
  const orgSchemaPages = [
    "tr/index.html",
    "en/index.html",
    "tr/about/index.html",
    "en/about/index.html",
    "tr/about/aras-bozkurt/index.html",
  ];
  for (const rel of orgSchemaPages) {
    const fp = path.join(outDir, rel);
    if (!fs.existsSync(fp)) {
      console.error(`❌ Organization schema page missing in out/: ${rel}`);
      process.exit(1);
    }
    const html = fs.readFileSync(fp, "utf8");
    if (!html.includes("disambiguatingDescription") || !html.includes("arleds.com")) {
      console.error(`❌ ${rel} Organization JSON-LD must include disambiguatingDescription with arleds.com`);
      process.exit(1);
    }
    if (/"sameAs"\s*:\s*\[[^\]]*arleds\.com/i.test(html)) {
      console.error(`❌ ${rel} sameAs must NOT include legacy arleds.com (until 301)`);
      process.exit(1);
    }
  }
  for (const rel of [
    "tr/about/index.html",
    "en/about/index.html",
    "tr/about/aras-bozkurt/index.html",
    "en/about/aras-bozkurt/index.html",
  ]) {
    const html = fs.readFileSync(path.join(outDir, rel), "utf8");
    // Visible body copy (not only feeds) must reject legacy domain for scrapers.
    if (!html.includes("arleds.com") || !html.includes("arledscreen.com")) {
      console.error(`❌ ${rel} visible HTML must disambiguate arleds.com vs arledscreen.com`);
      process.exit(1);
    }
  }
  if (!entity.faqs?.some((f) => String(f?.question || "").includes("arleds.com"))) {
    console.error("❌ entity.json faqs must include arleds.com vs arledscreen.com Q&A");
    process.exit(1);
  }
  // FAQPage surfaces agents scrape for entity Q&A (SSS + home TR/EN + AI hub + commercial hubs).
  const faqArledsPages = [
    "tr/sss/index.html",
    "en/sss/index.html",
    "tr/index.html",
    "en/index.html",
    "tr/yapay-zeka/index.html",
    "en/yapay-zeka/index.html",
    "tr/led-ekran/index.html",
    "en/led-ekran/index.html",
    "en/led-ekran-satisi/index.html",
    "en/led-ekran-ureticisi/index.html",
    "en/led-ekran-montaj/index.html",
    "en/led-ekran-kiralama/index.html",
    "en/led-ekran-servis/index.html",
    "en/products/gob-led-ekran/index.html",
    "en/products/ic-mekan-led-ekran/index.html",
    "en/products/dis-mekan-led-ekran/index.html",
    "en/rehber/piksel-araligi-secimi/index.html",
    "en/rehber/gob-vs-smd/index.html",
    "en/rehber/kiralik-mi-satin-alma/index.html",
    "en/rehber/led-tabela-mi-led-ekran-mi/index.html",
    "en/hizmetler/index.html",
    "en/bolgeler/index.html",
    "en/projelerimiz/index.html",
    "en/galeri/index.html",
    "en/blog/index.html",
    "en/magaza-led-ekran/index.html",
    "en/p2-5-led-ekran/index.html",
    "tr/led-ekran-fiyatlari/index.html",
    "en/led-ekran-fiyatlari/index.html",
    "tr/nxtionstar/index.html",
    "en/nxtionstar/index.html",
  ];
  for (const rel of faqArledsPages) {
    const fp = path.join(outDir, rel);
    if (!fs.existsSync(fp)) {
      console.error(`❌ FAQ arleds page missing in out/: ${rel}`);
      process.exit(1);
    }
    const html = fs.readFileSync(fp, "utf8");
    const hasFaqPage = html.includes("FAQPage");
    const hasArledsFaq =
      html.includes("arleds.com ile arledscreen.com") ||
      html.includes("Is arleds.com the same as arledscreen.com");
    const hasNationStarFaq =
      html.includes("NationStar") &&
      (html.includes("NXTIONSTAR") || html.includes("N-X-T-I-O-N-S-T-A-R"));
    if (!hasFaqPage || !hasArledsFaq) {
      console.error(`❌ ${rel} FAQPage must include arleds.com vs arledscreen.com Q&A`);
      process.exit(1);
    }
    if (!hasNationStarFaq) {
      console.error(`❌ ${rel} FAQPage must disambiguate NXTIONSTAR vs NationStar`);
      process.exit(1);
    }
  }
  // Sitewide Brand JSON-LD must carry NationStar disambiguatingDescription.
  const brandHtml = fs.readFileSync(path.join(outDir, "tr/index.html"), "utf8");
  if (!brandHtml.includes("disambiguatingDescription") || !brandHtml.includes("NationStar")) {
    console.error("❌ Organization/Brand JSON-LD on tr/ must disambiguate NationStar");
    process.exit(1);
  }
  const indexNowScript = fs.readFileSync(path.join(repoRoot, "scripts/submit-indexnow.mjs"), "utf8");
  for (const must of [
    "/tr/about/",
    "/en/about/",
    "/tr/about/aras-bozkurt/",
    "/tr/sss/",
    "/ai.txt",
    "/en/nxtionstar/",
    "/en/led-ekran-fiyatlari/",
    "/en/led-ekran/",
    "/en/led-ekran-satisi/",
    "/en/led-ekran-kiralama/",
    "/en/hizmetler/",
    "/en/bolgeler/",
    "/en/projelerimiz/",
    "/en/galeri/",
    "/en/blog/",
    "/en/about/aras-bozkurt/",
    "/en/contact/",
    "/en/iletisim/",
    "/en/rehber/ince-pitch-led-ekran/",
    "/en/rehber/gob-led-ekran/",
    "/en/magaza-led-ekran/",
    "/en/cephe-led-ekran/",
    "/en/vitrin-led-ekran/",
    "/en/totem-led-ekran/",
    "/en/p2-5-led-ekran/",
    "/en/p5-led-ekran/",
    "/en/products/",
    "/en/products/gob-led-ekran/",
    "/en/products/ic-mekan-led-ekran/",
    "/en/rehber/piksel-araligi-secimi/",
    "/en/rehber/gob-vs-smd/",
    "/en/sss/",
  ]) {
    if (!indexNowScript.includes(must)) {
      console.error(`❌ submit-indexnow.mjs must include ${must}`);
      process.exit(1);
    }
  }
  if (!profiles?.packs?.directoryLong?.includes("arleds.com") || !profiles?.packs?.linkedinAbout?.includes("arleds.com")) {
    console.error("❌ entity-profiles packs.directoryLong + linkedinAbout must warn arleds.com");
    process.exit(1);
  }
  // Point C LinkedIn paste must disambiguate /company/arleds slug from website arleds.com
  // (SERP/AI crawlers reading LinkedIn About otherwise treat the slug as the web domain).
  for (const [label, about] of [
    ["packs.linkedinAbout", profiles?.packs?.linkedinAbout],
    ["packsEn.linkedinAbout", profiles?.packsEn?.linkedinAbout],
  ]) {
    const text = String(about || "");
    if (!text.includes("/company/arleds") || !text.toLowerCase().includes("web")) {
      console.error(`❌ entity-profiles ${label} must warn LinkedIn /company/arleds ≠ website arleds.com`);
      process.exit(1);
    }
    if (!text.includes("NationStar")) {
      console.error(`❌ entity-profiles ${label} must disambiguate NXTIONSTAR ≠ NationStar`);
      process.exit(1);
    }
  }
  if (
    !String(profiles?.packs?.directoryLong || "").includes("/company/arleds") ||
    !String(profiles?.packsEn?.directoryLong || "").includes("/company/arleds")
  ) {
    console.error("❌ entity-profiles directoryLong (TR+EN) must warn LinkedIn /company/arleds ≠ web arleds.com");
    process.exit(1);
  }
  
  const llmsBody = fs.readFileSync(path.join(outDir, "llms.txt"), "utf8");
  for (const must of [
    "/en/projelerimiz/",
    "/en/hizmetler/",
    "/en/bolgeler/",
    "/en/galeri/",
    "/en/blog/",
    "/en/about/aras-bozkurt/",
  ]) {
    if (!llmsBody.includes(must)) {
      console.error(`❌ llms.txt must cite EN hub ${must}`);
      process.exit(1);
    }
  }

  console.log("✅ out/ AI feeds present (catalog, ai-shopping×12, merchant TSV, entity, profiles, llms, ai.txt); product paths exist");
  console.log(`✅ HTML Offer hubs: ${offerHubs.length} pages ≥12 Offers`);
  console.log(`✅ HTML/schema arleds.com disambiguation: ${orgSchemaPages.length} pages + about/founder body`);
  console.log(`✅ FAQPage arleds Q&A: ${faqArledsPages.length} pages + IndexNow about/founder/sss/ai.txt`);
}

// Live robots.txt is served by Pages Function — keep Allow list in sync.
const robotsFn = path.join(repoRoot, "functions", "robots.txt.js");
if (fs.existsSync(robotsFn)) {
  const body = fs.readFileSync(robotsFn, "utf8");
  if (!body.includes("/geo-baseline.json")) {
    console.error("❌ functions/robots.txt.js must Allow /geo-baseline.json");
    process.exit(1);
  }
  if (!body.includes("/ai.txt")) {
    console.error("❌ functions/robots.txt.js must Allow /ai.txt");
    process.exit(1);
  }
  console.log("✅ functions/robots.txt.js allows /geo-baseline.json + /ai.txt");
}

validateAIFeeds();
