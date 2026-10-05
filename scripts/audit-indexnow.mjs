/**
 * IndexNow key file presence (Gün 46).
 *
 * Ensures out/ ships a valid IndexNow verification file so post-merge
 * `npm run indexnow -- --live` can notify Bing of AI artefact URLs.
 *
 * Run after build: node scripts/audit-indexnow.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const errors = [];

if (!fs.existsSync(out)) {
  console.error("audit-indexnow: missing out/ — run npm run build first");
  process.exit(1);
}

const pub = path.join(root, "public");
const pubKeys = fs
  .readdirSync(pub)
  .filter((n) => /^[a-f0-9]{32}\.txt$/i.test(n));
if (pubKeys.length !== 1) {
  errors.push(`public/ must have exactly one IndexNow key file (got ${pubKeys.length})`);
}

let key = null;
if (pubKeys.length === 1) {
  key = pubKeys[0].replace(/\.txt$/i, "");
  const body = fs.readFileSync(path.join(pub, pubKeys[0]), "utf8").trim();
  if (body !== key) {
    errors.push(`public/${pubKeys[0]} body must equal key (${key})`);
  }
  const outFile = path.join(out, pubKeys[0]);
  if (!fs.existsSync(outFile)) {
    errors.push(`missing out/${pubKeys[0]} (IndexNow key not exported)`);
  } else {
    const outBody = fs.readFileSync(outFile, "utf8").trim();
    if (outBody !== key) errors.push(`out/${pubKeys[0]} body mismatch`);
  }
}

// ard.json should discover IndexNow key for operators
const ardPath = path.join(out, ".well-known", "ard.json");
if (fs.existsSync(ardPath) && key) {
  const ard = fs.readFileSync(ardPath, "utf8");
  if (!ard.includes("indexnow") && !ard.includes(key)) {
    errors.push("ard.json should mention IndexNow / key discovery for post-deploy ping");
  }
}

if (errors.length) {
  console.error(`audit-indexnow: FAIL (${errors.length})`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(`audit-indexnow: OK — key=${key}.txt shipped in out/`);
