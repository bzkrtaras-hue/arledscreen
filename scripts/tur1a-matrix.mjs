#!/usr/bin/env node
/**
 * Tur1a coverage matrix + next empty cell + one-shot log for owner blind runs.
 * Does not invent scores. --log writes only when observation flags are provided.
 *
 * Usage:
 *   npm run tur1a:matrix
 *   npm run tur1a:csv
 *   npm run tur1a:next
 *   npm run tur1a:log -- --mentioned=yes --brandCorrect=yes --priceSourceCited=ai-shopping
 *   node scripts/tur1a-matrix.mjs --en
 *   node scripts/tur1a-matrix.mjs --next --en
 *   node scripts/tur1a-matrix.mjs --csv
 *   node scripts/tur1a-matrix.mjs --log --dry-run --mentioned=yes --brandCorrect=yes --priceSourceCited=ai-shopping
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TR, EN, HUMAN_PLATFORMS, platformOpenUrl } from "./print-tur1a-prompts.mjs";
import { applyOwnerGateCrossJoin } from "./owner-gate-cross-join.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const logPath = path.join(repoRoot, "docs/geo/observations/blind-log.jsonl");
const logger = path.join(repoRoot, "scripts/geo-blind-log.mjs");

const wantNext = process.argv.includes("--next");
const wantLog = process.argv.includes("--log");
const wantCsv = process.argv.includes("--csv");
const includeEn = process.argv.includes("--en");
const dryRun = process.argv.includes("--dry-run");

const prompts = includeEn ? [...TR, ...EN] : [...TR];
const promptIds = prompts.map(([id]) => id);
const totalCells = promptIds.length * HUMAN_PLATFORMS.length;

function arg(name, fallback = "") {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}

function loadHumanRows() {
  if (!fs.existsSync(logPath)) return [];
  return fs
    .readFileSync(logPath, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .filter((r) => HUMAN_PLATFORMS.includes(String(r.platform || "")));
}

function cellKey(platform, promptId) {
  return `${platform}|${promptId}`;
}

function filledSet(rows) {
  const set = new Set();
  for (const r of rows) {
    const pid = String(r.promptId || "");
    const plat = String(r.platform || "");
    if (promptIds.includes(pid) && HUMAN_PLATFORMS.includes(plat)) {
      set.add(cellKey(plat, pid));
    }
  }
  return set;
}

function promptText(id) {
  const hit = prompts.find(([pid]) => pid === id);
  return hit ? hit[1] : "";
}

function findNext(filled) {
  for (const id of promptIds) {
    for (const platform of HUMAN_PLATFORMS) {
      if (!filled.has(cellKey(platform, id))) {
        return { platform, promptId: id };
      }
    }
  }
  return null;
}

function printMatrix(filled) {
  const filledN = filled.size;
  console.log("=== ARLEDSCREEN Tur1a coverage matrix ===");
  console.log(`Human platforms: ${HUMAN_PLATFORMS.join(", ")}`);
  console.log(`Prompts: ${promptIds.join(", ")}${includeEn ? "" : " (TR; add --en for en-1…en-4)"}`);
  console.log(`Coverage: ${filledN}/${totalCells} human cells`);
  console.log(`Log: ${path.relative(repoRoot, logPath)}`);
  console.log("Legend: ● filled · ○ empty — do not invent mention %\n");

  const header = ["promptId", ...HUMAN_PLATFORMS.map((p) => p.slice(0, 8))].join("\t");
  console.log(header);
  for (const id of promptIds) {
    const cells = HUMAN_PLATFORMS.map((p) => (filled.has(cellKey(p, id)) ? "●" : "○"));
    console.log([id, ...cells].join("\t"));
  }
  console.log("\nNext empty: npm run tur1a:next · CSV: npm run tur1a:csv");
  console.log(
    "One-shot log: npm run tur1a:log -- --mentioned=yes|no|partial --brandCorrect=yes|no --priceSourceCited=ai-shopping|…",
  );
}

const SITE = "https://arledscreen.com";

/** Spreadsheet-ready empty-cell dump (owner tracking). Does not invent scores. */
export function buildTur1aCsv(filledOverride = null, { en = false } = {}) {
  const usePrompts = en ? [...TR, ...EN] : [...TR];
  const ids = usePrompts.map(([id]) => id);
  const total = ids.length * HUMAN_PLATFORMS.length;
  const set = new Set();
  if (filledOverride instanceof Set) {
    for (const k of filledOverride) set.add(k);
  } else {
    for (const r of loadHumanRows()) {
      const pid = String(r.promptId || "");
      const plat = String(r.platform || "");
      if (ids.includes(pid) && HUMAN_PLATFORMS.includes(plat)) set.add(cellKey(plat, pid));
    }
  }
  const textOf = (id) => {
    const hit = usePrompts.find(([pid]) => pid === id);
    return hit ? hit[1] : "";
  };
  const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const lines = ["platform,promptId,locale,status,open,prompt,logCommand"];
  for (const id of ids) {
    for (const platform of HUMAN_PLATFORMS) {
      const filledCell = set.has(cellKey(platform, id));
      const locale = String(id).startsWith("en-") ? "en" : "tr-TR";
      const status = filledCell ? "filled" : "empty";
      const open = platformOpenUrl(platform);
      const logCmd = filledCell
        ? ""
        : `npm run tur1a:log -- --mentioned=yes|no|partial --brandCorrect=yes|no --priceSourceCited=ai-shopping|catalog|prices-rss|brand|site|other|none --sources=https://arledscreen.com/ai-shopping.json`;
      lines.push(
        [platform, id, locale, status, esc(open), esc(textOf(id)), esc(logCmd)].join(","),
      );
    }
  }
  return { csv: `${lines.join("\n")}\n`, filled: set.size, total };
}

