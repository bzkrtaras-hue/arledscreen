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
console.log("=== verify:premerge (Day 95) ===");

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
    } else if (!Array.isArray(doc.blindTestPrompts) || doc.blindTestPrompts.length !== 43) {
      console.error(
        `verify:premerge: blindTestPrompts must be 43 (got ${doc.blindTestPrompts?.length})`,
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
    } else if (!/tek ekip|keşiften teslimata/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid tek ekip / keşiften teslimata invent");
      failed += 1;
    } else if (!/stokta paket|anında teslim|list fiyatı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid stokta paket / anında teslim / list fiyat invent");
      failed += 1;
    } else if (!/sabit nit|IP65 garanti|600.?1200/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit nit / IP65 garanti invent");
      failed += 1;
    } else if (!/3840|1920|kamera dostu garanti|sabit yenileme Hz/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit Hz / kamera dostu garanti invent");
      failed += 1;
    } else if (!/1 mm = 1 m garanti|izleme mesafesi|pitch→metre|P2\.5=2,5/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid 1 mm = 1 m / izleme mesafesi garanti invent");
      failed += 1;
    } else if (!/0,45|0,75|3 faz zorunlu|sabit kW/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit kW/m² / 3 faz zorunlu invent");
      failed += 1;
    } else if (!/140|160|görüş açısı|sabit görüş/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit 140°/160° görüş açısı invent");
      failed += 1;
    } else if (!/HDR|gri skala|bit derinliği|16-bit/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit HDR / gri skala invent");
      failed += 1;
    } else if (!/100\.000|MTBF|sabit ömür|ömür/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit ömür / MTBF invent");
      failed += 1;
    } else if (!/DCI-P3|Rec\.709|gamut|6500K|renk sıcaklığı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit DCI-P3 / gamut invent");
      failed += 1;
    } else if (!/kg\/m²|kabin ağırlığı|kalınlık|sabit kg/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit kg/m² / kalınlık invent");
      failed += 1;
    } else if (!/-20|°C|sabit °C|çalışma sıcaklığı|işletme sıcaklığı/i.test(JSON.stringify(doc.agentRules))) {
      console.error("verify:premerge: agentRules must forbid sabit °C / -20/+50 invent");
      failed += 1;
    } else {
      console.log(
        `verify:premerge: ai-shopping pricedPanels=12 · agentRules=${doc.agentRules.length} · prompts=43 OK`,
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
