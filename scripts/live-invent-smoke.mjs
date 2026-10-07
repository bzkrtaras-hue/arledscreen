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

if (rss.includes('rel="self"') && rss.includes("xmlns:atom")) ok("prices.rss atom:link self");
else fail("prices.rss atom:link self");

if (aiTxt.includes("#website") && aiTxt.includes("/tr/quote/")) ok("ai.txt WebSite + quote");
else fail("ai.txt WebSite + quote");

if ((agents.itemListElement || []).length >= 14) ok(`agents.json ×${agents.itemListElement.length}`);
else fail("agents.json ≥14");

try {
  const pc = await getText("/point-c.txt");
  if (pc.includes("GBP About") && pc.includes("34245")) ok("point-c.txt paste packs");
  else fail("point-c.txt paste packs");
} catch (e) {
  fail(`point-c.txt ${e?.message || e}`);
}

if (ard?.agentic?.resources?.website?.["@id"] === `${SITE}/#website`) ok("ard.resources.website");
else fail("ard.resources.website");

if (process.exitCode) {
  console.error("\nlive-invent-smoke: FAILED");
  process.exit(1);
}
console.log("\nlive-invent-smoke: OK");
