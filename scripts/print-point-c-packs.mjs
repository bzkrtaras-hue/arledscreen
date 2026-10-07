#!/usr/bin/env node
/**
 * Print copy-ready Point C paste packs from entity-profiles.json.
 * Owner friction reducer — no invented citations; cite packs only.
 *
 * Usage:
 *   npm run point-c
 *   node scripts/print-point-c-packs.mjs [--en] [--pack=gbpDescription]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const profilesPath = path.join(repoRoot, "public/entity-profiles.json");

const TR_ORDER = [
  ["NAP / directoryLong", "directoryLong"],
  ["GBP About", "gbpDescription"],
  ["Instagram Adı", "instagramName"],
  ["Instagram Bio", "instagramBio"],
  ["Facebook About", "facebookAbout"],
  ["LinkedIn About", "linkedinAbout"],
  ["Bing Places", "bingPlaces"],
  ["Apple Business Connect", "appleBusinessConnect"],
  ["YouTube About", "youtubeAbout"],
  ["Yandex Business", "yandexBusiness"],
];

const EN_ORDER = [
  ["EN NAP / directoryLong", "directoryLong"],
  ["EN GBP About", "gbpDescription"],
  ["EN Instagram Name", "instagramName"],
  ["EN Instagram Bio", "instagramBio"],
  ["EN Facebook About", "facebookAbout"],
  ["EN LinkedIn About", "linkedinAbout"],
  ["EN Bing Places", "bingPlaces"],
  ["EN Apple Business Connect", "appleBusinessConnect"],
  ["EN YouTube About", "youtubeAbout"],
  ["EN Yandex Business", "yandexBusiness"],
];

function argFlag(name) {
  return process.argv.includes(`--${name}`);
}
function argValue(name) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : "";
}

if (!fs.existsSync(profilesPath)) {
  console.error("Missing public/entity-profiles.json");
  process.exit(1);
}

const profiles = JSON.parse(fs.readFileSync(profilesPath, "utf8"));
const useEn = argFlag("en");
const packs = useEn ? profiles.packsEn || {} : profiles.packs || {};
const order = useEn ? EN_ORDER : TR_ORDER;
const only = argValue("pack");

console.log("=== ARLEDSCREEN Point C paste packs ===");
console.log(`Source: ${path.relative(repoRoot, profilesPath)}`);
console.log(`Locale: ${useEn ? "EN (packsEn)" : "TR (packs)"}`);
console.log("Rules: paste once; cite + NAP only; no catalog.json / quote-only jargon in public bios.");
console.log("Verify: https://arledscreen.com/entity.json");
console.log("Web must be arledscreen.com (not arleds.com). Postcode 34245.\n");

const checklist = profiles.ownerP0Checklist || [];
if (checklist.length) {
  console.log("--- Owner P0 checklist ---");
  for (const item of checklist) console.log(`- ${item}`);
  console.log("");
}

for (const [label, key] of order) {
  if (only && key !== only) continue;
  const text = packs[key];
  if (text == null || text === "") {
    console.log(`### ${label} (${key})\n(missing)\n`);
    continue;
  }
  console.log(`### ${label} (${key})`);
  console.log("```");
  console.log(String(text));
  console.log("```\n");
}

if (!only) {
  console.log("--- Machine-only (do NOT paste into GBP/IG/FB bios) ---");
  console.log(`Merchant readiness: packs.googleMerchantReadiness`);
  console.log(`prices.rss: ${profiles?.canonicalUrls?.pricesRss || "https://arledscreen.com/feeds/prices.rss"}`);
  console.log(`Playbook: docs/offsite-entity-playbook.md`);
}