/** Machine Tur1a coverage + next empty cell (no invented scores). */
export function buildTur1aJsonDoc({ en = false } = {}) {
  const usePrompts = en ? [...TR, ...EN] : [...TR];
  const ids = usePrompts.map(([id]) => id);
  const total = ids.length * HUMAN_PLATFORMS.length;
  const filledLocal = new Set();
  for (const r of loadHumanRows()) {
    const pid = String(r.promptId || "");
    const plat = String(r.platform || "");
    if (ids.includes(pid) && HUMAN_PLATFORMS.includes(plat)) filledLocal.add(cellKey(plat, pid));
  }
  const logCommand =
    "npm run tur1a:log -- --mentioned=yes|no|partial --brandCorrect=yes|no --priceSourceCited=ai-shopping|catalog|prices-rss|brand|site|other|none --sources=https://arledscreen.com/ai-shopping.json";
  let next = null;
  for (const id of ids) {
    for (const platform of HUMAN_PLATFORMS) {
      if (!filledLocal.has(cellKey(platform, id))) {
        next = {
          platform,
          promptId: id,
          locale: String(id).startsWith("en-") ? "en" : "tr-TR",
          open: platformOpenUrl(platform),
          prompt: usePrompts.find(([pid]) => pid === id)?.[1] || "",
          logCommand,
        };
        break;
      }
    }
    if (next) break;
  }
  const cells = [];
  for (const id of ids) {
    for (const platform of HUMAN_PLATFORMS) {
      cells.push({
        platform,
        promptId: id,
        locale: String(id).startsWith("en-") ? "en" : "tr-TR",
        status: filledLocal.has(cellKey(platform, id)) ? "filled" : "empty",
        open: platformOpenUrl(platform),
      });
    }
  }
  const doc = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE}/tur1a.json`,
    name: "ARLEDSCREEN Tur1a blind coverage",
    description:
      "Human blind Tur1a matrix (ChatGPT/Gemini/Perplexity/Google AI). Does not invent mention rates. Follow potentialAction HowTo when next is set. Owner: live https://arledscreen.com/tur1a.json → next + potentialAction · npm run tur1a:next · tur1a:log · tur1a:csv · geo:next. CSV: /feeds/tur1a.csv · status: /geo-status.json → potentialAction.",
    url: `${SITE}/tur1a.json`,
    creator: { "@id": `${SITE}/#organization` },
    isBasedOn: [
      `${SITE}/ai-shopping.json`,
      `${SITE}/entity.json`,
      `${SITE}/brand.json`,
      `${SITE}/#website`,
      `${SITE}/geo-status.json`,
      `${SITE}/geo-next.txt`,
      `${SITE}/owner-next.txt`,
      `${SITE}/point-c-progress.json`,
    ],
    distribution: [
      { "@type": "DataDownload", encodingFormat: "application/ld+json", contentUrl: `${SITE}/tur1a.json` },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE}/.well-known/tur1a.json`,
      },
      { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE}/feeds/tur1a.csv` },
      { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE}/tur1a.csv` },
      {
        "@type": "DataDownload",
        encodingFormat: "application/ld+json",
        contentUrl: `${SITE}/geo-status.json`,
      },
      { "@type": "DataDownload", encodingFormat: "text/plain", contentUrl: `${SITE}/geo-next.txt` },
    ],
    sameAs: [
      `${SITE}/.well-known/tur1a.json`,
      `${SITE}/feeds/tur1a.csv`,
      `${SITE}/geo-status.json`,
      `${SITE}/geo-next.txt`,
      `${SITE}/owner-next.txt`,
      `${SITE}/point-c-progress.json`,
    ],
    coverage: { filled: filledLocal.size, total, locale: en ? "tr+en" : "tr" },
    next,
    cells,
    ownerNext:
      "live: https://arledscreen.com/tur1a.json → next + potentialAction · status: https://arledscreen.com/geo-status.json → potentialAction · npm run tur1a:next · tur1a:csv · after observe: npm run tur1a:log -- --mentioned=… --brandCorrect=… --priceSourceCited=… · Open: https://chatgpt.com/ · https://gemini.google.com/app · https://www.perplexity.ai/ · https://www.google.com/",
  };
  if (next?.prompt && next?.open) {
    doc.potentialAction = {
      "@type": "HowTo",
      name: `Tur1a next blind: ${next.platform} · ${next.promptId}`,
      description:
        "Owner-gated human blind observation. Log only observed flags — do not invent mention rates or scores.",
      url: `${SITE}/tur1a.json`,
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Open platform",
          url: next.open,
          text: `Open: ${next.open}`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Paste blind prompt",
          text: next.prompt,
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Log observation",
          text: next.logCommand || logCommand,
        },
      ],
      tool: [
        { "@type": "HowToTool", name: "tur1a.json", url: `${SITE}/tur1a.json` },
        { "@type": "HowToTool", name: "feeds/tur1a.csv", url: `${SITE}/feeds/tur1a.csv` },
        { "@type": "HowToTool", name: "geo-next.txt", url: `${SITE}/geo-next.txt` },
        { "@type": "HowToTool", name: "geo-status.json", url: `${SITE}/geo-status.json` },
        { "@type": "HowToTool", name: "point-c.json", url: `${SITE}/point-c.json` },
        { "@type": "HowToTool", name: "point-c-progress.json", url: `${SITE}/point-c-progress.json` },
      ],
    };
  }
  return applyOwnerGateCrossJoin(doc);
}

function printCsv(filled) {
  const { csv } = buildTur1aCsv(filled, { en: includeEn });
  process.stdout.write(csv);
  console.error(
    `# coverage ${filled.size}/${totalCells} — do not invent mention % · Open: PLATFORM_OPEN_URLS · live: ${SITE}/feeds/tur1a.csv`,
  );
}

