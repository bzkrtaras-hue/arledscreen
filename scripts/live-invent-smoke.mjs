#!/usr/bin/env node
/**
 * Live invent smoke — entity/brand/catalog/ai/RSS/WebSite joins.
 * Exit 0 only when apex invent graph matches GEO contract.
 *
 * Usage: npm run invent:smoke
 */
const SITE = "https://arledscreen.com";
const bust = () => `?v=${Date.now()}`;

async function getJson(path) {
  const r = await fetch(`${SITE}${path}${bust()}`, { headers: { "cache-control": "no-cache" } });
  if (!r.ok) throw new Error(`${path} HTTP ${r.status}`);
  return r.json();
}

async function getText(path) {
  const r = await fetch(`${SITE}${path}${bust()}`, { headers: { "cache-control": "no-cache" } });
  if (!r.ok) throw new Error(`${path} HTTP ${r.status}`);
  return r.text();
}

function fail(msg) {
  console.error(`FAIL ${msg}`);
  process.exitCode = 1;
}

function ok(msg) {
  console.log(`OK   ${msg}`);
}

const ent = await getJson("/entity.json");
const brand = await getJson("/brand.json");
const cat = await getJson("/catalog.json");
const ai = await getJson("/ai-shopping.json");
const rss = await getText("/feeds/prices.rss");
const aiTxt = await getText("/ai.txt");
const agents = await getJson("/.well-known/agents.json");
const ard = await getJson("/.well-known/ard.json");

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
  (brand.potentialAction || []).some((a) => String(a?.target?.urlTemplate || "").includes("/tr/quote")) &&
  (brand.potentialAction || []).some((a) => String(a?.target?.urlTemplate || "").includes("/en/quote"))
) {
  ok("brand.json OrderAction TR+EN");
} else fail("brand.json OrderAction TR+EN");

if (ai?.brand?.makesOffer?.offerCount === 12 && ai.brand.makesOffer["@type"] === "AggregateOffer") {
  ok("ai-shopping.brand AggregateOffer band×12");
} else fail("ai-shopping.brand AggregateOffer band×12");

if (cat?.brand?.makesOffer?.offerCount === 12 && cat.seller?.["@id"]?.includes("#organization")) {
  ok("catalog.brand band + seller Org");
} else fail("catalog.brand band + seller Org");

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
  rss.includes("geo:next") &&
  rss.includes("geo:ack")
) {
  ok("prices.rss atom:link + invent aliases entity/brand/catalog/geo/point-c + well-known + geo:ack");
} else fail("prices.rss atom:link + invent aliases entity/brand/catalog/geo/point-c + well-known + geo:ack");

if (aiTxt.includes("#website") && aiTxt.includes("/tr/quote/")) ok("ai.txt WebSite + quote");
else fail("ai.txt WebSite + quote");

if (
  (agents.itemListElement || []).length >= 18 &&
  (agents.itemListElement || []).some((it) => String(it?.url || "").includes("#website"))
) {
  ok(`agents.json ×${agents.itemListElement.length} incl #website`);
} else fail("agents.json ≥18 incl #website");

try {
  const blob = `${agents?.description || ""}${JSON.stringify(agents?.itemListElement || [])}`;
  const agentsMd = await getText("/AGENTS.md");
  const llms = await getText("/llms.txt");
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
    agentsDist.includes("/ai-shopping.json") &&
    agentsDist.includes("/entity-profiles.json") &&
    agentsDist.includes("/point-c.txt") &&
    agentsMd.includes("geo:next")
  ) {
    ok("agents distribution + isBasedOn invent + AGENTS geo:next");
  } else fail("agents distribution + isBasedOn invent + AGENTS geo:next");
  if (llms.includes("geo:next") && llms.includes("/.well-known/brand.json")) {
    ok("llms.txt geo:next + well-known/brand");
  } else fail("llms.txt geo:next + well-known/brand");
  const llmsFull = await getText("/llms-full.txt");
  if (llmsFull.includes("geo:next") && llmsFull.includes("/.well-known/brand.json")) {
    ok("llms-full.txt geo:next + well-known/brand");
  } else fail("llms-full.txt geo:next + well-known/brand");
} catch (e) {
  fail(`agents/AGENTS/llms invent ${e?.message || e}`);
}

