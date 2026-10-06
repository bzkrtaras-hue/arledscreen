/**
 * IndexNow ping — only live-200 catalog URLs that changed, once per day.
 *
 * Rules (owner):
 * - Catalog = scripts/lib/indexnow-urls.mjs INDEXNOW_URLS
 * - Ping only URLs that return live HTTP 200 and whose body hash changed
 * - Same URL must not be sent again the same calendar day (UTC date)
 * - POST shape: host + key + keyLocation + urlList (usually 1 URL)
 * - HTTP 200 or 202 = notification gate only (NOT indexing / AI mention / P0)
 * - HTTP 403 / 422 / 429 → append docs/indexnow-sahip-listesi.md and STOP
 *   (do not invent new pages)
 *
 * Dry-run (default): candidates only
 * Live: node scripts/indexnow-ping.mjs --live
 * Baseline (store hashes, no POST): --baseline
 * Force one catalog URL (still live-200 + same-day guard): --url=https://…
 *
 * Spec: https://www.indexnow.org/documentation
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { INDEXNOW_URLS, SITE } from "./lib/indexnow-urls.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "arledscreen.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const STATE_PATH = path.join(root, ".cache", "indexnow-state.json");
const COOLDOWN_PATH = path.join(root, ".cache", "indexnow-cooldown.json");
const OWNER_LIST = path.join(root, "docs", "indexnow-sahip-listesi.md");
const STOP_STATUSES = new Set([403, 422, 429]);
/** After HTTP 429, skip live pings until this many ms elapse (deploy-storm guard). */
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

const live = process.argv.includes("--live");
const baselineOnly = process.argv.includes("--baseline");
const forceCooldown = process.argv.includes("--force-cooldown");
const forceUrlArg = process.argv.find((a) => a.startsWith("--url="));
const forceUrl = forceUrlArg ? forceUrlArg.slice("--url=".length).trim() : null;

function readCooldown() {
  try {
    return JSON.parse(fs.readFileSync(COOLDOWN_PATH, "utf8"));
  } catch {
    return null;
  }
}

function writeCooldown(status, url) {
  fs.mkdirSync(path.dirname(COOLDOWN_PATH), { recursive: true });
  const until = new Date(Date.now() + COOLDOWN_MS).toISOString();
  fs.writeFileSync(
    COOLDOWN_PATH,
    JSON.stringify(
      {
        until,
        status,
        url: url || null,
        setAt: new Date().toISOString(),
        reason: "IndexNow rate limit — wait before next --live ping",
      },
      null,
      2,
    ) + "\n",
  );
  console.error(`indexnow-ping: cooldown until ${until} → ${path.relative(root, COOLDOWN_PATH)}`);
}

function assertNotInCooldown() {
  if (!live || forceCooldown || baselineOnly) return;
  const cd = readCooldown();
  if (!cd?.until) return;
  const untilMs = Date.parse(cd.until);
  if (!Number.isFinite(untilMs) || Date.now() >= untilMs) return;
  console.error(
    `indexnow-ping: STOP — cooldown active until ${cd.until} (last HTTP ${cd.status || "?"}).`,
  );
  console.error("  retry later, or: node scripts/indexnow-ping.mjs --live --force-cooldown");
  console.error("  post-deploy: npm run post-deploy -- --no-indexnow");
  process.exit(1);
}

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

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

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
  } catch {
    return { version: 1, urls: {} };
  }
}

