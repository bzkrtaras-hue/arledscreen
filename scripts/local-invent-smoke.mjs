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

if (
  JSON.stringify(ent?.isBasedOn || []).includes("/ai-shopping.json") &&
  JSON.stringify(ent?.isBasedOn || []).includes("/.well-known/modules.json") &&
  JSON.stringify(ent?.isBasedOn || []).includes("#website") &&
  JSON.stringify(ent?.distribution || []).includes("/.well-known/modules.json") &&
  JSON.stringify(ent?.distribution || []).includes("/.well-known/sku.json") &&
  JSON.stringify(ent?.distribution || []).includes("/.well-known/pricing.json") &&
  JSON.stringify(ent?.distribution || []).includes("#website")
) {
  ok("entity isBasedOn+distribution invent modules/sku/pricing + #website");
} else fail("entity isBasedOn+distribution invent modules/sku/pricing + #website");

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
  rss.includes('href="https://arledscreen.com/.well-known/merchant.json"') &&
  rss.includes("/entity-profiles.json") &&
  rss.includes("/.well-known/brand.json") &&
  rss.includes("/.well-known/entity.json") &&
  rss.includes("/.well-known/agents.json") &&
  rss.includes("/.well-known/ard.json") &&
  rss.includes("/ai.txt") &&
  rss.includes("/llms.txt") &&
  rss.includes("/humans.txt") &&
  rss.includes("/AGENTS.md") &&
  rss.includes("/.well-known/security.txt") &&
  rss.includes("geo:next") &&
  rss.includes("geo:ack")
) {
  ok("prices.rss atom:link + invent aliases + discovery agents/ard/ai/llms/humans/AGENTS/security");
} else fail("prices.rss atom:link + invent aliases + discovery agents/ard/ai/llms/humans/AGENTS/security");

if (aiTxt.includes("#website") && aiTxt.includes("/tr/quote/")) ok("ai.txt WebSite + quote");
else fail("ai.txt WebSite + quote");

if (
  (agents?.itemListElement || []).length >= 19 &&
  (agents?.itemListElement || []).some((it) => String(it?.url || "").includes("#website")) &&
  (agents?.itemListElement || []).some((it) => String(it?.url || "").includes("/.well-known/security.txt"))
) {
  ok(`agents.json ×${agents.itemListElement.length} incl #website + security.txt`);
} else fail("agents.json ≥19 incl #website + security.txt");

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
  const agentsBased = JSON.stringify(agents?.isBasedOn || []);
  const agentsDist = JSON.stringify(agents?.distribution || []);
  if (
    agentsBased.includes("/geo-baseline.json") &&
    agentsBased.includes("/point-c.txt") &&
    agentsBased.includes("/entity-profiles.json") &&
    agentsBased.includes("/.well-known/modules.json") &&
    agentsBased.includes("/.well-known/panels.json") &&
    agentsBased.includes("/.well-known/mpn.json") &&
    agentsBased.includes("/.well-known/merchant.json") &&
    agentsBased.includes("/ai.txt") &&
    agentsBased.includes("/llms.txt") &&
    agentsBased.includes("/humans.txt") &&
    agentsBased.includes("/AGENTS.md") &&
    agentsBased.includes("/.well-known/security.txt") &&
    agentsBased.includes("#website") &&
    agentsDist.includes("/ai-shopping.json") &&
    agentsDist.includes("/entity-profiles.json") &&
    agentsDist.includes("/point-c.txt") &&
    agentsDist.includes("/.well-known/modules.json") &&
    agentsDist.includes("/.well-known/panels.json") &&
    agentsDist.includes("/.well-known/mpn.json") &&
    agentsDist.includes("/.well-known/merchant.json") &&
    agentsDist.includes("/.well-known/ard.json") &&
    agentsDist.includes("/ai.txt") &&
    agentsDist.includes("/llms.txt") &&
    agentsDist.includes("/humans.txt") &&
    agentsDist.includes("/AGENTS.md") &&
    agentsDist.includes("/.well-known/security.txt") &&
    agentsMd.includes("geo:next")
  ) {
    ok("agents distribution + isBasedOn inventAlias + discovery ai/llms/humans/AGENTS/security");
  } else fail("agents distribution + isBasedOn inventAlias + discovery ai/llms/humans/AGENTS/security");
  const llmsFull = readText("llms-full.txt");
  if (
    llms.includes("geo:next") &&
    llms.includes("/.well-known/brand.json") &&
    llmsFull.includes("geo:next") &&
    llmsFull.includes("/.well-known/brand.json")
  ) {
    ok("llms + llms-full geo:next + well-known/brand");
  } else fail("llms + llms-full geo:next + well-known/brand");
}

