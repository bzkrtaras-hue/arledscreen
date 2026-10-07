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

const acked = ackedCount();

if (acked < POINT_C_STEPS) {
  console.log("=== ARLEDSCREEN GEO next (Point C paste) ===");
  console.log(`Priority gate: Point C · ${acked}/${POINT_C_STEPS} acked`);
  console.log("After paste: npm run point-c:ack");
  console.log("");
  const next = runNode("scripts/print-point-c-packs.mjs", ["--next"]);
  process.stdout.write(String(next.stdout || ""));
  if (next.status !== 0) process.stderr.write(String(next.stderr || ""));
  process.exit(next.status === 0 ? 0 : next.status || 1);
}

const probe = runNode("scripts/verify-arleds-301.mjs");
if (probe.status !== 0) {
  console.log("=== ARLEDSCREEN GEO next (arleds.com 301) ===");
  console.log("Priority gate: Hostinger permanent 301 → https://arledscreen.com/tr/");
  console.log("");
  const mod = await import(path.join(repoRoot, "scripts/print-point-c-packs.mjs"));
  console.log("hPanel clipboard:");
  console.log("hPanel → Domains → arleds.com → Redirects");
  console.log("http://arleds.com/ → https://arledscreen.com/tr/");
  console.log("http://www.arleds.com/ → https://arledscreen.com/tr/");
  console.log("https://arleds.com/ → https://arledscreen.com/tr/");
  console.log("https://www.arleds.com/ → https://arledscreen.com/tr/");
  console.log("");
  console.log("Hostinger support email (select-all):");
  console.log("---");
  console.log(mod.buildHostingerEmailClipboard());
  console.log("---");
  console.log("");
  console.log("mailto:");
  console.log(mod.buildHostingerMailto());
  console.log("");
  console.log("EML: npm run point-c:hostinger-eml → docs/ops/arleds-301-hostinger.eml");
  if (mod.HOSTINGER_GMAIL_DRAFT_URL) {
    console.log("Gmail draft (Send):");
    console.log(mod.HOSTINGER_GMAIL_DRAFT_URL);
  }
  console.log("");
  console.log("Verify: npm run verify:arleds-301");
  process.exit(0);
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
  process.exit(0);
}

console.log("=== ARLEDSCREEN GEO next (PR merge) ===");
console.log("Priority gate: merge PR #60 cursor/geo-prod-guard-5666 → main");
console.log("Status: npm run geo:status · invent: npm run invent:smoke");
console.log("Target: day-30 / ~2026-11-04 — do not invent ChatGPT/Gemini scores");
process.exit(0);
