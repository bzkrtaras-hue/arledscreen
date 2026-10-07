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
  if (!Array.isArray(ai.hasPart) || ai.hasPart.length !== 12) {
    console.error("❌ out/ai-shopping.json Dataset must hasPart 12 Products");
    process.exit(1);
  }
  if (!ai.hasPart.every((p) => p?.sku && p.mpn === p.sku)) {
    console.error("❌ out/ai-shopping.json Dataset hasPart stubs must set mpn=sku");
    process.exit(1);
  }
  if (!ai.pricedPanels.every((p) => p?.isPartOf?.["@id"]?.includes("/ai-shopping.json"))) {
    console.error("❌ every pricedPanels Product must isPartOf ai-shopping.json Dataset");
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
  if (!String(ai.agentGuidelines?.en?.priceSource || "").includes("/prices.json")) {
    console.error("❌ agentGuidelines.en.priceSource must cite inventable /prices.json");
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
  if (!tsvHead.includes("title_en")) {
    console.error("❌ merchant TSV must include title_en column for EN AI agents");
    process.exit(1);
  }
  if (!tsvHead.split("\t").includes("mpn")) {
    console.error("❌ merchant TSV must include mpn column (honest MPN=sku; no invented GTIN)");
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
  for (const key of ["pricesJson", "organization", "agentsJson", "agentsMd", "securityTxt", "humansTxt"]) {
    if (!String(baseline?.discovery?.[key] || "").includes("arledscreen.com")) {
      console.error(`❌ geo-baseline.json discovery.${key} required for invent/agent surfaces`);
      process.exit(1);
    }
  }
  if (!ard?.agentic?.resources?.pricesJson?.url?.includes("/prices.json") || !ard?.agentic?.resources?.agentsMd?.url?.includes("AGENTS.md")) {
    console.error("❌ ard.json must expose resources.pricesJson + agentsMd");
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
    !aiTxtLive.includes("NationStar")
  ) {
    console.error("❌ out/ai.txt must point to feeds and warn on arleds.com + NationStar");
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
  if (!securityLive.includes("arled@arledscreen.com") || !securityLive.includes("Expires:")) {
    console.error("❌ out/.well-known/security.txt must include Contact + Expires");
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
  for (const rel of [".well-known/agents.json", "agents.json", "humans.txt", ".well-known/humans.txt"]) {
    if (!fs.existsSync(path.join(outDir, rel))) {
      console.error(`❌ Missing agent discovery surface in out/: ${rel}`);
      process.exit(1);
    }
  }
  const agents = JSON.parse(fs.readFileSync(path.join(outDir, ".well-known/agents.json"), "utf8"));
  if (!Array.isArray(agents.itemListElement) || agents.itemListElement.length < 10) {
    console.error("❌ agents.json must list ≥10 discovery items (incl. entity-profiles)");
    process.exit(1);
  }
  if (!agents.itemListElement.some((it) => String(it?.url || "").includes("entity-profiles.json"))) {
    console.error("❌ agents.json must list entity-profiles.json Point C packs");
    process.exit(1);
  }
  if (!String(agents.description || "").includes("ai-shopping.json")) {
    console.error("❌ agents.json must point agents at ai-shopping.json price source");
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
    "brand.json",
    "api/entity",
    ".well-known/entity.json",
  ]) {
    if (!fs.readFileSync(path.join(outDir, rel)).equals(canonEntity)) {
      console.error(`❌ out/${rel} must match entity.json`);
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
  if (!fs.existsSync(path.join(outDir, "AGENTS.md")) || !fs.readFileSync(path.join(outDir, "AGENTS.md"), "utf8").includes("ai-shopping.json")) {
    console.error("❌ out/AGENTS.md must cite ai-shopping.json");
    process.exit(1);
  }
  if (!llmsLive.includes("/prices.json") || !llmsLive.includes("/.well-known/ai.txt") || !llmsLive.includes("organization.json") || !llmsLive.includes("AGENTS.md")) {
    console.error("❌ out/llms.txt must cite /prices.json + /.well-known/ai.txt + organization.json + AGENTS.md");
    process.exit(1);
  }
  const headersLive = fs.readFileSync(path.join(outDir, "_headers"), "utf8");
  if (
    !headersLive.includes('rel="describedby"') ||
    !headersLive.includes("ai-shopping.json") ||
    !headersLive.includes("entity.json") ||
    !headersLive.includes("agents.json") ||
    !headersLive.includes("AGENTS.md") ||
    !headersLive.includes("panels.json") ||
    !headersLive.includes("mpn.json") ||
    !headersLive.includes("entity-profiles.json")
  ) {
    console.error("❌ out/_headers must advertise Link describedby/alternate for price+entity+agents+panels/mpn/profiles");
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
      'href="https://arledscreen.com/prices.json"',
      'href="https://arledscreen.com/organization.json"',
      'href="https://arledscreen.com/.well-known/agents.json"',
      'href="https://arledscreen.com/AGENTS.md"',
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
  if (!profiles?.canonicalUrls?.geoBaselineJson?.includes("/geo-baseline.json")) {
    console.error("❌ entity-profiles.json canonicalUrls.geoBaselineJson required");
    process.exit(1);
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
  if (!headersLive.includes("/api/panels") || !headersLive.includes("/tr/llms.txt")) {
    console.error("❌ out/_headers must set Content-Type for /api/panels + /tr/llms.txt");
    process.exit(1);
  }
  if (!headersLive.includes("/api/panels.json") || !headersLive.includes("\n/panels\n")) {
    console.error("❌ out/_headers must set Content-Type for /api/panels.json + extensionless /panels");
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
  for (const rel of ["offer.json", "cite.json", "faq.json", "faqs.json"]) {
    const blockRe = new RegExp(
      `\\n/${rel.replace(".", "\\.")}\\n[\\s\\S]*?Content-Type: application/json; charset=utf-8`,
    );
    if (!blockRe.test(headersLive)) {
      console.error(`❌ out/_headers must set application/json; charset=utf-8 for /${rel}`);
      process.exit(1);
    }
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
  const tsvPath = path.join(outDir, "feeds/merchant-priced-panels.tsv");
  if (!fs.existsSync(tsvPath)) {
    console.error("❌ Missing in out/: feeds/merchant-priced-panels.tsv");
    process.exit(1);
  }
  const tsv = fs.readFileSync(tsvPath, "utf8");
  const tsvHeader = tsv.trim().split("\n")[0] || "";
  for (const col of ["title", "brand", "image_link", "condition", "shipping_included", "mpn"]) {
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
  for (const row of tsvRows) {
    const cells = row.split("\t");
    if (cells[mpnIdx] !== cells[idIdx]) {
      console.error(`❌ merchant TSV mpn must equal id (sku) for ${cells[idIdx]}`);
      process.exit(1);
    }
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
          if (d.hasPart.every((p) => p?.sku && p.mpn === p.sku && String(p["@id"] || "").includes("#product"))) {
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
  "/tr/llms.txt",
  "/tr/ai.txt",
  "/tr/entity-profiles.json",
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

validateAIFeeds();
