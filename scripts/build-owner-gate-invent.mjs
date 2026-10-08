#!/usr/bin/env node
/**
 * Build inventable owner-gate surfaces for postbuild (geo-status / geo-next / progress).
 * Cite-only — does not invent Point C pastes or Tur1a scores.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  HOSTINGER_STEP,
  POINT_C_OPEN_ALTS,
  POINT_C_OPEN_URLS,
  POINT_C_PASTE_WHERE,
  TR_ORDER,
  pointCOpenAltUrl,
  pointCOpenUrl,
} from "./print-point-c-packs.mjs";
import { HUMAN_PLATFORMS, TR, platformOpenUrl } from "./print-tur1a-prompts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const SITE = "https://arledscreen.com";
const progressPath = path.join(repoRoot, "docs/geo/observations/point-c-progress.json");
const logPath = path.join(repoRoot, "docs/geo/observations/blind-log.jsonl");
const POINT_C_STEPS = 11;
const TUR1A_TOTAL = TR.length * HUMAN_PLATFORMS.length;

function runNode(scriptRel, args = [], timeout = 90000) {
  return spawnSync(process.execPath, [path.join(repoRoot, scriptRel), ...args], {
    encoding: "utf8",
    timeout,
    cwd: repoRoot,
  });
}

function readPointCProgress() {
  try {
    if (!fs.existsSync(progressPath)) return { acked: [], updatedAt: null };
    const raw = JSON.parse(fs.readFileSync(progressPath, "utf8"));
    return {
      acked: Array.isArray(raw.acked) ? raw.acked.map(String) : [],
      updatedAt: raw.updatedAt || null,
    };
  } catch {
    return { acked: [], updatedAt: null };
  }
}

function tur1aFilledCount() {
  if (!fs.existsSync(logPath)) return 0;
  const ids = new Set(TR.map(([id]) => id));
  const cells = new Set();
  for (const line of fs.readFileSync(logPath, "utf8").split("\n").filter(Boolean)) {
    try {
      const r = JSON.parse(line);
      const pid = String(r.promptId || "");
      const plat = String(r.platform || "");
      if (ids.has(pid) && HUMAN_PLATFORMS.includes(plat)) cells.add(`${plat}|${pid}`);
    } catch {
      /* skip */
    }
  }
  return cells.size;
}

function nextPointCPack(acked) {
  const ackedSet = new Set(acked);
  for (const [, key] of TR_ORDER) {
    if (!ackedSet.has(key)) {
      return {
        packKey: key,
        where: POINT_C_PASTE_WHERE[key] || "",
        open: pointCOpenUrl(key),
        openAlt: pointCOpenAltUrl(key) || "",
      };
    }
  }
  if (!ackedSet.has(HOSTINGER_STEP)) {
    return {
      packKey: HOSTINGER_STEP,
      where: POINT_C_PASTE_WHERE[HOSTINGER_STEP] || "",
      open: POINT_C_OPEN_URLS[HOSTINGER_STEP] || "",
      openAlt: POINT_C_OPEN_ALTS[HOSTINGER_STEP] || "",
    };
  }
  return null;
}

function nextTur1aCell() {
  const ids = TR.map(([id]) => id);
  const filled = new Set();
  if (fs.existsSync(logPath)) {
    for (const line of fs.readFileSync(logPath, "utf8").split("\n").filter(Boolean)) {
      try {
        const r = JSON.parse(line);
        const pid = String(r.promptId || "");
        const plat = String(r.platform || "");
        if (ids.includes(pid) && HUMAN_PLATFORMS.includes(plat)) filled.add(`${plat}|${pid}`);
      } catch {
        /* skip */
      }
    }
  }
  for (const id of ids) {
    for (const platform of HUMAN_PLATFORMS) {
      if (!filled.has(`${platform}|${id}`)) {
        return {
          platform,
          promptId: id,
          open: platformOpenUrl(platform),
          prompt: TR.find(([pid]) => pid === id)?.[1] || "",
        };
      }
    }
  }
  return null;
}

/** Live arleds probe (best-effort; non-fatal if timeout). */
function probeArleds301() {
  const probe = runNode("scripts/verify-arleds-301.mjs", [], 90000);
  const log = `${probe.stdout || ""}\n${probe.stderr || ""}`;
  const mode = (log.match(/^mode:\s+(\S+)/m) || [])[1] || "";
  return {
    ok: probe.status === 0,
    mode,
    open: "https://www.isimtescil.net/",
  };
}

/** Capture geo:next clipboard text for /geo-next.txt invent. */
export function buildGeoNextText() {
  const r = runNode("scripts/geo-next.mjs", [], 120000);
  const out = String(r.stdout || "");
  if (!out.trim()) {
    return `=== ARLEDSCREEN GEO next ===\nPriority gate: see npm run geo:next · https://arledscreen.com/point-c.txt\n`;
  }
  return out.endsWith("\n") ? out : `${out}\n`;
}

