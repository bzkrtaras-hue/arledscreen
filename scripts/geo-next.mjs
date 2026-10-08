#!/usr/bin/env node
/**
 * Single owner clipboard — highest-priority open GEO gate.
 * Priority: Point C paste → arleds.com 301 → Tur1a blind → PR merge.
 * Cite-only; does not invent mention rates.
 *
 * Usage: npm run geo:next
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const progressPath = path.join(repoRoot, "docs/geo/observations/point-c-progress.json");
const POINT_C_STEPS = 11;

// CI pipes `npm run geo:next | grep -q …` — when grep exits early, further writes
// must not crash the process (pipefail would fail the Owner tooling smoke step).
process.stdout.on("error", (err) => {
  if (err?.code === "EPIPE") process.exit(0);
});
process.stderr.on("error", (err) => {
  if (err?.code === "EPIPE") process.exit(0);
});

const HOWTO_FOOTER = `HowTo: https://arledscreen.com/point-c.json → potentialAction · https://arledscreen.com/geo-status.json → potentialAction · https://arledscreen.com/point-c-progress.json → potentialAction · https://arledscreen.com/tur1a.json → potentialAction`;

function runNode(scriptRel, args = []) {
  return spawnSync(process.execPath, [path.join(repoRoot, scriptRel), ...args], {
    encoding: "utf8",
    timeout: 60000,
    cwd: repoRoot,
  });
}

function ackedCount() {
  try {
    if (!fs.existsSync(progressPath)) return 0;
    const prog = JSON.parse(fs.readFileSync(progressPath, "utf8"));
    return Array.isArray(prog.acked) ? prog.acked.length : 0;
  } catch {
    return 0;
  }
}

function finish(code = 0, htmlUrl = "https://arledscreen.com/owner-next.html") {
  console.log("");
  console.log(`HTML: ${htmlUrl} (Open tabs + Copy+Open) · alias https://arledscreen.com/geo-next.html`);
  console.log(
    "JSON twin: https://arledscreen.com/owner-next.json · aliases https://arledscreen.com/geo-next.json · https://arledscreen.com/.well-known/owner-next.json",
  );
  console.log(
    "Social: FB https://arledscreen.com/owner-next.html?social=fb&copy=1 · IG https://arledscreen.com/owner-next.html?social=ig&copy=1 · WA https://arledscreen.com/owner-next.html?social=wa&copy=1 · https://arledscreen.com/social.json",
  );
  console.log(HOWTO_FOOTER);
  process.exit(code);
}

const acked = ackedCount();

if (acked < POINT_C_STEPS) {
  console.log("=== ARLEDSCREEN GEO next (Point C paste) ===");
  console.log(`Priority gate: Point C · ${acked}/${POINT_C_STEPS} acked`);
  console.log("After paste: npm run point-c:ack");
  console.log("CSV: npm run point-c:csv · Playbook: docs/offsite-entity-playbook.md");
  console.log("");
  const next = runNode("scripts/print-point-c-packs.mjs", ["--next"]);
  process.stdout.write(String(next.stdout || ""));
  if (next.status !== 0) process.stderr.write(String(next.stderr || ""));
  let htmlDeep = "https://arledscreen.com/owner-next.html?start=1";
  // Prep friction: arleds 301 is the next gate after Point C — surface Open/OpenAlt now.
  try {
    const mod = await import(path.join(repoRoot, "scripts/print-point-c-packs.mjs"));
    const profiles = JSON.parse(
      fs.readFileSync(path.join(repoRoot, "public/entity-profiles.json"), "utf8"),
    );
    const nextRow = mod.buildPointCNext(profiles, { en: false });
    if (typeof mod.ownerNextStartUrl === "function") htmlDeep = mod.ownerNextStartUrl();
    const packHtml =
      nextRow?.html ||
      (nextRow?.packKey && typeof mod.ownerNextHtmlUrl === "function"
        ? mod.ownerNextHtmlUrl(nextRow.packKey)
        : "");
    if (packHtml) {
      console.log(`Pack HTML: ${packHtml}`);
    }
    console.log("");
    console.log("=== Queued after Point C (arleds.com 301) — prep Open tabs ===");
    if (mod.DNSENABLE_PANEL_URL) console.log(`Open: ${mod.DNSENABLE_PANEL_URL}`);
    if (typeof mod.buildDnsEnableMailto === "function") {
      console.log(`OpenAlt (mailto DNSEnable): ${mod.buildDnsEnableMailto()}`);
    }
    if (mod.DNSENABLE_GMAIL_DRAFT_URL) {
      console.log(`OpenAlt2 (Gmail draft Send): ${mod.DNSENABLE_GMAIL_DRAFT_URL}`);
    }
    console.log("Draft clipboard: npm run point-c:dnsenable-draft · EML: npm run point-c:dnsenable-eml");
    console.log(
      "HTML: https://arledscreen.com/owner-next.html?dnsenable=1 (G / Copy+Open DNSEnable) · alias ?pack=hostinger301&copy=1",
    );
  } catch {
    /* ignore prep block failures */
  }
  finish(next.status === 0 ? 0 : next.status || 1, htmlDeep);
}

