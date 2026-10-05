/**
 * Post-deploy AI alışveriş gate (Gün 48).
 *
 * After PR #55 CF redeploy:
 *   npm run post-deploy
 *
 * 1) smoke:live — must be BLOCKED 0 (or pass --force)
 * 2) indexnow --live — Bing recrawl of AI artefacts (unless --no-indexnow)
 *
 * Usage:
 *   node scripts/post-deploy-ai.mjs
 *   node scripts/post-deploy-ai.mjs --force
 *   node scripts/post-deploy-ai.mjs --no-indexnow
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const force = process.argv.includes("--force");
const skipIndex = process.argv.includes("--no-indexnow");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(root, "scripts", script), ...args], {
    cwd: root,
    encoding: "utf8",
  });
  process.stdout.write(r.stdout || "");
  process.stderr.write(r.stderr || "");
  return { status: r.status ?? 1, stdout: r.stdout || "" };
}

console.log("");
console.log("=== post-deploy AI alışveriş ===");
const smoke = run("smoke-live-ai-shopping.mjs");
const blockedMatch = smoke.stdout.match(/BLOCKED\s+(\d+)/);
const blocked = blockedMatch ? Number(blockedMatch[1]) : 99;

if (blocked > 0 && !force) {
  console.error("");
  console.error(`post-deploy: STOP — smoke BLOCKED=${blocked}. Merge/redeploy PR #55, then retry.`);
  console.error("  debug only: npm run post-deploy -- --force");
  process.exit(1);
}

if (skipIndex) {
  console.log("post-deploy: skip IndexNow (--no-indexnow)");
  process.exit(0);
}

console.log(
  blocked > 0
    ? "post-deploy: FORCE IndexNow despite smoke blocks"
    : "post-deploy: smoke OK → IndexNow live",
);
const idx = run("indexnow-ping.mjs", ["--live"]);
if (idx.status !== 0) {
  console.error("post-deploy: IndexNow failed");
  process.exit(1);
}
console.log("post-deploy: OK — live surfaces notified");
console.log("");
console.log("Day 51–53 contract (canlı doğrula):");
console.log("  ai-shopping.json → pricedPanels=12 · agentRules · extrasUsd · returnPolicy · ücretsiz kargo yok");
console.log("  catalog.json → shippingDetails · hasMerchantReturnPolicy · Brand.url · priceValidUntil");
console.log("  merchant TSV → shipping boş · tax=TR:0:n (KDV hariç, tax-free değil)");
console.log("  llms/yapay-zeka → pricedPanels + honesty tokens");
console.log("");
console.log("Next (sahip): npm run point-c-packs -- --live → GBP/LinkedIn/IG/FB paste");
console.log("  entity-profiles.json → sameAsReadiness + packs (ai-shopping cite)");
console.log("Then: docs/ai-shopping-blind-test-scores.md tur 1");
process.exit(0);