const pointC = readText("point-c.txt");
if (
  pointC.includes("GBP About") &&
  pointC.includes("34245") &&
  pointC.includes("Hostinger arleds.com") &&
  pointC.includes("Hostinger support email") &&
  pointC.includes("mailto:support@hostinger.com") &&
  pointC.includes("Gmail draft (Send)") &&
  pointC.includes("point-c:next") &&
  pointC.includes("geo:next") &&
  pointC.includes("/.well-known/modules.json") &&
  pointC.includes("/.well-known/panels.json") &&
  pointC.includes("/.well-known/mpn.json") &&
  pointC.includes("/.well-known/merchant.json") &&
  pointC.includes("/.well-known/agents.json") &&
  pointC.includes("/.well-known/ard.json") &&
  pointC.includes("/ai.txt") &&
  pointC.includes("/llms.txt") &&
  pointC.includes("/humans.txt") &&
  pointC.includes("/AGENTS.md") &&
  pointC.includes("/.well-known/security.txt")
) {
  ok("point-c.txt paste packs + Hostinger 301/email/mailto/draft + invent aliases");
} else fail("point-c.txt paste packs + Hostinger 301/email/mailto/draft + invent aliases");

{
  const profiles = readJson("entity-profiles.json");
  const based = JSON.stringify(profiles?.isBasedOn || []);
  const dist = JSON.stringify(profiles?.distribution || []);
  if (
    profiles?.["@id"]?.includes("/entity-profiles.json") &&
    based.includes("/entity.json") &&
    based.includes("/brand.json") &&
    based.includes("/ai-shopping.json") &&
    based.includes("/geo-baseline.json") &&
    based.includes("/point-c.txt") &&
    based.includes("#website") &&
    based.includes("/.well-known/modules.json") &&
    dist.includes("/prices.json") &&
    dist.includes("/catalog.json") &&
    dist.includes("/point-c.txt") &&
    dist.includes("#website") &&
    dist.includes("/.well-known/modules.json") &&
    dist.includes("/.well-known/sku.json") &&
    dist.includes("/.well-known/pricing.json") &&
    JSON.stringify(profiles?.ownerP0Checklist || []).includes("geo:next") &&
    JSON.stringify(profiles?.ownerP0Checklist || []).includes("geo:ack") &&
    String(profiles?.canonicalUrls?.website || "").includes("#website") &&
    String(profiles?.description || "").includes("geo:ack") &&
    String(profiles?.mainEntityOfPage?.["@id"] || "").includes("#website") &&
    JSON.stringify(profiles?.isRelatedTo || []).includes("#website")
  ) {
    ok("entity-profiles invent distribution + isBasedOn modules/sku/pricing + #website");
  } else fail("entity-profiles invent distribution + isBasedOn modules/sku/pricing + #website");
}

const pointCEn = readText("point-c-en.txt");
if (
  pointCEn.includes("EN GBP About") &&
  pointCEn.includes("arledscreen.com/en/") &&
  pointCEn.includes("/.well-known/modules.json")
) {
  ok("point-c-en.txt paste packs + invent aliases");
} else fail("point-c-en.txt paste packs + invent aliases");

{
  const websiteRes = ard?.agentic?.resources?.website || {};
  if (
    websiteRes?.["@id"] === `${SITE}/#website` &&
    String(websiteRes?.description || "").includes("geo:ack") &&
    String(websiteRes?.ownerNext || "").includes("geo:ack") &&
    String(ard?.agentic?.resources?.merchantFeed?.websiteUrl || "").includes("#website")
  ) {
    ok("ard.resources.website geo:ack + merchantFeed.websiteUrl");
  } else fail("ard.resources.website geo:ack + merchantFeed.websiteUrl");
}

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
  if (
    allow.includes("/.well-known/entity.json") &&
    allow.includes("/.well-known/brand.json") &&
    String(res.entityProfiles?.ownerNext || "").includes("geo:next") &&
    String(res.entityProfiles?.ownerNext || "").includes("geo:ack") &&
    JSON.stringify(res.entityProfiles?.distribution || []).includes("/ai-shopping.json") &&
    String(res.geoBaseline?.ownerNext || "").includes("geo:next") &&
    String(res.geoBaseline?.ownerNext || "").includes("geo:ack") &&
    String(res.pointC?.ownerNext || "").includes("geo:next") &&
    String(res.pointC?.ownerNext || "").includes("geo:ack") &&
    JSON.stringify(res.brand?.subjectOf || []).includes("/point-c.txt")
  ) {
    ok("ard invent entity/brand allow + geo:next/ack distribution");
  } else fail("ard invent entity/brand allow + geo:next/ack distribution");
}