const probe = runNode("scripts/verify-arleds-301.mjs");
if (probe.status !== 0) {
  const verifyLog = `${probe.stdout || ""}\n${probe.stderr || ""}`;
  const mode = (verifyLog.match(/^mode:\s+(\S+)/m) || [])[1] || "";
  console.log("=== ARLEDSCREEN GEO next (arleds.com 301) ===");
  console.log(
    mode
      ? `Priority gate: arleds.com 301 · mode=${mode} → https://arledscreen.com/tr/`
      : "Priority gate: arleds.com 301 → https://arledscreen.com/tr/",
  );
  console.log("");
  const mod = await import(path.join(repoRoot, "scripts/print-point-c-packs.mjs"));
  if (mod.DNSENABLE_PANEL_URL) console.log(`Open: ${mod.DNSENABLE_PANEL_URL}`);
  if (typeof mod.buildDnsEnableMailto === "function") {
    console.log(`OpenAlt (mailto DNSEnable): ${mod.buildDnsEnableMailto()}`);
  }
  if (mod.DNSENABLE_GMAIL_DRAFT_URL) console.log(`OpenAlt2 (Gmail draft Send): ${mod.DNSENABLE_GMAIL_DRAFT_URL}`);
  console.log("Verify prints Where:/Open:/OpenAlt: — npm run verify:arleds-301");
  console.log("");
  console.log(mod.buildArleds301DualPathClipboard());
  console.log("");
  if (verifyLog.includes("DNS diagnosis")) {
    console.log("--- verify:arleds-301 (live) ---");
    for (const row of verifyLog.split("\n").filter((l) => /^(mode:|arleds\.com NS:|NS looks|Option |Where:|Open:)/i.test(l))) {
      console.log(row);
    }
    console.log("");
  }
  console.log("Verify: npm run verify:arleds-301 · docs/ops/arleds-301-hostinger.md");
  console.log(
    "HTML: https://arledscreen.com/owner-next.html?dnsenable=1 · alias https://arledscreen.com/owner-next.html?pack=hostinger301&copy=1",
  );
  finish(0, "https://arledscreen.com/owner-next.html?dnsenable=1");
}

const tur1a = runNode("scripts/tur1a-matrix.mjs", ["--next"]);
const turOut = String(tur1a.stdout || "").trim();
const done =
  /all (TR )?cells filled/i.test(turOut) ||
  /matrix complete/i.test(turOut) ||
  /no empty cell/i.test(turOut);

if (tur1a.status === 0 && turOut && !done) {
  console.log("=== ARLEDSCREEN GEO next (Tur1a blind) ===");
  console.log("Priority gate: Tur1a human observation");
  console.log("After run: npm run tur1a:log -- --mentioned=… --brandCorrect=… --priceSourceCited=…");
  console.log("CSV: npm run tur1a:csv");
  console.log("");
  console.log(turOut);
  finish(0);
}

console.log("=== ARLEDSCREEN GEO next (PR merge) ===");
console.log("Priority gate: merge PR #60 cursor/geo-prod-guard-5666 → main");
console.log("Status: npm run geo:status · invent: npm run invent:smoke");
console.log("Target: day-30 / ~2026-11-04 — do not invent ChatGPT/Gemini scores");
finish(0);
