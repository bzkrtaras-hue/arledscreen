/**
 * IndexNow ping for AI alışveriş artefacts (Gün 46).
 *
 * After PR #55 merge + CF redeploy, notify Bing/IndexNow partners to recrawl
 * previously soft-404 machine-readable URLs (entity/catalog/ard/…) plus price hubs.
 *
 * Dry-run (default): prints payload, exits 0
 * Live: node scripts/indexnow-ping.mjs --live
 *
 * Spec: https://www.indexnow.org/documentation
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://arledscreen.com";
const HOST = "arledscreen.com";
const live = process.argv.includes("--live");

/** Discover key from public/*.txt whose body === basename without .txt */
function resolveKey() {
  const pub = path.join(root, "public");
  for (const name of fs.readdirSync(pub)) {
    if (!/^[a-f0-9]{32}\.txt$/i.test(name)) continue;
    const key = name.replace(/\.txt$/i, "");
    const body = fs.readFileSync(path.join(pub, name), "utf8").trim();
    if (body === key) return { key, keyLocation: `${SITE}/${key}.txt` };
  }
  return null;
}

const resolved = resolveKey();
if (!resolved) {
  console.error("indexnow-ping: missing public/<32-hex>.txt key file");
  process.exit(1);
}

const URLS = [
  `${SITE}/ai-shopping.json`,
  `${SITE}/entity.json`,
  `${SITE}/entity-profiles.json`,
  `${SITE}/catalog.json`,
  `${SITE}/.well-known/ard.json`,
  `${SITE}/llms.txt`,
  `${SITE}/llms-full.txt`,
  `${SITE}/feeds/merchant-priced-panels.tsv`,
  `${SITE}/sitemap.xml`,
  `${SITE}/tr/`,
  `${SITE}/tr/led-ekran-fiyatlari/`,
  `${SITE}/tr/hesaplayici/`,
  `${SITE}/tr/yapay-zeka/`,
  `${SITE}/tr/about/`,
  `${SITE}/tr/quote/`,
  `${SITE}/tr/products/`,
  `${SITE}/tr/rehber/led-ekran/`,
  `${SITE}/tr/rehber/gob-vs-smd/`,
  `${SITE}/tr/p2-5-led-ekran/`,
];

const payload = {
  host: HOST,
  key: resolved.key,
  keyLocation: resolved.keyLocation,
  urlList: URLS,
};

console.log("");
console.log(`IndexNow — ${live ? "LIVE" : "DRY-RUN"} · ${URLS.length} URLs`);
console.log(`keyLocation: ${resolved.keyLocation}`);
console.log("-".repeat(72));
for (const u of URLS) console.log(`  ${u}`);
console.log("-".repeat(72));

if (!live) {
  console.log("Dry-run OK. After smoke:live GREEN, run: npm run indexnow -- --live");
  process.exit(0);
}

const endpoint = "https://api.indexnow.org/indexnow";
const res = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});
const text = await res.text();
console.log(`POST ${endpoint} → HTTP ${res.status}`);
if (text) console.log(text.slice(0, 500));

// 200/202 = accepted; 422 = invalid; others = retry later
if (res.status !== 200 && res.status !== 202) {
  console.error("indexnow-ping: FAIL — unexpected status (check key file live + host)");
  process.exit(1);
}
console.log("indexnow-ping: OK — Bing/IndexNow partners notified");
