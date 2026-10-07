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
  "feeds/prices.rss",
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
        const got = content["@type"];
        const ok = Array.isArray(got) ? got.includes(type) : got === type;
        if (!ok) {
          warnings.push(`⚠️ ${file}: Expected @type=${type}, got ${JSON.stringify(got)}`);
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
  if (!Array.isArray(ai.hasPart) || ai.hasPart.length !== 12) {
    console.error("❌ out/ai-shopping.json Dataset must hasPart 12 Products");
    process.exit(1);
  }
  if (!ai.hasPart.every((p) => p?.sku && p.mpn === p.sku)) {
    console.error("❌ out/ai-shopping.json Dataset hasPart stubs must set mpn=sku");
    process.exit(1);
  }
  if (
    !ai.hasPart.every(
      (p) =>
        Array.isArray(p?.sameAs) &&
        p.sameAs.some((u) => String(u).includes(`/catalog.json#${p.sku}`)) &&
        p.mainEntityOfPage === p.url &&
        String(p?.offers?.["@id"] || "").includes(`/ai-shopping.json#offer-${p.sku}`) &&
        Array.isArray(p?.offers?.sameAs) &&
        p.offers.sameAs.some((u) => String(u).includes(`/catalog.json#offer-${p.sku}`)) &&
        p.offers.sameAs.some((u) => String(u) === `${p.url}#offer`) &&
        p?.offers?.itemOffered?.["@id"] === `${p.url}#product` &&
        String(p?.brand?.["@id"] || "").includes("#brand-nxtionstar") &&
        String(p?.offers?.itemOffered?.brand?.["@id"] || "").includes("#brand-nxtionstar") &&
        String(p?.offers?.price || "") === String(p?.price || ai.pricedPanels.find((x) => x.sku === p.sku)?.price) &&
        String(p?.offers?.description || "").includes("Ücretsiz kargo yok") &&
        p?.offers?.shippingDetails?.["@type"] === "OfferShippingDetails" &&
        p?.offers?.hasMerchantReturnPolicy?.returnPolicyCategory ===
          "https://schema.org/MerchantReturnNotPermitted" &&
        p?.offers?.availableAtOrFrom?.["@id"] === "https://arledscreen.com/#localbusiness",
    )
  ) {
    console.error("❌ out/ai-shopping.json hasPart Offer stubs must include Brand + shippingDetails + USD + availableAtOrFrom #localbusiness");
    process.exit(1);
  }
  if (!ai.pricedPanels.every((p) => p?.isPartOf?.["@id"]?.includes("/ai-shopping.json"))) {
    console.error("❌ every pricedPanels Product must isPartOf ai-shopping.json Dataset");
    process.exit(1);
  }
  if (!Array.isArray(ai.sameAs) || !ai.sameAs.some((u) => String(u).includes("/catalog.json"))) {
    console.error("❌ ai-shopping.json Dataset sameAs must join catalog.json");
    process.exit(1);
  }
  if (!String(ai.mainEntityOfPage || "").includes("/led-ekran-fiyatlari/")) {
    console.error("❌ ai-shopping.json Dataset mainEntityOfPage must be price hub");
    process.exit(1);
  }
  if (!ai.resources?.agents?.includes("/agents.json") || !ai.resources?.agentsMd?.includes("AGENTS.md")) {
    console.error("❌ ai-shopping.json resources must cite agents.json + AGENTS.md");
    process.exit(1);
  }
  if (!Array.isArray(ai.resources?.priceAliases) || !ai.resources.priceAliases.some((u) => String(u).includes("/prices.json"))) {
    console.error("❌ ai-shopping.json resources.priceAliases must include /prices.json");
    process.exit(1);
  }
  for (const needle of [
    "/panels.json",
    "/mpn.json",
    "/merchant.json",
    "/modules.json",
    "/sku.json",
    "/panels",
    "/mpn",
    "/offer",
    "/api/panels.json",
    "/.well-known/merchant.json",
    "/.well-known/modules.json",
    "/.well-known/sku.json",
    "/.well-known/price.json",
    "/.well-known/pricing.json",
  ]) {
    if (!ai.resources.priceAliases.some((u) => String(u).includes(needle))) {
      console.error(`❌ ai-shopping.json resources.priceAliases must include ${needle}`);
      process.exit(1);
    }
  }
  const distUrls = (ai.distribution || []).map((d) => String(d?.contentUrl || ""));
  if (!Array.isArray(ai.distribution) || ai.distribution.length < 7) {
    console.error("❌ ai-shopping.json Dataset.distribution must list ≥7 DataDownload encodings (HTML hub parity)");
    process.exit(1);
  }
  for (const needle of [
    "/ai-shopping.json",
    "/prices.json",
    "/panels.json",
    "/mpn.json",
    "/merchant.json",
    "/offer.json",
    "/catalog.json",
    "/feeds/merchant-priced-panels.tsv",
    "/feeds/prices.rss",
    "/geo-baseline.json",
  ]) {
    if (!distUrls.some((u) => u.includes(needle))) {
      console.error(`❌ ai-shopping.json distribution must include DataDownload ${needle}`);
      process.exit(1);
    }
  }
  if (!ai.distribution.every((d) => d?.["@type"] === "DataDownload" && d?.encodingFormat && d?.contentUrl)) {
    console.error("❌ ai-shopping.json distribution entries must be DataDownload with encodingFormat + contentUrl");
    process.exit(1);
  }
  if (!String(ai.agentGuidelines?.en?.priceSource || "").includes("/prices.json")) {
    console.error("❌ agentGuidelines.en.priceSource must cite inventable /prices.json");
    process.exit(1);
  }
  if (
    !String(ai.agentGuidelines?.en?.priceSource || "").includes("/panels.json") ||
    !String(ai.agentGuidelines?.en?.priceSource || "").includes("/mpn.json") ||
    !String(ai.agentGuidelines?.priceSource || "").includes("/panels.json")
  ) {
    console.error("❌ agentGuidelines priceSource (TR+EN) must cite /panels.json + /mpn.json");
    process.exit(1);
  }
  if (/blindTestPrompts|kör test/i.test(JSON.stringify(ai))) {
    console.error("❌ out/ai-shopping.json must not carry blind-test payload");
    process.exit(1);
  }
  const ard = JSON.parse(fs.readFileSync(path.join(outDir, ".well-known/ard.json"), "utf8"));
  if (
    !ard?.agentic?.resources?.panelsJson?.url?.includes("/panels.json") ||
    !ard?.agentic?.resources?.mpnJson?.url?.includes("/mpn.json") ||
    !ard?.agentic?.resources?.merchantJson?.url?.includes("/merchant.json") ||
    !ard?.agentic?.resources?.offerJson?.url?.includes("/offer.json")
  ) {
    console.error("❌ ard.json must expose resources.panelsJson + mpnJson + merchantJson + offerJson");
    process.exit(1);
  }
  const ardMerchant = ard?.agentic?.resources?.merchantFeed;
  {
    const cols = Array.isArray(ardMerchant?.columns) ? ardMerchant.columns : [];
    for (const need of [
      "product_ld_id",
      "catalog_id",
      "offer_id",
      "catalog_offer_id",
      "mpn",
      "brand_url",
      "organization_id",
      "entity_url",
      "local_business_id",
      "brand_makes_offer_id",
      "brand_has_offer_catalog",
    ]) {
      if (!cols.includes(need)) {
        console.error(`❌ ard.json merchantFeed.columns must include ${need}`);
        process.exit(1);
      }
    }
    if (ardMerchant?.localBusinessId !== "https://arledscreen.com/#localbusiness") {
      console.error("❌ ard.json merchantFeed.localBusinessId must be #localbusiness");
      process.exit(1);
    }
    if (ardMerchant?.organizationId !== "https://arledscreen.com/#organization") {
      console.error("❌ ard.json merchantFeed.organizationId must be #organization");
      process.exit(1);
    }
    if (!String(ardMerchant?.entityUrl || "").includes("/entity.json")) {
      console.error("❌ ard.json merchantFeed.entityUrl must cite /entity.json");
      process.exit(1);
    }
    if (!String(ardMerchant?.brandUrl || "").includes("/brand.json")) {
      console.error("❌ ard.json merchantFeed.brandUrl must cite /brand.json");
      process.exit(1);
    }
    if (
      !String(ardMerchant?.brandMakesOfferId || "").includes("#priced-panels-aggregate") ||
      !String(ardMerchant?.brandHasOfferCatalog || "").includes("/catalog.json")
    ) {
      console.error("❌ ard.json merchantFeed must cite brandMakesOfferId + brandHasOfferCatalog");
      process.exit(1);
    }
  }
  if (!ardMerchant?.url?.includes("/feeds/merchant-priced-panels.tsv") || ardMerchant.freeShipping !== false) {
    console.error("❌ ard.json must expose merchantFeed (TSV) with freeShipping:false");
    process.exit(1);
  }
  if (!String(ard?.agentic?.resources?.pricesRss?.url || "").includes("/feeds/prices.rss")) {
    console.error("❌ ard.json must expose resources.pricesRss → /feeds/prices.rss");
    process.exit(1);
  }
  if (!Array.isArray(ard?.robotsPolicy?.allow) || !ard.robotsPolicy.allow.includes("/feeds/merchant-priced-panels.tsv")) {
    console.error("❌ ard.json robotsPolicy.allow must include merchant TSV path");
    process.exit(1);
  }
  for (const must of [
    "/cite.json",
    "/faq.json",
    "/prices.json",
    "/panels.json",
    "/organization.json",
    "/AGENTS.md",
    "/modules.json",
    "/sku.json",
    "/.well-known/modules.json",
    "/.well-known/sku.json",
    "/.well-known/price.json",
    "/.well-known/pricing.json",
  ]) {
    if (!ard.robotsPolicy.allow.includes(must)) {
      console.error(`❌ ard.json robotsPolicy.allow must include ${must}`);
      process.exit(1);
    }
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
    !String(ardBrand?.makesOffer || "").includes("#priced-panels-aggregate") ||
    !String(ardBrand?.hasOfferCatalog || "").includes("/catalog.json") ||
    !String(ardBrand?.url || "").includes("/brand.json") ||
    ardBrand?.offerCount !== 12 ||
    !String(ardBrand?.description || "").includes("AggregateOffer")
  ) {
    console.error("❌ ard.json resources.brand must cite AggregateOffer×12 + hasOfferCatalog + url /brand.json");
    process.exit(1);
  }
  {
    const brandJsonRes = ard?.agentic?.resources?.brandJson;
    if (
      !String(brandJsonRes?.url || "").includes("/brand.json") ||
      brandJsonRes?.offerCount !== 12 ||
      !String(brandJsonRes?.description || "").includes("AggregateOffer")
    ) {
      console.error("❌ ard.json resources.brandJson must describe AggregateOffer×12 Brand document");
      process.exit(1);
    }
  }
  {
    const websiteRes = ard?.agentic?.resources?.website;
    if (
      websiteRes?.["@id"] !== "https://arledscreen.com/#website" ||
      !Array.isArray(websiteRes?.potentialAction) ||
      !websiteRes.potentialAction.some((u) => String(u).includes("/tr/quote")) ||
      !websiteRes.potentialAction.some((u) => String(u).includes("/en/quote"))
    ) {
      console.error("❌ ard.json resources.website must be #website with OrderAction TR+EN quote URLs");
      process.exit(1);
    }
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
  {
    const pc = ard?.agentic?.resources?.pointC;
    const pcEn = ard?.agentic?.resources?.pointCEn;
    if (
      !String(pc?.url || "").includes("/point-c.txt") ||
      !String(pc?.wellKnown || "").includes("/.well-known/point-c.txt") ||
      !String(pc?.en || "").includes("/point-c-en.txt") ||
      !String(pcEn?.url || "").includes("/point-c-en.txt")
    ) {
      console.error("❌ ard.json must expose resources.pointC + pointCEn → /point-c.txt (+ EN + well-known)");
      process.exit(1);
    }
    if (!String(ard?.agentic?.resources?.humansTxt?.url || "").includes("/humans.txt")) {
      console.error("❌ ard.json must expose resources.humansTxt");
      process.exit(1);
    }
    for (const must of ["/point-c.txt", "/point-c-en.txt", "/.well-known/point-c.txt", "/humans.txt", "/brand.json"]) {
      if (!ard.robotsPolicy.allow.includes(must)) {
        console.error(`❌ ard.json robotsPolicy.allow must include ${must}`);
        process.exit(1);
      }
    }
  }
  if (!String(ard?.agentic?.resources?.entity?.makesOffer || "").includes("#priced-panels-aggregate")) {
    console.error("❌ ard.json resources.entity must cite makesOffer #priced-panels-aggregate");
    process.exit(1);
  }
  if (
    ard?.agentic?.resources?.entity?.location !== "https://arledscreen.com/#localbusiness" ||
    ard?.agentic?.resources?.localBusiness?.["@id"] !== "https://arledscreen.com/#localbusiness"
  ) {
    console.error("❌ ard.json resources.entity.location + resources.localBusiness must be #localbusiness");
    process.exit(1);
  }
  if (!String(ard?.agentic?.resources?.aiShopping?.description || "").includes("itemOffered")) {
    console.error("❌ ard.json resources.aiShopping description must cite itemOffered");
    process.exit(1);
  }
  const tsvHead = fs.readFileSync(path.join(outDir, "feeds/merchant-priced-panels.tsv"), "utf8").split("\n")[0];
  if (!tsvHead.includes("brand_id")) {
    console.error("❌ merchant TSV must include brand_id column");
    process.exit(1);
  }
  if (!tsvHead.includes("brand_makes_offer_id") || !tsvHead.includes("brand_has_offer_catalog")) {
    console.error("❌ merchant TSV must include brand_makes_offer_id + brand_has_offer_catalog");
    process.exit(1);
  }
  if (!tsvHead.includes("title_en")) {
    console.error("❌ merchant TSV must include title_en column for EN AI agents");
    process.exit(1);
  }
  if (!tsvHead.split("\t").includes("mpn")) {
    console.error("❌ merchant TSV must include mpn column (honest MPN=sku; no invented GTIN)");
    process.exit(1);
  }
  if (
    !ai?.resources?.brandId?.includes("#brand-nxtionstar") ||
    !String(ai?.resources?.brand || "").includes("/brand.json") ||
    !String(ai?.resources?.brandHub || "").includes("/tr/nxtionstar/")
  ) {
    console.error("❌ ai-shopping.json resources.brand (/brand.json) + brandHub + brandId required");
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
  {
    const geoBased = JSON.stringify(baseline?.isBasedOn || []);
    const geoRelated = JSON.stringify(baseline?.isRelatedTo || []);
    for (const needle of [
      "/entity.json",
      "/brand.json",
      "/ai-shopping.json",
      "/catalog.json",
      "/feeds/merchant-priced-panels.tsv",
      "/feeds/prices.rss",
    ]) {
      if (!geoBased.includes(needle)) {
        console.error(`❌ geo-baseline.json isBasedOn must include ${needle}`);
        process.exit(1);
      }
    }
    for (const needle of ["/point-c.txt", "/.well-known/ard.json", "/.well-known/agents.json"]) {
      if (!geoRelated.includes(needle)) {
        console.error(`❌ geo-baseline.json isRelatedTo must include ${needle}`);
        process.exit(1);
      }
    }
  }
  if (
    !String(baseline?.baseline?.priceGraph?.entityMakesOffer || "").includes("#priced-panels-aggregate") ||
    !baseline?.baseline?.priceGraph?.datasetHasPartOffers ||
    !String(baseline?.baseline?.priceGraph?.offerItemOffered || "").includes("#product") ||
    !String(baseline?.baseline?.priceGraph?.offerAvailableAtOrFrom || "").includes("#localbusiness") ||
    !String(baseline?.baseline?.priceGraph?.organizationLocation || "").includes("#localbusiness") ||
    !String(baseline?.baseline?.priceGraph?.serviceProvider || "").includes("#localbusiness") ||
    !String(baseline?.baseline?.priceGraph?.brandMakesOffer || "").includes("#priced-panels-aggregate") ||
    !String(baseline?.baseline?.priceGraph?.brandHasOfferCatalog || "").includes("/catalog.json") ||
    !String(baseline?.brand?.makesOffer?.["@id"] || "").includes("#priced-panels-aggregate") ||
    !String(baseline?.brand?.hasOfferCatalog?.["@id"] || "").includes("/catalog.json")
  ) {
    console.error("❌ geo-baseline.json baseline.priceGraph must cite makesOffer + Brand offer/catalog + #localbusiness location + serviceProvider");
    process.exit(1);
  }
  for (const key of [
    "pricesJson",
    "organization",
    "agentsJson",
    "agentsMd",
    "securityTxt",
    "humansTxt",
    "pricesRss",
    "pointCTxt",
    "pointCEnTxt",
    "pointCWellKnown",
    "brandJson",
  ]) {
    if (!String(baseline?.discovery?.[key] || "").includes("arledscreen.com")) {
      console.error(`❌ geo-baseline.json discovery.${key} required for invent/agent surfaces`);
      process.exit(1);
    }
  }
  if (
    !String(ai?.resources?.pointC || "").includes("/point-c.txt") ||
    !String(ai?.resources?.pointCEn || "").includes("/point-c-en.txt") ||
    !String(ai?.resources?.pointCWellKnown || "").includes("/.well-known/point-c.txt")
  ) {
    console.error("❌ ai-shopping.json resources.pointC + pointCEn + pointCWellKnown required");
    process.exit(1);
  }
  if (!JSON.stringify(ai?.isBasedOn || []).includes("/brand.json") || !JSON.stringify(ai?.isBasedOn || []).includes("/point-c.txt")) {
    console.error("❌ ai-shopping.json isBasedOn must cite /brand.json + /point-c.txt");
    process.exit(1);
  }
  if (!ard?.agentic?.resources?.pricesJson?.url?.includes("/prices.json") || !ard?.agentic?.resources?.agentsMd?.url?.includes("AGENTS.md")) {
    console.error("❌ ard.json must expose resources.pricesJson + agentsMd");
    process.exit(1);
  }
  if (!ai?.resources?.geoBaseline?.includes("/geo-baseline.json")) {
    console.error("❌ ai-shopping.json resources.geoBaseline required");
    process.exit(1);
  }
  {
    const gated = JSON.stringify(baseline?.baseline?.ownerGated || []);
    if (!gated.includes("tur1a:log") || !gated.includes("point-c.txt") || !gated.includes("verify:arleds-301")) {
      console.error("❌ geo-baseline.baseline.ownerGated must cite tur1a:log + point-c.txt + verify:arleds-301");
      process.exit(1);
    }
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
    !catalogRelated.includes("/feeds/prices.rss") ||
    !catalogRelated.includes("/brand.json") ||
    !catalogRelated.includes("/point-c.txt") ||
    catalogLive?.brand?.["@id"] !== "https://arledscreen.com/#brand-nxtionstar"
  ) {
    console.error("❌ catalog.json must isRelatedTo geo-baseline + ai-shopping + prices.rss + brand.json + point-c.txt and brand @id #brand-nxtionstar");
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
    const sku = product?.sku;
    const sameAs = Array.isArray(product?.sameAs) ? product.sameAs : [];
    const offerSameAs = Array.isArray(product?.offers?.sameAs) ? product.offers.sameAs : [];
    if (!sku || !sameAs.some((u) => String(u) === `${productUrl}#product`)) {
      console.error(`❌ catalog Product ${id} sameAs must join PDP #product`);
      process.exit(1);
    }
    if (product?.mainEntityOfPage !== productUrl) {
      console.error(`❌ catalog Product ${id} mainEntityOfPage must be PDP url`);
      process.exit(1);
    }
    if (!offerSameAs.some((u) => String(u).includes(`/ai-shopping.json#offer-${sku}`))) {
      console.error(`❌ catalog Offer ${id} sameAs must join ai-shopping.json#offer-${sku}`);
      process.exit(1);
    }
    if (!offerSameAs.some((u) => String(u) === `${productUrl}#offer`)) {
      console.error(`❌ catalog Offer ${id} sameAs must join PDP #offer`);
      process.exit(1);
    }
    if (product?.offers?.sku !== sku || product?.offers?.mpn !== sku) {
      console.error(`❌ catalog Offer ${id} must set sku/mpn=${sku}`);
      process.exit(1);
    }
    if (product?.offers?.itemOffered?.["@id"] !== `${productUrl}#product`) {
      console.error(`❌ catalog Offer ${id} itemOffered must join PDP #product`);
      process.exit(1);
    }
    if (!String(product?.offers?.itemOffered?.brand?.["@id"] || "").includes("#brand-nxtionstar")) {
      console.error(`❌ catalog Offer ${id} itemOffered.brand must be #brand-nxtionstar`);
      process.exit(1);
    }
    if (product?.offers?.availableAtOrFrom?.["@id"] !== "https://arledscreen.com/#localbusiness") {
      console.error(`❌ catalog Offer ${id} availableAtOrFrom must be #localbusiness`);
      process.exit(1);
    }
  }
  if (catalogLive?.["@id"] !== "https://arledscreen.com/catalog.json") {
    console.error("❌ catalog.json Collection must @id catalog.json");
    process.exit(1);
  }
  {
    const ct = catalogLive?.["@type"];
    const types = Array.isArray(ct) ? ct : [ct];
    if (!types.includes("Collection") || !types.includes("OfferCatalog")) {
      console.error("❌ catalog.json @type must include Collection + OfferCatalog");
      process.exit(1);
    }
  }
  if (
    !Array.isArray(catalogLive?.sameAs) ||
    !catalogLive.sameAs.some((u) => String(u).includes("/ai-shopping.json"))
  ) {
    console.error("❌ catalog.json Collection sameAs must join ai-shopping.json");
    process.exit(1);
  }
  if (
    catalogLive?.seller?.["@id"] !== "https://arledscreen.com/#organization" ||
    catalogLive?.provider?.["@id"] !== "https://arledscreen.com/#organization" ||
    catalogLive?.publisher?.["@id"] !== "https://arledscreen.com/#organization"
  ) {
    console.error("❌ catalog.json must seller + provider + publisher → #organization");
    process.exit(1);
  }
  if (catalogLive?.availableAtOrFrom?.["@id"] !== "https://arledscreen.com/#localbusiness") {
    console.error("❌ catalog.json Collection availableAtOrFrom must be #localbusiness");
    process.exit(1);
  }
  if (
    !String(catalogLive?.brand?.makesOffer?.["@id"] || "").includes("#priced-panels-aggregate") ||
    catalogLive?.brand?.makesOffer?.["@type"] !== "AggregateOffer" ||
    catalogLive?.brand?.makesOffer?.offerCount !== 12 ||
    !catalogLive?.brand?.makesOffer?.lowPrice ||
    !String(catalogLive?.brand?.hasOfferCatalog?.["@id"] || "").includes("/catalog.json")
  ) {
    console.error("❌ catalog.json Brand must AggregateOffer band (offerCount×12) + hasOfferCatalog");
    process.exit(1);
  }
  if (ai?.availableAtOrFrom?.["@id"] !== "https://arledscreen.com/#localbusiness") {
    console.error("❌ ai-shopping.json Dataset availableAtOrFrom must be #localbusiness");
    process.exit(1);
  }
  if (
    !String(ai?.brand?.makesOffer?.["@id"] || "").includes("#priced-panels-aggregate") ||
    ai?.brand?.makesOffer?.["@type"] !== "AggregateOffer" ||
    ai?.brand?.makesOffer?.offerCount !== 12 ||
    !ai?.brand?.makesOffer?.lowPrice ||
    !ai?.brand?.makesOffer?.highPrice ||
    !String(ai?.brand?.hasOfferCatalog?.["@id"] || "").includes("/catalog.json")
  ) {
    console.error("❌ ai-shopping.json Brand must AggregateOffer band (offerCount×12 + low/high) + hasOfferCatalog");
    process.exit(1);
  }
  const aiBasedOn = JSON.stringify(ai?.isBasedOn || []);
  if (!aiBasedOn.includes("/geo-baseline.json")) {
    console.error("❌ ai-shopping.json isBasedOn must include geo-baseline.json");
    process.exit(1);
  }
  if (!aiBasedOn.includes("/feeds/prices.rss")) {
    console.error("❌ ai-shopping.json isBasedOn must include feeds/prices.rss");
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
    "privacy",
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
    "privacyEn",
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
    "privacyEn",
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
  if (
    !String(entity.pricesJson || "").includes("/prices.json") ||
    !String(entity.organizationJson || "").includes("/organization.json") ||
    !String(entity.agentsJson || "").includes("/agents.json") ||
    !String(entity.agentsMd || "").includes("AGENTS.md")
  ) {
    console.error("❌ entity.json must expose pricesJson + organizationJson + agentsJson + agentsMd");
    process.exit(1);
  }
  const entityFaqBlob = JSON.stringify(entity.faqs || []) + JSON.stringify(entity.faqsEn || []);
  if (!entityFaqBlob.includes("/prices.json") || !entityFaqBlob.includes("AGENTS.md")) {
    console.error("❌ entity.json FAQs must cite inventable /prices.json + AGENTS.md");
    process.exit(1);
  }
  if (entity?.brand?.["@id"] !== "https://arledscreen.com/#brand-nxtionstar") {
    console.error("❌ entity.json brand.@id must be #brand-nxtionstar");
    process.exit(1);
  }
  if (
    !String(entity?.brand?.makesOffer?.["@id"] || "").includes("#priced-panels-aggregate") ||
    entity?.brand?.makesOffer?.["@type"] !== "AggregateOffer" ||
    entity?.brand?.makesOffer?.offerCount !== 12 ||
    !Array.isArray(entity?.brand?.makesOffer?.offers) ||
    entity.brand.makesOffer.offers.length !== 12
  ) {
    console.error("❌ entity.json brand.makesOffer must be AggregateOffer×12 (#priced-panels-aggregate)");
    process.exit(1);
  }
  {
    const actions = Array.isArray(entity?.potentialAction) ? entity.potentialAction : [];
    const hasTr = actions.some(
      (a) => a?.["@type"] === "OrderAction" && String(a?.target?.urlTemplate || "").includes("/tr/quote"),
    );
    const hasEn = actions.some(
      (a) => a?.["@type"] === "OrderAction" && String(a?.target?.urlTemplate || "").includes("/en/quote"),
    );
    if (!hasTr || !hasEn) {
      console.error("❌ entity.json potentialAction must include OrderAction TR+EN /quote/");
      process.exit(1);
    }
  }
  {
    const site = entity?.mainEntityOfPage;
    const siteActions = Array.isArray(site?.potentialAction) ? site.potentialAction : [];
    const hasTr = siteActions.some(
      (a) => a?.["@type"] === "OrderAction" && String(a?.target?.urlTemplate || "").includes("/tr/quote"),
    );
    const hasEn = siteActions.some(
      (a) => a?.["@type"] === "OrderAction" && String(a?.target?.urlTemplate || "").includes("/en/quote"),
    );
    if (
      site?.["@type"] !== "WebSite" ||
      site?.["@id"] !== "https://arledscreen.com/#website" ||
      !hasTr ||
      !hasEn
    ) {
      console.error("❌ entity.json mainEntityOfPage must be WebSite #website with OrderAction TR+EN");
      process.exit(1);
    }
  }
  if (!String(entity?.brand?.hasOfferCatalog?.["@id"] || "").includes("/catalog.json")) {
    console.error("❌ entity.json brand.hasOfferCatalog must join catalog.json");
    process.exit(1);
  }
  if (
    !Array.isArray(entity?.brand?.subjectOf) ||
    entity.brand.subjectOf.length < 3 ||
    !JSON.stringify(entity.brand.subjectOf).includes("/ai-shopping.json") ||
    !JSON.stringify(entity.brand.subjectOf).includes("/catalog.json") ||
    !JSON.stringify(entity.brand.subjectOf).includes("/feeds/prices.rss")
  ) {
    console.error("❌ entity.json brand.subjectOf must include ai-shopping + catalog + prices.rss");
    process.exit(1);
  }
  if (
    !String(entity?.logo || "").includes("/brand/") ||
    !Array.isArray(entity?.knowsAbout) ||
    entity.knowsAbout.length < 5 ||
    !Array.isArray(entity?.contactPoint) ||
    entity.contactPoint[0]?.contactType !== "sales"
  ) {
    console.error("❌ entity.json must expose logo + knowsAbout + contactPoint (Org HTML parity)");
    process.exit(1);
  }
  if (
    entity?.makesOffer?.["@type"] !== "AggregateOffer" ||
    entity?.makesOffer?.offerCount !== 12 ||
    entity?.makesOffer?.priceCurrency !== "USD" ||
    !String(entity?.makesOffer?.url || "").includes("/ai-shopping.json") ||
    String(entity?.makesOffer?.lowPrice) !== "26.98" ||
    String(entity?.makesOffer?.highPrice) !== "95.88" ||
    entity?.makesOffer?.availableAtOrFrom?.["@id"] !== "https://arledscreen.com/#localbusiness"
  ) {
    console.error("❌ entity.json makesOffer must be AggregateOffer×12 USD 26.98–95.88 → ai-shopping + #localbusiness");
    process.exit(1);
  }
  if (
    !Array.isArray(entity?.makesOffer?.offers) ||
    entity.makesOffer.offers.length !== 12 ||
    !entity.makesOffer.offers.every(
      (o) =>
        o?.["@type"] === "Offer" &&
        o?.sku &&
        o.mpn === o.sku &&
        String(o["@id"] || "").includes(`/ai-shopping.json#offer-${o.sku}`) &&
        String(o?.itemOffered?.["@id"] || "").endsWith("#product") &&
        String(o?.itemOffered?.brand?.["@id"] || "").includes("#brand-nxtionstar") &&
        o?.seller?.["@id"] === "https://arledscreen.com/#organization" &&
        o?.priceSpecification?.valueAddedTaxIncluded === false &&
        String(o?.description || "").includes("Ücretsiz kargo yok") &&
        o?.shippingDetails?.["@type"] === "OfferShippingDetails" &&
        o?.hasMerchantReturnPolicy?.returnPolicyCategory ===
          "https://schema.org/MerchantReturnNotPermitted" &&
        o?.availableAtOrFrom?.["@id"] === "https://arledscreen.com/#localbusiness",
    )
  ) {
    console.error("❌ entity.json makesOffer.offers must deny free shipping + return policy + itemOffered Brand + localbusiness");
    process.exit(1);
  }
  if (
    entity?.location?.["@type"] !== "LocalBusiness" ||
    entity?.location?.["@id"] !== "https://arledscreen.com/#localbusiness" ||
    entity?.location?.makesOffer?.offerCount !== 12 ||
    entity?.location?.hasOfferCatalog?.["@type"] !== "OfferCatalog" ||
    !Array.isArray(entity?.location?.subjectOf) ||
    entity.location.subjectOf.length < 3
  ) {
    console.error("❌ entity.json location must be LocalBusiness #localbusiness with makesOffer + hasOfferCatalog + subjectOf");
    process.exit(1);
  }
  if (
    entity?.hasOfferCatalog?.["@type"] !== "OfferCatalog" ||
    !String(entity?.hasOfferCatalog?.["@id"] || "").includes("/catalog.json") ||
    entity?.hasOfferCatalog?.numberOfItems !== 12 ||
    entity?.hasOfferCatalog?.availableAtOrFrom?.["@id"] !== "https://arledscreen.com/#localbusiness"
  ) {
    console.error("❌ entity.json hasOfferCatalog must be OfferCatalog → catalog.json ×12 + #localbusiness");
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
  if (
    !Array.isArray(entity.faqsEn) ||
    entity.faqsEn.length < 5 ||
    !entity.faqsEn.some((f) => String(f?.question || "").includes("arleds.com")) ||
    !entity.faqsEn.some((f) => String(f?.question || "").includes("NationStar"))
  ) {
    console.error("❌ entity.json faqsEn must include EN arleds.com + NationStar Q&A");
    process.exit(1);
  }
  if (
    !Array.isArray(ai?.faqsEn) ||
    ai.faqsEn.length < 5 ||
    !ai.faqsEn.some((f) => String(f?.question || "").includes("arleds.com")) ||
    !ai.faqsEn.some((f) => String(f?.question || "").includes("NationStar"))
  ) {
    console.error("❌ ai-shopping.json faqsEn must mirror entity EN arleds.com + NationStar Q&A");
    process.exit(1);
  }
  if (!Array.isArray(ai?.pricedPanels) || !ai.pricedPanels.every((p) => p.nameEn && String(p.nameEn).includes("LED Module"))) {
    console.error("❌ ai-shopping pricedPanels must include nameEn (…LED Module) for all 12 SKUs");
    process.exit(1);
  }
  const aiTxtLive = fs.readFileSync(path.join(outDir, "ai.txt"), "utf8");
  if (
    !aiTxtLive.includes("/ai-shopping.json") ||
    !aiTxtLive.includes("/entity.json") ||
    !aiTxtLive.includes("arleds.com") ||
    !aiTxtLive.includes("NationStar") ||
    !aiTxtLive.includes("makesOffer") ||
    !aiTxtLive.includes("itemOffered") ||
    !aiTxtLive.includes("#localbusiness") ||
    !aiTxtLive.includes("#brand-nxtionstar") ||
    !aiTxtLive.includes("hasOfferCatalog → catalog.json") ||
    !aiTxtLive.includes("brand-json:") ||
    !aiTxtLive.includes("/brand.json") ||
    !aiTxtLive.includes("#website") ||
    !aiTxtLive.includes("quote-tr:") ||
    !aiTxtLive.includes("/tr/quote/") ||
    !aiTxtLive.includes("owner-tur1a-log:") ||
    !aiTxtLive.includes("owner-arleds-301:") ||
    !aiTxtLive.includes("point-c:")
  ) {
    console.error("❌ out/ai.txt must point to feeds, warn arleds.com/NationStar, cite makesOffer+itemOffered+#localbusiness+Brand hasOfferCatalog+brand-json+WebSite#website+quote + owner tur1a/point-c/arleds");
    process.exit(1);
  }
  if (
    !aiTxtLive.includes("/en/prices/") ||
    !aiTxtLive.includes("/en/pricing/") ||
    !aiTxtLive.includes("/en/price/") ||
    !aiTxtLive.includes("/en/cost/") ||
    !aiTxtLive.includes("/en/products/gob-led-ekran/p1-25-gob/") ||
    !aiTxtLive.includes("/en/catalog/") ||
    !aiTxtLive.includes("/en/shop/") ||
    !aiTxtLive.includes("/en/request-quote/") ||
    !aiTxtLive.includes("/en/products/gob/") ||
    !aiTxtLive.includes("feed-alias-catalog:") ||
    !aiTxtLive.includes("/en/ai-shopping.json") ||
    !aiTxtLive.includes("/.well-known/llms.txt") ||
    !aiTxtLive.includes("invent-teklif-tr:") ||
    !aiTxtLive.includes("/tr/teklif/") ||
    !aiTxtLive.includes("/tr/fiyat-teklifi/") ||
    !aiTxtLive.includes("invent-fiyat-tr:") ||
    !aiTxtLive.includes("invent-prices-tr:") ||
    !aiTxtLive.includes("invent-catalog-tr:") ||
    !aiTxtLive.includes("invent-calculator-tr:") ||
    !aiTxtLive.includes("invent-faq-tr:") ||
    !aiTxtLive.includes("feed-alias-panels-json:") ||
    !aiTxtLive.includes("feed-alias-merchant-json:") ||
    !aiTxtLive.includes("feed-alias-mpn-json:") ||
    !aiTxtLive.includes("invent-root-teklif:") ||
    !aiTxtLive.includes("invent-root-fiyat:") ||
    !aiTxtLive.includes("invent-modules-tr:") ||
    !aiTxtLive.includes("invent-magaza-en:") ||
    !aiTxtLive.includes("feed-alias-well-known-mpn:") ||
    !aiTxtLive.includes("feed-alias-well-known-panels:") ||
    !aiTxtLive.includes("feed-alias-well-known-modules:") ||
    !aiTxtLive.includes("feed-alias-well-known-sku:") ||
    !aiTxtLive.includes("feed-alias-well-known-price:") ||
    !aiTxtLive.includes("feed-alias-well-known-pricing:") ||
    !aiTxtLive.includes("feed-alias-api-panels:")
  ) {
    console.error("❌ out/ai.txt must list invent bridges + feed path aliases");
    process.exit(1);
  }
  // Inventable feed path aliases (extensionless / locale-prefixed) must exist in out/.
  for (const rel of [
    "catalog",
    "ai-shopping",
    "entity",
    "geo-baseline",
    "offer",
    "offers",
    "dataset",
    "feed",
    "organization",
    "company",
    "nap",
    "cite",
    "faq",
    "faqs",
    "llms",
    ".well-known/llms.txt",
    "en/ai-shopping.json",
    "en/catalog.json",
    "en/entity.json",
    "pricing.json",
    "products.json",
    "en/pricing.json",
    "en/products.json",
    "data/catalog.json",
    "data/prices.json",
    "api/catalog",
    "api/prices",
    "prices.json",
    "price.json",
    "panels.json",
    "modules.json",
    "sku.json",
    "mpn.json",
    "merchant.json",
    "feeds/prices.json",
    "feeds/catalog.json",
    "en/prices.json",
    "en/price.json",
    ".well-known/ai.txt",
    ".well-known/ai-shopping.json",
    ".well-known/prices.json",
    ".well-known/merchant.json",
    ".well-known/panels.json",
    ".well-known/entity.json",
    ".well-known/catalog.json",
    ".well-known/llms-full.txt",
    "organization.json",
    "company.json",
    "about.json",
    "nap.json",
    "brand.json",
    "offers.json",
    "dataset.json",
    "api/entity",
    "api/ai-shopping",
    "api/v1/prices",
    "v1/prices",
    "security.txt",
    ".well-known/security",
    "AGENTS.md",
    "agent.json",
    ".well-known/agent.json",
    "pricing/index.html",
    "prices/index.html",
    "price/index.html",
    ".well-known/security.txt",
    "en/ai-shopping/index.html",
  ]) {
    const fp = path.join(outDir, rel);
    if (!fs.existsSync(fp)) {
      console.error(`❌ Missing feed path alias in out/: ${rel}`);
      process.exit(1);
    }
  }
  const securityLive = fs.readFileSync(path.join(outDir, ".well-known/security.txt"), "utf8");
  if (
    !securityLive.includes("arled@arledscreen.com") ||
    !securityLive.includes("Expires:") ||
    !securityLive.includes("/brand.json")
  ) {
    console.error("❌ out/.well-known/security.txt must include Contact + Expires + Brand /brand.json pointer");
    process.exit(1);
  }
  const llmsLive = fs.readFileSync(path.join(outDir, "llms.txt"), "utf8");
  if (!llmsLive.includes("Inventable feed path aliases") || !llmsLive.includes("/api/prices")) {
    console.error("❌ out/llms.txt must cite inventable feed path aliases");
    process.exit(1);
  }
  if (!llmsLive.includes("agents.json") || !llmsLive.includes("humans.txt")) {
    console.error("❌ out/llms.txt must cite agents.json + humans.txt");
    process.exit(1);
  }
  if (
    !llmsLive.includes("/point-c.txt") ||
    !llmsLive.includes("/point-c-en.txt") ||
    !llmsLive.includes("/.well-known/point-c.txt")
  ) {
    console.error("❌ out/llms.txt must cite point-c.txt + point-c-en.txt + /.well-known/point-c.txt");
    process.exit(1);
  }
  {
    const humansLive = fs.readFileSync(path.join(outDir, "humans.txt"), "utf8");
    if (
      !humansLive.includes("/feeds/prices.rss") ||
      !humansLive.includes("/brand.json") ||
      !humansLive.includes("/ai-shopping.json") ||
      !humansLive.includes("/catalog.json") ||
      !humansLive.includes("/geo-baseline.json") ||
      !humansLive.includes("/point-c.txt")
    ) {
      console.error("❌ out/humans.txt must cite ai-shopping + catalog + prices.rss + brand.json + geo-baseline + point-c.txt");
      process.exit(1);
    }
  }
  {
    const pointC = fs.readFileSync(path.join(outDir, "point-c.txt"), "utf8");
    const pointCEn = fs.readFileSync(path.join(outDir, "point-c-en.txt"), "utf8");
    if (
      !pointC.includes("GBP About") ||
      !pointC.includes("34245") ||
      !pointC.includes("arledscreen.com/tr/") ||
      !pointC.includes("Hostinger arleds.com") ||
      !pointC.includes("verify:arleds-301") ||
      !pointC.includes("tur1a:log") ||
      !pointCEn.includes("EN GBP About") ||
      !pointCEn.includes("arledscreen.com/en/") ||
      !pointCEn.includes("Hostinger arleds.com") ||
      !pointCEn.includes("tur1a:log")
    ) {
      console.error("❌ out/point-c.txt + point-c-en.txt must contain NAP packs + Hostinger 301 + tur1a:log");
      process.exit(1);
    }
    if (!fs.readFileSync(path.join(outDir, ".well-known/point-c.txt")).equals(fs.readFileSync(path.join(outDir, "point-c.txt")))) {
      console.error("❌ out/.well-known/point-c.txt must match point-c.txt");
      process.exit(1);
    }
  }
  for (const rel of [".well-known/agents.json", "agents.json", "humans.txt", ".well-known/humans.txt"]) {
    if (!fs.existsSync(path.join(outDir, rel))) {
      console.error(`❌ Missing agent discovery surface in out/: ${rel}`);
      process.exit(1);
    }
  }
  const agents = JSON.parse(fs.readFileSync(path.join(outDir, ".well-known/agents.json"), "utf8"));
  if (!Array.isArray(agents.itemListElement) || agents.itemListElement.length < 14) {
    console.error("❌ agents.json must list ≥14 discovery items (incl. brand.json + prices.rss + entity-profiles + humans.txt + point-c.txt)");
    process.exit(1);
  }
  if (!agents.itemListElement.some((it) => String(it?.url || "").includes("entity-profiles.json"))) {
    console.error("❌ agents.json must list entity-profiles.json Point C packs");
    process.exit(1);
  }
  if (!agents.itemListElement.some((it) => String(it?.url || "").includes("/brand.json"))) {
    console.error("❌ agents.json must list brand.json Brand document");
    process.exit(1);
  }
  if (!agents.itemListElement.some((it) => String(it?.url || "").includes("/feeds/prices.rss"))) {
    console.error("❌ agents.json must list feeds/prices.rss");
    process.exit(1);
  }
  if (!agents.itemListElement.some((it) => String(it?.url || "").includes("humans.txt"))) {
    console.error("❌ agents.json must list humans.txt");
    process.exit(1);
  }
  if (!agents.itemListElement.some((it) => String(it?.url || "").includes("point-c.txt"))) {
    console.error("❌ agents.json must list point-c.txt");
    process.exit(1);
  }
  {
    const brandItem = agents.itemListElement.find((it) => String(it?.url || "").includes("/brand.json"));
    if (!String(brandItem?.description || "").includes("AggregateOffer")) {
      console.error("❌ agents.json brand.json item must describe AggregateOffer×12");
      process.exit(1);
    }
  }
  if (!String(agents.description || "").includes("ai-shopping.json")) {
    console.error("❌ agents.json must point agents at ai-shopping.json price source");
    process.exit(1);
  }
  if (
    agents?.provider?.location?.["@id"] !== "https://arledscreen.com/#localbusiness" ||
    !String(agents?.provider?.makesOffer || "").includes("#priced-panels-aggregate") ||
    !String(agents?.provider?.hasOfferCatalog || "").includes("/catalog.json") ||
    !String(agents?.provider?.brand?.makesOffer || "").includes("#priced-panels-aggregate") ||
    !String(agents?.provider?.brand?.hasOfferCatalog || "").includes("/catalog.json")
  ) {
    console.error("❌ agents.json provider must location #localbusiness + makesOffer/hasOfferCatalog + Brand offer/catalog");
    process.exit(1);
  }
  if (!fs.readFileSync(path.join(outDir, "agents.json")).equals(fs.readFileSync(path.join(outDir, ".well-known/agents.json")))) {
    console.error("❌ /agents.json must match /.well-known/agents.json");
    process.exit(1);
  }
  if (!fs.readFileSync(path.join(outDir, "agent.json")).equals(fs.readFileSync(path.join(outDir, ".well-known/agents.json")))) {
    console.error("❌ /agent.json must match /.well-known/agents.json");
    process.exit(1);
  }
  // Byte-identical to canonical where applicable.
  const canonCatalog = fs.readFileSync(path.join(outDir, "catalog.json"));
  if (!fs.readFileSync(path.join(outDir, "catalog")).equals(canonCatalog)) {
    console.error("❌ out/catalog must match catalog.json");
    process.exit(1);
  }
  const catalogDoc = JSON.parse(canonCatalog.toString("utf8"));
  const catalogProducts = catalogDoc?.mainEntity?.itemListElement;
  if (!Array.isArray(catalogProducts) || catalogProducts.length !== 12) {
    console.error("❌ catalog.json mainEntity must list 12 Products");
    process.exit(1);
  }
  if (!catalogProducts.every((p) => p?.isPartOf?.["@id"]?.includes("/ai-shopping.json"))) {
    console.error("❌ every catalog Product must isPartOf ai-shopping.json Dataset");
    process.exit(1);
  }
  const canonAi = fs.readFileSync(path.join(outDir, "ai-shopping.json"));
  if (!fs.readFileSync(path.join(outDir, "en/ai-shopping.json")).equals(canonAi)) {
    console.error("❌ out/en/ai-shopping.json must match ai-shopping.json");
    process.exit(1);
  }
  for (const rel of [
    "prices.json",
    "price.json",
    "pricing.json",
    "en/prices.json",
    "en/price.json",
    "offers.json",
    "dataset.json",
    ".well-known/ai-shopping.json",
    ".well-known/prices.json",
    "api/ai-shopping",
    "api/v1/prices",
    "v1/prices",
  ]) {
    if (!fs.readFileSync(path.join(outDir, rel)).equals(canonAi)) {
      console.error(`❌ out/${rel} must match ai-shopping.json`);
      process.exit(1);
    }
  }
  const canonEntity = fs.readFileSync(path.join(outDir, "entity.json"));
  for (const rel of [
    "organization.json",
    "company.json",
    "about.json",
    "nap.json",
    "api/entity",
    ".well-known/entity.json",
  ]) {
    if (!fs.readFileSync(path.join(outDir, rel)).equals(canonEntity)) {
      console.error(`❌ out/${rel} must match entity.json`);
      process.exit(1);
    }
  }
  {
    const brandLive = JSON.parse(fs.readFileSync(path.join(outDir, "brand.json"), "utf8"));
    if (
      brandLive?.["@type"] !== "Brand" ||
      brandLive?.["@id"] !== "https://arledscreen.com/#brand-nxtionstar" ||
      !String(brandLive?.makesOffer?.["@id"] || "").includes("#priced-panels-aggregate") ||
      brandLive?.makesOffer?.["@type"] !== "AggregateOffer" ||
      brandLive?.makesOffer?.offerCount !== 12 ||
      !Array.isArray(brandLive?.makesOffer?.offers) ||
      brandLive.makesOffer.offers.length !== 12 ||
      !String(brandLive?.hasOfferCatalog?.["@id"] || "").includes("/catalog.json")
    ) {
      console.error("❌ out/brand.json must be Brand #brand-nxtionstar with AggregateOffer×12 + hasOfferCatalog");
      process.exit(1);
    }
    {
      const brandActions = Array.isArray(brandLive.potentialAction) ? brandLive.potentialAction : [];
      const hasTr = brandActions.some(
        (a) => a?.["@type"] === "OrderAction" && String(a?.target?.urlTemplate || "").includes("/tr/quote"),
      );
      const hasEn = brandActions.some(
        (a) => a?.["@type"] === "OrderAction" && String(a?.target?.urlTemplate || "").includes("/en/quote"),
      );
      if (!hasTr || !hasEn) {
        console.error("❌ out/brand.json potentialAction must include OrderAction TR+EN /quote/");
        process.exit(1);
      }
    }
    const brandDist = JSON.stringify(brandLive.distribution || []);
    if (
      !brandDist.includes("/feeds/prices.rss") ||
      !brandDist.includes("/ai-shopping.json") ||
      !brandDist.includes("/catalog.json")
    ) {
      console.error("❌ out/brand.json distribution must include ai-shopping + catalog + prices.rss");
      process.exit(1);
    }
    if (!fs.readFileSync(path.join(outDir, ".well-known/brand.json")).equals(fs.readFileSync(path.join(outDir, "brand.json")))) {
      console.error("❌ out/.well-known/brand.json must match brand.json");
      process.exit(1);
    }
  }
  {
    const rssLive = fs.readFileSync(path.join(outDir, "feeds/prices.rss"), "utf8");
    if (
      !rssLive.includes('xmlns:atom="http://www.w3.org/2005/Atom"') ||
      !rssLive.includes('rel="self"') ||
      !rssLive.includes("/feeds/prices.rss") ||
      !rssLive.includes("/ai-shopping.json") ||
      !rssLive.includes("/brand.json") ||
      !rssLive.includes("/entity.json") ||
      !rssLive.includes("/catalog.json") ||
      !rssLive.includes("/geo-baseline.json") ||
      !rssLive.includes("/point-c.txt")
    ) {
      console.error("❌ feeds/prices.rss must declare atom:link self + alternate ai-shopping + related brand/entity/catalog/geo-baseline/point-c");
      process.exit(1);
    }
  }
  if (!fs.readFileSync(path.join(outDir, ".well-known/ai.txt")).equals(fs.readFileSync(path.join(outDir, "ai.txt")))) {
    console.error("❌ /.well-known/ai.txt must match /ai.txt");
    process.exit(1);
  }
  if (!fs.readFileSync(path.join(outDir, "security.txt")).equals(fs.readFileSync(path.join(outDir, ".well-known/security.txt")))) {
    console.error("❌ /security.txt must match /.well-known/security.txt");
    process.exit(1);
  }
  {
    const agentsMd = fs.readFileSync(path.join(outDir, "AGENTS.md"), "utf8");
    if (
      !agentsMd.includes("ai-shopping.json") ||
      !agentsMd.includes("makesOffer") ||
      !agentsMd.includes("itemOffered") ||
      !agentsMd.includes("#localbusiness") ||
      !agentsMd.includes("hasOfferCatalog") ||
      !agentsMd.includes("#brand-nxtionstar") ||
      !agentsMd.includes("/brand.json") ||
      !agentsMd.includes("OrderAction") ||
      !agentsMd.includes("/feeds/prices.rss") ||
      !agentsMd.includes("/point-c.txt")
    ) {
      console.error("❌ out/AGENTS.md must cite ai-shopping + makesOffer + itemOffered + #localbusiness + Brand hasOfferCatalog + /brand.json + OrderAction + prices.rss + point-c.txt");
      process.exit(1);
    }
  }
  if (
    !llmsLive.includes("makesOffer") ||
    !llmsLive.includes("itemOffered") ||
    !llmsLive.includes("#localbusiness") ||
    !llmsLive.includes("hasOfferCatalog") ||
    !llmsLive.includes("#brand-nxtionstar") ||
    !llmsLive.includes("/brand.json") ||
    !llmsLive.includes("OrderAction") ||
    !llmsLive.includes("/feeds/prices.rss")
  ) {
    console.error("❌ out/llms.txt must cite makesOffer + itemOffered + #localbusiness + Brand hasOfferCatalog + /brand.json + OrderAction + prices.rss");
    process.exit(1);
  }
  if (!llmsLive.includes("/prices.json") || !llmsLive.includes("/.well-known/ai.txt") || !llmsLive.includes("organization.json") || !llmsLive.includes("AGENTS.md")) {
    console.error("❌ out/llms.txt must cite /prices.json + /.well-known/ai.txt + organization.json + AGENTS.md");
    process.exit(1);
  }
  const headersLive = fs.readFileSync(path.join(outDir, "_headers"), "utf8");
  const headerRuleCount = (headersLive.match(/^\/[^\s]/gm) || []).length;
  if (headerRuleCount > 100) {
    console.error(`❌ out/_headers has ${headerRuleCount} rules (Cloudflare Pages max 100) — consolidate with wildcards`);
    process.exit(1);
  }
  for (const pattern of ["/:file.json", "/.well-known/:file.json", "/api/*", "/data/*", "/en/:file.json", "/tr/:file.json"]) {
    if (!headersLive.includes(pattern)) {
      console.error(`❌ out/_headers must include wildcard rule ${pattern} (Pages 100-rule cap)`);
      process.exit(1);
    }
  }
  if (
    !headersLive.includes('rel="describedby"') ||
    !headersLive.includes("ai-shopping.json") ||
    !headersLive.includes("entity.json") ||
    !headersLive.includes("agents.json") ||
    !headersLive.includes("AGENTS.md") ||
    !headersLive.includes("panels.json") ||
    !headersLive.includes("mpn.json") ||
    !headersLive.includes("entity-profiles.json") ||
    !headersLive.includes("catalog.json") ||
    !headersLive.includes("geo-baseline.json") ||
    !headersLive.includes("merchant.json") ||
    !headersLive.includes("offer.json") ||
    !headersLive.includes("ai.txt") ||
    !headersLive.includes("brand.json") ||
    !headersLive.includes("prices.rss")
  ) {
    console.error("❌ out/_headers must advertise Link describedby/alternate for price+entity+brand+agents+panels/mpn/profiles+catalog/geo/merchant/offer/ai.txt+prices.rss");
    process.exit(1);
  }
  for (const htmlRel of ["en/index.html", "tr/index.html", "en/yapay-zeka/index.html"]) {
    const htmlPath = path.join(outDir, htmlRel);
    if (!fs.existsSync(htmlPath)) {
      console.error(`❌ Missing HTML for discovery cite check: ${htmlRel}`);
      process.exit(1);
    }
    const html = fs.readFileSync(htmlPath, "utf8");
    for (const needle of [
      'href="https://arledscreen.com/ai-shopping.json"',
      'href="https://arledscreen.com/entity.json"',
      'href="https://arledscreen.com/brand.json"',
      'href="https://arledscreen.com/prices.json"',
      'href="https://arledscreen.com/organization.json"',
      'href="https://arledscreen.com/.well-known/agents.json"',
      'href="https://arledscreen.com/AGENTS.md"',
      'href="https://arledscreen.com/feeds/prices.rss"',
      'rel="describedby"',
    ]) {
      if (!html.includes(needle)) {
        console.error(`❌ ${htmlRel} must include discovery link: ${needle}`);
        process.exit(1);
      }
    }
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
  if (
    profiles?.brand?.["@id"] !== "https://arledscreen.com/#brand-nxtionstar" ||
    !String(profiles?.brand?.makesOffer?.["@id"] || "").includes("#priced-panels-aggregate") ||
    !String(profiles?.brand?.hasOfferCatalog?.["@id"] || "").includes("/catalog.json")
  ) {
    console.error("❌ entity-profiles.json brand must makesOffer → #priced-panels-aggregate + hasOfferCatalog → catalog.json");
    process.exit(1);
  }
  if (
    !String(profiles?.packs?.googleMerchantReadiness || "").includes("makesOffer → #priced-panels-aggregate") ||
    !String(profiles?.packs?.googleMerchantReadiness || "").includes("hasOfferCatalog → catalog.json")
  ) {
    console.error("❌ entity-profiles packs.googleMerchantReadiness must cite Brand makesOffer + hasOfferCatalog");
    process.exit(1);
  }
  if (!profiles?.canonicalUrls?.geoBaselineJson?.includes("/geo-baseline.json")) {
    console.error("❌ entity-profiles.json canonicalUrls.geoBaselineJson required");
    process.exit(1);
  }
  if (!String(profiles?.canonicalUrls?.pricesRss || "").includes("/feeds/prices.rss")) {
    console.error("❌ entity-profiles.json canonicalUrls.pricesRss required");
    process.exit(1);
  }
  if (!String(profiles?.packs?.googleMerchantReadiness || "").includes("/feeds/prices.rss")) {
    console.error("❌ entity-profiles packs.googleMerchantReadiness must cite prices.rss");
    process.exit(1);
  }
  // Point C human packs: NAP must match site social.ts; no merchant jargon / wrong postcode.
  {
    const humanPackKeys = [
      "gbpDescription",
      "linkedinAbout",
      "instagramBio",
      "facebookAbout",
      "directoryLong",
      "appleBusinessConnect",
      "bingPlaces",
    ];
    for (const packRoot of ["packs", "packsEn"]) {
      const root = profiles?.[packRoot] || {};
      for (const key of humanPackKeys) {
        const text = String(root[key] || "");
        if (!text) continue;
        if (text.includes("34242")) {
          console.error(`❌ entity-profiles ${packRoot}.${key} must use postalCode 34245 (not 34242)`);
          process.exit(1);
        }
        if (/catalog\.json|quote-only|extrasUsd|pricedPanels/i.test(text)) {
          console.error(`❌ entity-profiles ${packRoot}.${key} is human cite-only — no catalog/quote-only jargon`);
          process.exit(1);
        }
      }
      const long = String(root.directoryLong || "") + String(root.gbpDescription || "") + String(root.appleBusinessConnect || "");
      if (long && !long.includes("34245")) {
        console.error(`❌ entity-profiles ${packRoot} human packs must include NAP postalCode 34245`);
        process.exit(1);
      }
      if (long && !long.includes("Tuna Sok")) {
        console.error(`❌ entity-profiles ${packRoot} human packs must include street Tuna Sok`);
        process.exit(1);
      }
      if (long && !/530\s*507\s*88\s*34/.test(long) && !String(root.instagramBio || "").includes("530 507 88 34")) {
        console.error(`❌ entity-profiles ${packRoot} human packs must include phone +90 530 507 88 34`);
        process.exit(1);
      }
    }
  }
  {
    const baselineLive = JSON.parse(fs.readFileSync(path.join(outDir, "geo-baseline.json"), "utf8"));
    if (!String(baselineLive?.discovery?.brandJson || "").includes("/brand.json")) {
      console.error("❌ geo-baseline.json discovery.brandJson must cite /brand.json");
      process.exit(1);
    }
  }
  if (!ard?.agentic?.resources?.geoBaseline?.url?.includes("/geo-baseline.json")) {
    console.error("❌ ard.json resources.geoBaseline required");
    process.exit(1);
  }
  const inventExamples = ard?.agentic?.resources?.enInventBridges?.examples;
  if (!Array.isArray(inventExamples) || !inventExamples.some((u) => String(u).includes("/en/calculator/"))) {
    console.error("❌ ard.json enInventBridges.examples must include /en/calculator/");
    process.exit(1);
  }
  if (!inventExamples.some((u) => String(u).includes("/en/products/gob-led-ekran/p1-25-gob/"))) {
    console.error("❌ ard.json enInventBridges.examples must include SKU locale-flip /en/products/.../p1-25-gob/");
    process.exit(1);
  }
  if (
    !inventExamples.some((u) => String(u).includes("/en/catalog/")) ||
    !inventExamples.some((u) => String(u).includes("/en/shop/")) ||
    !inventExamples.some((u) => String(u).includes("/en/request-quote/")) ||
    !inventExamples.some((u) => String(u).includes("/en/products/gob/")) ||
    !inventExamples.some((u) => String(u) === "https://arledscreen.com/catalog" || String(u).endsWith("arledscreen.com/catalog")) ||
    !inventExamples.some((u) => String(u).includes("arledscreen.com/ai-shopping") && !String(u).includes(".json")) ||
    !inventExamples.some((u) => String(u).includes("/en/ai-shopping.json")) ||
    !inventExamples.some((u) => String(u).includes("/.well-known/llms.txt"))
  ) {
    console.error("❌ ard.json enInventBridges.examples must include catalog/shop + feed aliases");
    process.exit(1);
  }
  const trInvent = ard?.agentic?.resources?.trInventBridges;
  const trExamples = trInvent?.examples;
  if (
    !trInvent?.quoteCanonical?.includes("/tr/quote/") ||
    !trInvent?.priceCanonical?.includes("/tr/led-ekran-fiyatlari/") ||
    !Array.isArray(trExamples) ||
    !trExamples.some((u) => String(u).includes("/tr/teklif/")) ||
    !trExamples.some((u) => String(u).includes("/tr/fiyat/")) ||
    !trExamples.some((u) => String(u).includes("/tr/prices/")) ||
    !trExamples.some((u) => String(u).includes("/tr/catalog/")) ||
    !trExamples.some((u) => String(u).includes("/tr/calculator/")) ||
    !trExamples.some((u) => String(u).includes("/tr/faq/")) ||
    !trExamples.some((u) => String(u).includes("/tr/modules/")) ||
    !trExamples.some((u) => String(u).includes("/tr/gob/")) ||
    !trExamples.some((u) => String(u) === "https://arledscreen.com/teklif/" || String(u).endsWith("/teklif/")) ||
    !trExamples.some((u) => String(u).includes("/panels.json")) ||
    !trExamples.some((u) => String(u).includes("/merchant.json")) ||
    !trExamples.some((u) => String(u).includes("/.well-known/mpn.json")) ||
    !trExamples.some((u) => String(u).includes("/.well-known/modules.json")) ||
    !trExamples.some((u) => String(u).includes("/.well-known/sku.json")) ||
    !trExamples.some((u) => String(u).includes("/.well-known/price.json")) ||
    !trExamples.some((u) => String(u).includes("/.well-known/pricing.json")) ||
    !trExamples.some((u) => String(u).includes("/api/panels.json")) ||
    !trExamples.some((u) => String(u).includes("/tr/llms.txt"))
  ) {
    console.error("❌ ard.json trInventBridges must list TR quote/price/catalog invents + shopping feed aliases");
    process.exit(1);
  }
  const trBridgeChecks = [
    ["tr/teklif/index.html", "/tr/quote/"],
    ["tr/fiyat/index.html", "/tr/led-ekran-fiyatlari/"],
    ["tr/prices/index.html", "/tr/led-ekran-fiyatlari/"],
    ["tr/catalog/index.html", "/tr/products/"],
    ["tr/calculator/index.html", "/tr/hesaplayici/"],
    ["tr/faq/index.html", "/tr/sss/"],
    ["tr/brand/index.html", "/tr/nxtionstar/"],
    ["tr/modules/index.html", "/tr/products/"],
    ["tr/gob/index.html", "/tr/products/gob-led-ekran/"],
    ["tr/indoor-led/index.html", "/tr/products/ic-mekan-led-ekran/"],
    ["en/magaza/index.html", "/en/products/"],
    ["teklif/index.html", "/tr/quote/"],
    ["quote/index.html", "/tr/quote/"],
    ["fiyat/index.html", "/tr/led-ekran-fiyatlari/"],
    ["katalog/index.html", "/tr/products/"],
    ["contact/index.html", "/tr/quote/"],
    ["nxtionstar/index.html", "/tr/nxtionstar/"],
    ["galeri/index.html", "/tr/galeri/"],
  ];
  for (const [rel, target] of trBridgeChecks) {
    const fp = path.join(outDir, rel);
    if (!fs.existsSync(fp)) {
      console.error(`❌ invent bridge missing in out/: ${rel}`);
      process.exit(1);
    }
    const html = fs.readFileSync(fp, "utf8");
    if (!/noindex/i.test(html) || !/Canonical hub/i.test(html) || !html.includes(target)) {
      console.error(`❌ invent bridge must be noindex → ${target}: ${rel}`);
      process.exit(1);
    }
  }
  for (const rel of [
    "panels.json",
    "modules.json",
    "sku.json",
    "mpn.json",
    "merchant.json",
    ".well-known/merchant.json",
    ".well-known/mpn.json",
    ".well-known/sku.json",
    ".well-known/modules.json",
    "api/panels",
    "api/merchant",
    "api/mpn",
    "api/panels.json",
    "api/merchant.json",
    "api/mpn.json",
    "api/ai-shopping.json",
    "api/prices.json",
    "api/entity.json",
    "panels",
    "sku",
    "mpn",
    "merchant",
    "products",
    "product.json",
    "v1/panels",
    "v1/merchant",
    "v1/mpn",
    "v1/sku",
    "feeds/prices.json",
    "feeds/catalog.json",
    "tr/llms.txt",
    "en/llms.txt",
    "tr/llms-full.txt",
    "en/llms-full.txt",
    "tr/ai.txt",
    "en/ai.txt",
    "tr/entity-profiles.json",
    "en/entity-profiles.json",
    "offer.json",
    "cite.json",
    "faq.json",
    "faqs.json",
  ]) {
    const fp = path.join(outDir, rel);
    if (!fs.existsSync(fp)) {
      console.error(`❌ shopping feed invent alias missing in out/: ${rel}`);
      process.exit(1);
    }
  }
  const canonLlms = fs.readFileSync(path.join(outDir, "llms.txt"));
  if (!fs.readFileSync(path.join(outDir, "tr/llms.txt")).equals(canonLlms)) {
    console.error("❌ out/tr/llms.txt must match llms.txt");
    process.exit(1);
  }
  const canonProfiles = fs.readFileSync(path.join(outDir, "entity-profiles.json"));
  if (!fs.readFileSync(path.join(outDir, "tr/entity-profiles.json")).equals(canonProfiles)) {
    console.error("❌ out/tr/entity-profiles.json must match entity-profiles.json");
    process.exit(1);
  }
  if (!headersLive.includes("/api/*") || !headersLive.includes("/tr/:file.txt")) {
    console.error("❌ out/_headers must set Content-Type for /api/* + /tr/:file.txt wildcards");
    process.exit(1);
  }
  if (!headersLive.includes("\n/panels\n")) {
    console.error("❌ out/_headers must set Content-Type for extensionless /panels");
    process.exit(1);
  }
  const canonAiForExt = fs.readFileSync(path.join(outDir, "ai-shopping.json"));
  for (const rel of ["panels", "mpn", "merchant", "sku", "api/panels.json", "api/mpn.json"]) {
    if (!fs.readFileSync(path.join(outDir, rel)).equals(canonAiForExt)) {
      console.error(`❌ out/${rel} must match ai-shopping.json`);
      process.exit(1);
    }
  }
  // out/modules/ is the image asset directory — must remain a directory.
  if (!fs.existsSync(path.join(outDir, "modules")) || !fs.statSync(path.join(outDir, "modules")).isDirectory()) {
    console.error("❌ out/modules must remain the image asset directory (use /modules.json for feed)");
    process.exit(1);
  }
  const canonCat = fs.readFileSync(path.join(outDir, "catalog.json"));
  if (!fs.readFileSync(path.join(outDir, "product.json")).equals(canonCat)) {
    console.error("❌ out/product.json must match catalog.json");
    process.exit(1);
  }
  if (!fs.readFileSync(path.join(outDir, "products")).equals(canonCat)) {
    console.error("❌ out/products must match catalog.json");
    process.exit(1);
  }
  if (!headersLive.includes("/feeds/prices.json") || !headersLive.includes("/feeds/catalog.json")) {
    console.error("❌ out/_headers must set application/json for /feeds/*.json invent aliases");
    process.exit(1);
  }
  if (headersLive.includes("/feeds/*\n") || /\/feeds\/\*\s*\n/.test(headersLive)) {
    console.error("❌ out/_headers must not blanket /feeds/* as TSV (use /feeds/*.tsv)");
    process.exit(1);
  }
  if (!headersLive.includes("/feeds/*.tsv")) {
    console.error("❌ out/_headers must scope TSV Content-Type to /feeds/*.tsv");
    process.exit(1);
  }
  if (!/\/:file\.json\n[\s\S]*?Content-Type: application\/json; charset=utf-8/.test(headersLive)) {
    console.error("❌ out/_headers /:file.json wildcard must set application/json; charset=utf-8 (covers offer/cite/faq aliases)");
    process.exit(1);
  }
  const canonEntityForSyn = fs.readFileSync(path.join(outDir, "entity.json"));
  for (const rel of ["cite.json", "faq.json", "faqs.json"]) {
    if (!fs.readFileSync(path.join(outDir, rel)).equals(canonEntityForSyn)) {
      console.error(`❌ out/${rel} must match entity.json`);
      process.exit(1);
    }
  }
  if (!fs.readFileSync(path.join(outDir, "offer.json")).equals(canonAiForExt)) {
    console.error("❌ out/offer.json must match ai-shopping.json");
    process.exit(1);
  }
  for (const rel of ["offer", "offers", "dataset", "feed"]) {
    if (!fs.readFileSync(path.join(outDir, rel)).equals(canonAiForExt)) {
      console.error(`❌ out/${rel} must match ai-shopping.json`);
      process.exit(1);
    }
  }
  for (const rel of ["organization", "company", "nap", "cite", "faq", "faqs"]) {
    if (!fs.readFileSync(path.join(outDir, rel)).equals(canonEntityForSyn)) {
      console.error(`❌ out/${rel} must match entity.json`);
      process.exit(1);
    }
  }
  if (!headersLive.includes("\n/offer\n") || !headersLive.includes("\n/organization\n")) {
    console.error("❌ out/_headers must set Content-Type for extensionless /offer + /organization");
    process.exit(1);
  }
  if (!llmsLive.includes("mpn") || !llmsLive.includes("/panels.json") || !llmsLive.includes("/teklif/")) {
    console.error("❌ out/llms.txt must cite mpn + panels.json + root /teklif/ invent");
    process.exit(1);
  }
  if (!llmsLive.includes("/tr/llms.txt") || !llmsLive.includes("/tr/ai.txt")) {
    console.error("❌ out/llms.txt must cite TR llms/ai discovery mirrors");
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
  if (!subjectUrls.some((u) => u.includes("/feeds/prices.rss"))) {
    console.error("❌ entity.json subjectOf must include prices.rss DataFeed");
    process.exit(1);
  }
  if (!subjectUrls.some((u) => u.includes("/point-c.txt"))) {
    console.error("❌ entity.json subjectOf must include /point-c.txt DataDownload (reverse invent)");
    process.exit(1);
  }
  {
    const brandLive = JSON.parse(fs.readFileSync(path.join(outDir, "brand.json"), "utf8"));
    const brandSubject = JSON.stringify(brandLive.subjectOf || []);
    const brandDist = JSON.stringify(brandLive.distribution || []);
    if (!brandSubject.includes("/point-c.txt") || !brandDist.includes("/point-c.txt")) {
      console.error("❌ brand.json subjectOf + distribution must cite /point-c.txt");
      process.exit(1);
    }
  }
  if (!String(entity?.pricesRss || "").includes("/feeds/prices.rss")) {
    console.error("❌ entity.json pricesRss must cite /feeds/prices.rss");
    process.exit(1);
  }
  const tsvPath = path.join(outDir, "feeds/merchant-priced-panels.tsv");
  if (!fs.existsSync(tsvPath)) {
    console.error("❌ Missing in out/: feeds/merchant-priced-panels.tsv");
    process.exit(1);
  }
  const tsv = fs.readFileSync(tsvPath, "utf8");
  const tsvHeader = tsv.trim().split("\n")[0] || "";
  for (const col of [
    "title",
    "brand",
    "image_link",
    "condition",
    "shipping_included",
    "mpn",
    "product_ld_id",
    "catalog_id",
    "offer_id",
    "catalog_offer_id",
    "brand_url",
    "organization_id",
    "entity_url",
    "local_business_id",
    "brand_makes_offer_id",
    "brand_has_offer_catalog",
  ]) {
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
  const tsvCols = tsvHeader.split("\t");
  const mpnIdx = tsvCols.indexOf("mpn");
  const idIdx = tsvCols.indexOf("id");
  const brandUrlIdx = tsvCols.indexOf("brand_url");
  const orgIdx = tsvCols.indexOf("organization_id");
  const entityIdx = tsvCols.indexOf("entity_url");
  const lbIdx = tsvCols.indexOf("local_business_id");
  const brandOfferIdx = tsvCols.indexOf("brand_makes_offer_id");
  const brandCatalogIdx = tsvCols.indexOf("brand_has_offer_catalog");
  for (const row of tsvRows) {
    const cells = row.split("\t");
    if (cells[mpnIdx] !== cells[idIdx]) {
      console.error(`❌ merchant TSV mpn must equal id (sku) for ${cells[idIdx]}`);
      process.exit(1);
    }
    if (cells[brandUrlIdx] !== "https://arledscreen.com/brand.json") {
      console.error(`❌ merchant TSV brand_url must be /brand.json for ${cells[idIdx]}`);
      process.exit(1);
    }
    if (cells[orgIdx] !== "https://arledscreen.com/#organization") {
      console.error(`❌ merchant TSV organization_id must be #organization for ${cells[idIdx]}`);
      process.exit(1);
    }
    if (cells[entityIdx] !== "https://arledscreen.com/entity.json") {
      console.error(`❌ merchant TSV entity_url must be /entity.json for ${cells[idIdx]}`);
      process.exit(1);
    }
    if (cells[lbIdx] !== "https://arledscreen.com/#localbusiness") {
      console.error(`❌ merchant TSV local_business_id must be #localbusiness for ${cells[idIdx]}`);
      process.exit(1);
    }
    if (cells[brandOfferIdx] !== "https://arledscreen.com/#priced-panels-aggregate") {
      console.error(`❌ merchant TSV brand_makes_offer_id must be #priced-panels-aggregate for ${cells[idIdx]}`);
      process.exit(1);
    }
    if (cells[brandCatalogIdx] !== "https://arledscreen.com/catalog.json") {
      console.error(`❌ merchant TSV brand_has_offer_catalog must be catalog.json for ${cells[idIdx]}`);
      process.exit(1);
    }
  }
  for (const panel of ai.pricedPanels) {
    if (!tsv.includes(panel.url)) {
      console.error(`❌ merchant TSV missing ai-shopping URL for ${panel.sku}: ${panel.url}`);
      process.exit(1);
    }
    const brandName =
      typeof panel.brand === "string" ? panel.brand : panel.brand?.name;
    if (!panel.image || !brandName || !tsv.includes(panel.image)) {
      console.error(`❌ pricedPanels/TSV image+brand required for ${panel.sku}`);
      process.exit(1);
    }
    if (
      panel.brand?.["@type"] !== "Brand" ||
      panel.brand?.["@id"] !== "https://arledscreen.com/#brand-nxtionstar" ||
      panel.brandId !== "https://arledscreen.com/#brand-nxtionstar"
    ) {
      console.error(`❌ pricedPanels ${panel.sku} Brand @id + brandId must be #brand-nxtionstar (catalog parity)`);
      process.exit(1);
    }
    if (panel.mpn !== panel.sku) {
      console.error(`❌ pricedPanels ${panel.sku} mpn must equal sku (no invented GTIN)`);
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
    if (
      panel.offers?.priceSpecification?.["@type"] !== "UnitPriceSpecification" ||
      panel.offers?.priceSpecification?.valueAddedTaxIncluded !== false ||
      String(panel.offers?.priceSpecification?.price) !== String(panel.price)
    ) {
      console.error(`❌ pricedPanels ${panel.sku} Offer.priceSpecification must match catalog (VAT excluded)`);
      process.exit(1);
    }
    if (!String(panel.offers?.description || "").includes("Ücretsiz kargo yok")) {
      console.error(`❌ pricedPanels ${panel.sku} Offer.description must deny free shipping (HTML panelOffer parity)`);
      process.exit(1);
    }
    const productSameAs = Array.isArray(panel.sameAs) ? panel.sameAs : [];
    const offerSameAs = Array.isArray(panel.offers?.sameAs) ? panel.offers.sameAs : [];
    if (!productSameAs.some((u) => String(u).includes(`/catalog.json#${panel.sku}`))) {
      console.error(`❌ pricedPanels ${panel.sku} sameAs must join catalog.json#${panel.sku}`);
      process.exit(1);
    }
    if (!offerSameAs.some((u) => String(u).includes(`/catalog.json#offer-${panel.sku}`))) {
      console.error(`❌ pricedPanels ${panel.sku} Offer.sameAs must join catalog offer @id`);
      process.exit(1);
    }
    if (!offerSameAs.some((u) => String(u) === `${panel.url}#offer`)) {
      console.error(`❌ pricedPanels ${panel.sku} Offer.sameAs must join PDP #offer`);
      process.exit(1);
    }
    if (panel.mainEntityOfPage !== panel.url) {
      console.error(`❌ pricedPanels ${panel.sku} mainEntityOfPage must be PDP url`);
      process.exit(1);
    }
    if (panel.offers?.sku !== panel.sku || panel.offers?.mpn !== panel.sku) {
      console.error(`❌ pricedPanels ${panel.sku} Offer must set sku/mpn`);
      process.exit(1);
    }
    if (panel.offers?.itemOffered?.["@id"] !== `${panel.url}#product`) {
      console.error(`❌ pricedPanels ${panel.sku} Offer.itemOffered must join PDP #product`);
      process.exit(1);
    }
    if (!String(panel.offers?.itemOffered?.brand?.["@id"] || "").includes("#brand-nxtionstar")) {
      console.error(`❌ pricedPanels ${panel.sku} Offer.itemOffered.brand must be #brand-nxtionstar`);
      process.exit(1);
    }
    if (panel.offers?.availableAtOrFrom?.["@id"] !== "https://arledscreen.com/#localbusiness") {
      console.error(`❌ pricedPanels ${panel.sku} Offer.availableAtOrFrom must be #localbusiness`);
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
    // TR PDP Product JSON-LD must use catalog sku/mpn (= panel id), not invent GTIN.
    const trHtml = fs.readFileSync(fp, "utf8");
    const ldBlocks = [...trHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    let pdpOk = false;
    for (const raw of ldBlocks) {
      let doc;
      try {
        doc = JSON.parse(raw);
      } catch {
        continue;
      }
      const nodes = Array.isArray(doc) ? doc : doc?.["@graph"] ? doc["@graph"] : [doc];
      for (const node of nodes) {
        const t = node?.["@type"];
        const isProduct = t === "Product" || (Array.isArray(t) && t.includes("Product"));
        if (!isProduct) continue;
        if (node.sku === panel.sku && node.mpn === panel.sku) {
          pdpOk = true;
          break;
        }
      }
      if (pdpOk) break;
    }
    if (!pdpOk) {
      console.error(`❌ TR PDP Product JSON-LD must set sku=mpn=${panel.sku}: ${rel}`);
      process.exit(1);
    }
    // EN locale-flip of Offer URLs must be real HTML bridges (CF 404.html beats _redirects).
    const enPath = u.pathname.replace(/^\/tr\//, "/en/");
    let enRel = enPath.replace(/^\//, "");
    if (enRel.endsWith("/")) enRel += "index.html";
    const enFp = path.join(outDir, enRel);
    if (!fs.existsSync(enFp)) {
      console.error(`❌ pricedPanels EN locale-flip bridge missing in out/: ${panel.sku} → ${enRel}`);
      process.exit(1);
    }
    const enHtml = fs.readFileSync(enFp, "utf8");
    if (!/noindex/i.test(enHtml) || !/Canonical hub/i.test(enHtml)) {
      console.error(`❌ pricedPanels EN bridge must be noindex InventBridge: ${panel.sku} → ${enRel}`);
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
    "tr/gizlilik/index.html",
    "en/gizlilik/index.html",
    "en/privacy/index.html",
    "en/calculator/index.html",
    "en/faq/index.html",
    "en/gallery/index.html",
    "en/projects/index.html",
    "en/regions/index.html",
    "en/services/index.html",
    "en/brand/index.html",
    "en/teklif/index.html",
    "tr/teklif/index.html",
    "tr/teklif-al/index.html",
    "tr/teklif-iste/index.html",
    "tr/fiyat-teklifi/index.html",
    "tr/request-quote/index.html",
    "tr/contact/index.html",
    "tr/fiyat/index.html",
    "tr/fiyatlar/index.html",
    "tr/prices/index.html",
    "tr/pricing/index.html",
    "tr/price/index.html",
    "tr/cost/index.html",
    "tr/katalog/index.html",
    "tr/catalog/index.html",
    "tr/shop/index.html",
    "tr/magaza/index.html",
    "tr/calculator/index.html",
    "tr/faq/index.html",
    "tr/gallery/index.html",
    "tr/projects/index.html",
    "tr/regions/index.html",
    "tr/services/index.html",
    "tr/brand/index.html",
    "en/urunler/index.html",
    "en/catalog/index.html",
    "en/shop/index.html",
    "en/modules/index.html",
    "en/indoor-led/index.html",
    "en/outdoor-led/index.html",
    "en/gob/index.html",
    "en/fine-pitch/index.html",
    "en/request-quote/index.html",
    "en/price-list/index.html",
    "en/products/gob/index.html",
    "en/products/indoor/index.html",
    "en/products/outdoor/index.html",
    "en/kvkk/index.html",
    "en/bolgeler/istanbul/index.html",
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
  // Org JSON-LD on home must expose makesOffer AggregateOffer (entity-first price authority).
  {
    const homeHtml = fs.readFileSync(path.join(outDir, "tr/index.html"), "utf8");
    let makesOfferOk = false;
    for (const m of homeHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        const nodes = Array.isArray(d?.["@graph"]) ? d["@graph"] : [d];
        for (const node of nodes) {
          if (node?.["@type"] !== "Organization") continue;
          const offer = node.makesOffer;
          if (
            offer?.["@type"] === "AggregateOffer" &&
            offer.offerCount === 12 &&
            String(offer.url || "").includes("/ai-shopping.json") &&
            String(offer.lowPrice) === "26.98" &&
            String(offer.highPrice) === "95.88" &&
            Array.isArray(offer.offers) &&
            offer.offers.length === 12 &&
            offer?.availableAtOrFrom?.["@id"] === "https://arledscreen.com/#localbusiness" &&
            node?.location?.["@id"] === "https://arledscreen.com/#localbusiness" &&
            node?.geo?.["@type"] === "GeoCoordinates" &&
            node?.hasOfferCatalog?.["@type"] === "OfferCatalog" &&
            String(node.hasOfferCatalog["@id"] || "").includes("/catalog.json")
          ) {
            makesOfferOk = true;
            break;
          }
        }
        if (makesOfferOk) break;
      } catch {
        /* ignore */
      }
    }
    if (!makesOfferOk) {
      console.error("❌ tr/index.html Organization must location #localbusiness + makesOffer×12 + hasOfferCatalog");
      process.exit(1);
    }
    let localOk = false;
    for (const m of homeHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        const nodes = Array.isArray(d?.["@graph"]) ? d["@graph"] : [d];
        for (const node of nodes) {
          if (node?.["@type"] !== "LocalBusiness") continue;
          if (
            node?.makesOffer?.["@type"] === "AggregateOffer" &&
            Array.isArray(node.makesOffer.offers) &&
            node.makesOffer.offers.length === 12 &&
            node?.hasOfferCatalog?.["@type"] === "OfferCatalog"
          ) {
            localOk = true;
            break;
          }
        }
        if (localOk) break;
      } catch {
        /* ignore */
      }
    }
    if (!localOk) {
      console.error("❌ tr/index.html LocalBusiness must makesOffer×12 + hasOfferCatalog");
      process.exit(1);
    }
    let websiteOk = false;
    for (const m of homeHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        const nodes = Array.isArray(d?.["@graph"]) ? d["@graph"] : [d];
        for (const node of nodes) {
          if (node?.["@type"] !== "WebSite") continue;
          const actions = Array.isArray(node.potentialAction) ? node.potentialAction : [];
          const urls = actions
            .map((a) => String(a?.target?.urlTemplate || ""))
            .join(" ");
          if (
            node?.about?.["@id"] === "https://arledscreen.com/#organization" &&
            urls.includes("/tr/quote/") &&
            urls.includes("/en/quote/")
          ) {
            websiteOk = true;
            break;
          }
        }
        if (websiteOk) break;
      } catch {
        /* ignore */
      }
    }
    if (!websiteOk) {
      console.error("❌ tr/index.html WebSite must about #organization + potentialAction quote TR/EN");
      process.exit(1);
    }
    console.log("✅ Organization + LocalBusiness makesOffer stubs + hasOfferCatalog on home + entity.json");
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
    "tr/gizlilik/index.html",
    "en/gizlilik/index.html",
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
  {
    const nxHtml = fs.readFileSync(path.join(outDir, "tr/nxtionstar/index.html"), "utf8");
    let brandOfferOk = false;
    for (const m of nxHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        const nodes = Array.isArray(d?.["@graph"]) ? d["@graph"] : [d];
        for (const node of nodes) {
          if (node?.["@type"] !== "Brand") continue;
          if (
            String(node?.makesOffer?.["@id"] || "").includes("#priced-panels-aggregate") &&
            String(node?.hasOfferCatalog?.["@id"] || "").includes("/catalog.json")
          ) {
            brandOfferOk = true;
            break;
          }
        }
        if (brandOfferOk) break;
      } catch {
        /* ignore */
      }
    }
    if (!brandOfferOk) {
      console.error("❌ tr/nxtionstar Brand JSON-LD must makesOffer → #priced-panels-aggregate + hasOfferCatalog → catalog.json");
      process.exit(1);
    }
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
    "/tr/gizlilik/",
    "/en/gizlilik/",
    "/en/privacy/",
    "/en/calculator/",
    "/en/faq/",
    "/en/gallery/",
    "/en/projects/",
    "/en/regions/",
    "/en/services/",
    "/en/brand/",
    "/en/teklif/",
    "/tr/teklif/",
    "/tr/teklif-al/",
    "/tr/fiyat-teklifi/",
    "/tr/quote/",
    "/tr/fiyat/",
    "/tr/prices/",
    "/tr/catalog/",
    "/tr/calculator/",
    "/tr/faq/",
    "/tr/brand/",
    "/panels.json",
    "/merchant.json",
    "/mpn.json",
    "/en/bolgeler/istanbul/",
    "/en/about/aras-bozkurt/",
    "/en/contact/",
    "/en/contact-us/",
    "/en/iletisim/",
    "/en/products/esnek-led-ekran/",
    "/en/products/ince-pitch-led-ekran/",
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
    "/point-c.txt",
    "/point-c-en.txt",
    "/.well-known/point-c.txt",
    "/.well-known/panels.json",
    "/.well-known/mpn.json",
    "/.well-known/merchant.json",
    "/.well-known/modules.json",
    "/.well-known/sku.json",
    "/.well-known/price.json",
    "/.well-known/pricing.json",
    "/modules.json",
    "/sku.json",
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
    "/en/gizlilik/",
    "/en/about/aras-bozkurt/",
    "/en/calculator/",
    "/en/faq/",
  ]) {
    if (!llmsBody.includes(must)) {
      console.error(`❌ llms.txt must cite EN hub ${must}`);
      process.exit(1);
    }
  }

  // Fine-pitch hub must surface the 3 published GOB Offers (alsoIn + price groups).
  const finePitchHtml = path.join(outDir, "tr/products/ince-pitch-led-ekran/index.html");
  if (!fs.existsSync(finePitchHtml)) {
    console.error("❌ missing out/tr/products/ince-pitch-led-ekran/index.html");
    process.exit(1);
  }
  const finePitchBody = fs.readFileSync(finePitchHtml, "utf8");
  for (const sku of ["p1-25-ic-gob", "p1-53-ic-gob", "p1-86-ic-gob"]) {
    if (!finePitchBody.includes(`"sku":"${sku}"`) && !finePitchBody.includes(`"sku": "${sku}"`)) {
      console.error(`❌ fine-pitch hub must emit Product sku ${sku} (GOB alsoIn + price groups)`);
      process.exit(1);
    }
  }
  console.log("✅ fine-pitch hub emits 3 GOB Product/Offer SKUs");

  // PDP Product must sameAs catalog#sku; Offer sameAs catalog + ai-shopping offer @ids.
  {
    const pdpRel = "tr/products/gob-led-ekran/p1-25-gob/index.html";
    const pdpHtml = fs.readFileSync(path.join(outDir, pdpRel), "utf8");
    let pdpOk = false;
    for (const m of pdpHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        if (d?.["@type"] !== "Product") continue;
        const sameAs = Array.isArray(d.sameAs) ? d.sameAs : [];
        const offer = d.offers || {};
        const offerSameAs = Array.isArray(offer.sameAs) ? offer.sameAs : [];
        if (
          sameAs.some((u) => String(u).includes("/catalog.json#p1-25-ic-gob")) &&
          offerSameAs.some((u) => String(u).includes("/catalog.json#offer-p1-25-ic-gob")) &&
          offerSameAs.some((u) => String(u).includes("/ai-shopping.json#offer-p1-25-ic-gob")) &&
          String(offer["@id"] || "").endsWith("#offer") &&
          offer.sku === "p1-25-ic-gob" &&
          offer.mpn === "p1-25-ic-gob" &&
          String(d.mainEntityOfPage || "").includes("/p1-25-gob/") &&
          String(offer.itemOffered?.["@id"] || "").includes("/p1-25-gob/") &&
          String(offer.itemOffered?.["@id"] || "").endsWith("#product") &&
          offer?.availableAtOrFrom?.["@id"] === "https://arledscreen.com/#localbusiness"
        ) {
          pdpOk = true;
          break;
        }
      } catch {
        /* ignore */
      }
    }
    if (!pdpOk) {
      console.error("❌ PDP Product/Offer must sameAs catalog + ai-shopping + Offer sku + mainEntityOfPage + #localbusiness");
      process.exit(1);
    }
    let webpageOk = false;
    for (const m of pdpHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        if (d?.["@type"] !== "WebPage") continue;
        if (
          String(d.mainEntity?.["@id"] || "").includes("/p1-25-gob/") &&
          String(d.mainEntity?.["@id"] || "").endsWith("#product")
        ) {
          webpageOk = true;
          break;
        }
      } catch {
        /* ignore */
      }
    }
    if (!webpageOk) {
      console.error("❌ PDP WebPage.mainEntity must join #product");
      process.exit(1);
    }
    if (
      !pdpHtml.includes('product:price:amount') ||
      !pdpHtml.includes('product:price:currency') ||
      !pdpHtml.includes("content=\"USD\"") ||
      !pdpHtml.includes("product:brand")
    ) {
      console.error("❌ priced PDP must emit Open Graph product:price:* + product:brand meta");
      process.exit(1);
    }
    console.log("✅ PDP Product/Offer sameAs joins catalog + ai-shopping; WebPage→Product");
  }

  // Price hub Speakable WebPage must forward-join Service AggregateOffer.
  {
    const hubRel = "tr/led-ekran-fiyatlari/index.html";
    const hubHtml = fs.readFileSync(path.join(outDir, hubRel), "utf8");
    let hubPageOk = false;
    for (const m of hubHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        if (d?.["@type"] !== "WebPage") continue;
        if (
          String(d.mainEntity?.["@id"] || "").includes("/led-ekran-fiyatlari/") &&
          String(d.mainEntity?.["@id"] || "").endsWith("#service")
        ) {
          hubPageOk = true;
          break;
        }
      } catch {
        /* ignore */
      }
    }
    if (!hubPageOk) {
      console.error("❌ price hub WebPage.mainEntity must join #service");
      process.exit(1);
    }
  }

  // E-E-A-T + services Speakable forward-join primary entity.
  for (const [rel, checkMid] of [
    ["tr/about/index.html", (mid) => mid === "https://arledscreen.com/#organization"],
    ["en/about/index.html", (mid) => mid === "https://arledscreen.com/#organization"],
    ["tr/about/aras-bozkurt/index.html", (mid) => mid.includes("/tr/about/aras-bozkurt/") && mid.endsWith("#person")],
    ["en/about/aras-bozkurt/index.html", (mid) => mid.includes("/en/about/aras-bozkurt/") && mid.endsWith("#person")],
    ["tr/hizmetler/index.html", (mid) => mid.includes("/tr/hizmetler/") && mid.endsWith("#service")],
    ["tr/yapay-zeka/index.html", (mid) => mid.includes("/tr/yapay-zeka/") && mid.endsWith("#service")],
    ["en/yapay-zeka/index.html", (mid) => mid.includes("/en/yapay-zeka/") && mid.endsWith("#service")],
    ["tr/sss/index.html", (mid) => mid.includes("/tr/sss/") && mid.endsWith("#faqpage")],
    ["en/sss/index.html", (mid) => mid.includes("/en/sss/") && mid.endsWith("#faqpage")],
    ["tr/blog/index.html", (mid) => mid.includes("/tr/blog/") && mid.endsWith("#blog")],
    ["tr/projelerimiz/index.html", (mid) => mid.includes("/tr/projelerimiz/") && mid.endsWith("#projects")],
    ["tr/galeri/index.html", (mid) => mid.includes("/tr/galeri/") && mid.endsWith("#gallery")],
    ["tr/products/index.html", (mid) => mid.includes("/tr/products/") && mid.endsWith("#service")],
    ["en/products/index.html", (mid) => mid.includes("/en/products/") && mid.endsWith("#service")],
    ["tr/bolgeler/index.html", (mid) => mid.includes("/tr/bolgeler/") && mid.endsWith("#service")],
    ["tr/nxtionstar/index.html", (mid) => mid === "https://arledscreen.com/#brand-nxtionstar"],
    ["en/nxtionstar/index.html", (mid) => mid === "https://arledscreen.com/#brand-nxtionstar"],
    ["tr/index.html", (mid) => mid.includes("/tr/") && mid.endsWith("#service")],
    ["en/index.html", (mid) => mid.includes("/en/") && mid.endsWith("#service")],
    ["tr/gizlilik/index.html", (mid) => mid.includes("/tr/gizlilik/") && mid.endsWith("#faqpage")],
    ["en/gizlilik/index.html", (mid) => mid.includes("/en/gizlilik/") && mid.endsWith("#faqpage")],
    ["tr/rehber/index.html", (mid) => mid.includes("/tr/rehber/") && mid.endsWith("#rehber")],
    ["en/rehber/index.html", (mid) => mid.includes("/en/rehber/") && mid.endsWith("#rehber")],
  ]) {
    const html = fs.readFileSync(path.join(outDir, rel), "utf8");
    let pageOk = false;
    for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        if (d?.["@type"] !== "WebPage") continue;
        if (checkMid(String(d.mainEntity?.["@id"] || ""))) {
          pageOk = true;
          break;
        }
      } catch {
        /* ignore */
      }
    }
    if (!pageOk) {
      console.error(`❌ ${rel} WebPage.mainEntity must join primary entity`);
      process.exit(1);
    }
  }

  // EN product group + commercial intent Speakable → #service; calculator HowTo → #localbusiness.
  for (const [rel, needle] of [
    ["en/products/gob-led-ekran/index.html", "/en/products/gob-led-ekran/"],
    ["tr/led-ekran/index.html", "/tr/led-ekran/"],
    ["en/led-ekran/index.html", "/en/led-ekran/"],
    ["tr/bolgeler/istanbul/index.html", "/tr/bolgeler/istanbul/"],
  ]) {
    const html = fs.readFileSync(path.join(outDir, rel), "utf8");
    let pageOk = false;
    for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        if (d?.["@type"] !== "WebPage") continue;
        if (String(d.mainEntity?.["@id"] || "").includes(needle) && String(d.mainEntity?.["@id"] || "").endsWith("#service")) {
          pageOk = true;
          break;
        }
      } catch {
        /* ignore */
      }
    }
    if (!pageOk) {
      console.error(`❌ ${rel} WebPage.mainEntity must join #service`);
      process.exit(1);
    }
  }
  {
    const howHtml = fs.readFileSync(path.join(outDir, "tr/hesaplayici/index.html"), "utf8");
    let howOk = false;
    for (const m of howHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        if (d?.["@type"] !== "HowTo") continue;
        if (d?.provider?.["@id"] === "https://arledscreen.com/#localbusiness") {
          howOk = true;
          break;
        }
      } catch {
        /* ignore */
      }
    }
    if (!howOk) {
      console.error("❌ hesaplayici HowTo.provider must be #localbusiness");
      process.exit(1);
    }
    const hizmetHtml = fs.readFileSync(path.join(outDir, "tr/hizmetler/index.html"), "utf8");
    let hizmetHowOk = false;
    for (const m of hizmetHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        if (d?.["@type"] !== "HowTo") continue;
        if (d?.provider?.["@id"] === "https://arledscreen.com/#localbusiness") {
          hizmetHowOk = true;
          break;
        }
      } catch {
        /* ignore */
      }
    }
    if (!hizmetHowOk) {
      console.error("❌ hizmetler HowTo.provider must be #localbusiness");
      process.exit(1);
    }
  }

  // AggregateOffer hubs (group + price + calculator; TR + EN) must sameAs catalog + ai-shopping Offers.
  for (const [rel, sku] of [
    ["tr/products/ince-pitch-led-ekran/index.html", "p1-25-ic-gob"],
    ["tr/led-ekran-fiyatlari/index.html", "p1-25-ic-gob"],
    ["tr/hesaplayici/index.html", "p2-5-ic"],
    ["en/led-ekran-fiyatlari/index.html", "p1-25-ic-gob"],
    ["en/hesaplayici/index.html", "p2-5-ic"],
    ["en/quote/index.html", "p1-25-ic-gob"],
  ]) {
    const html = fs.readFileSync(path.join(outDir, rel), "utf8");
    let hubOk = false;
    for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        const nodes = Array.isArray(d?.["@graph"]) ? d["@graph"] : [d];
        for (const node of nodes) {
          if (node?.["@type"] !== "Product" || node?.sku !== sku) continue;
          const sameAs = Array.isArray(node.sameAs) ? node.sameAs : [];
          const offer = node.offers || {};
          const offerSameAs = Array.isArray(offer.sameAs) ? offer.sameAs : [];
          if (
            sameAs.some((u) => String(u).includes(`/catalog.json#${sku}`)) &&
            offerSameAs.some((u) => String(u).includes(`/catalog.json#offer-${sku}`)) &&
            offerSameAs.some((u) => String(u).includes(`/ai-shopping.json#offer-${sku}`)) &&
            String(offer["@id"] || "").includes("#offer") &&
            offer.sku === sku &&
            offer.mpn === sku &&
            Boolean(node.mainEntityOfPage)
          ) {
            hubOk = true;
            break;
          }
        }
        if (hubOk) break;
      } catch {
        /* ignore */
      }
    }
    if (!hubOk) {
      console.error(`❌ ${rel} Product ${sku} must sameAs catalog + Offer sku + mainEntityOfPage`);
      process.exit(1);
    }
    // Service AggregateOffer on hubs must join Org #priced-panels-aggregate.
    let serviceOk = false;
    const hubHtml = fs.readFileSync(path.join(outDir, rel), "utf8");
    for (const m of hubHtml.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
        const nodes = Array.isArray(d?.["@graph"]) ? d["@graph"] : [d];
        for (const node of nodes) {
          if (node?.["@type"] !== "Service") continue;
          const agg = node.offers || {};
          const aggSame = Array.isArray(agg.sameAs) ? agg.sameAs : [];
          if (
            agg?.["@type"] === "AggregateOffer" &&
            String(agg["@id"] || "").includes("#priced-panels-aggregate") &&
            String(agg.url || "").includes("/ai-shopping.json") &&
            aggSame.some((u) => String(u).includes("#priced-panels-aggregate")) &&
            agg.priceSpecification?.valueAddedTaxIncluded === false &&
            agg?.availableAtOrFrom?.["@id"] === "https://arledscreen.com/#localbusiness" &&
            node?.provider?.["@id"] === "https://arledscreen.com/#localbusiness" &&
            Array.isArray(agg.offers) &&
            agg.offers.length >= 1 &&
            agg.offers.every(
              (o) =>
                o?.["@type"] === "Offer" &&
                String(o["@id"] || "").includes("/ai-shopping.json#offer-") &&
                String(o?.description || "").includes("Ücretsiz kargo yok") &&
                String(o?.itemOffered?.brand?.["@id"] || "").includes("#brand-nxtionstar"),
            )
          ) {
            serviceOk = true;
            break;
          }
        }
        if (serviceOk) break;
      } catch {
        /* ignore */
      }
    }
    if (!serviceOk) {
      console.error(`❌ ${rel} Service AggregateOffer must join #priced-panels-aggregate + ai-shopping`);
      process.exit(1);
    }
  }
  console.log("✅ AggregateOffer hubs (TR+EN) Product/Offer + Service→Org joins");

  // HTML Dataset on quote-only + priced hubs must hasPart 12 Product stubs (mpn=sku).
  for (const rel of [
    "tr/products/esnek-led-ekran/index.html",
    "tr/products/ince-pitch-led-ekran/index.html",
    "tr/yapay-zeka/index.html",
  ]) {
    const html = fs.readFileSync(path.join(outDir, rel), "utf8");
    let found = false;
    for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        const d = JSON.parse(m[1]);
          if (d?.["@type"] === "Dataset" && Array.isArray(d.hasPart) && d.hasPart.length === 12) {
          const dsSameAs = Array.isArray(d.sameAs) ? d.sameAs : [];
          if (
            dsSameAs.some((u) => String(u).includes("/ai-shopping.json")) &&
            dsSameAs.some((u) => String(u).includes("/catalog.json")) &&
            d.hasPart.every(
              (p) =>
                p?.sku &&
                p.mpn === p.sku &&
                String(p["@id"] || "").includes("#product") &&
                Array.isArray(p.sameAs) &&
                p.sameAs.some((u) => String(u).includes(`/catalog.json#${p.sku}`)) &&
                p.mainEntityOfPage === p.url &&
                String(p?.offers?.["@id"] || "").includes(`/ai-shopping.json#offer-${p.sku}`) &&
                Array.isArray(p?.offers?.sameAs) &&
                p.offers.sameAs.some((u) => String(u).includes("#offer")) &&
                String(p?.offers?.itemOffered?.["@id"] || "").endsWith("#product") &&
                String(p?.brand?.["@id"] || "").includes("#brand-nxtionstar") &&
                Boolean(p?.offers?.price) &&
                String(p?.offers?.description || "").includes("Ücretsiz kargo yok") &&
                p?.offers?.availableAtOrFrom?.["@id"] === "https://arledscreen.com/#localbusiness",
            )
          ) {
            const dist = JSON.stringify(d.distribution || []);
            if (!dist.includes("/merchant.json") || !dist.includes("/offer.json") || !dist.includes("/panels.json")) {
              console.error(`❌ ${rel} Dataset.distribution must include panels/merchant/offer DataDownloads`);
              process.exit(1);
            }
            found = true;
            break;
          }
        }
      } catch {
        /* ignore */
      }
    }
    if (!found) {
      console.error(`❌ ${rel} Dataset must hasPart 12 Products (mpn=sku, @id …#product)`);
      process.exit(1);
    }
  }
  console.log("✅ HTML Dataset hasPart×12 on quote-only + fine-pitch + yapay-zeka");

  const homeHtml = fs.readFileSync(path.join(outDir, "tr/index.html"), "utf8");
  for (const needle of ["panels.json", "mpn.json", "entity-profiles.json"]) {
    if (!homeHtml.includes(needle)) {
      console.error(`❌ tr/index.html must <link> alternate ${needle}`);
      process.exit(1);
    }
  }
  console.log("✅ HTML discovery links include panels/mpn/entity-profiles");

  console.log("✅ out/ AI feeds present (catalog, ai-shopping×12, merchant TSV, entity, profiles, llms, ai.txt); product paths exist");
  console.log(`✅ HTML Offer hubs: ${offerHubs.length} pages ≥12 Offers`);
  console.log(`✅ HTML/schema arleds.com disambiguation: ${orgSchemaPages.length} pages + about/founder body`);
  console.log(`✅ FAQPage arleds Q&A: ${faqArledsPages.length} pages + IndexNow about/founder/sss/ai.txt`);
}

