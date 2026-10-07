#!/usr/bin/env node
/**
 * Local Tur1a / GEO blind-test observation logger.
 * Writes JSONL under docs/geo/observations/ (gitignored optional).
 * Does NOT invent mention rates. Does NOT embed into ai-shopping.json.
 *
 * Usage:
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

function arg(name, fallback = "") {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
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
  console.error("See docs/geo/blind-test-prompts.md");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.appendFileSync(outFile, `${JSON.stringify(row)}\n`, "utf8");
console.log(`Appended observation → ${path.relative(repoRoot, outFile)}`);
console.log(JSON.stringify(row, null, 2));
