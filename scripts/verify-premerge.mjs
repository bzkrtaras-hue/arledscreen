/**
 * Pre-merge confidence gate (Gün 56).
 *
 * Runs after build:
 *   1) smoke --local (same mustInclude as smoke:live, against out/)
 *   2) point-c-packs --check
 *   3) assert ai-shopping.json pricedPanels === 12 + agentRules
 *
 * Usage: node scripts/verify-premerge.mjs
 * npm:  npm run verify:premerge
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(root, "scripts", script), ...args], {
    cwd: root,
    encoding: "utf8",
  });
  process.stdout.write(r.stdout || "");
  process.stderr.write(r.stderr || "");
  return r.status ?? 1;
}

console.log("");
console.log("=== verify:premerge (Day 83) ===");

if (!fs.existsSync(out)) {
  console.error("verify:premerge: missing out/ — run npm run build first");
  process.exit(1);
}

let failed = 0;

if (run("smoke-live-ai-shopping.mjs", ["--local"]) !== 0) failed += 1;
if (run("print-point-c-packs.mjs", ["--check"]) !== 0) failed += 1;

const aiPath = path.join(out, "ai-shopping.json");
if (!fs.existsSync(aiPath)) {
  console.error("verify:premerge: missing out/ai-shopping.json");
  failed += 1;
} else {
  try {
    const doc = JSON.parse(fs.readFileSync(aiPath, "utf8"));
    const panels = doc.pricedPanels;
    if (!Array.isArray(panels) || panels.length !== 12) {
      console.error(
        `verify:premerge: pricedPanels must be 12 (got ${panels?.length})`,
      );
      failed += 1;
    } else if (!Array.isArray(doc.agentRules) || doc.agentRules.length < 4) {
      console.error("verify:premerge: agentRules missing/short");
      failed += 1;
    } else if (!/ücretsiz kargo yok/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid ücretsiz kargo");
      failed += 1;
    } else if (!/extrasUsd\.controlCard|list SKU/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must disambiguate extrasUsd.controlCard ≠ list SKU");
      failed += 1;
    } else if (!Array.isArray(doc.blindTestPrompts) || doc.blindTestPrompts.length !== 31) {
      console.error(
        `verify:premerge: blindTestPrompts must be 31 (got ${doc.blindTestPrompts?.length})`,
      );
      failed += 1;
    } else if (!/AI-infrastructure ready/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid AI-infrastructure ready SKU");
      failed += 1;
    } else if (!/aynı gün|enterprise all-in-one/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid aynı gün / enterprise all-in-one invent");
      failed += 1;
    } else if (!/OEM fabrika|fabrika üreticisi|bağımsız bayi/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid OEM/fabrika/bayi invent");
      failed += 1;
    } else {
      console.log(
        `verify:premerge: ai-shopping pricedPanels=12 · agentRules=${doc.agentRules.length} · prompts=31 OK`,
      );
    }
    // Day 66: catalog extrasUsdNote
    const catPath = path.join(out, "catalog.json");
    if (fs.existsSync(catPath)) {
      try {
        const cat = JSON.parse(fs.readFileSync(catPath, "utf8"));
        if (!/Huidu|list SKU/i.test(cat.shoppingPolicy?.extrasUsdNote || "")) {
          console.error("verify:premerge: catalog.shoppingPolicy.extrasUsdNote missing Huidu/list SKU honesty");
          failed += 1;
        }
      } catch (e) {
        console.error(`verify:premerge: catalog.json parse: ${e.message}`);
        failed += 1;
      }
    }
  } catch (e) {
    console.error(`verify:premerge: ai-shopping.json parse: ${e.message}`);
    failed += 1;
  }
}

console.log("-".repeat(60));
if (failed) {
  console.error(`verify:premerge: FAIL (${failed} step(s))`);
  process.exit(1);
}
console.log("verify:premerge: OK — smoke:local + point-c + pricedPanels");
console.log("");
process.exit(0);
