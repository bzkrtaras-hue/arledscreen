#!/usr/bin/env node
/**
 * Owner-gate status for GEO / AI-alışveriş (Point C · arleds 301 · Tur1a · PR merge).
 * Reports only — does not invent mention rates. Exit 0 always (status tool).
 * Default: short next-action one-liners. Full paste dumps: GEO_FULL=1 / TUR1A_FULL=1.
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
const pointCProgressPath = path.join(repoRoot, "docs/geo/observations/point-c-progress.json");
/** Packs in TR_ORDER + hostinger301 step (see print-point-c-packs.mjs). */
const POINT_C_STEPS = 11;
const GEO_FULL = process.env.GEO_FULL === "1";

function line(status, label, detail = "") {
  const mark = status === "OK" ? "OK  " : status === "OPEN" ? "OPEN" : "INFO";
  console.log(`[${mark}] ${label}${detail ? ` — ${detail}` : ""}`);
}

console.log("=== ARLEDSCREEN GEO owner-gate status ===");
console.log(`Time: ${new Date().toISOString()}`);
console.log("CODE invent is live on arledscreen.com; gates below are owner-gated.");
console.log("GEO next: npm run geo:next  (Point C → arleds 301 → Tur1a → merge)\n");

// Point C packs
let packsOk = false;
let profiles = null;
try {
  profiles = JSON.parse(fs.readFileSync(profilesPath, "utf8"));
  const packs = profiles.packs || {};
  const need = ["directoryLong", "gbpDescription", "instagramBio", "linkedinAbout", "facebookAbout"];
  const missing = need.filter((k) => !packs[k]);
  packsOk = missing.length === 0;
  line(
    packsOk ? "OK" : "OPEN",
    "Point C packs present",
    packsOk
      ? "https://arledscreen.com/point-c.txt · paste GBP/IG/FB/LinkedIn + Hostinger 301 clipboard (once; 34245)"
      : `missing ${missing.join(", ")}`,
  );
  let ackedN = 0;
  try {
    if (fs.existsSync(pointCProgressPath)) {
      const prog = JSON.parse(fs.readFileSync(pointCProgressPath, "utf8"));
      ackedN = Array.isArray(prog.acked) ? prog.acked.length : 0;
    }
  } catch {
    ackedN = 0;
  }
  const pasteDone = ackedN >= POINT_C_STEPS;
  line(
    pasteDone ? "OK" : "OPEN",
    "Point C paste progress",
    `${ackedN}/${POINT_C_STEPS} acked · npm run geo:next · point-c:next · point-c:ack`,
  );
  const checklist = profiles.ownerP0Checklist || [];
  if (checklist[0]) line("INFO", "P0 next", checklist[0].slice(0, 120));
  // Sequential paste clipboard — short by default; full dump GEO_FULL=1.
  if (packsOk && !pasteDone) {
    const next = spawnSync(process.execPath, [path.join(repoRoot, "scripts/print-point-c-packs.mjs"), "--next"], {
      encoding: "utf8",
      timeout: 15000,
    });
    const out = String(next.stdout || "").trim();
    if (out) {
      const stepLine = out.split("\n").find((r) => r.startsWith("Step:"));
      console.log("  Point C next paste:");
      if (GEO_FULL) {
        for (const row of out.split("\n")) console.log(`  ${row}`);
      } else {
        console.log(`  ${stepLine || "see npm run geo:next"} · npm run geo:next (full dump: GEO_FULL=1 npm run geo:status)`);
      }
    }
  }
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
if (!arledsOk) {
  console.log("  Hostinger clipboard (permanent 301 entire domain):");
  console.log("  hPanel → Domains → arleds.com → Redirects");
  console.log("  http://arleds.com/ → https://arledscreen.com/tr/");
  console.log("  http://www.arleds.com/ → https://arledscreen.com/tr/");
  console.log("  https://arleds.com/ → https://arledscreen.com/tr/");
  console.log("  https://www.arleds.com/ → https://arledscreen.com/tr/");
  console.log("  Also: npm run geo:next · npm run point-c:next · https://arledscreen.com/point-c.txt");
  try {
    const mod = await import(path.join(repoRoot, "scripts/print-point-c-packs.mjs"));
    if (GEO_FULL) {
      console.log("  Hostinger support email (select-all):");
      console.log("  ---");
      for (const row of String(mod.buildHostingerEmailClipboard()).split("\n")) console.log(`  ${row}`);
      console.log("  ---");
    } else {
      console.log("  Hostinger support email: npm run geo:next (or GEO_FULL=1 npm run geo:status)");
    }
    console.log("  Hostinger mailto:");
    console.log(`  ${mod.buildHostingerMailto()}`);
    console.log("  EML: npm run point-c:hostinger-eml → docs/ops/arleds-301-hostinger.eml");
    if (mod.HOSTINGER_GMAIL_DRAFT_URL) {
      console.log("  Gmail draft (Send):");
      console.log(`  ${mod.HOSTINGER_GMAIL_DRAFT_URL}`);
    }
  } catch {
    /* clipboard helper optional */
  }
}

// Tur1a observations (exclude code-harden platform noise for "human blind" count)
const HUMAN_PLATFORMS = ["chatgpt", "gemini", "perplexity", "google_aio"];
const TR_PROMPT_IDS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const MATRIX_CELLS = TR_PROMPT_IDS.length * HUMAN_PLATFORMS.length; // 48
let tur1aHuman = 0;
let tur1aTotal = 0;
let tur1aCells = 0;
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
  const human = rows.filter((r) => HUMAN_PLATFORMS.includes(String(r.platform || "")));
  tur1aHuman = human.length;
  const cells = new Set();
  for (const r of human) {
    const pid = String(r.promptId || "");
    const plat = String(r.platform || "");
    if (TR_PROMPT_IDS.includes(pid)) cells.add(`${plat}|${pid}`);
  }
  tur1aCells = cells.size;
}
line(
  tur1aHuman > 0 ? "OK" : "OPEN",
  "Tur1a blind observations",
  `${tur1aHuman} human-platform rows · ${tur1aCells}/${MATRIX_CELLS} TR cells · npm run tur1a:next · tur1a:log · tur1a:matrix`,
);
if (tur1aHuman === 0 || tur1aCells < MATRIX_CELLS) {
  const next = spawnSync(process.execPath, [path.join(repoRoot, "scripts/tur1a-matrix.mjs"), "--next"], {
    encoding: "utf8",
    timeout: 15000,
  });
  const out = String(next.stdout || "").trim();
  // One-liner first (avoid dumping full paste unless TUR1A_FULL=1).
  const cellLine = out.split("\n").find((r) => r.startsWith("Cell:"));
  if (cellLine) console.log(`  Tur1a next: ${cellLine.replace(/^Cell:\s*/, "")} · npm run tur1a:next · tur1a:csv`);
  else console.log("  Tur1a next: npm run tur1a:next · tur1a:csv · tur1a:log");
  if (process.env.TUR1A_FULL === "1" && out) {
    console.log("  Tur1a next clipboard:");
    for (const row of out.split("\n")) console.log(`  ${row}`);
  }
}

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

console.log("\nCommands: npm run geo:next · npm run geo:ack · npm run point-c:next · npm run point-c:ack · npm run point-c · npm run verify:arleds-301 · npm run tur1a:next · npm run tur1a:csv · npm run tur1a:log · npm run tur1a:matrix · npm run invent:smoke · npm run geo:status · npm run indexnow");
process.exit(0);