{
  const tsv = readText("feeds/merchant-priced-panels.tsv");
  const head = tsv.split("\n")[0] || "";
  if (
    head.includes("organization_id") &&
    head.includes("entity_url") &&
    head.includes("brand_url") &&
    head.includes("entity_profiles_url") &&
    head.includes("point_c_url") &&
    head.includes("brand_well_known_url") &&
    head.includes("modules_well_known_url") &&
    head.includes("sku_well_known_url") &&
    head.includes("offer_json_url") &&
    head.includes("pricing_well_known_url") &&
    head.includes("panels_well_known_url") &&
    head.includes("mpn_well_known_url") &&
    head.includes("merchant_well_known_url") &&
    head.includes("prices_well_known_url") &&
    head.includes("price_well_known_url") &&
    head.includes("entity_well_known_url") &&
    head.includes("prices_rss_url") &&
    head.includes("ai_shopping_url") &&
    head.includes("prices_json_url") &&
    head.includes("catalog_url") &&
    head.includes("organization_url") &&
    head.includes("geo_baseline_url") &&
    head.includes("website_url") &&
    head.includes("agents_url") &&
    head.includes("ard_url") &&
    head.includes("ai_txt_url") &&
    head.includes("llms_url") &&
    head.includes("humans_url") &&
    head.includes("agents_md_url") &&
    head.includes("security_txt_url") &&
    tsv.includes(`${SITE}/#organization`) &&
    tsv.includes(`${SITE}/entity.json`) &&
    tsv.includes(`${SITE}/brand.json`) &&
    tsv.includes(`${SITE}/ai-shopping.json`) &&
    tsv.includes(`${SITE}/prices.json`) &&
    tsv.includes(`${SITE}/catalog.json`) &&
    tsv.includes(`${SITE}/entity-profiles.json`) &&
    tsv.includes(`${SITE}/point-c.txt`) &&
    tsv.includes(`${SITE}/.well-known/brand.json`) &&
    tsv.includes(`${SITE}/.well-known/modules.json`) &&
    tsv.includes(`${SITE}/.well-known/sku.json`) &&
    tsv.includes(`${SITE}/.well-known/pricing.json`) &&
    tsv.includes(`${SITE}/.well-known/panels.json`) &&
    tsv.includes(`${SITE}/.well-known/mpn.json`) &&
    tsv.includes(`${SITE}/.well-known/merchant.json`) &&
    tsv.includes(`${SITE}/.well-known/prices.json`) &&
    tsv.includes(`${SITE}/.well-known/price.json`) &&
    tsv.includes(`${SITE}/.well-known/entity.json`) &&
    tsv.includes(`${SITE}/.well-known/agents.json`) &&
    tsv.includes(`${SITE}/.well-known/ard.json`) &&
    tsv.includes(`${SITE}/ai.txt`) &&
    tsv.includes(`${SITE}/llms.txt`) &&
    tsv.includes(`${SITE}/humans.txt`) &&
    tsv.includes(`${SITE}/AGENTS.md`) &&
    tsv.includes(`${SITE}/.well-known/security.txt`) &&
    tsv.includes(`${SITE}/feeds/prices.rss`) &&
    tsv.includes(`${SITE}/offer.json`) &&
    tsv.includes(`${SITE}/organization.json`) &&
    tsv.includes(`${SITE}/geo-baseline.json`) &&
    tsv.includes(`${SITE}/#website`)
  ) {
    ok("merchant TSV feed/wk/rss/org/entity/profiles/point-c/geo/website/discovery invent cols");
  } else fail("merchant TSV feed/wk/rss/org/entity/profiles/point-c/geo/website/discovery invent cols");
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
  JSON.stringify(ai.isBasedOn || []).includes("/point-c.txt") &&
  JSON.stringify(ai.isBasedOn || []).includes("/entity-profiles.json") &&
  JSON.stringify(ai.isBasedOn || []).includes("#website") &&
  JSON.stringify(ai.isBasedOn || []).includes("/.well-known/modules.json") &&
  JSON.stringify(ai.isBasedOn || []).includes("/.well-known/sku.json") &&
  JSON.stringify(ai.isBasedOn || []).includes("/.well-known/pricing.json")
) {
  ok("ai-shopping isBasedOn invent modules/sku/pricing + #website");
} else fail("ai-shopping isBasedOn invent modules/sku/pricing + #website");

