/**
 * robots.txt Bing/AI Allow + Host audit (Gün 24).
 *
 * Source of truth: functions/robots.txt.js (Pages Function, no-store).
 * Static out/robots.txt is stripped in postbuild so CDN cannot serve a stale Host.
 *
 * Verifies:
 * - User-agent: * Allow: /
 * - Required AI/search bots each have Allow: /
 * - Host: arledscreen.com (bare hostname)
 * - Sitemap: https://arledscreen.com/sitemap.xml
 * - No Disallow for required bots
 *
 * Run after build: node scripts/audit-robots.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const fnPath = path.join(root, "functions/robots.txt.js");
if (!fs.existsSync(fnPath)) {
  console.error("Missing functions/robots.txt.js — live robots Function source");
  process.exit(1);
}

const fnSrc = fs.readFileSync(fnPath, "utf8");
const bodyMatch = fnSrc.match(/const BODY = `([\s\S]*?)`;/);
if (!bodyMatch) {
  console.error("functions/robots.txt.js: missing const BODY = `...` template");
  process.exit(1);
}

const text = bodyMatch[1];
const normalized = text.replace(/\r\n/g, "\n");

/** Parse into blocks keyed by user-agent (lowercased). */
const blocks = new Map();
let current = null;
for (const line of normalized.split("\n")) {
  const ua = line.match(/^User-Agent:\s*(.+)\s*$/i);
  if (ua) {
    current = ua[1].trim().toLowerCase();
    if (!blocks.has(current)) blocks.set(current, { allow: [], disallow: [] });
    continue;
  }
  if (!current) continue;
  const allow = line.match(/^Allow:\s*(.+)\s*$/i);
  if (allow) {
    blocks.get(current).allow.push(allow[1].trim());
    continue;
  }
  const disallow = line.match(/^Disallow:\s*(.*)\s*$/i);
  if (disallow) {
    blocks.get(current).disallow.push(disallow[1].trim());
  }
}

function mustAllow(agent) {
  const b = blocks.get(agent.toLowerCase());
  if (!b) {
    errors.push(`missing User-agent: ${agent}`);
    return;
  }
  if (!b.allow.some((a) => a === "/" || a === "/*")) {
    errors.push(`${agent}: missing Allow: /`);
  }
  if (b.disallow.some((d) => d === "/" || d === "/*")) {
    errors.push(`${agent}: Disallow: / blocks AI shopping crawl`);
  }
}

mustAllow("*");

const REQUIRED = [
  "bingbot",
  "BingPreview",
  "Googlebot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Amzn-SearchBot",
  "Amazonbot",
  "DuckAssistBot",
  "DuckDuckBot",
  "Applebot",
  "YandexBot",
];

for (const a of REQUIRED) mustAllow(a);

const host = normalized.match(/^Host:\s*(.+)\s*$/im)?.[1]?.trim();
if (!host) errors.push("missing Host line");
else if (host !== "arledscreen.com") {
  errors.push(`Host must be bare hostname arledscreen.com (got ${host})`);
}

const sitemap = normalized.match(/^Sitemap:\s*(.+)\s*$/im)?.[1]?.trim();
if (sitemap !== "https://arledscreen.com/sitemap.xml") {
  errors.push(`Sitemap must be https://arledscreen.com/sitemap.xml (got ${sitemap})`);
}

// Static out/robots.txt must stay absent so the Function owns /robots.txt.
const robotsOut = path.join(root, "out/robots.txt");
if (fs.existsSync(robotsOut)) {
  errors.push("out/robots.txt must be removed (Function owns /robots.txt; static wins over Pages Function)");
}

const routesPath = path.join(root, "out/_routes.json");
if (fs.existsSync(routesPath)) {
  const routes = JSON.parse(fs.readFileSync(routesPath, "utf8"));
  if (!(routes.include || []).includes("/robots.txt")) {
    errors.push("out/_routes.json include must list /robots.txt");
  }
  if ((routes.exclude || []).includes("/robots.txt")) {
    errors.push("out/_routes.json must not exclude /robots.txt");
  }
}

if (errors.length) {
  console.error(`audit-robots: FAIL (${errors.length})`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(
  `audit-robots: OK — Function BODY bots_allowed=${REQUIRED.length}+* host=arledscreen.com sitemap=ok`,
);
