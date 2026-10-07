#!/usr/bin/env node
/**
 * Local Tur1a / GEO blind-test observation logger.
 * Writes JSONL under docs/geo/observations/ (gitignored optional).
 * Does NOT invent mention rates. Does NOT embed into ai-shopping.json.
 *
 * Usage:
 *   node scripts/geo-blind-log.mjs --list
 *   node scripts/geo-blind-log.mjs --summary
 *   node scripts/geo-blind-log.mjs --platform=chatgpt --promptId=5 --mentioned=yes \
 *     --brandCorrect=yes --priceSourceCited=ai-shopping \
 *     --sources=https://arledscreen.com/ai-shopping.json \
 *     --notes="P1.25 GOB 95.88 cited"
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outDir = path.join(repoRoot, "docs/geo/observations");
const outFile = path.join(outDir, "blind-log.jsonl");
const promptsFile = path.join(repoRoot, "docs/geo/blind-test-prompts.md");

const PLATFORMS = new Set(["chatgpt", "gemini", "perplexity", "google_aio", "other"]);
const YES_NO_PARTIAL = new Set(["yes", "no", "partial"]);
const YES_NO = new Set(["yes", "no"]);
const PRICE_SOURCES = new Set([
  "ai-shopping",
  "catalog",
  "prices-rss",
  "brand",
  "site",
  "other",
  "none",
]);
/** Known prompt IDs from docs/geo/blind-test-prompts.md */
const PROMPT_IDS = new Set([
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "en-1",
  "en-2",
  "en-3",
  "en-4",
]);

function arg(name, fallback = "") {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function printList() {
  if (!fs.existsSync(promptsFile)) {
    console.error("Missing docs/geo/blind-test-prompts.md");
    process.exit(1);
  }
  const text = fs.readFileSync(promptsFile, "utf8");
  console.log(text);
  console.log("\n--- Known promptId values ---");
  console.log([...PROMPT_IDS].join(", "));
}

function printSummary() {
  if (!fs.existsSync(outFile)) {
    console.log("No observations yet:", path.relative(repoRoot, outFile));
    return;
  }
  const lines = fs
    .readFileSync(outFile, "utf8")
    .trim()
    .split("\n")
    .filter(Boolean);
  const rows = lines.map((l) => {
    try {
      return JSON.parse(l);
    } catch {
      return null;
    }
  }).filter(Boolean);
  const byPlatform = {};
  const byMentioned = {};
  const byPrice = {};
  for (const r of rows) {
    byPlatform[r.platform] = (byPlatform[r.platform] || 0) + 1;
    byMentioned[r.mentioned || "(empty)"] = (byMentioned[r.mentioned || "(empty)"] || 0) + 1;
    byPrice[r.priceSourceCited || "(empty)"] = (byPrice[r.priceSourceCited || "(empty)"] || 0) + 1;
  }
  console.log(
    JSON.stringify(
      {
        observations: rows.length,
        byPlatform,
        byMentioned,
        byPriceSourceCited: byPrice,
        file: path.relative(repoRoot, outFile),
        note: "Counts only — do not invent mention rates or percentages.",
      },
      null,
      2,
    ),
  );
}

if (hasFlag("list")) {
  printList();
  process.exit(0);
}
if (hasFlag("summary")) {
  printSummary();
  process.exit(0);
}

const row = {
  date: arg("date", new Date().toISOString()),
  platform: arg("platform"),
  locale: arg("locale", "tr-TR"),
  promptId: arg("promptId"),
  mentioned: arg("mentioned", ""),
  brandCorrect: arg("brandCorrect", ""),
  priceSourceCited: arg("priceSourceCited", ""),
  competitorsNamed: arg("competitors", ""),
  wrongClaims: arg("wrongClaims", ""),
  sources: arg("sources", "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  notes: arg("notes", ""),
  canonicalSite: "https://arledscreen.com/tr/",
  legacyDomainNotCitation: "arleds.com",
};

if (!row.platform || !row.promptId) {
  console.error("Required: --platform=... --promptId=...");
  console.error("Optional: --list · --summary");
  console.error("See docs/geo/blind-test-prompts.md");
  process.exit(1);
}
if (!PLATFORMS.has(row.platform)) {
  console.error(`Invalid --platform=${row.platform}. Allowed: ${[...PLATFORMS].join(", ")}`);
  process.exit(1);
}
if (!PROMPT_IDS.has(String(row.promptId))) {
  console.error(`Unknown --promptId=${row.promptId}. Use --list. Allowed: ${[...PROMPT_IDS].join(", ")}`);
  process.exit(1);
}
if (row.mentioned && !YES_NO_PARTIAL.has(row.mentioned)) {
  console.error(`Invalid --mentioned=${row.mentioned}. Allowed: yes|no|partial`);
  process.exit(1);
}
if (row.brandCorrect && !YES_NO.has(row.brandCorrect)) {
  console.error(`Invalid --brandCorrect=${row.brandCorrect}. Allowed: yes|no`);
  process.exit(1);
}
if (row.priceSourceCited && !PRICE_SOURCES.has(row.priceSourceCited)) {
  console.error(
    `Invalid --priceSourceCited=${row.priceSourceCited}. Allowed: ${[...PRICE_SOURCES].join(", ")}`,
  );
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.appendFileSync(outFile, `${JSON.stringify(row)}\n`, "utf8");
console.log(`Appended observation → ${path.relative(repoRoot, outFile)}`);
console.log(JSON.stringify(row, null, 2));