/** Machine owner-gate status (no invented mention %). */
export function buildGeoStatusDoc() {
  const { acked, updatedAt } = readPointCProgress();
  const pointCNext = nextPointCPack(acked);
  const tur1aFilled = tur1aFilledCount();
  const tur1aNext = nextTur1aCell();
  const arleds = probeArleds301();
  const pointCDone = acked.length >= POINT_C_STEPS;
  const tur1aDone = tur1aFilled >= TUR1A_TOTAL;
  let priority = "pointC";
  if (pointCDone && !arleds.ok) priority = "arleds301";
  else if (pointCDone && arleds.ok && !tur1aDone) priority = "tur1a";
  else if (pointCDone && arleds.ok && tur1aDone) priority = "prMerge";

  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE}/geo-status.json`,
    name: "ARLEDSCREEN GEO owner-gate status",
    description:
      "Owner-gated GEO progress (Point C paste → arleds.com 301 → Tur1a blind → PR #60 merge). Does not invent ChatGPT/Gemini mention rates. Clipboard: /geo-next.txt · Point C: /point-c.json · Tur1a: /tur1a.json · CSV: /feeds/point-c.csv · /feeds/tur1a.csv.",
    url: `${SITE}/geo-status.json`,
    dateModified: new Date().toISOString(),
    creator: { "@id": `${SITE}/#organization` },
    isBasedOn: [
      `${SITE}/point-c.json`,
      `${SITE}/point-c.txt`,
      `${SITE}/entity-profiles.json`,
      `${SITE}/tur1a.json`,
      `${SITE}/geo-next.txt`,
      `${SITE}/#website`,
    ],
    distribution: [
      { "@type": "DataDownload", encodingFormat: "application/ld+json", contentUrl: `${SITE}/geo-status.json` },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE}/.well-known/geo-status.json`,
      },
      { "@type": "DataDownload", encodingFormat: "text/plain", contentUrl: `${SITE}/geo-next.txt` },
      { "@type": "DataDownload", encodingFormat: "text/plain", contentUrl: `${SITE}/owner-next.txt` },
    ],
    priorityGate: priority,
    gates: {
      pointC: {
        status: pointCDone ? "OK" : "OPEN",
        acked: acked.length,
        total: POINT_C_STEPS,
        ackedKeys: acked,
        updatedAt,
        next: pointCNext,
        urls: {
          txt: `${SITE}/point-c.txt`,
          json: `${SITE}/point-c.json`,
          csv: `${SITE}/feeds/point-c.csv`,
        },
        afterPaste: "npm run point-c:ack",
      },
      arleds301: {
        status: arleds.ok ? "OK" : "OPEN",
        mode: arleds.mode || null,
        target: `${SITE}/tr/`,
        open: arleds.open,
        verify: "npm run verify:arleds-301",
        docs: "docs/ops/arleds-301-hostinger.md",
      },
      tur1a: {
        status: tur1aDone ? "OK" : "OPEN",
        filled: tur1aFilled,
        total: TUR1A_TOTAL,
        next: tur1aNext,
        urls: {
          json: `${SITE}/tur1a.json`,
          csv: `${SITE}/feeds/tur1a.csv`,
        },
        afterObserve:
          "npm run tur1a:log -- --mentioned=… --brandCorrect=… --priceSourceCited=…",
      },
      prMerge: {
        status: "OPEN",
        pr: 60,
        branch: "cursor/geo-prod-guard-5666",
        base: "main",
      },
    },
    ownerNext:
      "npm run geo:next · live: https://arledscreen.com/geo-next.txt · status: https://arledscreen.com/geo-status.json · after paste: npm run geo:ack · Open: https://www.isimtescil.net/ · Open: https://business.google.com/ · Open: https://chatgpt.com/",
    target: "day-30 / ~2026-11-04 — do not invent ChatGPT/Gemini scores",
  };
}

export function buildPointCProgressDoc() {
  const { acked, updatedAt } = readPointCProgress();
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE}/point-c-progress.json`,
    name: "ARLEDSCREEN Point C paste progress",
    description:
      "Acked Point C pack keys (owner paste progress). Does not invent third-party citations. Source for geo:next / point-c:ack.",
    url: `${SITE}/point-c-progress.json`,
    dateModified: updatedAt || new Date().toISOString(),
    creator: { "@id": `${SITE}/#organization` },
    acked,
    total: POINT_C_STEPS,
    next: nextPointCPack(acked),
    sameAs: [`${SITE}/point-c.json`, `${SITE}/geo-status.json`, `${SITE}/geo-next.txt`],
  };
}
