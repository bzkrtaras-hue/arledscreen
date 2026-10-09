#!/usr/bin/env node
/**
 * Post-build privacy gate: remove owner-only / internal gate surfaces from out/
 * and scrub every reference to them
 * from public discovery artefacts (llms*.txt, ai.txt, humans.txt, security.txt,
 * JSON feeds, RSS, sitemap, _headers, _redirects).
 *
 * Runs before validate-ai-feeds (which validates the final artefacts); validate-no-owner-gate.mjs
 * then fails the build if anything slips back in.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { OWNER_GATE_FILE_RE, mentionsOwnerGate } from "./owner-gate-pattern.mjs";
import { DROP, scrubJson, scrubTextLines, scrubXml, scrubHeaders, scrubDelimited, scrubRedirects } from "./owner-gate-scrub.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const outDir = path.join(repoRoot, "out");
const stats = { deleted: 0, scrubbed: 0 };

function walk(dir, cb) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.lstatSync(p);
    cb(p, name, st);
    if (st.isDirectory() && fs.existsSync(p)) walk(p, cb);
  }
}

function deleteOwnerFiles(root) {
  const victims = [];
  walk(root, (p, name) => {
    if (OWNER_GATE_FILE_RE.test(name)) victims.push(p);
  });
  for (const p of victims) {
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true, force: true });
      stats.deleted++;
    }
  }
}

function isRscPayload(text) {
  return /^\d+:/.test(text) || text.includes(':HL[') || text.includes('"$Sreact');
}

function scrubFile(p, name) {
  const ext = path.extname(name).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".svg", ".woff", ".woff2", ".avif", ".mp4", ".pdf", ".js", ".css", ".map"].includes(ext))
    return;
  if (ext === ".html" || ext === ".htm") return; // HTML is fixed at source (src/); final gate verifies.
  // _routes.json only lists the owner-gate paths that functions/_middleware.js answers with 410;
  // scrubbing them would re-open the stale Pages cache. validate-no-owner-gate.mjs checks it.
  if (name === "_routes.json") return;
  let text;
  try {
    text = fs.readFileSync(p, "utf8");
  } catch {
    return;
  }
  if (!mentionsOwnerGate(text)) return;
  let out = text;
  const trimmed = text.trimStart();
  if (name === "_headers") out = scrubHeaders(text);
  else if (name === "_redirects") out = scrubRedirects(text);
  else if (ext === ".tsv") out = scrubDelimited(text, "\t");
  else if (ext === ".json" || trimmed.startsWith("{") || trimmed.startsWith("[")) {
    let doc;
    try {
      doc = JSON.parse(text);
    } catch {
      doc = undefined;
    }
    if (doc === undefined) out = scrubTextLines(text);
    else {
      const pretty = /\n\s+"/.test(text.slice(0, 200));
      const s = scrubJson(doc);
      out = (pretty ? JSON.stringify(s === DROP ? {} : s, null, 2) : JSON.stringify(s === DROP ? {} : s)) + (text.endsWith("\n") ? "\n" : "");
    }
  } else if (ext === ".xml" || ext === ".rss" || trimmed.startsWith("<?xml")) out = scrubXml(text);
  else if (ext === ".txt" && isRscPayload(text)) return; // Next RSC payload: fixed at source.
  else out = scrubTextLines(text);
  if (out !== text) {
    fs.writeFileSync(p, out);
    stats.scrubbed++;
  }
}

if (!fs.existsSync(outDir)) {
  console.error("strip-owner-gate: out/ missing");
  process.exit(1);
}
deleteOwnerFiles(outDir);

walk(outDir, (p, name, st) => {
  if (st.isFile()) scrubFile(p, name);
});
// Keep the committed public/ mirrors in sync with the scrubbed out/ artefacts, so the repo
// working tree never re-acquires owner-gate references after a build.
const publicDir = path.join(repoRoot, "public");
let mirrored = 0;
deleteOwnerFiles(publicDir);
walk(publicDir, (p, name, st) => {
  if (!st.isFile()) return;
  const ext = path.extname(name).toLowerCase();
  if (ext === ".html" || ext === ".htm") return;
  const twin = path.join(outDir, path.relative(publicDir, p));
  if (!fs.existsSync(twin)) return;
  let text;
  try {
    text = fs.readFileSync(p, "utf8");
  } catch {
    return;
  }
  if (!mentionsOwnerGate(text)) return;
  const clean = fs.readFileSync(twin, "utf8");
  if (!mentionsOwnerGate(clean) && clean !== text) {
    fs.writeFileSync(p, clean);
    mirrored++;
  }
});
console.log(
  `🔒 strip-owner-gate: deleted ${stats.deleted} owner/internal files, scrubbed ${stats.scrubbed} public artefacts, synced ${mirrored} public/ mirrors`,
);
