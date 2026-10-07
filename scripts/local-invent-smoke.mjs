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

if (rss.includes('rel="self"') && rss.includes("xmlns:atom")) ok("prices.rss atom:link self");
else fail("prices.rss atom:link self");

if (aiTxt.includes("#website") && aiTxt.includes("/tr/quote/")) ok("ai.txt WebSite + quote");
else fail("ai.txt WebSite + quote");

if ((agents?.itemListElement || []).length >= 14) ok(`agents.json ×${agents.itemListElement.length}`);
else fail("agents.json ≥14");

const pointC = readText("point-c.txt");
if (pointC.includes("GBP About") && pointC.includes("34245")) ok("point-c.txt paste packs");
else fail("point-c.txt paste packs");

const pointCEn = readText("point-c-en.txt");
if (pointCEn.includes("EN GBP About") && pointCEn.includes("arledscreen.com/en/")) ok("point-c-en.txt paste packs");
else fail("point-c-en.txt paste packs");

if (ard?.agentic?.resources?.website?.["@id"] === `${SITE}/#website`) ok("ard.resources.website");
else fail("ard.resources.website");

if (JSON.stringify(ai.isBasedOn || []).includes("/feeds/prices.rss")) ok("ai-shopping isBasedOn prices.rss");
else fail("ai-shopping isBasedOn prices.rss");

if (process.exitCode) {
  console.error("\nlocal-invent-smoke: FAILED");
  process.exit(1);
}
console.log("\nlocal-invent-smoke: OK");