function printNext(filled) {
  const next = findNext(filled);
  console.log("=== ARLEDSCREEN Tur1a next empty cell ===");
  if (!next) {
    console.log(`All ${totalCells} human cells filled (TR${includeEn ? "+EN" : ""}).`);
    console.log("Optional: npm run tur1a:matrix --en · tur1a:summary");
    console.log("Status: npm run geo:status");
    return;
  }

  const locale = String(next.promptId).startsWith("en-") ? "en" : "tr-TR";
  const text = promptText(next.promptId);
  const openUrl = platformOpenUrl(next.platform);
  const altPlatforms = HUMAN_PLATFORMS.filter((p) => p !== next.platform);
  console.log(`Cell: platform=${next.platform} · promptId=${next.promptId} · locale=${locale}`);
  console.log(`Progress: ${filled.size}/${totalCells} filled → this is the next empty`);
  if (openUrl) {
    console.log(`Where: ${next.platform} → ${openUrl}`);
    console.log(`Open: ${openUrl}`);
  }
  if (altPlatforms.length) {
    console.log(
      `OpenAlt: ${altPlatforms.map((p) => `${p}=${platformOpenUrl(p)}`).join(" · ")}`,
    );
  }
  console.log(
    "HowTo: https://arledscreen.com/tur1a.json → potentialAction · https://arledscreen.com/geo-status.json → potentialAction · https://arledscreen.com/point-c.json → potentialAction · https://arledscreen.com/point-c-progress.json → potentialAction",
  );
  console.log("CSV: npm run tur1a:csv · Live: https://arledscreen.com/feeds/tur1a.csv · JSON: https://arledscreen.com/tur1a.json");
  console.log("\n### Paste into the AI platform");
  console.log("```");
  console.log(text);
  console.log("```");
  console.log("\n### Expected (do not invent if absent)");
  console.log("- Canonical site: https://arledscreen.com/tr/ (not arleds.com)");
  console.log("- WebSite #website: https://arledscreen.com/#website (OrderAction → /tr/quote/ · /en/quote/)");
  console.log("- Entity: https://arledscreen.com/entity.json (alias /organization.json · /.well-known/entity.json)");
  console.log("- Price source: https://arledscreen.com/ai-shopping.json pricedPanels");
  console.log(
    "- Inventable aliases (identical): /.well-known/modules.json · /.well-known/sku.json · /.well-known/price.json · /.well-known/pricing.json · /prices.json",
  );
  console.log("- Brand AggregateOffer×12: https://arledscreen.com/brand.json (alias /.well-known/brand.json)");
  console.log("- prices.rss = change discovery only (not canonical price graph)");
  console.log("- Owner clipboard (repo): npm run geo:next · after paste: npm run geo:ack · point-c.txt");
  console.log("\n### After observing, one-shot log:");
  console.log(
    `npm run tur1a:log -- --mentioned=yes|no|partial --brandCorrect=yes|no --priceSourceCited=ai-shopping|catalog|prices-rss|brand|site|other|none --sources=https://arledscreen.com/ai-shopping.json --notes="..."`,
  );
  console.log("(tur1a:log auto-targets this next empty cell; Open tab above before pasting.)");
  console.log("\nDry-run:");
  console.log(
    `npm run tur1a:log -- --dry-run --mentioned=yes --brandCorrect=yes --priceSourceCited=ai-shopping`,
  );
  console.log("\nThen: npm run tur1a:matrix · npm run tur1a:csv · npm run tur1a:next · npm run geo:status · npm run geo:next");
}