{
  const aiSame = JSON.stringify(ai.sameAs || []);
  const brandSame = JSON.stringify(brand.sameAs || []);
  const catSame = JSON.stringify(cat.sameAs || []);
  const entSame = JSON.stringify(readJson("entity.json")?.sameAs || []);
  if (
    aiSame.includes("/brand.json") &&
    aiSame.includes("/geo-baseline.json") &&
    aiSame.includes("/entity-profiles.json") &&
    aiSame.includes("/.well-known/panels.json") &&
    aiSame.includes("/.well-known/agents.json") &&
    aiSame.includes("/humans.txt") &&
    aiSame.includes("/AGENTS.md") &&
    aiSame.includes("/.well-known/security.txt") &&
    brandSame.includes("/ai-shopping.json") &&
    brandSame.includes("/geo-baseline.json") &&
    brandSame.includes("/entity-profiles.json") &&
    brandSame.includes("/.well-known/modules.json") &&
    brandSame.includes("/.well-known/ard.json") &&
    brandSame.includes("/ai.txt") &&
    brandSame.includes("/.well-known/security.txt") &&
    catSame.includes("/geo-baseline.json") &&
    catSame.includes("/entity-profiles.json") &&
    catSame.includes("/.well-known/sku.json") &&
    catSame.includes("/llms.txt") &&
    catSame.includes("/.well-known/security.txt") &&
    entSame.includes("/ai-shopping.json") &&
    entSame.includes("/catalog.json") &&
    entSame.includes("/brand.json") &&
    entSame.includes("/geo-baseline.json") &&
    entSame.includes("/entity-profiles.json") &&
    entSame.includes("/point-c.txt") &&
    entSame.includes("#website") &&
    entSame.includes("/.well-known/mpn.json") &&
    entSame.includes("/.well-known/merchant.json") &&
    entSame.includes("/humans.txt") &&
    entSame.includes("/.well-known/security.txt")
  ) {
    ok("sameAs invent closure ai/brand/catalog/entity → inventAlias + discovery + security");
  } else fail("sameAs invent closure ai/brand/catalog/entity → inventAlias + discovery + security");
}

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
    dist.includes("/.well-known/brand.json") &&
    dist.includes("/entity.json") &&
    dist.includes("/.well-known/entity.json") &&
    dist.includes("/organization.json") &&
    dist.includes("/point-c.txt") &&
    dist.includes("/entity-profiles.json") &&
    dist.includes("#website") &&
    dist.includes("/.well-known/agents.json") &&
    dist.includes("/.well-known/ard.json") &&
    dist.includes("/ai.txt") &&
    dist.includes("/llms.txt") &&
    dist.includes("/humans.txt") &&
    dist.includes("/AGENTS.md") &&
    dist.includes("/.well-known/security.txt")
  ) {
    ok("ai-shopping distribution → inventAlias + discovery agents/ard/ai/llms/humans/AGENTS/security");
  } else fail("ai-shopping distribution → inventAlias + discovery agents/ard/ai/llms/humans/AGENTS/security");
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
    humans.includes("/.well-known/security.txt") &&
    faq.includes("/.well-known/modules.json")
  ) {
    ok("ai-shopping/humans/entity FAQ invent well-known modules/sku/pricing + security");
  } else fail("ai-shopping/humans/entity FAQ invent well-known modules/sku/pricing + security");
}

if (
  JSON.stringify(ent?.subjectOf || []).includes("/point-c.txt") &&
  JSON.stringify(ent?.subjectOf || []).includes("/brand.json") &&
  JSON.stringify(ent?.subjectOf || []).includes("/entity-profiles.json")
) {
  ok("entity.subjectOf → point-c + brand.json + entity-profiles");
} else fail("entity.subjectOf → point-c + brand.json + entity-profiles");

