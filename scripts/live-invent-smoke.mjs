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

async function getStatus(path) {
  const r = await fetch(`${SITE}${path}${bust()}`, {
    method: "GET",
    headers: { "cache-control": "no-cache" },
    redirect: "manual",
  });
  // Drain body so sockets can close cleanly on large assets.
  try {
    await r.arrayBuffer();
  } catch {
    /* ignore */
  }
  return r.status;
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
  rss.includes('href="https://arledscreen.com/offer.json"') &&
  rss.includes('href="https://arledscreen.com/offers.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/offer.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/offers.json"') &&
  rss.includes('href="https://arledscreen.com/dataset.json"') &&
  rss.includes('href="https://arledscreen.com/feed.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/dataset.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/feed.json"') &&
  rss.includes('href="https://arledscreen.com/products.json"') &&
  rss.includes('href="https://arledscreen.com/product.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/products.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/product.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/catalog.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/geo-baseline.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/entity-profiles.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/ai-shopping.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/llms.txt"') &&
  rss.includes('href="https://arledscreen.com/agents.json"') &&
  rss.includes('href="https://arledscreen.com/.well-known/point-c.txt"') &&
  rss.includes("/entity-profiles.json") &&
  rss.includes("/.well-known/brand.json") &&
  rss.includes("/.well-known/entity.json") &&
  rss.includes("/.well-known/agents.json") &&
  rss.includes("/.well-known/ard.json") &&
  rss.includes("/ai.txt") &&
  rss.includes("/llms.txt") &&
  rss.includes("/llms-full.txt") &&
  rss.includes("/humans.txt") &&
  rss.includes("/AGENTS.md") &&
  rss.includes("/.well-known/security.txt") &&
  rss.includes("geo:next") &&
  rss.includes("geo:ack")
) {
  ok("prices.rss atom:link + invent aliases + discovery agents/ard/ai/llms/llms-full/humans/AGENTS/security");
} else fail("prices.rss atom:link + invent aliases + discovery agents/ard/ai/llms/llms-full/humans/AGENTS/security");

if (aiTxt.includes("#website") && aiTxt.includes("/tr/quote/")) ok("ai.txt WebSite + quote");
else fail("ai.txt WebSite + quote");

if (
  (agents.itemListElement || []).length >= 20 &&
  (agents.itemListElement || []).some((it) => String(it?.url || "").includes("#website")) &&
  (agents.itemListElement || []).some((it) => String(it?.url || "").includes("/.well-known/security.txt")) &&
  (agents.itemListElement || []).some((it) => String(it?.url || "").includes("/llms-full.txt"))
) {
  ok(`agents.json ×${agents.itemListElement.length} incl #website + security + llms-full`);
} else fail("agents.json ≥20 incl #website + security + llms-full");