try {
  const pc = await getText("/point-c.txt");
  if (
    pc.includes("GBP About") &&
    pc.includes("34245") &&
    pc.includes("Hostinger arleds.com") &&
    pc.includes("Hostinger support email") &&
    pc.includes("mailto:support@hostinger.com") &&
    pc.includes("Gmail draft (Send)") &&
    pc.includes("point-c:next") &&
    pc.includes("geo:next") &&
    pc.includes("/.well-known/modules.json")
  ) {
    ok("point-c.txt paste packs + Hostinger 301/email/mailto/draft + invent aliases");
  } else fail("point-c.txt paste packs + Hostinger 301/email/mailto/draft + invent aliases");
} catch (e) {
  fail(`point-c.txt ${e?.message || e}`);
}

try {
  const profiles = await getJson("/entity-profiles.json");
  const based = JSON.stringify(profiles?.isBasedOn || []);
  const dist = JSON.stringify(profiles?.distribution || []);
  if (
    profiles?.["@id"]?.includes("/entity-profiles.json") &&
    based.includes("/entity.json") &&
    based.includes("/brand.json") &&
    based.includes("/ai-shopping.json") &&
    based.includes("/geo-baseline.json") &&
    based.includes("/point-c.txt") &&
    dist.includes("/prices.json") &&
    dist.includes("/catalog.json") &&
    dist.includes("/point-c.txt") &&
    dist.includes("#website") &&
    JSON.stringify(profiles?.ownerP0Checklist || []).includes("geo:next") &&
    JSON.stringify(profiles?.ownerP0Checklist || []).includes("geo:ack") &&
    String(profiles?.canonicalUrls?.website || "").includes("#website") &&
    String(profiles?.description || "").includes("geo:ack") &&
    String(profiles?.mainEntityOfPage?.["@id"] || "").includes("#website") &&
    JSON.stringify(profiles?.isRelatedTo || []).includes("#website")
  ) {
    ok("entity-profiles invent distribution + isBasedOn + geo:next/ack + #website");
  } else fail("entity-profiles invent distribution + isBasedOn + geo:next/ack + #website");
} catch (e) {
  fail(`entity-profiles invent ${e?.message || e}`);
}

try {
  const pcEn = await getText("/point-c-en.txt");
  if (
    pcEn.includes("EN GBP About") &&
    pcEn.includes("arledscreen.com/en/") &&
    pcEn.includes("/.well-known/modules.json")
  ) {
    ok("point-c-en.txt paste packs + invent aliases");
  } else fail("point-c-en.txt paste packs + invent aliases");
} catch (e) {
  fail(`point-c-en.txt ${e?.message || e}`);
}

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

try {
  const tsv = await getText("/feeds/merchant-priced-panels.tsv");
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
    head.includes("ai_shopping_url") &&
    head.includes("prices_json_url") &&
    head.includes("catalog_url") &&
    head.includes("organization_url") &&
    head.includes("geo_baseline_url") &&
    head.includes("website_url") &&
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
    tsv.includes(`${SITE}/offer.json`) &&
    tsv.includes(`${SITE}/organization.json`) &&
    tsv.includes(`${SITE}/geo-baseline.json`) &&
    tsv.includes(`${SITE}/#website`)
  ) {
    ok("merchant TSV feed/wk/org/entity/profiles/point-c/geo/website invent cols");
  } else fail("merchant TSV feed/wk/org/entity/profiles/point-c/geo/website invent cols");
} catch (e) {
  fail(`merchant TSV ${e?.message || e}`);
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
  JSON.stringify(ai.isBasedOn || []).includes("/entity-profiles.json")
) {
  ok("ai-shopping isBasedOn prices.rss + brand + point-c + entity-profiles");
} else fail("ai-shopping isBasedOn prices.rss + brand + point-c + entity-profiles");

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
    dist.includes("#website")
  ) {
    ok("ai-shopping distribution → priceAliases + brand/entity wk/org/point-c/profiles/#website");
  } else fail("ai-shopping distribution → priceAliases + brand/entity wk/org/point-c/profiles/#website");
}

try {
  const g = ai.agentGuidelines || {};
  const humans = await getText("/humans.txt");
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
} catch (e) {
  fail(`ai-shopping/humans/entity FAQ invent ${e?.message || e}`);
}

