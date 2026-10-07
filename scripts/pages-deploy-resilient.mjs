#!/usr/bin/env node
/**
 * Resilient Cloudflare Pages Direct Upload for arledscreen.
 *
 * Why: during CF Partial System Outage, POST /pages/assets/upload returns 500 on
 * large concurrent batches. `wrangler pages deploy --skip-caching` forces a full
 * re-upload of every hash and reliably fails. Differential deploy (check-missing
 * + only new hashes) works; single-file batches also work when wrangler batches fail.
 *
 * Default path: wrangler WITHOUT --skip-caching (Functions + _headers/_redirects).
 * Fallback: manual JWT upload of missing hashes at concurrency=1, then wrangler
 * again (0 missing → attach Functions + create deployment).
 *
 * Env: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
 * Usage: node scripts/pages-deploy-resilient.mjs [outDir]
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.resolve(process.argv[2] || path.join(ROOT, "out"));
const PROJECT = "arledscreen";
const ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID || "4a0f179229f3c6a21d076df944b850e8";
const TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!TOKEN) {
  console.error("CLOUDFLARE_API_TOKEN required");
  process.exit(1);
}
if (!fs.existsSync(OUT)) {
  console.error(`Missing out dir: ${OUT}`);
  process.exit(1);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function cf(method, apiPath, { token, body } = {}) {
  const headers = { Authorization: `Bearer ${token}` };
  let payload;
  if (body != null) {
    headers["Content-Type"] = "application/json";
    payload = typeof body === "string" ? body : JSON.stringify(body);
  }
  const res = await fetch(`https://api.cloudflare.com/client/v4${apiPath}`, {
    method,
    headers,
    body: payload,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  return { status: res.status, json, text };
}

function wranglerDeploy({ skipCaching = false } = {}) {
  const args = [
    "wrangler@4",
    "pages",
    "deploy",
    OUT,
    "--project-name",
    PROJECT,
    "--branch",
    "main",
    "--commit-dirty=true",
  ];
  if (skipCaching) args.push("--skip-caching");
  console.log(`\n→ npx ${args.join(" ")}\n`);
  const r = spawnSync("npx", args, {
    cwd: ROOT,
    env: process.env,
    stdio: "inherit",
    shell: false,
  });
  return r.status === 0;
}

function contentType(fp) {
  const ext = path.extname(fp).toLowerCase();
  const map = {
    ".html": "text/html; charset=utf-8",
    ".json": "application/json",
    ".txt": "text/plain; charset=utf-8",
    ".md": "text/markdown; charset=utf-8",
    ".xml": "application/xml",
    ".tsv": "text/tab-separated-values",
    ".css": "text/css",
    ".js": "application/javascript",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".woff2": "font/woff2",
    ".ico": "image/x-icon",
  };
  return map[ext] || "application/octet-stream";
}

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

async function uploadMissingOneByOne() {
  // blake3-wasm is pulled by wrangler; resolve from npx cache or local node_modules.
  let blake3;
  try {
    const require = createRequire(import.meta.url);
    blake3 = require("blake3-wasm");
  } catch {
    const npxRoot = path.join(
      process.env.HOME || "/home/ubuntu",
      ".npm/_npx",
    );
    const candidates = fs.existsSync(npxRoot)
      ? walk(npxRoot).filter((p) => p.endsWith(`${path.sep}blake3-wasm${path.sep}index.js`) || p.endsWith(`${path.sep}blake3-wasm${path.sep}dist${path.sep}index.js`))
      : [];
    // Prefer package root require via nearest wrangler install
    const wranglerCli = walk(npxRoot).find((p) => p.endsWith(`${path.sep}wrangler${path.sep}wrangler-dist${path.sep}cli.js`));
    if (!wranglerCli) throw new Error("blake3-wasm not found — run npx wrangler@4 once first");
    const require = createRequire(wranglerCli);
    blake3 = require("blake3-wasm");
  }

  function hashFile(filepath) {
    const contents = fs.readFileSync(filepath);
    const base64Contents = contents.toString("base64");
    const extension = path.extname(filepath).substring(1);
    return blake3.hash(base64Contents + extension).toString("hex").slice(0, 32);
  }

  const files = walk(OUT);
  const fileMap = files.map((fp) => ({
    path: "/" + path.relative(OUT, fp).split(path.sep).join("/"),
    filepath: fp,
    hash: hashFile(fp),
    size: fs.statSync(fp).size,
  }));
  console.log(`Hashed ${fileMap.length} files under ${OUT}`);

  let tok = await cf("GET", `/accounts/${ACCOUNT}/pages/projects/${PROJECT}/upload-token`, {
    token: TOKEN,
  });
  if (!tok.json.success) throw new Error(`upload-token failed: ${tok.text.slice(0, 300)}`);
  let jwt = tok.json.result.jwt;

  let miss = await cf("POST", `/pages/assets/check-missing`, {
    token: jwt,
    body: { hashes: fileMap.map((f) => f.hash) },
  });
  if (!miss.json.success) {
    tok = await cf("GET", `/accounts/${ACCOUNT}/pages/projects/${PROJECT}/upload-token`, {
      token: TOKEN,
    });
    jwt = tok.json.result.jwt;
    miss = await cf("POST", `/pages/assets/check-missing`, {
      token: jwt,
      body: { hashes: fileMap.map((f) => f.hash) },
    });
  }
  if (!miss.json.success) throw new Error(`check-missing failed: ${miss.text.slice(0, 400)}`);

  const missing = miss.json.result || [];
  const byHash = new Map();
  for (const f of fileMap) if (!byHash.has(f.hash)) byHash.set(f.hash, f);
  const unique = [...new Set(missing)].map((h) => byHash.get(h)).filter(Boolean);
  console.log(`Missing unique hashes: ${unique.length}`);

  let uploaded = 0;
  for (const f of unique) {
    const payload = [
      {
        key: f.hash,
        value: fs.readFileSync(f.filepath).toString("base64"),
        metadata: { contentType: contentType(f.filepath) },
        base64: true,
      },
    ];
    let ok = false;
    for (let attempt = 1; attempt <= 8 && !ok; attempt++) {
      if (uploaded > 0 && uploaded % 25 === 0 && attempt === 1) {
        tok = await cf("GET", `/accounts/${ACCOUNT}/pages/projects/${PROJECT}/upload-token`, {
          token: TOKEN,
        });
        jwt = tok.json.result.jwt;
      }
      const res = await cf("POST", `/pages/assets/upload`, { token: jwt, body: payload });
      if (res.status === 200 && res.json.success) {
        ok = true;
        uploaded++;
        if (uploaded % 25 === 0) console.log(`Uploaded ${uploaded}/${unique.length}`);
      } else if (res.status === 401 || res.status === 403) {
        tok = await cf("GET", `/accounts/${ACCOUNT}/pages/projects/${PROJECT}/upload-token`, {
          token: TOKEN,
        });
        jwt = tok.json.result.jwt;
        await sleep(400);
      } else {
        console.warn(`upload fail ${f.path} attempt ${attempt} HTTP ${res.status}`);
        await sleep(Math.min(20000, 800 * 2 ** attempt));
        tok = await cf("GET", `/accounts/${ACCOUNT}/pages/projects/${PROJECT}/upload-token`, {
          token: TOKEN,
        });
        jwt = tok.json.result.jwt;
      }
    }
    if (!ok) throw new Error(`Gave up uploading ${f.path}`);
  }

  tok = await cf("GET", `/accounts/${ACCOUNT}/pages/projects/${PROJECT}/upload-token`, {
    token: TOKEN,
  });
  jwt = tok.json.result.jwt;
  await cf("POST", `/pages/assets/upsert-hashes`, {
    token: jwt,
    body: { hashes: fileMap.map((f) => f.hash) },
  });
  console.log(`Manual upload complete (${uploaded} files). Re-run wrangler for Functions + deployment.`);
}

async function main() {
  // 1) Prefer differential wrangler (Functions included). Never start with --skip-caching.
  if (wranglerDeploy({ skipCaching: false })) {
    console.log("OK differential wrangler deploy");
    return;
  }

  console.warn("Differential wrangler failed — uploading missing hashes one-by-one…");
  await uploadMissingOneByOne();

  // 2) Assets now cached → wrangler should upload 0 files and attach Functions.
  if (wranglerDeploy({ skipCaching: false })) {
    console.log("OK wrangler after batch=1 asset prewarm");
    return;
  }

  console.error("FAIL: resilient deploy exhausted");
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
