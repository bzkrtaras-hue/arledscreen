#!/usr/bin/env node
/**
 * Final build gate: fail if any owner-only / internal gate surface (or the owner's
 * personal mailbox) is present in out/ — as a file, a link, a sitemap URL,
 * a JSON-LD reference or a discovery-file line. Also guards the MailerLite CSP.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { OWNER_GATE_STRICT_RE, OWNER_GATE_FILE_RE } from "./owner-gate-pattern.mjs";
import { OWNER_GATE_PATH_RE, onRequest as ownerGateGuard } from "../functions/_middleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(path.resolve(__dirname, ".."), "out");
const BINARY = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".woff", ".woff2", ".avif", ".mp4", ".pdf"]);
const problems = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const rel = path.relative(outDir, p);
    const st = fs.lstatSync(p);
    if (OWNER_GATE_FILE_RE.test(name)) problems.push(`owner/internal file shipped: ${rel}`);
    if (st.isDirectory()) {
      walk(p);
      continue;
    }
    if (BINARY.has(path.extname(name).toLowerCase())) continue;
    if (rel === "_routes.json") continue; // checked below: owner-gate paths may appear only as 410-guard includes
    const text = fs.readFileSync(p, "utf8");
    if (OWNER_GATE_STRICT_RE.test(text)) {
      const m = text.match(new RegExp(`.{0,60}(${OWNER_GATE_STRICT_RE.source}).{0,40}`, "i"));
      problems.push(`owner/internal reference in ${rel}: …${m ? m[0].replace(/\s+/g, " ") : ""}…`);
    }
  }
}

if (!fs.existsSync(outDir)) {
  console.error("❌ validate-no-owner-gate: out/ missing");
  process.exit(1);
}
walk(outDir);

const headers = fs.existsSync(path.join(outDir, "_headers")) ? fs.readFileSync(path.join(outDir, "_headers"), "utf8") : "";
if (!/mailerlite\.com/.test(headers) || !/mlcdn\.com/.test(headers)) {
  problems.push("_headers CSP lost MailerLite (mailerlite.com / mlcdn.com) — newsletter form would break");
}

// 410 guard (ARL-20261009-020): stale Pages edge copies of deleted owner files must never be
// served again. Every owner-gate path must route to Functions (_routes include, not excluded)
// and functions/_middleware.js must answer 410, uncached.
const OWNER_SAMPLE_PATHS = [];
for (const base of ["owner-next", "owner-p0", "owner-gate", "geo-next", "geo-status", "point-c", "point-c-en", "point-c-progress", "tur1a"]) {
  for (const dir of ["/", "/.well-known/", "/feeds/"]) {
    for (const ext of [".json", ".txt", ".csv", ".html", ".md", ""]) OWNER_SAMPLE_PATHS.push(`${dir}${base}${ext}`);
  }
}
const globToRe = (g) => new RegExp(`^${g.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`);
const routesPath = path.join(outDir, "_routes.json");
if (!fs.existsSync(routesPath)) problems.push("_routes.json missing — owner-gate 410 guard would not run");
else {
  const routes = JSON.parse(fs.readFileSync(routesPath, "utf8"));
  const inc = (routes.include || []).map(globToRe);
  const exc = (routes.exclude || []).map(globToRe);
  for (const e of routes.exclude || []) {
    if (OWNER_GATE_STRICT_RE.test(e)) problems.push(`_routes.json exclude lists owner-gate path ${e}`);
  }
  if ((routes.include || []).length + (routes.exclude || []).length > 100) problems.push("_routes.json exceeds 100 rules");
  for (const p of OWNER_SAMPLE_PATHS) {
    if (!OWNER_GATE_PATH_RE.test(p)) problems.push(`functions/_middleware.js guard does not match ${p}`);
    if (!inc.some((r) => r.test(p)) || exc.some((r) => r.test(p))) problems.push(`_routes.json does not route ${p} to the 410 guard`);
  }
}
for (const p of ["/owner-p0.json", "/.well-known/owner-next.json", "/feeds/point-c.csv"]) {
  const res = await ownerGateGuard({ request: new Request(`https://arledscreen.com${p}`), next: () => new Response("next") });
  if (res.status !== 410 || !/no-store/.test(res.headers.get("cache-control") || "")) problems.push(`guard returned ${res.status} for ${p}`);
}
for (const p of ["/tr/", "/robots.txt", "/brand", "/feeds/prices.json", "/.well-known/ard.json", "/geo-baseline.json"]) {
  if (OWNER_GATE_PATH_RE.test(p)) problems.push(`guard would wrongly block ${p}`);
}

if (problems.length) {
  console.error(`❌ validate-no-owner-gate: ${problems.length} problem(s)`);
  for (const p of problems.slice(0, 50)) console.error(`   - ${p}`);
  process.exit(1);
}
console.log("✅ validate-no-owner-gate: no owner/internal surfaces or personal mailbox in out/; MailerLite CSP intact");
