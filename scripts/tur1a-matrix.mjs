#!/usr/bin/env node
/**
 * Tur1a coverage matrix + next empty cell for owner blind runs.
 * Does not invent scores. Fills nothing automatically.
 *
 * Usage:
 *   npm run tur1a:matrix
 *   npm run tur1a:next
 *   node scripts/tur1a-matrix.mjs --en          # include EN prompts in matrix
 *   node scripts/tur1a-matrix.mjs --next --en
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TR, EN, HUMAN_PLATFORMS } from "./print-tur1a-prompts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const logPath = path.join(repoRoot, "docs/geo/observations/blind-log.jsonl");

const wantNext = process.argv.includes("--next");
const includeEn = process.argv.includes("--en");

const prompts = includeEn ? [...TR, ...EN] : [...TR];
const promptIds = prompts.map(([id]) => id);
const totalCells = promptIds.length * HUMAN_PLATFORMS.length;

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
  console.log("Log row: npm run tur1a:list · geo-blind-log.mjs");
}

function printNext(filled) {
  let next = null;
  outer: for (const id of promptIds) {
    for (const platform of HUMAN_PLATFORMS) {
      if (!filled.has(cellKey(platform, id))) {
        next = { platform, promptId: id };
        break outer;
      }
    }
  }

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
  console.log("- Brand AggregateOffer×12: https://arledscreen.com/brand.json");
  console.log("- prices.rss = change discovery only (not canonical price graph)");
  console.log("\n### After observing, fill placeholders and run:");
  console.log(
    `node scripts/geo-blind-log.mjs --platform=${next.platform} --promptId=${next.promptId} --locale=${locale} --mentioned=yes|no|partial --brandCorrect=yes|no --priceSourceCited=ai-shopping|catalog|prices-rss|brand|site|other|none --sources=https://arledscreen.com/ai-shopping.json --notes="..."`,
  );
  console.log("\nDry-run first:");
  console.log(
    `node scripts/geo-blind-log.mjs --dry-run --platform=${next.platform} --promptId=${next.promptId} --locale=${locale} --mentioned=yes --brandCorrect=yes --priceSourceCited=ai-shopping`,
  );
  console.log("\nThen: npm run tur1a:matrix · npm run geo:status");
}

const rows = loadHumanRows();
const filled = filledSet(rows);

if (wantNext) printNext(filled);
else printMatrix(filled);

process.exit(0);
