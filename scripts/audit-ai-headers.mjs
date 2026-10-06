/**
 * AI alışveriş headers parity (Gün 44).
 *
 * Ensures out/_headers grants CORS + correct Content-Type + CORP cross-origin
 * for every machine-readable AI shopping artefact. Agents fetch these cross-origin.
 *
 * Run after build: node scripts/audit-ai-headers.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const headersPath = path.join(root, "out", "_headers");
const errors = [];

const AI_PATHS = [
  {
    path: "/entity.json",
    contentType: "application/json",
  },
  {
    path: "/entity-profiles.json",
    contentType: "application/json",
  },
  {
    path: "/catalog.json",
    contentType: "application/json",
  },
  {
    path: "/ai-shopping.json",
    contentType: "application/json",
  },
  {
    path: "/.well-known/ard.json",
    contentType: "application/json",
  },
  {
    path: "/.well-known/ai-catalog.json",
    contentType: "application/json",
  },
  {
    path: "/llms.txt",
    contentType: "text/plain",
  },
  {
    path: "/llms-full.txt",
    contentType: "text/plain",
  },
  {
    path: "/feeds/merchant-priced-panels.tsv",
    contentType: "text/tab-separated-values",
  },
];

/** Parse Cloudflare Pages _headers into { path: { header: value } }. */
function parseHeaders(raw) {
  const map = new Map();
  let current = null;
  for (const line of raw.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      current = line.trim();
      if (!map.has(current)) map.set(current, {});
      continue;
    }
    if (!current) continue;
    const trimmed = line.trim();
    if (trimmed.startsWith("!")) continue; // unset directive
    const idx = trimmed.indexOf(":");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim().toLowerCase();
    const val = trimmed.slice(idx + 1).trim();
    map.get(current)[key] = val;
  }
  return map;
}

if (!fs.existsSync(headersPath)) {
  console.error("audit-ai-headers: missing out/_headers — run npm run build first");
  process.exit(1);
}

const sections = parseHeaders(fs.readFileSync(headersPath, "utf8"));

for (const spec of AI_PATHS) {
  const headers = sections.get(spec.path);
  if (!headers) {
    errors.push(`missing _headers section for ${spec.path}`);
    continue;
  }
  const acao = headers["access-control-allow-origin"];
  if (acao !== "*") {
    errors.push(`${spec.path} Access-Control-Allow-Origin must be * (got ${acao || "none"})`);
  }
  const corp = headers["cross-origin-resource-policy"];
  if (!/cross-origin/i.test(corp || "")) {
    errors.push(`${spec.path} Cross-Origin-Resource-Policy must be cross-origin`);
  }
  const ctype = headers["content-type"] || "";
  if (!ctype.toLowerCase().includes(spec.contentType.toLowerCase())) {
    errors.push(
      `${spec.path} Content-Type must include ${spec.contentType} (got ${ctype || "none"})`,
    );
  }
  if (!/charset=utf-8/i.test(ctype)) {
    errors.push(`${spec.path} Content-Type must include charset=utf-8`);
  }
}

if (errors.length) {
  console.error(`audit-ai-headers: FAIL (${errors.length})`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(
  `audit-ai-headers: OK — paths=${AI_PATHS.length} CORS+Content-Type+CORP ready`,
);