function saveState(state) {
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
  fs.writeFileSync(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`);
}

function hashBody(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

/** Map catalog URL → local published artefact (out/ preferred, else public/). */
function localArtefactFor(full) {
  const rel = full.replace(SITE, "").replace(/^\//, "");
  const isFile =
    rel.endsWith(".json") ||
    rel.endsWith(".txt") ||
    rel.endsWith(".tsv") ||
    rel.endsWith(".xml");
  const candidates = [];
  if (isFile) {
    candidates.push(path.join(root, "out", rel), path.join(root, "public", rel));
  } else {
    const clean = rel.replace(/\/$/, "") || "tr";
    candidates.push(
      path.join(root, "out", clean, "index.html"),
      path.join(root, "public", clean, "index.html"),
    );
  }
  for (const file of candidates) {
    if (fs.existsSync(file)) return file;
  }
  return null;
}

function localHash(full) {
  const file = localArtefactFor(full);
  if (!file) return null;
  const buf = fs.readFileSync(file);
  return { file, hash: hashBody(buf), bytes: buf.length };
}

/** Live gate only — must be HTTP 200. Body not used for change detection. */
async function fetchLiveStatus(url) {
  const res = await fetch(url, {
    method: "GET",
    redirect: "follow",
    headers: { "user-agent": "arledscreen-indexnow/1.0" },
  });
  // Drain body so sockets close cleanly; ignore content.
  await res.arrayBuffer();
  return res.status;
}

function appendOwnerError({ status, url, detail }) {
  const stamp = new Date().toISOString();
  const header = `# IndexNow — sahip listesi (hata)

IndexNow bildirimi **indeks / AI anılması / P0 kapısını açmaz**.
403 · 422 · 429 → yeni sayfa yazma; buraya yaz ve dur.

| Zaman (UTC) | HTTP | URL | Not |
|-------------|------|-----|-----|
`;
  let body = "";
  if (fs.existsSync(OWNER_LIST)) {
    body = fs.readFileSync(OWNER_LIST, "utf8");
    if (!body.includes("| Zaman (UTC) |")) {
      body = header;
    }
  } else {
    body = header;
  }
  const note = String(detail || "")
    .replace(/\|/g, "/")
    .replace(/\n/g, " ")
    .slice(0, 180);
  const row = `| ${stamp} | ${status} | ${url} | ${note || "—"} |\n`;
  if (!body.endsWith("\n")) body += "\n";
  body += row;
  fs.writeFileSync(OWNER_LIST, body);
  console.error(`indexnow-ping: wrote owner error → ${path.relative(root, OWNER_LIST)}`);
}

const resolved = resolveKey();
if (!resolved) {
  console.error("indexnow-ping: missing public/<32-hex>.txt key file");
  process.exit(1);
}

assertNotInCooldown();

let catalog = [...INDEXNOW_URLS];
if (forceUrl) {
  if (!catalog.includes(forceUrl)) {
    console.error(`indexnow-ping: --url not in IndexNow catalog: ${forceUrl}`);
    process.exit(1);
  }
  catalog = [forceUrl];
}

const state = loadState();
const day = todayUtc();
const candidates = [];
const skipped = { not200: 0, unchanged: 0, sameDay: 0, baseline: 0 };

console.log("");
console.log(
  `IndexNow — ${baselineOnly ? "BASELINE" : live ? "LIVE" : "DRY-RUN"} · catalog ${catalog.length}`,
);
console.log(`keyLocation: ${resolved.keyLocation}`);
console.log(`state: ${STATE_PATH}`);
console.log("-".repeat(72));

for (const url of catalog) {
  const local = localHash(url);
  if (!local) {
    skipped.not200 += 1;
    console.log(`  SKIP no-local-artefact ${url}`);
    continue;
  }

  let liveStatus;
  try {
    liveStatus = await fetchLiveStatus(url);
  } catch (err) {
    skipped.not200 += 1;
    console.log(`  SKIP fetch-error ${url} · ${err?.message || err}`);
    continue;
  }
  if (liveStatus !== 200) {
    skipped.not200 += 1;
    console.log(`  SKIP live-${liveStatus} ${url}`);
    continue;
  }

  const prev = state.urls[url] || {};

  // First sighting or --baseline: store local artefact hash only (no POST).
  if (baselineOnly || !prev.contentHash) {
    state.urls[url] = {
      ...prev,
      contentHash: local.hash,
      bytes: local.bytes,
      artefact: path.relative(root, local.file),
      baselineAt: prev.baselineAt || new Date().toISOString(),
      lastLiveStatus: 200,
    };
    skipped.baseline += 1;
    console.log(`  BASELINE ${url}`);
    continue;
  }

  if (prev.lastSentDate === day) {
    // Same calendar day: skip only if content hash unchanged.
    // If invent/deploy changed the artefact after today's POST, re-notify
    // (otherwise updating contentHash here would swallow the change forever).
    if (prev.contentHash === local.hash) {
      skipped.sameDay += 1;
      console.log(`  SKIP same-day ${url}`);
      state.urls[url] = {
        ...prev,
        lastLiveStatus: 200,
        bytes: local.bytes,
        artefact: path.relative(root, local.file),
      };
      continue;
    }
    console.log(`  CANDIDATE same-day-changed ${url}`);
  }

  if (prev.lastSentDate !== day && prev.contentHash === local.hash) {
    skipped.unchanged += 1;
    console.log(`  SKIP unchanged ${url}`);
    state.urls[url] = {
      ...prev,
      lastLiveStatus: 200,
      bytes: local.bytes,
      artefact: path.relative(root, local.file),
    };
    continue;
  }

  candidates.push({ url, hash: local.hash, bytes: local.bytes, file: local.file });
  if (prev.lastSentDate !== day) console.log(`  CANDIDATE ${url}`);
}

saveState(state);

console.log("-".repeat(72));
console.log(
  `candidates=${candidates.length} · skip not200=${skipped.not200} unchanged=${skipped.unchanged} sameDay=${skipped.sameDay} baseline=${skipped.baseline}`,
);

if (baselineOnly) {
  console.log("Baseline OK — hashes stored; no IndexNow POST.");
  process.exit(0);
}

if (!live) {
  console.log(
    "Dry-run OK. After smoke:live GREEN + URL content change: npm run indexnow -- --live",
  );
  console.log(
    "Note: IndexNow 200/202 = bildirim kapısı only — indeks / AI anılması / P0 açılmaz.",
  );
  process.exit(0);
}

if (candidates.length === 0) {
  console.log("indexnow-ping: OK — nothing to notify (no changed live-200 URLs)");
  process.exit(0);
}

// One URL per POST so 403/422/429 can stop on the exact URL.
for (const item of candidates) {
  const payload = {
    host: HOST,
    key: resolved.key,
    keyLocation: resolved.keyLocation,
    urlList: [item.url],
  };
  console.log(`POST ${ENDPOINT} · ${item.url}`);
  let res;
  let text = "";
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    text = await res.text();
  } catch (err) {
    appendOwnerError({
      status: "fetch-error",
      url: item.url,
      detail: err?.message || String(err),
    });
    console.error("indexnow-ping: STOP — network error (owner list updated; no new pages)");
    process.exit(1);
  }

  console.log(`  → HTTP ${res.status}${text ? ` · ${text.slice(0, 200)}` : ""}`);

  if (res.status === 200 || res.status === 202) {
    state.urls[item.url] = {
      ...(state.urls[item.url] || {}),
      contentHash: item.hash,
      bytes: item.bytes,
      lastSentDate: day,
      lastSentAt: new Date().toISOString(),
      lastStatus: res.status,
      lastLiveStatus: 200,
    };
    saveState(state);
    continue;
  }

  if (STOP_STATUSES.has(res.status)) {
    appendOwnerError({
      status: res.status,
      url: item.url,
      detail: text.slice(0, 180) || "IndexNow stop status",
    });
    if (res.status === 429) writeCooldown(429, item.url);
    console.error(
      `indexnow-ping: STOP — HTTP ${res.status}. Owner list updated. Do not invent new pages.`,
    );
    process.exit(1);
  }

  console.error(
    `indexnow-ping: FAIL — unexpected HTTP ${res.status} (retry later; not writing new pages)`,
  );
  process.exit(1);
}

console.log(
  `indexnow-ping: OK — notified ${candidates.length} changed URL(s). Bildirim kapısı only (P0/indeks/AI anılması açılmaz).`,
);
process.exit(0);
