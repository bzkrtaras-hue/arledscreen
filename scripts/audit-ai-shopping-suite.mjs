/**
 * AI alışveriş / GEO regression suite summary (Gün 29).
 *
 * Runs every postbuild audit in sequence and prints a single PASS/FAIL table.
 * Expects `out/` from a prior `npm run build` (or run via `npm run audit:all`
 * after build). Does not re-run Next.js build.
 *
 * Usage: node scripts/audit-ai-shopping-suite.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const AUDITS = [
  { id: "offers", script: "audit-product-offers.mjs", day: "P0" },
  { id: "images", script: "audit-product-images.mjs", day: "P0" },
  { id: "shopping-links", script: "audit-shopping-links.mjs", day: "28" },
  { id: "faq", script: "audit-faq-jsonld.mjs", day: "28" },
  { id: "entity", script: "audit-entity-sameas.mjs", day: "P0" },
  { id: "schema", script: "audit-schema-gsc.mjs", day: "17" },
  { id: "locale", script: "audit-locale-canonical.mjs", day: "18" },
  { id: "case-images", script: "audit-case-study-images.mjs", day: "19" },
  { id: "product-ctas", script: "audit-product-ctas.mjs", day: "22" },
  { id: "sitemap", script: "audit-sitemap.mjs", day: "23" },
  { id: "robots", script: "audit-robots.mjs", day: "24" },
  { id: "blind-test", script: "audit-blind-test.mjs", day: "25" },
  { id: "cite-parity", script: "audit-cite-parity.mjs", day: "26" },
  { id: "merchant-feed", script: "audit-merchant-feed.mjs", day: "27" },
  { id: "ai-headers", script: "audit-ai-headers.mjs", day: "44" },
  { id: "indexnow", script: "audit-indexnow.mjs", day: "46" },
];

if (!fs.existsSync(path.join(root, "out"))) {
  console.error("audit-ai-shopping-suite: missing out/ — run npm run build first");
  process.exit(1);
}

const results = [];
let failed = 0;

for (const a of AUDITS) {
  const scriptPath = path.join(root, "scripts", a.script);
  const started = Date.now();
  const r = spawnSync(process.execPath, [scriptPath], {
    cwd: root,
    encoding: "utf8",
  });
  const ms = Date.now() - started;
  const ok = r.status === 0;
  if (!ok) failed += 1;
  const lastLine = (r.stdout || r.stderr || "")
    .trim()
    .split("\n")
    .filter(Boolean)
    .slice(-1)[0] || (ok ? "OK" : "FAIL");
  results.push({
    id: a.id,
    day: a.day,
    ok,
    ms,
    summary: lastLine.slice(0, 120),
  });
}

const pad = (s, n) => String(s).padEnd(n);
console.log("");
console.log("AI alışveriş regression suite");
console.log("=".repeat(72));
console.log(`${pad("audit", 16)} ${pad("day", 6)} ${pad("status", 6)} ${pad("ms", 6)} detail`);
console.log("-".repeat(72));
for (const r of results) {
  console.log(
    `${pad(r.id, 16)} ${pad(r.day, 6)} ${pad(r.ok ? "PASS" : "FAIL", 6)} ${pad(r.ms, 6)} ${r.summary}`,
  );
}
console.log("-".repeat(72));
console.log(
  `TOTAL ${results.length} · PASS ${results.length - failed} · FAIL ${failed} · ${failed ? "RED" : "GREEN"}`,
);
console.log("");

if (failed) process.exit(1);
