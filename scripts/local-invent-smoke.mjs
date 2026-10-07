#!/usr/bin/env node
/**
 * Local invent smoke against out/ (CI-safe; no live network).
 * Mirrors the invent contract checked by live-invent-smoke.mjs.
 *
 * Usage: npm run invent:smoke:local   (after npm run build)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../out");
const SITE = "https://arledscreen.com";

function fail(msg) {
  console.error(`FAIL ${msg}`);
  process.exitCode = 1;
}
function ok(msg) {
  console.log(`OK   ${msg}`);
}

function readJson(rel) {
  const p = path.join(outDir, rel);
  if (!fs.existsSync(p)) {
    fail(`missing ${rel}`);
    return null;
  }
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function readText(rel) {
  const p = path.join(outDir, rel);
  if (!fs.existsSync(p)) {
    fail(`missing ${rel}`);
    return "";
  }
  return fs.readFileSync(p, "utf8");
}

if (!fs.existsSync(outDir)) {
  console.error("local-invent-smoke: missing out/ — run npm run build first");
  process.exit(1);
}

const ent = readJson("entity.json");
const brand = readJson("brand.json");
const cat = readJson("catalog.json");
const ai = readJson("ai-shopping.json");
const agents = readJson(".well-known/agents.json");
const ard = readJson(".well-known/ard.json");
const rss = readText("feeds/prices.rss");
const aiTxt = readText("ai.txt");

if (ent?.brand?.makesOffer?.offerCount === 12 && ent.brand.makesOffer["@type"] === "AggregateOffer") {
  ok("entity.brand AggregateOffer×12");
} else fail("entity.brand AggregateOffer×12");

if (ent?.mainEntityOfPage?.["@id"] === `${SITE}/#website`) ok("entity WebSite #website");
else fail("entity WebSite #website");

const siteActions = ent?.mainEntityOfPage?.potentialAction || [];
if (
  siteActions.some((a) => String(a?.target?.urlTemplate || "").includes("/tr/quote")) &&
  siteActions.some((a) => String(a?.target?.urlTemplate || "").includes("/en/quote"))
) {
  ok("entity WebSite OrderAction TR+EN");
} else fail("entity WebSite OrderAction TR+EN");

if (brand?.makesOffer?.offerCount === 12 && Array.isArray(brand.makesOffer?.offers) && brand.makesOffer.offers.length === 12) {
  ok("brand.json AggregateOffer×12 offers");
} else fail("brand.json AggregateOffer×12 offers");

if (
  (brand?.potentialAction || []).some((a) => String(a?.target?.urlTemplate || "").includes("/tr/quote")) &&
  (brand?.potentialAction || []).some((a) => String(a?.target?.urlTemplate || "").includes("/en/quote"))
) {
  ok("brand.json OrderAction TR+EN");
} else fail("brand.json OrderAction TR+EN");

if (ai?.brand?.makesOffer?.offerCount === 12 && ai.brand.makesOffer["@type"] === "AggregateOffer") {
  ok("ai-shopping.brand AggregateOffer band×12");
} else fail("ai-shopping.brand AggregateOffer band×12");

if (cat?.brand?.makesOffer?.offerCount === 12 && cat.seller?.["@id"]?.includes("#organization")) {
  ok("catalog.brand band + seller Org");
} else fail("catalog.brand band + seller Org");

if (JSON.stringify(cat.isRelatedTo || []).includes("/feeds/prices.rss")) ok("catalog isRelatedTo prices.rss");
else fail("catalog isRelatedTo prices.rss");

if (
  rss.includes('rel="self"') &&
  rss.includes("xmlns:atom") &&
  rss.includes("/entity.json") &&
  rss.includes("/brand.json") &&
  rss.includes("/catalog.json") &&
  rss.includes("/geo-baseline.json") &&
  rss.includes("/point-c.txt") &&
  rss.includes('href="https://arledscreen.com/prices.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/prices.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/price.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/pricing.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/panels.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/modules.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/sku.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/mpn.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/merchant.json"')
) {
  ok("prices.rss atom:link + invent aliases entity/brand/catalog/geo/point-c + well-known");
} else fail("prices.rss atom:link + invent aliases entity/brand/catalog/geo/point-c + well-known");

if (aiTxt.includes("#website") && aiTxt.includes("/tr/quote/")) ok("ai.txt WebSite + quote");
else fail("ai.txt WebSite + quote");

if ((agents?.itemListElement || []).length >= 14) ok(`agents.json ×${agents.itemListElement.length}`);
else fail("agents.json ≥14");

{
  const blob = `${agents?.description || ""}${JSON.stringify(agents?.itemListElement || [])}`;
  const agentsMd = readText("AGENTS.md");
  const llms = readText("llms.txt");
  if (
    blob.includes("/.well-known/modules.json") &&
    blob.includes("/.well-known/pricing.json") &&
    agentsMd.includes("/.well-known/modules.json") &&
    llms.includes("/.well-known/sku.json")
  ) {
    ok("agents/AGENTS/llms invent well-known modules/sku/pricing");
  } else fail("agents/AGENTS/llms invent well-known modules/sku/pricing");
}

const pointC = readText("point-c.txt");
if (
  pointC.includes("GBP About") &&
  pointC.includes("34245") &&
  pointC.includes("Hostinger arleds.com") &&
  pointC.includes("Hostinger support email") &&
  pointC.includes("point-c:next") &&
  pointC.includes("/.well-known/modules.json")
) {
  ok("point-c.txt paste packs + Hostinger 301/email + invent aliases");
} else fail("point-c.txt paste packs + Hostinger 301/email + invent aliases");

const pointCEn = readText("point-c-en.txt");
if (
  pointCEn.includes("EN GBP About") &&
  pointCEn.includes("arledscreen.com/en/") &&
  pointCEn.includes("/.well-known/modules.json")
) {
  ok("point-c-en.txt paste packs + invent aliases");
} else fail("point-c-en.txt paste packs + invent aliases");

if (ard?.agentic?.resources?.website?.["@id"] === `${SITE}/#website`) ok("ard.resources.website");
else fail("ard.resources.website");

if (String(ard?.agentic?.resources?.pointC?.url || "").includes("/point-c.txt")) ok("ard.resources.pointC");
else fail("ard.resources.pointC");

{
  const allow = ard?.robotsPolicy?.allow || [];
  const trEx = JSON.stringify(ard?.agentic?.resources?.trInventBridges?.examples || []);
  const res = ard?.agentic?.resources || {};
  if (
    allow.includes("/.well-known/modules.json") &&
    allow.includes("/.well-known/sku.json") &&
    allow.includes("/.well-known/pricing.json") &&
    trEx.includes("/.well-known/modules.json") &&
    trEx.includes("/.well-known/pricing.json") &&
    String(res.modulesJson?.wellKnown || "").includes("/.well-known/modules.json") &&
    String(res.skuJson?.wellKnown || "").includes("/.well-known/sku.json") &&
    String(res.aiShopping?.description || "").includes("/.well-known/modules.json")
  ) {
    ok("ard invent allow + resources modules/sku + aiShopping invent");
  } else fail("ard invent allow + resources modules/sku + aiShopping invent");
}

{
  const tsv = readText("feeds/merchant-priced-panels.tsv");
  const head = tsv.split("\n")[0] || "";
  if (
    head.includes("organization_id") &&
    head.includes("entity_url") &&
    head.includes("brand_url") &&
    tsv.includes(`${SITE}/#organization`) &&
    tsv.includes(`${SITE}/entity.json`) &&
    tsv.includes(`${SITE}/brand.json`)
  ) {
    ok("merchant TSV brand_url + organization_id + entity_url");
  } else fail("merchant TSV brand_url + organization_id + entity_url");
}

if (
  JSON.stringify(cat.isRelatedTo || []).includes("/feeds/prices.rss") &&
  JSON.stringify(cat.isRelatedTo || []).includes("/brand.json") &&
  JSON.stringify(cat.isRelatedTo || []).includes("/point-c.txt")
) {
  ok("catalog isRelatedTo prices.rss + brand + point-c");
} else fail("catalog isRelatedTo prices.rss + brand + point-c");

if (
  String(cat?.description || "").includes("/.well-known/modules.json") &&
  String(brand?.description || "").includes("/.well-known/sku.json")
) {
  ok("catalog/brand description invent well-known modules/sku");
} else fail("catalog/brand description invent well-known modules/sku");

if (
  JSON.stringify(ai.isBasedOn || []).includes("/feeds/prices.rss") &&
  JSON.stringify(ai.isBasedOn || []).includes("/brand.json") &&
  JSON.stringify(ai.isBasedOn || []).includes("/point-c.txt")
) {
  ok("ai-shopping isBasedOn prices.rss + brand + point-c");
} else fail("ai-shopping isBasedOn prices.rss + brand + point-c");

{
  const dist = JSON.stringify(ai.distribution || []);
  if (
    dist.includes("/price.json") &&
    dist.includes("/pricing.json") &&
    dist.includes("/modules.json") &&
    dist.includes("/sku.json") &&
    dist.includes("/.well-known/prices.json") &&
    dist.includes("/.well-known/panels.json") &&
    dist.includes("/.well-known/mpn.json") &&
    dist.includes("/.well-known/merchant.json") &&
    dist.includes("/.well-known/modules.json") &&
    dist.includes("/.well-known/sku.json") &&
    dist.includes("/.well-known/price.json") &&
    dist.includes("/.well-known/pricing.json") &&
    dist.includes("/brand.json") &&
    dist.includes("/entity.json") &&
    dist.includes("/point-c.txt")
  ) {
    ok("ai-shopping distribution → priceAliases + brand/entity/point-c reverse join");
  } else fail("ai-shopping distribution → priceAliases + brand/entity/point-c reverse join");
}

{
  const g = ai.agentGuidelines || {};
  const humans = readText("humans.txt");
  const faq = JSON.stringify(ent?.faqs || []) + JSON.stringify(ent?.faqsEn || []);
  if (
    String(g.priceSource || "").includes("/.well-known/modules.json") &&
    String(g.en?.priceSource || "").includes("/.well-known/sku.json") &&
    String(ai.description || "").includes("/.well-known/pricing.json") &&
    humans.includes("/.well-known/modules.json") &&
    faq.includes("/.well-known/modules.json")
  ) {
    ok("ai-shopping/humans/entity FAQ invent well-known modules/sku/pricing");
  } else fail("ai-shopping/humans/entity FAQ invent well-known modules/sku/pricing");
}

if (
  JSON.stringify(ent?.subjectOf || []).includes("/point-c.txt") &&
  JSON.stringify(ent?.subjectOf || []).includes("/brand.json")
) {
  ok("entity.subjectOf → point-c + brand.json");
} else fail("entity.subjectOf → point-c + brand.json");

if (
  JSON.stringify(brand?.subjectOf || []).includes("/point-c.txt") &&
  JSON.stringify(brand?.distribution || []).includes("/point-c.txt")
) {
  ok("brand.subjectOf+distribution → point-c");
} else fail("brand.subjectOf+distribution → point-c");

{
  const geo = readJson("geo-baseline.json");
  const based = JSON.stringify(geo?.isBasedOn || []);
  const related = JSON.stringify(geo?.isRelatedTo || []);
  const disc = geo?.discovery || {};
  const profiles = readJson("entity-profiles.json");
  const merchantPack = String(profiles?.packs?.googleMerchantReadiness || "");
  if (
    based.includes("/entity.json") &&
    based.includes("/brand.json") &&
    based.includes("/ai-shopping.json") &&
    based.includes("/catalog.json") &&
    based.includes("/feeds/prices.rss") &&
    related.includes("/point-c.txt")
  ) {
    ok("geo-baseline isBasedOn entity/brand/ai/catalog + isRelatedTo point-c");
  } else fail("geo-baseline isBasedOn entity/brand/ai/catalog + isRelatedTo point-c");
  if (
    String(disc.modulesWellKnown || "").includes("/.well-known/modules.json") &&
    String(disc.skuWellKnown || "").includes("/.well-known/sku.json") &&
    String(disc.pricingWellKnown || "").includes("/.well-known/pricing.json") &&
    merchantPack.includes("/.well-known/modules.json")
  ) {
    ok("geo discovery + entity-profiles invent well-known modules/sku/pricing");
  } else fail("geo discovery + entity-profiles invent well-known modules/sku/pricing");
}

if (process.exitCode) {
  console.error("\nlocal-invent-smoke: FAILED");
  process.exit(1);
}
console.log("\nlocal-invent-smoke: OK");
