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
  buildArleds301DualPathClipboard,
  buildDnsEnableMailto,
  buildPointCNext,
  buildPointCPackChecklist,
  DNSENABLE_GMAIL_DRAFT_URL,
  DNSENABLE_PANEL_URL,
  ownerNextHtmlUrl,
  ownerNextStartUrl,
  pointCOpenAltUrls,
} from "./print-point-c-packs.mjs";
import { HUMAN_PLATFORMS, TR, platformOpenUrl } from "./print-tur1a-prompts.mjs";
import { applyOwnerGateCrossJoin } from "./owner-gate-cross-join.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const SITE = "https://arledscreen.com";
const progressPath = path.join(repoRoot, "docs/geo/observations/point-c-progress.json");
const logPath = path.join(repoRoot, "docs/geo/observations/blind-log.jsonl");
const profilesPath = path.join(repoRoot, "public/entity-profiles.json");
const POINT_C_STEPS = 11;
const TUR1A_TOTAL = TR.length * HUMAN_PLATFORMS.length;

function loadEntityProfiles() {
  try {
    return JSON.parse(fs.readFileSync(profilesPath, "utf8"));
  } catch {
    return { packs: {}, packsEn: {} };
  }
}

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

/** Paste-ready Point C next (includes text) — mirrors tur1a.json next.prompt. */
function nextPointCPack(_acked) {
  return buildPointCNext(loadEntityProfiles(), { en: false });
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
          openAlts: HUMAN_PLATFORMS.filter((p) => p !== platform)
            .map((p) => platformOpenUrl(p))
            .filter(Boolean),
          prompt: TR.find(([pid]) => pid === id)?.[1] || "",
          logCommand:
            "npm run tur1a:log -- --mentioned=yes|no|partial --brandCorrect=yes|no --priceSourceCited=ai-shopping|catalog|prices-rss|brand|site|other|none --sources=https://arledscreen.com/ai-shopping.json",
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
    open: DNSENABLE_PANEL_URL || "https://www.isimtescil.net/",
    openAlt: DNSENABLE_GMAIL_DRAFT_URL || "",
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

  const doc = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE}/geo-status.json`,
    name: "ARLEDSCREEN GEO owner-gate status",
    description:
      "Owner-gated GEO progress (Point C paste → arleds.com 301 → Tur1a blind → PR #60 merge). Does not invent ChatGPT/Gemini mention rates. Follow potentialAction HowTo (priorityGate). Browser session start: /owner-next.html?start=1 · Open/paste: /owner-next.html · Clipboard: /geo-next.txt · Point C: /point-c.json · progress: /point-c-progress.json · Tur1a: /tur1a.json · CSV: /feeds/point-c.csv · /feeds/tur1a.csv.",
    url: `${SITE}/geo-status.json`,
    dateModified: new Date().toISOString(),
    creator: { "@id": `${SITE}/#organization` },
    isBasedOn: [
      `${SITE}/point-c.json`,
      `${SITE}/point-c.txt`,
      `${SITE}/point-c-progress.json`,
      `${SITE}/entity-profiles.json`,
      `${SITE}/tur1a.json`,
      `${SITE}/geo-next.txt`,
      `${SITE}/owner-next.txt`,
      `${SITE}/owner-next.html?start=1`,
      `${SITE}/owner-next.html`,
      `${SITE}/#website`,
    ],
    distribution: [
      { "@type": "DataDownload", encodingFormat: "application/ld+json", contentUrl: `${SITE}/geo-status.json` },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE}/.well-known/geo-status.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE}/point-c-progress.json`,
      },
      { "@type": "DataDownload", encodingFormat: "text/plain", contentUrl: `${SITE}/geo-next.txt` },
      { "@type": "DataDownload", encodingFormat: "text/plain", contentUrl: `${SITE}/owner-next.txt` },
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: `${SITE}/owner-next.html?start=1`,
        name: "Owner next session start (auto C)",
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: `${SITE}/owner-next.html`,
        name: "Owner next HTML Open/paste",
      },
    ],
    priorityGate: priority,
    gates: {
      pointC: {
        status: pointCDone ? "OK" : "OPEN",
        acked: acked.length,
        total: POINT_C_STEPS,
        ackedKeys: acked,
        packs: buildPointCPackChecklist(acked),
        updatedAt,
        next: pointCNext,
        urls: {
          txt: `${SITE}/point-c.txt`,
          json: `${SITE}/point-c.json`,
          csv: `${SITE}/feeds/point-c.csv`,
          html: pointCNext?.html || ownerNextHtmlUrl(pointCNext?.packKey || ""),
        },
        afterPaste: "npm run point-c:ack",
      },
      arleds301: {
        status: arleds.ok ? "OK" : "OPEN",
        mode: arleds.mode || null,
        target: `${SITE}/tr/`,
        open: arleds.open,
        openAlt: arleds.openAlt || "",
        openAlts: (() => {
          const mailto = (() => {
            try {
              return buildDnsEnableMailto();
            } catch {
              return "";
            }
          })();
          const fromPack = pointCOpenAltUrls("hostinger301");
          const base = [
            mailto,
            arleds.openAlt || DNSENABLE_GMAIL_DRAFT_URL || "",
            "https://dash.cloudflare.com/",
            ...fromPack,
          ].filter(Boolean);
          return [...new Set(base)];
        })(),
        html: ownerNextHtmlUrl("hostinger301"),
        text: buildArleds301DualPathClipboard(),
        where: "Isimtescil/DNSEnable Domain Redirect first (live NS) · Cloudflare Bulk Redirect Option B",
        verify: "npm run verify:arleds-301",
        docs: "docs/ops/arleds-301-hostinger.md",
        ackCommand: "npm run verify:arleds-301",
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
        open: "https://github.com/bzkrtaras-hue/arledscreen/pull/60",
      },
    },
    ownerNext:
      "live: https://arledscreen.com/owner-next.html?start=1 · https://arledscreen.com/owner-next.html · https://arledscreen.com/geo-next.txt · https://arledscreen.com/point-c.json → next + potentialAction · progress: https://arledscreen.com/point-c-progress.json → potentialAction · status: https://arledscreen.com/geo-status.json → potentialAction (priorityGate) · https://arledscreen.com/tur1a.json → potentialAction · npm run geo:next · after paste: npm run geo:ack · Open: https://www.bingplaces.com/ · OpenAlt: https://businessconnect.apple.com/ · Open: https://www.isimtescil.net/ · Open: https://business.google.com/ · Open: https://chatgpt.com/",
    target: "day-30 / ~2026-11-04 — do not invent ChatGPT/Gemini scores",
  };
  // Priority-aware HowTo: invent agents follow potentialAction for the active gate only.
  if (priority === "pointC" && pointCNext?.text && pointCNext?.open) {
    const packHtml = pointCNext.html || ownerNextHtmlUrl(pointCNext.packKey);
    const startHtml = ownerNextStartUrl();
    doc.potentialAction = {
      "@type": "HowTo",
      name: `Point C next paste: ${pointCNext.packKey}`,
      description:
        `Owner-gated third-party citation paste. Cite pack text only — do not invent ratings or mention rates. Browser session start: ${startHtml} (auto Copy + Open remaining) · pack: ${packHtml}`,
      url: startHtml,
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Open owner-next session",
          url: startHtml,
          text: Array.isArray(pointCNext.openAlts) && pointCNext.openAlts.length
            ? `Session: ${startHtml} · Open: ${pointCNext.open} · ${pointCNext.openAlts.map((u, i) => (i === 0 ? `OpenAlt: ${u}` : `OpenAlt${i + 1}: ${u}`)).join(" · ")} · Pack: ${packHtml}`
            : pointCNext.openAlt
              ? `Session: ${startHtml} · Open: ${pointCNext.open} · OpenAlt: ${pointCNext.openAlt} · Pack: ${packHtml}`
              : `Session: ${startHtml} · Open: ${pointCNext.open} · Pack: ${packHtml}`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Paste NAP / About block",
          text: pointCNext.text,
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Ack progress",
          text: pointCNext.ackCommand || "npm run geo:ack",
        },
      ],
      tool: [
        {
          "@type": "HowToTool",
          name: "owner-next.html?start=1",
          url: startHtml,
        },
        {
          "@type": "HowToTool",
          name: "owner-next.html",
          url: packHtml,
        },
        { "@type": "HowToTool", name: "geo-next.txt", url: `${SITE}/geo-next.txt` },
        { "@type": "HowToTool", name: "point-c.json", url: `${SITE}/point-c.json` },
        { "@type": "HowToTool", name: "point-c-progress.json", url: `${SITE}/point-c-progress.json` },
        { "@type": "HowToTool", name: "geo-status.json", url: `${SITE}/geo-status.json` },
      ],
    };
  } else if (priority === "arleds301" && arleds.open) {
    doc.potentialAction = {
      "@type": "HowTo",
      name: "arleds.com 301 Domain Redirect (DNSEnable)",
      description:
        "Owner-gated legacy domain redirect. Configure permanent 301 to /tr/ — do not invent DNS or mention rates. Browser Open/paste: https://arledscreen.com/owner-next.html?pack=hostinger301",
      url: ownerNextHtmlUrl("hostinger301"),
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Open DNSEnable / Isimtescil",
          url: arleds.open,
          text: arleds.openAlt
            ? `Open: ${arleds.open} · OpenAlt: ${arleds.openAlt} · HTML: ${ownerNextHtmlUrl("hostinger301")}`
            : `Open: ${arleds.open} · HTML: ${ownerNextHtmlUrl("hostinger301")}`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Set permanent Domain Redirect",
          text: buildArleds301DualPathClipboard(),
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Verify",
          text: "npm run verify:arleds-301",
        },
      ],
      tool: [
        {
          "@type": "HowToTool",
          name: "owner-next.html",
          url: ownerNextHtmlUrl("hostinger301"),
        },
        { "@type": "HowToTool", name: "geo-next.txt", url: `${SITE}/geo-next.txt` },
        { "@type": "HowToTool", name: "geo-status.json", url: `${SITE}/geo-status.json` },
        {
          "@type": "HowToTool",
          name: "arleds-301 ops",
          url: `${SITE}/docs/ops/arleds-301-hostinger.md`,
        },
      ],
    };
  } else if (priority === "tur1a" && tur1aNext?.prompt && tur1aNext?.open) {
    doc.potentialAction = {
      "@type": "HowTo",
      name: `Tur1a next blind: ${tur1aNext.platform} · ${tur1aNext.promptId}`,
      description:
        "Owner-gated human blind observation. Log only observed flags — do not invent mention rates or scores.",
      url: `${SITE}/tur1a.json`,
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Open platform",
          url: tur1aNext.open,
          text: `Open: ${tur1aNext.open}`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Paste blind prompt",
          text: tur1aNext.prompt,
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Log observation",
          text:
            tur1aNext.logCommand ||
            "npm run tur1a:log -- --mentioned=… --brandCorrect=… --priceSourceCited=…",
        },
      ],
      tool: [
        { "@type": "HowToTool", name: "tur1a.json", url: `${SITE}/tur1a.json` },
        { "@type": "HowToTool", name: "feeds/tur1a.csv", url: `${SITE}/feeds/tur1a.csv` },
        { "@type": "HowToTool", name: "geo-status.json", url: `${SITE}/geo-status.json` },
      ],
    };
  } else if (priority === "prMerge") {
    doc.potentialAction = {
      "@type": "HowTo",
      name: "Merge PR #60 (geo-prod-guard)",
      description:
        "Owner-gated final merge after Point C + arleds 301 + Tur1a verified. Do not invent mention rates.",
      url: "https://github.com/bzkrtaras-hue/arledscreen/pull/60",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Open PR #60",
          url: "https://github.com/bzkrtaras-hue/arledscreen/pull/60",
          text: "Open: https://github.com/bzkrtaras-hue/arledscreen/pull/60",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Confirm gates",
          text: "npm run geo:status · invent:smoke · verify:arleds-301",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Merge to main",
          text: "Merge cursor/geo-prod-guard-5666 → main",
        },
      ],
      tool: [
        { "@type": "HowToTool", name: "geo-status.json", url: `${SITE}/geo-status.json` },
        { "@type": "HowToTool", name: "PR #60", url: "https://github.com/bzkrtaras-hue/arledscreen/pull/60" },
      ],
    };
  }
  return applyOwnerGateCrossJoin(doc);
}

export function buildPointCProgressDoc() {
  const { acked, updatedAt } = readPointCProgress();
  const next = nextPointCPack(acked);
  const packs = buildPointCPackChecklist(acked);
  const doc = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE}/point-c-progress.json`,
    name: "ARLEDSCREEN Point C paste progress",
    description:
      "Acked Point C pack keys + packs checklist (owner paste progress). Does not invent third-party citations. Source for geo:next / point-c:ack. Browser session start: https://arledscreen.com/owner-next.html?start=1 · Open/paste: https://arledscreen.com/owner-next.html. HowTo: potentialAction when next paste remains.",
    url: `${SITE}/point-c-progress.json`,
    dateModified: updatedAt || new Date().toISOString(),
    creator: { "@id": `${SITE}/#organization` },
    acked,
    total: POINT_C_STEPS,
    packs,
    next,
    sameAs: [
      `${SITE}/point-c.json`,
      `${SITE}/geo-status.json`,
      `${SITE}/geo-next.txt`,
      `${SITE}/owner-next.txt`,
      `${SITE}/owner-next.html?start=1`,
      `${SITE}/owner-next.html`,
      `${SITE}/.well-known/point-c-progress.json`,
    ],
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE}/point-c-progress.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE}/.well-known/point-c-progress.json`,
      },
      { "@type": "DataDownload", encodingFormat: "text/plain", contentUrl: `${SITE}/geo-next.txt` },
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: `${SITE}/owner-next.html?start=1`,
        name: "Owner next session start (auto C)",
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: `${SITE}/owner-next.html`,
        name: "Owner next HTML Open/paste",
      },
    ],
  };
  if (next?.text && next?.open) {
    const packHtml = next.html || ownerNextHtmlUrl(next.packKey);
    const startHtml = ownerNextStartUrl();
    doc.potentialAction = {
      "@type": "HowTo",
      name: `Point C next paste: ${next.packKey}`,
      description:
        `Owner-gated third-party citation paste. Cite pack text only — do not invent ratings or mention rates. Browser session start: ${startHtml} (auto Copy + Open remaining) · pack: ${packHtml}`,
      url: startHtml,
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Open owner-next session",
          url: startHtml,
          text: Array.isArray(next.openAlts) && next.openAlts.length
            ? `Session: ${startHtml} · Open: ${next.open} · ${next.openAlts.map((u, i) => (i === 0 ? `OpenAlt: ${u}` : `OpenAlt${i + 1}: ${u}`)).join(" · ")} · Pack: ${packHtml}`
            : next.openAlt
              ? `Session: ${startHtml} · Open: ${next.open} · OpenAlt: ${next.openAlt} · Pack: ${packHtml}`
              : `Session: ${startHtml} · Open: ${next.open} · Pack: ${packHtml}`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Paste NAP / About block",
          text: next.text,
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Ack progress",
          text: next.ackCommand || "npm run geo:ack",
        },
      ],
      tool: [
        {
          "@type": "HowToTool",
          name: "owner-next.html?start=1",
          url: startHtml,
        },
        {
          "@type": "HowToTool",
          name: "owner-next.html",
          url: packHtml,
        },
        { "@type": "HowToTool", name: "geo-next.txt", url: `${SITE}/geo-next.txt` },
        { "@type": "HowToTool", name: "point-c.json", url: `${SITE}/point-c.json` },
        { "@type": "HowToTool", name: "point-c-progress.json", url: `${SITE}/point-c-progress.json` },
        { "@type": "HowToTool", name: "geo-status.json", url: `${SITE}/geo-status.json` },
        { "@type": "HowToTool", name: "tur1a.json", url: `${SITE}/tur1a.json` },
      ],
    };
  }
  return applyOwnerGateCrossJoin(doc);
}

/**
 * Machine twin of /owner-next.html — single invent fetch for Open/paste gate.
 * Cite-only; reuses geo-status / point-c / tur1a / progress (no invented scores).
 */
export function buildOwnerNextJsonDoc({ geoStatus, progress, tur1a, pointC } = {}) {
  const priority = String(geoStatus?.priorityGate || "pointC");
  const packs = Array.isArray(pointC?.packs) ? pointC.packs : progress?.packs || [];
  let next = null;
  if (priority === "pointC") {
    next = geoStatus?.gates?.pointC?.next || progress?.next || pointC?.next || null;
  } else if (priority === "arleds301") {
    const g = geoStatus?.gates?.arleds301 || {};
    next = {
      packKey: "hostinger301",
      label: "arleds.com 301 (DNSEnable Domain Redirect)",
      where: g.where || "",
      open: g.open || "",
      openAlt: g.openAlt || "",
      openAlts: g.openAlts || [],
      html: g.html || ownerNextHtmlUrl("hostinger301"),
      text: g.text || buildArleds301DualPathClipboard(),
      ackCommand: g.ackCommand || "npm run verify:arleds-301",
      status: g.status || "OPEN",
      mode: g.mode || null,
    };
  } else if (priority === "tur1a") {
    const t = tur1a?.next || geoStatus?.gates?.tur1a?.next || null;
    next = t
      ? {
          packKey: `${t.platform || ""}|${t.promptId || ""}`,
          label: `Tur1a ${t.platform || ""} · ${t.promptId || ""}`,
          where: t.platform ? `${t.platform} blind prompt` : "Tur1a blind",
          open: t.open || "",
          html: `${SITE}/owner-next.html`,
          text: t.prompt || "",
          ackCommand: t.logCommand || "",
          platform: t.platform,
          promptId: t.promptId,
        }
      : null;
  } else {
    next = {
      packKey: "prMerge",
      label: "PR #60 merge",
      where: "Merge cursor/geo-prod-guard-5666 when Point C + 301 + Tur1a are done",
      open: "https://github.com/bzkrtaras-hue/arledscreen/pull/60",
      html: `${SITE}/owner-next.html`,
      text: "All owner gates cleared in geo-status — merge PR #60.",
      ackCommand: "npm run invent:smoke · npm run geo:status",
    };
  }

  const htmlDeep = next?.html || ownerNextHtmlUrl(next?.packKey || "");
  const doc = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE}/owner-next.json`,
    name: "ARLEDSCREEN Owner next (Open/paste machine twin)",
    description:
      "Single-fetch invent twin of /owner-next.html for GEO owner gates (Point C → arleds 301 → Tur1a). Cite pack text only — do not invent ChatGPT/Gemini scores. Browser session start: /owner-next.html?start=1 · Browser: /owner-next.html · Clipboard: /geo-next.txt · Status: /geo-status.json → potentialAction.",
    url: `${SITE}/owner-next.json`,
    dateModified: geoStatus?.dateModified || new Date().toISOString(),
    creator: { "@id": `${SITE}/#organization` },
    priorityGate: priority,
    html: priority === "pointC" ? ownerNextStartUrl() : `${SITE}/owner-next.html`,
    htmlStart: ownerNextStartUrl(),
    htmlDeep,
    htmlAlias: `${SITE}/geo-next.html`,
    clipboard: `${SITE}/geo-next.txt`,
    next,
    packs,
    gates: {
      pointC: {
        acked: geoStatus?.gates?.pointC?.acked ?? 0,
        total: geoStatus?.gates?.pointC?.total ?? 11,
        status: geoStatus?.gates?.pointC?.status,
        packs: geoStatus?.gates?.pointC?.packs || progress?.packs || [],
      },
      arleds301: geoStatus?.gates?.arleds301 || null,
      tur1a: {
        filled: geoStatus?.gates?.tur1a?.filled ?? tur1a?.coverage?.filled ?? 0,
        total: geoStatus?.gates?.tur1a?.total ?? tur1a?.coverage?.total ?? 48,
        status: geoStatus?.gates?.tur1a?.status,
        next: tur1a?.next || geoStatus?.gates?.tur1a?.next || null,
        coverage: tur1a?.coverage || null,
        /** Full checklist for /owner-next.html sticky Tur1a (prompt + logCommand per cell). */
        cells: Array.isArray(tur1a?.cells) ? tur1a.cells : [],
        html: `${SITE}/owner-next.html?pack=tur1a`,
      },
      prMerge: geoStatus?.gates?.prMerge || null,
    },
    potentialAction: geoStatus?.potentialAction || progress?.potentialAction || null,
    ownerNext: `live: ${ownerNextStartUrl()} · ${htmlDeep} · ${SITE}/owner-next.json · ${SITE}/geo-next.txt · ${SITE}/point-c.json → next + potentialAction · progress: ${SITE}/point-c-progress.json → potentialAction · status: ${SITE}/geo-status.json → potentialAction · npm run geo:next · after paste: npm run geo:ack · Open: https://www.bingplaces.com/ · OpenAlt: https://businessconnect.apple.com/ · Open: https://www.isimtescil.net/ · Open: https://business.google.com/ · Open: https://chatgpt.com/`,
    sameAs: [
      `${SITE}/owner-next.html?start=1`,
      `${SITE}/owner-next.html`,
      `${SITE}/geo-next.html?start=1`,
      `${SITE}/geo-next.html`,
      `${SITE}/geo-next.txt`,
      `${SITE}/owner-next.txt`,
      `${SITE}/.well-known/owner-next.json`,
    ],
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE}/owner-next.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE}/.well-known/owner-next.json`,
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: `${SITE}/owner-next.html?start=1`,
        name: "Owner next session start (auto C)",
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/html",
        contentUrl: `${SITE}/owner-next.html`,
        name: "Owner next HTML Open/paste",
      },
      {
        "@type": "DataDownload",
        encodingFormat: "text/plain",
        contentUrl: `${SITE}/geo-next.txt`,
      },
    ],
  };
  return applyOwnerGateCrossJoin(doc);
}