try {
  const blob = `${agents?.description || ""}${JSON.stringify(agents?.itemListElement || [])}`;
  const agentsMd = await getText("/AGENTS.md");
  const llms = await getText("/llms.txt");
  if (
    blob.includes("/.well-known/modules.json") &&
    blob.includes("/.well-known/pricing.json") &&
    blob.includes("/api/catalog.json") &&
    blob.includes("/api/v1/prices") &&
    blob.includes("/.well-known/security") &&
    agentsMd.includes("/.well-known/modules.json") &&
    agentsMd.includes("/api/v1/prices") &&
    agentsMd.includes("/api/catalog.json") &&
    agentsMd.includes("/api/products") &&
    agentsMd.includes("/tr/prices.json") &&
    agentsMd.includes("/data/prices.json") &&
    agentsMd.includes("/llms-full") &&
    agentsMd.includes("/.well-known/security") &&
    llms.includes("/.well-known/sku.json")
  ) {
    ok("agents/AGENTS/llms invent well-known modules/sku/pricing + api/locale");
  } else fail("agents/AGENTS/llms invent well-known modules/sku/pricing + api/locale");
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
    agentsBased.includes("/llms-full.txt") &&
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
    agentsDist.includes("/llms-full.txt") &&
    agentsDist.includes("/humans.txt") &&
    agentsDist.includes("/AGENTS.md") &&
    agentsDist.includes("/.well-known/security.txt") &&
    agentsMd.includes("geo:next")
  ) {
    ok("agents distribution + isBasedOn inventAlias + discovery ai/llms/humans/AGENTS/security");
  } else fail("agents distribution + isBasedOn inventAlias + discovery ai/llms/humans/AGENTS/security");
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
    pc.includes("DNSEnable") &&
    pc.includes("Domain Redirect") &&
    pc.includes("mailto:support@hostinger.com") &&
    pc.includes("Gmail draft (Send)") &&
    pc.includes("point-c:next") &&
    pc.includes("geo:next") &&
    pc.includes("/.well-known/modules.json") &&
    pc.includes("/.well-known/panels.json") &&
    pc.includes("/.well-known/mpn.json") &&
    pc.includes("/.well-known/merchant.json") &&
    pc.includes("/.well-known/agents.json") &&
    pc.includes("/.well-known/ard.json") &&
    pc.includes("/ai.txt") &&
    pc.includes("/llms.txt") &&
    pc.includes("/llms-full.txt") &&
    pc.includes("/humans.txt") &&
    pc.includes("/AGENTS.md") &&
    pc.includes("/.well-known/security.txt")
  ) {
    ok("point-c.txt paste packs + DNSEnable/Hostinger 301 dual-path + invent aliases");
  } else fail("point-c.txt paste packs + DNSEnable/Hostinger 301 dual-path + invent aliases");
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
    JSON.stringify(profiles?.ownerP0Checklist || []).includes("DNSEnable") &&
    JSON.stringify(profiles?.ownerP0Checklist || []).includes("Domain Redirect") &&
    String(profiles?.canonicalUrls?.website || "").includes("#website") &&
    String(profiles?.description || "").includes("geo:ack") &&
    String(profiles?.mainEntityOfPage?.["@id"] || "").includes("#website") &&
    JSON.stringify(profiles?.isRelatedTo || []).includes("#website")
  ) {
    ok("entity-profiles invent distribution + isBasedOn modules/sku/pricing + #website");
  } else fail("entity-profiles invent distribution + isBasedOn modules/sku/pricing + #website");
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
    allow.includes("/.well-known/agents.json") &&
    allow.includes("/agents.json") &&
    allow.includes("/.well-known/security.txt") &&
    allow.includes("/api/v1/prices") &&
    allow.includes("/v1/prices") &&
    allow.includes("/data/prices.json") &&
    allow.includes("/feeds/prices.json") &&
    allow.includes("/api/mpn") &&
    allow.includes("/api/entity") &&
    allow.includes("/en/prices.json") &&
    allow.includes("/tr/prices.json") &&
    allow.includes("/.well-known/security") &&
    trEx.includes("/.well-known/modules.json") &&
    trEx.includes("/.well-known/pricing.json") &&
    trEx.includes("/data/prices.json") &&
    String(res.modulesJson?.wellKnown || "").includes("/.well-known/modules.json") &&
    String(res.skuJson?.wellKnown || "").includes("/.well-known/sku.json") &&
    String(res.aiShopping?.description || "").includes("/.well-known/modules.json") &&
    String(res.apiV1Prices?.url || "").includes("/api/v1/prices") &&
    String(res.dataPrices?.url || "").includes("/data/prices.json") &&
    String(res.apiCatalog?.url || "").includes("/api/catalog.json") &&
    Array.isArray(res.localeInvent?.pricedPanels) &&
    JSON.stringify(res.localeInvent?.pricedPanels || []).includes("/en/pricing.json") &&
    JSON.stringify(res.localeInvent?.discovery || []).includes("/agent.json") &&
    String(res.datasetJson?.url || "").includes("/dataset.json") &&
    String(res.productsJson?.url || "").includes("/products.json") &&
    String(res.brandExtless?.url || "").includes("/brand") &&
    String(res.modulesExtless?.url || "").includes("/modules") &&
    String(res.feedJson?.url || "").includes("/feed.json") &&
    String(res.productExtless?.url || "").includes("/product") &&
    String(res.entityExtless?.url || "").includes("/entity") &&
    String(res.securityRoot?.url || "").includes("/security.txt") &&
    String(res.offersJson?.url || "").includes("/offers.json") &&
    String(res.panelsExtless?.url || "").includes("/panels") &&
    String(res.mpnExtless?.url || "").includes("/mpn") &&
    String(res.merchantExtless?.url || "").includes("/merchant") &&
    String(res.skuExtless?.url || "").includes("/sku") &&
    String(res.organizationExtless?.url || "").includes("/organization") &&
    String(res.citeExtless?.url || "").includes("/cite") &&
    String(res.pointCWellKnown?.url || "").includes("/.well-known/point-c.txt") &&
    String(res.agentsJsonRoot?.url || "").includes("/agents.json") &&
    String(res.agentJsonRoot?.url || "").includes("/agent.json") &&
    allow.includes("/en/pricing.json") &&
    allow.includes("/en/entity.json") &&
    allow.includes("/api/products") &&
    allow.includes("/.well-known/ai-shopping.json") &&
    allow.includes("/organization") &&
    allow.includes("/brand") &&
    allow.includes("/modules") &&
    allow.includes("/product") &&
    allow.includes("/offer") &&
    allow.includes("/.well-known/llms-full.txt")
  ) {
    ok("ard invent allow + resources modules/sku + agents/security + aiShopping invent");
  } else fail("ard invent allow + resources modules/sku + agents/security + aiShopping invent");
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
    head.includes("llms_full_url") &&
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
    tsv.includes(`${SITE}/llms-full.txt`) &&
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
  const entSame = JSON.stringify(ent.sameAs || []);
  if (
    aiSame.includes("/brand.json") &&
    aiSame.includes("/geo-baseline.json") &&
    aiSame.includes("/entity-profiles.json") &&
    aiSame.includes("/.well-known/panels.json") &&
    aiSame.includes("/.well-known/agents.json") &&
    aiSame.includes("/llms-full.txt") &&
    aiSame.includes("/humans.txt") &&
    aiSame.includes("/AGENTS.md") &&
    aiSame.includes("/.well-known/security.txt") &&
    aiSame.includes("/prices.json") &&
    aiSame.includes("/.well-known/llms.txt") &&
    aiSame.includes("/agents.json") &&
    aiSame.includes("/brand") &&
    aiSame.includes("/modules") &&
    aiSame.includes("/.well-known/organization.json") &&
    brandSame.includes("/ai-shopping.json") &&
    brandSame.includes("/geo-baseline.json") &&
    brandSame.includes("/entity-profiles.json") &&
    brandSame.includes("/.well-known/modules.json") &&
    brandSame.includes("/offer.json") &&
    brandSame.includes("/.well-known/offer.json") &&
    brandSame.includes("/dataset.json") &&
    brandSame.includes("/.well-known/dataset.json") &&
    brandSame.includes("/products.json") &&
    brandSame.includes("/.well-known/products.json") &&
    brandSame.includes("/.well-known/catalog.json") &&
    brandSame.includes("/.well-known/ard.json") &&
    brandSame.includes("/ai.txt") &&
    brandSame.includes("/.well-known/security.txt") &&
    catSame.includes("/geo-baseline.json") &&
    catSame.includes("/entity-profiles.json") &&
    catSame.includes("/.well-known/sku.json") &&
    catSame.includes("/offers.json") &&
    catSame.includes("/.well-known/offers.json") &&
    catSame.includes("/feed.json") &&
    catSame.includes("/.well-known/feed.json") &&
    catSame.includes("/products.json") &&
    catSame.includes("/.well-known/products.json") &&
    catSame.includes("/.well-known/catalog.json") &&
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
    entSame.includes("/offer.json") &&
    entSame.includes("/.well-known/offer.json") &&
    entSame.includes("/dataset.json") &&
    entSame.includes("/.well-known/dataset.json") &&
    entSame.includes("/products.json") &&
    entSame.includes("/.well-known/products.json") &&
    entSame.includes("/.well-known/catalog.json") &&
    entSame.includes("/cite.json") &&
    entSame.includes("/.well-known/cite.json") &&
    entSame.includes("/.well-known/faq.json") &&
    entSame.includes("/.well-known/organization.json") &&
    entSame.includes("/company.json") &&
    entSame.includes("/nap.json") &&
    entSame.includes("/about.json") &&
    entSame.includes("/.well-known/company.json") &&
    entSame.includes("/.well-known/nap.json") &&
    entSame.includes("/.well-known/about.json") &&
    entSame.includes("/faqs.json") &&
    entSame.includes("/.well-known/faqs.json") &&
    entSame.includes("/.well-known/geo-baseline.json") &&
    entSame.includes("/.well-known/entity-profiles.json") &&
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
    dist.includes("/offer.json") &&
    dist.includes("/offers.json") &&
    dist.includes("/.well-known/offer.json") &&
    dist.includes("/.well-known/offers.json") &&
    dist.includes("/dataset.json") &&
    dist.includes("/feed.json") &&
    dist.includes("/.well-known/dataset.json") &&
    dist.includes("/.well-known/feed.json") &&
    dist.includes("/products.json") &&
    dist.includes("/product.json") &&
    dist.includes("/.well-known/products.json") &&
    dist.includes("/.well-known/product.json") &&
    dist.includes("/.well-known/catalog.json") &&
    dist.includes("/.well-known/geo-baseline.json") &&
    dist.includes("/.well-known/entity-profiles.json") &&
    dist.includes("/.well-known/ai-shopping.json") &&
    dist.includes("/prices.json") &&
    dist.includes("/panels.json") &&
    dist.includes("/.well-known/llms.txt") &&
    dist.includes("/agents.json") &&
    dist.includes("/.well-known/point-c.txt") &&
    dist.includes("/brand") &&
    dist.includes("/modules") &&
    dist.includes("/.well-known/organization.json") &&
    dist.includes("/cite.json") &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/sku`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/mpn`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/merchant`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/offers`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/dataset`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/feed`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/products`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/product`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/geo-baseline`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/company`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/nap`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/cite`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/faq`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/faqs`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/ai-shopping`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/entity-profiles`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/llms`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/llms-full`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/api/v1/prices`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/api/panels.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/api/merchant.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/api/catalog`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/api/mpn`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/api/entity`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/api/catalog.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/api/products`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/v1/prices`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/data/prices.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/feeds/prices.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/en/prices.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/tr/prices.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/en/pricing.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/tr/catalog.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/en/entity.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/tr/entity.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/agent.json`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/en/llms.txt`) &&
    (ai.distribution || []).some((d) => d.contentUrl === `${SITE}/tr/llms.txt`) &&
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
    dist.includes("/llms-full.txt") &&
    dist.includes("/humans.txt") &&
    dist.includes("/AGENTS.md") &&
    dist.includes("/.well-known/security.txt") &&
    dist.includes("/security.txt") &&
    dist.includes("/.well-known/security")
  ) {
    ok("ai-shopping distribution → inventAlias + discovery agents/ard/ai/llms/llms-full/humans/AGENTS/security");
  } else fail("ai-shopping distribution → inventAlias + discovery agents/ard/ai/llms/llms-full/humans/AGENTS/security");
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
    humans.includes("/.well-known/security.txt") &&
    faq.includes("/.well-known/modules.json")
  ) {
    ok("ai-shopping/humans/entity FAQ invent well-known modules/sku/pricing + security");
  } else fail("ai-shopping/humans/entity FAQ invent well-known modules/sku/pricing + security");
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
  JSON.stringify(brand.subjectOf || []).includes("/point-c.txt") &&
  JSON.stringify(brand.distribution || []).includes("/point-c.txt") &&
  JSON.stringify(brand.subjectOf || []).includes("/entity.json") &&
  JSON.stringify(brand.distribution || []).includes("/entity.json") &&
  JSON.stringify(brand.distribution || []).includes("/organization.json") &&
  JSON.stringify(brand.distribution || []).includes("/prices.json") &&
  JSON.stringify(brand.subjectOf || []).includes("/entity-profiles.json") &&
  JSON.stringify(brand.distribution || []).includes("/entity-profiles.json") &&
  JSON.stringify(brand.distribution || []).includes("#website") &&
  JSON.stringify(brand.isBasedOn || []).includes("/ai-shopping.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/catalog.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/geo-baseline.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/point-c.txt") &&
  JSON.stringify(brand.isBasedOn || []).includes("/entity-profiles.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("#website") &&
  JSON.stringify(brand.isBasedOn || []).includes("/.well-known/modules.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/.well-known/panels.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/.well-known/mpn.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/offer.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/.well-known/offer.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/dataset.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/.well-known/dataset.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/products.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/.well-known/products.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/.well-known/catalog.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/.well-known/geo-baseline.json") &&
  JSON.stringify(brand.isBasedOn || []).includes("/.well-known/entity-profiles.json") &&
  JSON.stringify(brand.distribution || []).includes("/.well-known/modules.json") &&
  JSON.stringify(brand.distribution || []).includes("/.well-known/panels.json") &&
  JSON.stringify(brand.distribution || []).includes("/.well-known/mpn.json") &&
  JSON.stringify(brand.distribution || []).includes("/.well-known/merchant.json") &&
  JSON.stringify(brand.distribution || []).includes("/offer.json") &&
  JSON.stringify(brand.distribution || []).includes("/.well-known/offer.json") &&
  JSON.stringify(brand.distribution || []).includes("/dataset.json") &&
  JSON.stringify(brand.distribution || []).includes("/.well-known/dataset.json") &&
  JSON.stringify(brand.distribution || []).includes("/products.json") &&
  JSON.stringify(brand.distribution || []).includes("/.well-known/products.json") &&
  JSON.stringify(brand.distribution || []).includes("/.well-known/catalog.json")
) {
  ok("brand.subjectOf+distribution+isBasedOn → inventAlias panels/mpn/merchant/offer/dataset/products + #website");
} else fail("brand.subjectOf+distribution+isBasedOn → inventAlias panels/mpn/merchant/offer/dataset/products + #website");

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
    based.includes("/offer.json") &&
    based.includes("/.well-known/offer.json") &&
    based.includes("/dataset.json") &&
    based.includes("/feed.json") &&
    dist.includes("/.well-known/modules.json") &&
    dist.includes("/.well-known/panels.json") &&
    dist.includes("/.well-known/mpn.json") &&
    dist.includes("/.well-known/merchant.json") &&
    dist.includes("/offers.json") &&
    dist.includes("/.well-known/offers.json") &&
    dist.includes("/dataset.json") &&
    dist.includes("/feed.json") &&
    dist.includes("/.well-known/dataset.json") &&
    dist.includes("/.well-known/feed.json") &&
    dist.includes("/products.json") &&
    dist.includes("/.well-known/products.json") &&
    dist.includes("/.well-known/catalog.json") &&
    based.includes("/products.json") &&
    based.includes("/.well-known/products.json") &&
    based.includes("/.well-known/catalog.json") &&
    based.includes("/.well-known/geo-baseline.json") &&
    based.includes("/.well-known/entity-profiles.json") &&
    based.includes("/.well-known/ai-shopping.json") &&
    dist.includes("/.well-known/geo-baseline.json") &&
    dist.includes("/.well-known/entity-profiles.json") &&
    dist.includes("/.well-known/ai-shopping.json")
  ) {
    ok("catalog distribution+isBasedOn invent → inventAlias panels/mpn/merchant/offer/dataset/feed/products/geo/ai-shopping-wk + #website");
  } else fail("catalog distribution+isBasedOn invent → inventAlias panels/mpn/merchant/offer/dataset/feed/products/geo/ai-shopping-wk + #website");
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
    String(disc.offerJson || "").includes("/offer.json") &&
    String(disc.offerWellKnown || "").includes("/.well-known/offer.json") &&
    String(disc.offersWellKnown || "").includes("/.well-known/offers.json") &&
    String(disc.datasetJson || "").includes("/dataset.json") &&
    String(disc.feedJson || "").includes("/feed.json") &&
    String(disc.datasetWellKnown || "").includes("/.well-known/dataset.json") &&
    String(disc.feedWellKnown || "").includes("/.well-known/feed.json") &&
    String(disc.productsJson || "").includes("/products.json") &&
    String(disc.productJson || "").includes("/product.json") &&
    String(disc.productsWellKnown || "").includes("/.well-known/products.json") &&
    String(disc.productWellKnown || "").includes("/.well-known/product.json") &&
    String(disc.catalogWellKnown || "").includes("/.well-known/catalog.json") &&
    String(disc.geoBaselineWellKnown || "").includes("/.well-known/geo-baseline.json") &&
    String(disc.entityProfilesWellKnown || "").includes("/.well-known/entity-profiles.json") &&
    String(disc.aiShoppingWellKnown || "").includes("/.well-known/ai-shopping.json") &&
    String(disc.llmsWellKnown || "").includes("/.well-known/llms.txt") &&
    String(disc.agentsJsonRoot || "").includes("/agents.json") &&
    String(disc.pointCWellKnown || "").includes("/.well-known/point-c.txt") &&
    String(disc.brandExtless || "").includes("/brand") &&
    String(disc.modulesExtless || "").includes("/modules") &&
    String(disc.panelsExtless || "").includes("/panels") &&
    String(disc.skuExtless || "").includes("/sku") &&
    String(disc.mpnExtless || "").includes("/mpn") &&
    String(disc.merchantExtless || "").includes("/merchant") &&
    String(disc.productsExtless || "").includes("/products") &&
    String(disc.productExtless || "").includes("/product") &&
    String(disc.entityExtless || "").includes("/entity") &&
    String(disc.catalogExtless || "").includes("/catalog") &&
    String(disc.priceJson || "").includes("/price.json") &&
    String(disc.pricingJson || "").includes("/pricing.json") &&
    String(disc.securityRoot || "").includes("/security.txt") &&
    String(disc.llmsFullText || "").includes("/llms-full.txt") &&
    String(disc.llmsText || "").includes("/llms.txt") &&
    String(disc.calculator || "").includes("/tr/hesaplayici/") &&
    String(disc.enCalculator || "").includes("/en/hesaplayici/") &&
    String(disc.inventCalculatorEn || "").includes("/en/calculator/") &&
    String(disc.geoBaselineExtless || "").includes("/geo-baseline") &&
    String(disc.aiShoppingExtless || "").includes("/ai-shopping") &&
    String(disc.entityProfilesExtless || "").includes("/entity-profiles") &&
    String(disc.llmsExtless || "").includes("/llms") &&
    String(disc.apiV1Prices || "").includes("/api/v1/prices") &&
    String(disc.apiMpn || "").includes("/api/mpn") &&
    String(disc.apiEntity || "").includes("/api/entity") &&
    String(disc.v1Prices || "").includes("/v1/prices") &&
    String(disc.dataPricesJson || "").includes("/data/prices.json") &&
    String(disc.feedsPricesJson || "").includes("/feeds/prices.json") &&
    String(disc.enPricesJson || "").includes("/en/prices.json") &&
    String(disc.trPricesJson || "").includes("/tr/prices.json") &&
    String(disc.enPricingJson || "").includes("/en/pricing.json") &&
    String(disc.enEntityJson || "").includes("/en/entity.json") &&
    String(disc.trEntityJson || "").includes("/tr/entity.json") &&
    String(disc.apiCatalogJson || "").includes("/api/catalog.json") &&
    String(disc.apiProducts || "").includes("/api/products") &&
    String(disc.agentJsonRoot || "").includes("/agent.json") &&
    String(disc.enLlms || "").includes("/en/llms.txt") &&
    String(disc.trLlms || "").includes("/tr/llms.txt") &&
    String(disc.securityTxtRoot || "").includes("/security.txt") &&
    String(disc.securityExtless || "").includes("/.well-known/security") &&
    String(disc.brandWellKnown || "").includes("/.well-known/brand.json") &&
    String(disc.entityWellKnown || "").includes("/.well-known/entity.json") &&
    String(disc.website || "").includes("#website") &&
    merchantPack.includes("/.well-known/modules.json")
  ) {
    ok("geo discovery invent well-known modules/sku/pricing/offer/products/brand/entity/#website");
  } else fail("geo discovery invent well-known modules/sku/pricing/offer/products/brand/entity/#website");
} catch (e) {
  fail(`geo-baseline reverse join ${e?.message || e}`);
}

