#!/usr/bin/env node
/**
 * Print / build copy-ready Point C paste packs from entity-profiles.json.
 * Owner friction reducer — no invented citations; cite packs only.
 *
 * Usage:
 *   npm run point-c
 *   node scripts/print-point-c-packs.mjs [--en] [--pack=gbpDescription]
 *
 * Also imported by postbuild-ai.mjs to emit public/point-c.txt (+ point-c-en.txt).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const profilesPath = path.join(repoRoot, "public/entity-profiles.json");

export const TR_ORDER = [
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

export const EN_ORDER = [
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

/** Build plain-text Point C paste document (no markdown fences — easy select-all). */
export function buildPointCPackText(profiles, { en = false, only = "" } = {}) {
  const packs = en ? profiles.packsEn || {} : profiles.packs || {};
  const order = en ? EN_ORDER : TR_ORDER;
  const lines = [];
  lines.push("=== ARLEDSCREEN Point C paste packs ===");
  lines.push(`Locale: ${en ? "EN (packsEn)" : "TR (packs)"}`);
  lines.push("Rules: paste once; cite + NAP only; no catalog.json / quote-only jargon in public bios.");
  lines.push("Verify: https://arledscreen.com/entity.json");
  lines.push("Web must be arledscreen.com (not arleds.com). Postcode 34245.");
  lines.push("Live: https://arledscreen.com/point-c.txt · https://arledscreen.com/point-c-en.txt");
  lines.push("");

  const checklist = profiles.ownerP0Checklist || [];
  if (checklist.length && !only) {
    lines.push("--- Owner P0 checklist ---");
    for (const item of checklist) lines.push(`- ${item}`);
    lines.push("");
  }

  for (const [label, key] of order) {
    if (only && key !== only) continue;
    const text = packs[key];
    lines.push(`### ${label} (${key})`);
    lines.push(text == null || text === "" ? "(missing)" : String(text));
    lines.push("");
  }

  if (!only) {
    lines.push("--- Machine-only (do NOT paste into GBP/IG/FB bios) ---");
    if (en) {
      lines.push("Merchant readiness: packsEn.googleMerchantReadiness (or packs.googleMerchantReadiness)");
    } else {
      lines.push("Merchant readiness: packs.googleMerchantReadiness");
    }
    lines.push(`prices.rss: ${profiles?.canonicalUrls?.pricesRss || "https://arledscreen.com/feeds/prices.rss"}`);
    lines.push("Playbook: docs/offsite-entity-playbook.md");
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

function argFlag(name) {
  return process.argv.includes(`--${name}`);
}
function argValue(name) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : "";
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  if (!fs.existsSync(profilesPath)) {
    console.error("Missing public/entity-profiles.json");
    process.exit(1);
  }
  const profiles = JSON.parse(fs.readFileSync(profilesPath, "utf8"));
  const useEn = argFlag("en");
  const only = argValue("pack");
  process.stdout.write(buildPointCPackText(profiles, { en: useEn, only }));
}
