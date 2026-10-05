#!/usr/bin/env node
/**
 * Print / validate Point C paste packs from public/entity-profiles.json (local) or LIVE URL.
 * Usage:
 *   node scripts/print-point-c-packs.mjs
 *   node scripts/print-point-c-packs.mjs --live
 *   node scripts/print-point-c-packs.mjs --check   (cite/URL dry-run; no paste)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const live = process.argv.includes("--live");
const checkOnly = process.argv.includes("--check");
const ORDER = [
  "gbpDescription",
  "linkedinAbout",
  "instagramBio",
  "facebookAbout",
  "directoryShort",
  "directoryLong",
  "youtubeAbout",
  "appleBusinessConnect",
  "yandexBusiness",
  "wikidataReadiness",
];

async function load() {
  if (live) {
    const res = await fetch("https://arledscreen.com/entity-profiles.json", {
      headers: { "user-agent": "ARLEDSCREEN-point-c-packs/1.0" },
    });
    if (!res.ok) throw new Error(`LIVE HTTP ${res.status}`);
    return res.json();
  }
  const p = path.join(root, "public/entity-profiles.json");
  if (!fs.existsSync(p)) throw new Error("missing public/entity-profiles.json — run npm run entity");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function validate(doc) {
  const errors = [];
  const packs = doc.packs || {};
  const entityPath = path.join(root, "public/entity.json");
  if (!fs.existsSync(entityPath) && !live) {
    errors.push("missing public/entity.json for cite check");
  }
  let citeMedium = "";
  let telephone = "";
  if (fs.existsSync(entityPath)) {
    const entity = JSON.parse(fs.readFileSync(entityPath, "utf8"));
    citeMedium = entity.citeMedium || "";
    telephone = String(entity.telephone || "");
  }

  for (const key of ORDER) {
    if (!packs[key] || String(packs[key]).length < 20) {
      errors.push(`packs.${key} missing/short`);
    }
  }
  if (citeMedium && packs.gbpDescription !== citeMedium) {
    errors.push("packs.gbpDescription must equal entity.citeMedium");
  }
  if (citeMedium && packs.facebookAbout !== citeMedium) {
    errors.push("packs.facebookAbout must equal entity.citeMedium");
  }
  const linkedin = String(packs.linkedinAbout || "");
  for (const needle of ["entity.json", "ai-shopping.json", "Gaziosmanpaşa", "NXTIONSTAR"]) {
    if (!linkedin.includes(needle)) {
      errors.push(`linkedinAbout missing ${needle}`);
    }
  }
  if (telephone && !linkedin.includes("530") && !linkedin.includes(telephone.replace("+", ""))) {
    errors.push("linkedinAbout missing telephone");
  }
  if (!doc.sameAsReadiness?.live || !Array.isArray(doc.sameAsReadiness.blockedUntil301)) {
    errors.push("sameAsReadiness.live / blockedUntil301 required");
  }
  if (doc.sameAsReadiness?.blockedUntil301?.some((u) => !/arleds\.com/i.test(String(u)))) {
    // ok if list empty of arleds — but we expect arleds blocked note
  }
  if (!JSON.stringify(doc.sameAsReadiness || {}).includes("arleds.com")) {
    errors.push("sameAsReadiness must mention arleds.com blocked-until-301");
  }
  if (!doc.canonicalUrls?.aiShoppingJson?.includes("/ai-shopping.json")) {
    errors.push("canonicalUrls.aiShoppingJson missing");
  }
  if (!doc.canonicalUrls?.entityJson?.includes("/entity.json")) {
    errors.push("canonicalUrls.entityJson missing");
  }
  // Day 67: Point C packs must carry kontrol/extrasUsd honesty (Owner paste → third-party corpus)
  const medium = String(citeMedium || packs.gbpDescription || "");
  if (!/quote-only/i.test(medium) || !/extrasUsd/i.test(medium) || !/Huidu/i.test(medium)) {
    errors.push("citeMedium/gbpDescription must include quote-only + extrasUsd + Huidu honesty");
  }
  const readiness = JSON.stringify(doc.sameAsReadiness || {});
  if (!/extrasUsd|quote-only|kontrol/i.test(readiness)) {
    errors.push("sameAsReadiness.notes must mention kontrol/extrasUsd quote-only honesty");
  }
  return errors;
}

const doc = await load();

if (checkOnly) {
  const errors = validate(doc);
  if (errors.length) {
    console.error(`point-c-packs --check: FAIL (${errors.length})`);
    for (const e of errors) console.error(" -", e);
    process.exit(1);
  }
  console.log(
    `point-c-packs --check: OK — packs=${ORDER.length} sameAsReadiness + ai-shopping cite (${live ? "LIVE" : "local"})`,
  );
  process.exit(0);
}

const packs = doc.packs || {};
console.log(`Point C packs (${live ? "LIVE" : "local"}) — ${doc.url || "entity-profiles.json"}`);
console.log("=".repeat(72));
for (const key of ORDER) {
  const text = packs[key];
  if (!text) {
    console.log(`\n## ${key}\n(missing)\n`);
    continue;
  }
  console.log(`\n## ${key}\n`);
  console.log(text);
  console.log("\n" + "-".repeat(72));
}
if (doc.sameAsReadiness) {
  console.log("\n## sameAsReadiness\n");
  console.log(JSON.stringify(doc.sameAsReadiness, null, 2));
}
