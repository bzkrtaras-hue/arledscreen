/**
 * Sync public/.well-known/ai-catalog.json FROM ard.json (Gün 55).
 * Single source of truth: ard.json. Stops hand-edit twin drift.
 *
 * Run: node scripts/sync-ai-catalog-from-ard.mjs (also via npm run build)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ardPath = path.join(root, "public/.well-known/ard.json");
const outPath = path.join(root, "public/.well-known/ai-catalog.json");

if (!fs.existsSync(ardPath)) {
  console.error("sync-ai-catalog-from-ard: missing public/.well-known/ard.json");
  process.exit(1);
}

const ard = JSON.parse(fs.readFileSync(ardPath, "utf8"));
if (!Array.isArray(ard.entries) || ard.entries.length < 8) {
  console.error(`sync-ai-catalog-from-ard: ard.entries too short (${ard.entries?.length})`);
  process.exit(1);
}

const urls = ard.entries.map((e) => e.url).join("\n");
for (const need of ["/ai-shopping.json", "/catalog.json", "/entity.json"]) {
  if (!urls.includes(need)) {
    console.error(`sync-ai-catalog-from-ard: ard.json missing ${need}`);
    process.exit(1);
  }
}

const doc = {
  entries: ard.entries,
  _syncedFrom: "ard.json",
  _note: "Do not hand-edit. Regenerate via npm run build (sync-ai-catalog-from-ard).",
};

fs.writeFileSync(outPath, `${JSON.stringify(doc, null, 2)}\n`);
console.log(
  `sync-ai-catalog-from-ard: wrote ${path.relative(root, outPath)} (${ard.entries.length} entries from ard.json)`,
);
