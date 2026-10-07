#!/usr/bin/env node
/**
 * Tur1a coverage matrix + next empty cell + one-shot log for owner blind runs.
 * Does not invent scores. --log writes only when observation flags are provided.
 *
 * Usage:
 *   npm run tur1a:matrix
 *   npm run tur1a:next
 *   npm run tur1a:log -- --mentioned=yes --brandCorrect=yes --priceSourceCited=ai-shopping
 *   node scripts/tur1a-matrix.mjs --en
 *   node scripts/tur1a-matrix.mjs --next --en
 *   node scripts/tur1a-matrix.mjs --log --dry-run --mentioned=yes --brandCorrect=yes --priceSourceCited=ai-shopping
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TR, EN, HUMAN_PLATFORMS } from "./print-tur1a-prompts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const logPath = path.join(repoRoot, "docs/geo/observations/blind-log.jsonl");
const logger = path.join(repoRoot, "scripts/geo-blind-log.mjs");

const wantNext = process.argv.includes("--next");
const wantLog = process.argv.includes("--log");
const includeEn = process.argv.includes("--en");
const dryRun = process.argv.includes("--dry-run");

const prompts = includeEn ? [...TR, ...EN] : [...TR];
const promptIds = prompts.map(([id]) => id);
const totalCells = promptIds.length * HUMAN_PLATFORMS.length;

function arg(name, fallback = "") {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}

function loadHumanRows() {
  if (!fs.existsSync(logPath)) return [];
  return fs
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
    .filter(Boolean)
    .filter((r) => HUMAN_PLATFORMS.includes(String(r.platform || "")));
}

function cellKey(platform, promptId) {
  return `${platform}|${promptId}`;
}

function filledSet(rows) {
  const set = new Set();
  for (const r of rows) {
    const pid = String(r.promptId || "");
    const plat = String(r.platform || "");
    if (promptIds.includes(pid) && HUMAN_PLATFORMS.includes(plat)) {
      set.add(cellKey(plat, pid));
    }
  }
  return set;
}

function promptText(id) {
  const hit = prompts.find(([pid]) => pid === id);
  return hit ? hit[1] : "";
}

function findNext(filled) {
  for (const id of promptIds) {
    for (const platform of HUMAN_PLATFORMS) {
      if (!filled.has(cellKey(platform, id))) {
        return { platform, promptId: id };
      }
    }
  }
  return null;
}

function printMatrix(filled) {
  const filledN = filled.size;
  console.log("=== ARLEDSCREEN Tur1a coverage matrix ===");
  console.log(`Human platforms: ${HUMAN_PLATFORMS.join(", ")}`);
  console.log(`Prompts: ${promptIds.join(", ")}${includeEn ? "" : " (TR; add --en for en-1…en-4)"}`);
  console.log(`Coverage: ${filledN}/${totalCells} human cells`);
  console.log(`Log: ${path.relative(repoRoot, logPath)}`);
  console.log("Legend: ● filled · ○ empty — do not invent mention %\n");

  const header = ["promptId", ...HUMAN_PLATFORMS.map((p) => p.slice(0, 8))].join("\t");
  console.log(header);
  for (const id of promptIds) {
    const cells = HUMAN_PLATFORMS.map((p) => (filled.has(cellKey(p, id)) ? "●" : "○"));
    console.log([id, ...cells].join("\t"));
  }
  console.log("\nNext empty: npm run tur1a:next");
  console.log(
    "One-shot log: npm run tur1a:log -- --mentioned=yes|no|partial --brandCorrect=yes|no --priceSourceCited=ai-shopping|…",
  );
}

function printNext(filled) {
  const next = findNext(filled);
  console.log("=== ARLEDSCREEN Tur1a next empty cell ===");
  if (!next) {
    console.log(`All ${totalCells} human cells filled (TR${includeEn ? "+EN" : ""}).`);
    console.log("Optional: npm run tur1a:matrix --en · tur1a:summary");
    console.log("Status: npm run geo:status");
    return;
  }

  const locale = String(next.promptId).startsWith("en-") ? "en" : "tr-TR";
  const text = promptText(next.promptId);
  console.log(`Cell: platform=${next.platform} · promptId=${next.promptId} · locale=${locale}`);
  console.log(`Progress: ${filled.size}/${totalCells} filled → this is the next empty`);
  console.log("\n### Paste into the AI platform");
  console.log("```");
  console.log(text);
  console.log("```");
  console.log("\n### Expected (do not invent if absent)");
  console.log("- Canonical site: https://arledscreen.com/tr/ (not arleds.com)");
  console.log("- Price source: https://arledscreen.com/ai-shopping.json pricedPanels");
  console.log(
    "- Inventable aliases (identical): /.well-known/modules.json · /.well-known/sku.json · /.well-known/price.json · /.well-known/pricing.json · /prices.json",
  );
  console.log("- Brand AggregateOffer×12: https://arledscreen.com/brand.json");
  console.log("- prices.rss = change discovery only (not canonical price graph)");
  console.log("\n### After observing, one-shot log:");
  console.log(
    `npm run tur1a:log -- --mentioned=yes|no|partial --brandCorrect=yes|no --priceSourceCited=ai-shopping|catalog|prices-rss|brand|site|other|none --sources=https://arledscreen.com/ai-shopping.json --notes="..."`,
  );
  console.log("\nDry-run:");
  console.log(
    `npm run tur1a:log -- --dry-run --mentioned=yes --brandCorrect=yes --priceSourceCited=ai-shopping`,
  );
  console.log("\nThen: npm run tur1a:matrix · npm run geo:status");
}

function runLog(filled) {
  const next = findNext(filled);
  console.log("=== ARLEDSCREEN Tur1a one-shot log ===");
  if (!next) {
    console.log(`All ${totalCells} human cells filled — nothing to log.`);
    process.exit(0);
  }
  const mentioned = arg("mentioned");
  const brandCorrect = arg("brandCorrect");
  const priceSourceCited = arg("priceSourceCited");
  if (!mentioned || !brandCorrect || !priceSourceCited) {
    console.error("Required with --log: --mentioned=… --brandCorrect=… --priceSourceCited=…");
    console.error(
      "Example: npm run tur1a:log -- --mentioned=yes --brandCorrect=yes --priceSourceCited=ai-shopping",
    );
    console.error("Do not invent scores — only log what you observed.");
    process.exit(1);
  }
  const locale = arg("locale", String(next.promptId).startsWith("en-") ? "en" : "tr-TR");
  const sources = arg("sources", "https://arledscreen.com/ai-shopping.json");
  const notes = arg("notes", "");
  const competitors = arg("competitors", "");
  const wrongClaims = arg("wrongClaims", "");

  console.log(`Cell: platform=${next.platform} · promptId=${next.promptId} · locale=${locale}`);
  console.log(`Prompt: ${promptText(next.promptId)}`);
  console.log(dryRun ? "Mode: dry-run (not written)" : "Mode: append blind-log.jsonl");

  const args = [
    logger,
    `--platform=${next.platform}`,
    `--promptId=${next.promptId}`,
    `--locale=${locale}`,
    `--mentioned=${mentioned}`,
    `--brandCorrect=${brandCorrect}`,
    `--priceSourceCited=${priceSourceCited}`,
    `--sources=${sources}`,
  ];
  if (notes) args.push(`--notes=${notes}`);
  if (competitors) args.push(`--competitors=${competitors}`);
  if (wrongClaims) args.push(`--wrongClaims=${wrongClaims}`);
  if (dryRun) args.push("--dry-run");

  const r = spawnSync(process.execPath, args, { encoding: "utf8", cwd: repoRoot });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status !== 0) process.exit(r.status || 1);
  console.log("\nThen: npm run tur1a:matrix · npm run tur1a:next · npm run geo:status");
}

const rows = loadHumanRows();
const filled = filledSet(rows);

if (wantLog) runLog(filled);
else if (wantNext) printNext(filled);
else printMatrix(filled);

process.exit(0);