try {
  const r = await fetch(`${SITE}/tr/${bust()}`, { method: "HEAD", headers: { "cache-control": "no-cache" } });
  const link = r.headers.get("link") || "";
  if (
    link.includes("/.well-known/modules.json") &&
    link.includes("/.well-known/sku.json") &&
    link.includes("/.well-known/pricing.json") &&
    link.includes("/.well-known/panels.json") &&
    link.includes("/.well-known/mpn.json") &&
    link.includes("/.well-known/merchant.json") &&
    link.includes("/.well-known/prices.json") &&
    link.includes("/.well-known/price.json") &&
    link.includes("/offer.json") &&
    link.includes("/offers.json") &&
    link.includes("/.well-known/offer.json") &&
    link.includes("/.well-known/offers.json") &&
    link.includes("/dataset.json") &&
    link.includes("/feed.json") &&
    link.includes("/.well-known/dataset.json") &&
    link.includes("/.well-known/feed.json") &&
    link.includes("/products.json") &&
    link.includes("/product.json") &&
    link.includes("/.well-known/products.json") &&
    link.includes("/.well-known/product.json") &&
    link.includes("/.well-known/catalog.json") &&
    link.includes("/.well-known/geo-baseline.json") &&
    link.includes("/.well-known/entity-profiles.json") &&
    link.includes("/.well-known/faqs.json") &&
    link.includes("/.well-known/ai-shopping.json") &&
    link.includes("/.well-known/llms.txt") &&
    link.includes("/agents.json") &&
    link.includes("/.well-known/point-c.txt") &&
    link.includes("/brand") &&
    link.includes("/modules") &&
    link.includes("/sku") &&
    link.includes("/mpn") &&
    link.includes("/merchant") &&
    link.includes("/offers") &&
    link.includes("/dataset") &&
    link.includes("/feed") &&
    link.includes("/products") &&
    link.includes("/product") &&
    link.includes("/geo-baseline") &&
    link.includes("/company") &&
    link.includes("/ai-shopping") &&
    link.includes("/entity-profiles") &&
    link.includes("/api/v1/prices") &&
    link.includes("/api/mpn") &&
    link.includes("/api/entity") &&
    link.includes("/v1/prices") &&
    link.includes("/data/prices.json") &&
    link.includes("/feeds/prices.json") &&
    link.includes("/en/prices.json") &&
    link.includes("/tr/prices.json") &&
    link.includes("/api/catalog.json") &&
    link.includes("/api/products") &&
    link.includes("/en/pricing.json") &&
    link.includes("/en/entity.json") &&
    link.includes("/agent.json") &&
    link.includes("/en/llms.txt") &&
    link.includes("/tr/llms.txt") &&
    link.includes("/security.txt") &&
    link.includes("/.well-known/security") &&
    link.includes("/llms") &&
    link.includes("/.well-known/ard.json") &&
    link.includes("/.well-known/agents.json") &&
    link.includes("/humans.txt") &&
    link.includes("/.well-known/security.txt") &&
    link.includes("/llms-full.txt") &&
    link.includes("/AGENTS.md") &&
    link.includes("#website")
  ) {
    ok("live Link inventAlias + discovery agents/ard/humans/security/llms-full/AGENTS");
  } else fail("live Link inventAlias + discovery agents/ard/humans/security/llms-full/AGENTS");
} catch (e) {
  fail(`live Link invent ${e?.message || e}`);
}

try {
  const brandCode = await getStatus("/brand");
  const modulesCode = await getStatus("/modules");
  const brandAsset = await getStatus("/brand/nxtionstar-logo.png");
  const modulesAsset = await getStatus("/modules/nxtionstar-p1-25-ic-mekan-modul.webp");
  if (brandCode === 200 && modulesCode === 200 && brandAsset === 200 && modulesAsset === 200) {
    ok("live /brand+/modules invent rewrite 200 + assets intact");
  } else {
    fail(
      `live /brand+/modules invent rewrite 200 + assets intact (brand=${brandCode} modules=${modulesCode} brandAsset=${brandAsset} modulesAsset=${modulesAsset})`,
    );
  }
} catch (e) {
  fail(`live /brand+/modules invent rewrite ${e?.message || e}`);
}

if (process.exitCode) {
  console.error("\nlive-invent-smoke: FAILED");
  process.exit(1);
}
console.log("\nlive-invent-smoke: OK");