function runLog(filled) {
  const next = findNext(filled);
  console.log("=== ARLEDSCREEN Tur1a one-shot log ===");
  if (!next) {
    console.log(`All ${totalCells} human cells filled — nothing to log.`);
    process.exit(0);
  }
  const openUrl = platformOpenUrl(next.platform);
  const mentioned = arg("mentioned");
  const brandCorrect = arg("brandCorrect");
  const priceSourceCited = arg("priceSourceCited");
  if (!mentioned || !brandCorrect || !priceSourceCited) {
    console.error("Required with --log: --mentioned=… --brandCorrect=… --priceSourceCited=…");
    console.error(
      "Example: npm run tur1a:log -- --mentioned=yes --brandCorrect=yes --priceSourceCited=ai-shopping",
    );
    console.error("Do not invent scores — only log what you observed.");
    if (openUrl) {
      console.error(`Where: ${next.platform} → ${openUrl}`);
      console.error(`Open: ${openUrl}`);
    }
    process.exit(1);
  }
  const locale = arg("locale", String(next.promptId).startsWith("en-") ? "en" : "tr-TR");
  const sources = arg("sources", "https://arledscreen.com/ai-shopping.json");
  const notes = arg("notes", "");
  const competitors = arg("competitors", "");
  const wrongClaims = arg("wrongClaims", "");

  console.log(`Cell: platform=${next.platform} · promptId=${next.promptId} · locale=${locale}`);
  if (openUrl) {
    console.log(`Where: ${next.platform} → ${openUrl}`);
    console.log(`Open: ${openUrl}`);
  }
  console.log(`Prompt: ${promptText(next.promptId)}`);
  console.log(dryRun ? "Mode: dry-run (not written)" : "Mode: append blind-log.jsonl");

  const args = [
    logger,
    `--platform=${next.platform}`,
    `--promptId=${next.promptId}`,
    `--locale=${locale}`,
    `--mentioned=${mentioned}`,
    `--brandCorrect=${brandCorrect}`,
    `--priceSourceCited=${priceSourceCited}`,
    `--sources=${sources}`,
  ];
  if (notes) args.push(`--notes=${notes}`);
  if (competitors) args.push(`--competitors=${competitors}`);
  if (wrongClaims) args.push(`--wrongClaims=${wrongClaims}`);
  if (dryRun) args.push("--dry-run");

  const r = spawnSync(process.execPath, args, { encoding: "utf8", cwd: repoRoot });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  if (r.status !== 0) process.exit(r.status || 1);
  console.log("\nThen: npm run tur1a:matrix · npm run tur1a:next · npm run geo:status");
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const rows = loadHumanRows();
  const filled = filledSet(rows);

  if (wantLog) runLog(filled);
  else if (wantNext) printNext(filled);
  else if (wantCsv) printCsv(filled);
  else printMatrix(filled);

  process.exit(0);
}