{
  const bs = JSON.stringify(ent?.brand?.subjectOf || []);
  const ls = JSON.stringify(ent?.location?.subjectOf || []);
  const websiteIdHits = (list) =>
    (Array.isArray(list) ? list : []).filter((s) => String(s?.["@id"] || "").includes("#website")).length;
  if (
    bs.includes("/prices.json") &&
    bs.includes("/point-c.txt") &&
    bs.includes("/entity.json") &&
    bs.includes("/entity-profiles.json") &&
    bs.includes("/.well-known/brand.json") &&
    bs.includes("/geo-baseline.json") &&
    bs.includes("#website") &&
    websiteIdHits(ent?.subjectOf) === 1 &&
    websiteIdHits(ent?.brand?.subjectOf) === 1 &&
    websiteIdHits(ent?.location?.subjectOf) === 1 &&
    ls.includes("/prices.json") &&
    ls.includes("/point-c.txt") &&
    ls.includes("/brand.json") &&
    ls.includes("/.well-known/brand.json") &&
    ls.includes("/entity.json") &&
    ls.includes("/entity-profiles.json") &&
    ls.includes("/geo-baseline.json") &&
    ls.includes("#website")
  ) {
    ok("entity nested brand/location subjectOf invent parity + brand-wk/geo/org/#website×1");
  } else fail("entity nested brand/location subjectOf invent parity + brand-wk/geo/org/#website×1");
}

if (
  JSON.stringify(brand?.subjectOf || []).includes("/point-c.txt") &&
  JSON.stringify(brand?.distribution || []).includes("/point-c.txt") &&
  JSON.stringify(brand?.subjectOf || []).includes("/entity.json") &&
  JSON.stringify(brand?.distribution || []).includes("/entity.json") &&
  JSON.stringify(brand?.distribution || []).includes("/organization.json") &&
  JSON.stringify(brand?.distribution || []).includes("/prices.json") &&
  JSON.stringify(brand?.subjectOf || []).includes("/entity-profiles.json") &&
  JSON.stringify(brand?.distribution || []).includes("/entity-profiles.json") &&
  JSON.stringify(brand?.distribution || []).includes("#website") &&
  JSON.stringify(brand?.isBasedOn || []).includes("/ai-shopping.json") &&
  JSON.stringify(brand?.isBasedOn || []).includes("/catalog.json") &&
  JSON.stringify(brand?.isBasedOn || []).includes("/geo-baseline.json") &&
  JSON.stringify(brand?.isBasedOn || []).includes("/point-c.txt") &&
  JSON.stringify(brand?.isBasedOn || []).includes("/entity-profiles.json") &&
  JSON.stringify(brand?.isBasedOn || []).includes("#website") &&
  JSON.stringify(brand?.isBasedOn || []).includes("/.well-known/modules.json") &&
  JSON.stringify(brand?.isBasedOn || []).includes("/.well-known/panels.json") &&
  JSON.stringify(brand?.isBasedOn || []).includes("/.well-known/mpn.json") &&
  JSON.stringify(brand?.distribution || []).includes("/.well-known/modules.json") &&
  JSON.stringify(brand?.distribution || []).includes("/.well-known/panels.json") &&
  JSON.stringify(brand?.distribution || []).includes("/.well-known/mpn.json") &&
  JSON.stringify(brand?.distribution || []).includes("/.well-known/merchant.json")
) {
  ok("brand.subjectOf+distribution+isBasedOn → inventAlias panels/mpn/merchant + #website");
} else fail("brand.subjectOf+distribution+isBasedOn → inventAlias panels/mpn/merchant + #website");

{
  const related = JSON.stringify(cat?.isRelatedTo || []);
  const dist = JSON.stringify(cat?.distribution || []);
  const based = JSON.stringify(cat?.isBasedOn || []);
  if (related.includes("/entity.json") && related.includes("/brand.json") && related.includes("/entity-profiles.json")) {
    ok("catalog isRelatedTo entity + brand + entity-profiles");
  } else fail("catalog isRelatedTo entity + brand + entity-profiles");
  if (
    dist.includes("/ai-shopping.json") &&
    dist.includes("/prices.json") &&
    dist.includes("/brand.json") &&
    dist.includes("/entity.json") &&
    dist.includes("/point-c.txt") &&
    dist.includes("/entity-profiles.json") &&
    dist.includes("#website") &&
    based.includes("/ai-shopping.json") &&
    based.includes("/brand.json") &&
    based.includes("/geo-baseline.json") &&
    based.includes("/point-c.txt") &&
    based.includes("/entity-profiles.json") &&
    based.includes("#website") &&
    based.includes("/.well-known/modules.json") &&
    based.includes("/.well-known/panels.json") &&
    based.includes("/.well-known/mpn.json") &&
    dist.includes("/.well-known/modules.json") &&
    dist.includes("/.well-known/panels.json") &&
    dist.includes("/.well-known/mpn.json") &&
    dist.includes("/.well-known/merchant.json")
  ) {
    ok("catalog distribution+isBasedOn invent → inventAlias panels/mpn/merchant + #website");
  } else fail("catalog distribution+isBasedOn invent → inventAlias panels/mpn/merchant + #website");
}

