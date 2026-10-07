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
  rss.includes('href="https://arledscreen.com/.well-known/merchant.json"')
) {
  ok("prices.rss atom:link + invent aliases entity/brand/catalog/geo/point-c + well-known");
} else fail("prices.rss atom:link + invent aliases entity/brand/catalog/geo/point-c + well-known");

if (aiTxt.includes("#website") && aiTxt.includes("/tr/quote/")) ok("ai.txt WebSite + quote");
else fail("ai.txt WebSite + quote");

if ((agents.itemListElement || []).length >= 17) ok(`agents.json ×${agents.itemListElement.length}`);
else fail("agents.json ≥17");

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
    JSON.stringify(profiles?.ownerP0Checklist || []).includes("geo:next")
  ) {
    ok("entity-profiles invent distribution + isBasedOn + geo:next");
  } else fail("entity-profiles invent distribution + isBasedOn + geo:next");
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
}

try {
  const tsv = await getText("/feeds/merchant-priced-panels.tsv");
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
  JSON.stringify(ent.subjectOf || []).includes("/brand.json")
) {
  ok("entity.subjectOf → point-c + brand.json");
} else fail("entity.subjectOf → point-c + brand.json");

{
  const bs = JSON.stringify(ent?.brand?.subjectOf || []);
  const ls = JSON.stringify(ent?.location?.subjectOf || []);
  if (
    bs.includes("/prices.json") &&
    bs.includes("/point-c.txt") &&
    bs.includes("/entity.json") &&
    ls.includes("/prices.json") &&
    ls.includes("/point-c.txt") &&
    ls.includes("/brand.json")
  ) {
    ok("entity nested brand/location subjectOf invent parity");
  } else fail("entity nested brand/location subjectOf invent parity");
}

if (
  JSON.stringify(brand.subjectOf || []).includes("/point-c.txt") &&
  JSON.stringify(brand.distribution || []).includes("/point-c.txt") &&
  JSON.stringify(brand.subjectOf || []).includes("/entity.json") &&
  JSON.stringify(brand.distribution || []).includes("/entity.json") &&
  JSON.stringify(brand.distribution || []).includes("/organization.json") &&
  JSON.stringify(brand.distribution || []).includes("/prices.json")
) {
  ok("brand.subjectOf+distribution → point-c + entity/organization + prices");
} else fail("brand.subjectOf+distribution → point-c + entity/organization + prices");

{
  const related = JSON.stringify(cat?.isRelatedTo || []);
  const dist = JSON.stringify(cat?.distribution || []);
  if (related.includes("/entity.json") && related.includes("/brand.json")) {
    ok("catalog isRelatedTo entity + brand");
  } else fail("catalog isRelatedTo entity + brand");
  if (
    dist.includes("/ai-shopping.json") &&
    dist.includes("/prices.json") &&
    dist.includes("/brand.json") &&
    dist.includes("/entity.json") &&
    dist.includes("/point-c.txt")
  ) {
    ok("catalog distribution invent → ai-shopping/prices/brand/entity/point-c");
  } else fail("catalog distribution invent → ai-shopping/prices/brand/entity/point-c");
}

{
  const site = ent?.mainEntityOfPage || {};
  const blob = JSON.stringify(site.subjectOf || []) + JSON.stringify(site.sameAs || []);
  if (
    site?.["@id"]?.includes("#website") &&
    blob.includes("/ai-shopping.json") &&
    blob.includes("/prices.json") &&
    blob.includes("/brand.json") &&
    blob.includes("/point-c.txt")
  ) {
    ok("entity WebSite invent subjectOf/sameAs");
  } else fail("entity WebSite invent subjectOf/sameAs");
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
    related.includes("/point-c.txt")
  ) {
    ok("geo-baseline isBasedOn entity/brand/ai/catalog/AGENTS + isRelatedTo point-c");
  } else fail("geo-baseline isBasedOn entity/brand/ai/catalog/AGENTS + isRelatedTo point-c");
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
    dist.includes("AGENTS.md")
  ) {
    ok("geo-baseline distribution invent → ai-shopping/prices/brand/entity/point-c");
  } else fail("geo-baseline distribution invent → ai-shopping/prices/brand/entity/point-c");
  if (
    String(disc.modulesWellKnown || "").includes("/.well-known/modules.json") &&
    String(disc.skuWellKnown || "").includes("/.well-known/sku.json") &&
    String(disc.pricingWellKnown || "").includes("/.well-known/pricing.json") &&
    String(disc.brandWellKnown || "").includes("/.well-known/brand.json") &&
    String(disc.entityWellKnown || "").includes("/.well-known/entity.json") &&
    merchantPack.includes("/.well-known/modules.json")
  ) {
    ok("geo discovery invent well-known modules/sku/pricing/brand/entity");
  } else fail("geo discovery invent well-known modules/sku/pricing/brand/entity");
} catch (e) {
  fail(`geo-baseline reverse join ${e?.message || e}`);
}

if (process.exitCode) {
  console.error("\nlive-invent-smoke: FAILED");
  process.exit(1);
}
console.log("\nlive-invent-smoke: OK");
