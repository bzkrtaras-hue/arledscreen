#!/usr/bin/env node
/**
 * Owner-gate status for GEO / AI-alışveriş (Point C · arleds 301 · Tur1a · PR merge).
 * Reports only — does not invent mention rates. Exit 0 always (status tool).
 *
 * Usage: npm run geo:status
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const profilesPath = path.join(repoRoot, "public/entity-profiles.json");
const logPath = path.join(repoRoot, "docs/geo/observations/blind-log.jsonl");

const EXPECT_301 = "https://arledscreen.com/tr/";

function line(status, label, detail = "") {
  const mark = status === "OK" ? "OK  " : status === "OPEN" ? "OPEN" : "INFO";
  console.log(`[${mark}] ${label}${detail ? ` — ${detail}` : ""}`);
}

console.log("=== ARLEDSCREEN GEO owner-gate status ===");
console.log(`Time: ${new Date().toISOString()}`);
console.log("CODE invent is live on arledscreen.com; gates below are owner-gated.\n");

// Point C packs
let packsOk = false;
try {
  const profiles = JSON.parse(fs.readFileSync(profilesPath, "utf8"));
  const packs = profiles.packs || {};
  const need = ["directoryLong", "gbpDescription", "instagramBio", "linkedinAbout", "facebookAbout"];
  const missing = need.filter((k) => !packs[k]);
  packsOk = missing.length === 0;
  line(
    packsOk ? "OK" : "OPEN",
    "Point C packs present",
    packsOk ? "npm run point-c → paste GBP/IG/FB/LinkedIn (once; 34245)" : `missing ${missing.join(", ")}`,
  );
  const checklist = profiles.ownerP0Checklist || [];
  if (checklist[0]) line("INFO", "P0 next", checklist[0].slice(0, 120));
} catch (e) {
  line("OPEN", "Point C packs", String(e?.message || e));
}

// arleds 301
const probe = spawnSync(process.execPath, [path.join(repoRoot, "scripts/verify-arleds-301.mjs")], {
  encoding: "utf8",
  timeout: 60000,
});
const arledsOk = probe.status === 0;
line(
  arledsOk ? "OK" : "OPEN",
  "arleds.com → arledscreen.com/tr/ 301",
  arledsOk ? "all probes OK" : `see docs/ops/arleds-301-hostinger.md · npm run verify:arleds-301`,
);

// Tur1a observations (exclude code-harden platform noise for "human blind" count)
let tur1aHuman = 0;
let tur1aTotal = 0;
if (fs.existsSync(logPath)) {
  const rows = fs
    .readFileSync(logPath, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  tur1aTotal = rows.length;
  tur1aHuman = rows.filter((r) =>
    ["chatgpt", "gemini", "perplexity", "google_aio"].includes(String(r.platform || "")),
  ).length;
}
line(
  tur1aHuman > 0 ? "OK" : "OPEN",
  "Tur1a blind observations",
  `${tur1aHuman} human-platform / ${tur1aTotal} total rows · npm run tur1a:list · --dry-run`,
);

// Live invent smoke (non-blocking summary; full: npm run invent:smoke)
try {
  const origin = "https://arledscreen.com";
  const brand = await (await fetch(`${origin}/brand.json?v=${Date.now()}`, {
    headers: { "cache-control": "no-cache" },
  })).json();
  const ent = await (await fetch(`${origin}/entity.json?v=${Date.now()}`, {
    headers: { "cache-control": "no-cache" },
  })).json();
  const offerN = brand?.makesOffer?.offerCount;
  line(
    offerN === 12 ? "OK" : "OPEN",
    "Live brand.json AggregateOffer×12",
    offerN === 12 ? `${brand.makesOffer.lowPrice}–${brand.makesOffer.highPrice} USD` : `offerCount=${offerN}`,
  );
  const webOk = ent?.mainEntityOfPage?.["@id"] === `${origin}/#website`;
  line(webOk ? "OK" : "OPEN", "Live entity WebSite #website", webOk ? "OrderAction TR/EN quote" : "missing");
} catch (e) {
  line("OPEN", "Live invent probe", String(e?.message || e));
}

line("INFO", "PR merge", "PR #60 cursor/geo-prod-guard-5666 → main (owner)");
line("INFO", "Target", "day-30 / ~2026-11-04 — do not invent ChatGPT/Gemini scores");
line("INFO", "arleds DNS", "not on Cloudflare for this account — Hostinger redirect required");

console.log("\nCommands: npm run point-c · npm run verify:arleds-301 · npm run tur1a:list · npm run invent:smoke · npm run geo:status");
process.exit(0);