{
  const site = ent?.mainEntityOfPage || {};
  const blob = JSON.stringify(site.subjectOf || []) + JSON.stringify(site.sameAs || []);
  if (
    site?.["@id"]?.includes("#website") &&
    blob.includes("/ai-shopping.json") &&
    blob.includes("/prices.json") &&
    blob.includes("/brand.json") &&
    blob.includes("/point-c.txt") &&
    blob.includes("/entity-profiles.json") &&
    blob.includes("/geo-baseline.json") &&
    blob.includes("/.well-known/brand.json") &&
    blob.includes("/organization.json") &&
    JSON.stringify(site.sameAs || []).includes("/point-c.txt")
  ) {
    ok("entity WebSite invent subjectOf/sameAs + profiles/geo/brand-wk/org/point-c");
  } else fail("entity WebSite invent subjectOf/sameAs + profiles/geo/brand-wk/org/point-c");
}

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
    based.includes("AGENTS.md") &&
    based.includes("/entity-profiles.json") &&
    based.includes("#website") &&
    based.includes("/.well-known/modules.json") &&
    related.includes("/point-c.txt") &&
    related.includes("/entity-profiles.json")
  ) {
    ok("geo-baseline isBasedOn invent modules/sku/pricing + #website");
  } else fail("geo-baseline isBasedOn invent modules/sku/pricing + #website");
  const dist = JSON.stringify(geo?.distribution || []);
  if (
    dist.includes("/ai-shopping.json") &&
    dist.includes("/prices.json") &&
    dist.includes("/.well-known/prices.json") &&
    dist.includes("/brand.json") &&
    dist.includes("/.well-known/brand.json") &&
    dist.includes("/entity.json") &&
    dist.includes("/.well-known/entity.json") &&
    dist.includes("/catalog.json") &&
    dist.includes("/point-c.txt") &&
    dist.includes("AGENTS.md") &&
    dist.includes("/entity-profiles.json") &&
    dist.includes("#website") &&
    dist.includes("/.well-known/modules.json") &&
    dist.includes("/.well-known/sku.json") &&
    dist.includes("/.well-known/pricing.json")
  ) {
    ok("geo-baseline distribution invent → modules/sku/pricing + #website");
  } else fail("geo-baseline distribution invent → modules/sku/pricing + #website");
  if (
    String(disc.modulesWellKnown || "").includes("/.well-known/modules.json") &&
    String(disc.skuWellKnown || "").includes("/.well-known/sku.json") &&
    String(disc.pricingWellKnown || "").includes("/.well-known/pricing.json") &&
    String(disc.brandWellKnown || "").includes("/.well-known/brand.json") &&
    String(disc.entityWellKnown || "").includes("/.well-known/entity.json") &&
    String(disc.website || "").includes("#website") &&
    merchantPack.includes("/.well-known/modules.json")
  ) {
    ok("geo discovery invent well-known modules/sku/pricing/brand/entity/#website");
  } else fail("geo discovery invent well-known modules/sku/pricing/brand/entity/#website");
}

{
  const headers = readText("_headers");
  if (
    headers.includes("/.well-known/modules.json") &&
    headers.includes("/.well-known/sku.json") &&
    headers.includes("/.well-known/pricing.json") &&
    headers.includes("/.well-known/panels.json") &&
    headers.includes("/.well-known/mpn.json") &&
    headers.includes("/.well-known/merchant.json") &&
    headers.includes("/.well-known/prices.json") &&
    headers.includes("/.well-known/price.json") &&
    headers.includes("/.well-known/ard.json") &&
    headers.includes("/.well-known/agents.json") &&
    headers.includes("/humans.txt") &&
    headers.includes("/.well-known/security.txt") &&
    headers.includes("/AGENTS.md") &&
    headers.includes("#website")
  ) {
    ok("_headers Link inventAlias + discovery agents/ard/humans/security/AGENTS");
  } else fail("_headers Link inventAlias + discovery agents/ard/humans/security/AGENTS");
}

if (process.exitCode) {
  console.error("\nlocal-invent-smoke: FAILED");
  process.exit(1);
}
console.log("\nlocal-invent-smoke: OK");
