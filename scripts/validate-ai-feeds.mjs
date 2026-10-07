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
  if (!ai?.resources?.en?.home || !ai.resources.en.calculator) {
    console.error("❌ ai-shopping.json resources.en.home + calculator required");
    process.exit(1);
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
  if (!Array.isArray(ard?.robotsPolicy?.allow) || !ard.robotsPolicy.allow.includes("/geo-baseline.json")) {
    console.error("❌ ard.json robotsPolicy.allow must include /geo-baseline.json");
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
  console.log("✅ out/ AI feeds present (catalog, ai-shopping×12, merchant TSV, entity, profiles, llms); product paths exist");
}

// Live robots.txt is served by Pages Function — keep Allow list in sync.
const robotsFn = path.join(repoRoot, "functions", "robots.txt.js");
if (fs.existsSync(robotsFn)) {
  const body = fs.readFileSync(robotsFn, "utf8");
  if (!body.includes("/geo-baseline.json")) {
    console.error("❌ functions/robots.txt.js must Allow /geo-baseline.json");
    process.exit(1);
  }
  console.log("✅ functions/robots.txt.js allows /geo-baseline.json");
}

validateAIFeeds();
