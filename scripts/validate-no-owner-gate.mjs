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

if (problems.length) {
  console.error(`❌ validate-no-owner-gate: ${problems.length} problem(s)`);
  for (const p of problems.slice(0, 50)) console.error(`   - ${p}`);
  process.exit(1);
}
console.log("✅ validate-no-owner-gate: no owner/internal surfaces or personal mailbox in out/; MailerLite CSP intact");
