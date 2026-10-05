#!/usr/bin/env node
/**
 * Print Point C paste packs from public/entity-profiles.json (local) or LIVE URL.
 * Usage:
 *   node scripts/print-point-c-packs.mjs
 *   node scripts/print-point-c-packs.mjs --live
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const live = process.argv.includes("--live");
const ORDER = [
  "gbpDescription",
  "linkedinAbout",
  "instagramBio",
  "facebookAbout",
  "directoryShort",
  "directoryLong",
  "youtubeAbout",
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

const doc = await load();
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