// Live robots.txt is served by Pages Function — keep Allow list in sync with robots.ts.
const robotsFn = path.join(repoRoot, "functions", "robots.txt.js");
const robotsSrc = path.join(repoRoot, "src", "app", "robots.ts");
const robotsFnBody = fs.existsSync(robotsFn) ? fs.readFileSync(robotsFn, "utf8") : "";
const robotsTsBody = fs.existsSync(robotsSrc) ? fs.readFileSync(robotsSrc, "utf8") : "";
for (const must of [
  "/geo-baseline.json",
  "/ai.txt",
  "/panels.json",
  "/mpn.json",
  "/merchant.json",
  "/.well-known/mpn.json",
  "/api/panels",
  "/api/merchant",
  "/api/panels.json",
  "/v1/merchant",
  "/v1/mpn",
  "/panels",
  "/mpn",
  "/merchant",
  "/product.json",
  "/offer",
  "/offer.json",
  "/organization",
  "/brand.json",
  "/entity-profiles.json",
  "/feeds/prices.rss",
  "/cite.json",
  "/cite",
  "/faq.json",
  "/faqs.json",
  "/feed.json",
  "/tr/llms.txt",
  "/tr/ai.txt",
  "/tr/entity-profiles.json",
  "/point-c.txt",
  "/point-c-en.txt",
  "/.well-known/point-c.txt",
]) {
  if (!robotsFnBody.includes(must)) {
    console.error(`❌ functions/robots.txt.js must Allow ${must}`);
    process.exit(1);
  }
  if (!robotsTsBody.includes(must)) {
    console.error(`❌ src/app/robots.ts must Allow ${must}`);
    process.exit(1);
  }
}
if (!robotsFnBody.includes("Google-CloudVertexBot") || !robotsTsBody.includes("Google-CloudVertexBot")) {
  console.error("❌ robots must list Google-CloudVertexBot for Gemini/Vertex crawl");
  process.exit(1);
}
console.log("✅ functions/robots.txt.js + robots.ts allow geo-baseline/ai.txt + TR llms + panels/mpn/merchant invent aliases");

{
  const sitemapPath = path.join(outDir, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    console.error("❌ Missing in out/: sitemap.xml");
    process.exit(1);
  }
  const sitemapLive = fs.readFileSync(sitemapPath, "utf8");
  for (const needle of [
    "/.well-known/panels.json",
    "/.well-known/mpn.json",
    "/.well-known/merchant.json",
    "/.well-known/modules.json",
    "/.well-known/sku.json",
    "/.well-known/price.json",
    "/.well-known/pricing.json",
    "/modules.json",
    "/sku.json",
    "/panels.json",
    "/point-c.txt",
    "/brand.json",
    "/feeds/prices.rss",
  ]) {
    if (!sitemapLive.includes(needle)) {
      console.error(`❌ out/sitemap.xml must list invent alias ${needle}`);
      process.exit(1);
    }
  }
  console.log("✅ sitemap.xml lists well-known panels/mpn/merchant invent aliases");
}

validateAIFeeds();