if (
  JSON.stringify(ent.subjectOf || []).includes("/point-c.txt") &&
  JSON.stringify(ent.subjectOf || []).includes("/brand.json") &&
  JSON.stringify(ent.subjectOf || []).includes("/entity-profiles.json")
) {
  ok("entity.subjectOf → point-c + brand.json + entity-profiles");
} else fail("entity.subjectOf → point-c + brand.json + entity-profiles");

{
  const bs = JSON.stringify(ent?.brand?.subjectOf || []);
  const ls = JSON.stringify(ent?.location?.subjectOf || []);
  if (
    bs.includes("/prices.json") &&
    bs.includes("/point-c.txt") &&
    bs.includes("/entity.json") &&
    bs.includes("/entity-profiles.json") &&
    bs.includes("/.well-known/brand.json") &&
    bs.includes("/geo-baseline.json") &&
    bs.includes("#website") &&
    ls.includes("/prices.json") &&
    ls.includes("/point-c.txt") &&
    ls.includes("/brand.json") &&
    ls.includes("/.well-known/brand.json") &&
    ls.includes("/entity.json") &&
    ls.includes("/entity-profiles.json") &&
    ls.includes("/geo-baseline.json") &&
    ls.includes("#website")
  ) {
    ok("entity nested brand/location subjectOf invent parity + brand-wk/geo/org/#website");
  } else fail("entity nested brand/location subjectOf invent parity + brand-wk/geo/org/#website");
}

if (
  JSON.stringify(brand.subjectOf || []).includes("/point-c.txt") &&
  JSON.stringify(brand.distribution || []).includes("/point-c.txt") &&
  JSON.stringify(brand.subjectOf || []).includes("/entity.json") &&
  JSON.stringify(brand.distribution || []).includes("/entity.json") &&
  JSON.stringify(brand.distribution || []).includes("/organization.json") &&
  JSON.stringify(brand.distribution || []).includes("/prices.json") &&
  JSON.stringify(brand.subjectOf || []).includes("/entity-profiles.json") &&
  JSON.stringify(brand.distribution || []).includes("/entity-profiles.json") &&
  JSON.stringify(brand.distribution || []).includes("#website")
) {
  ok("brand.subjectOf+distribution → point-c + entity/organization + prices + profiles/#website");
} else fail("brand.subjectOf+distribution → point-c + entity/organization + prices + profiles/#website");

{
  const related = JSON.stringify(cat?.isRelatedTo || []);
  const dist = JSON.stringify(cat?.distribution || []);
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
    dist.includes("#website")
  ) {
    ok("catalog distribution invent → ai-shopping/prices/brand/entity/point-c/profiles/#website");
  } else fail("catalog distribution invent → ai-shopping/prices/brand/entity/point-c/profiles/#website");
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

try {
  const geo = await getJson("/geo-baseline.json");
  const based = JSON.stringify(geo?.isBasedOn || []);
  const related = JSON.stringify(geo?.isRelatedTo || []);
  const disc = geo?.discovery || {};
  const profiles = await getJson("/entity-profiles.json");
  const merchantPack = String(profiles?.packs?.googleMerchantReadiness || "");
  if (
    based.includes("/entity.json") &&
    based.includes("/brand.json") &&
    based.includes("/ai-shopping.json") &&
    based.includes("/catalog.json") &&
    based.includes("/feeds/prices.rss") &&
    based.includes("AGENTS.md") &&
    based.includes("/entity-profiles.json") &&
    related.includes("/point-c.txt") &&
    related.includes("/entity-profiles.json")
  ) {
    ok("geo-baseline isBasedOn entity/brand/ai/catalog/AGENTS/profiles + isRelatedTo point-c/profiles");
  } else fail("geo-baseline isBasedOn entity/brand/ai/catalog/AGENTS/profiles + isRelatedTo point-c/profiles");
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
    dist.includes("#website")
  ) {
    ok("geo-baseline distribution invent → ai-shopping/prices/brand/entity/point-c/profiles/#website");
  } else fail("geo-baseline distribution invent → ai-shopping/prices/brand/entity/point-c/profiles/#website");
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
} catch (e) {
  fail(`geo-baseline reverse join ${e?.message || e}`);
}

if (process.exitCode) {
  console.error("\nlive-invent-smoke: FAILED");
  process.exit(1);
}
console.log("\nlive-invent-smoke: OK");
