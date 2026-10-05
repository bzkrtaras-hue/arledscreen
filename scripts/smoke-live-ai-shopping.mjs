/**
 * Live AI alışveriş smoke (Gün 30 panosu).
 *
 * Curl’s production endpoints and prints a measurement board.
 * Does NOT fail the build — live 404s are owner/deploy blockers until PR #55 merges.
 *
 * Usage: node scripts/smoke-live-ai-shopping.mjs
 */
const SITE = "https://arledscreen.com";

const CHECKS = [
  { id: "entity", url: `${SITE}/entity.json`, expect: "json", mustInclude: ["ARLEDSCREEN", "citeOneLiner"], cors: true, contentType: "application/json" },
  { id: "entity-profiles", url: `${SITE}/entity-profiles.json`, expect: "json", mustInclude: ["gbpDescription", "linkedinAbout", "Gaziosmanpaşa"], cors: true, contentType: "application/json" },
  { id: "catalog", url: `${SITE}/catalog.json`, expect: "json", mustInclude: ["dataset", "groupAggregateOffers"], cors: true, contentType: "application/json" },
  { id: "ard", url: `${SITE}/.well-known/ard.json`, expect: "json", mustInclude: ["catalog", "entity-profiles"], cors: true, contentType: "application/json" },
  { id: "llms", url: `${SITE}/llms.txt`, expect: "text", mustInclude: ["citeOneLiner", "Gaziosmanpaşa", "entity-profiles.json"], cors: true, contentType: "text/plain" },
  { id: "llms-full", url: `${SITE}/llms-full.txt`, expect: "text", mustInclude: ["catalog.json", "entity.json", "entity-profiles.json"], cors: true, contentType: "text/plain" },
  { id: "robots", url: `${SITE}/robots.txt`, expect: "text", mustInclude: ["Host: arledscreen.com", "bingbot"] },
  { id: "merchant-feed", url: `${SITE}/feeds/merchant-priced-panels.tsv`, expect: "text", mustInclude: ["p2-5-ic", "32.18 USD"], cors: true, contentType: "text/tab-separated-values" },
  { id: "fiyat", url: `${SITE}/tr/led-ekran-fiyatlari/`, expect: "html", mustInclude: ["catalog.json"] },
  { id: "yapay-zeka", url: `${SITE}/tr/yapay-zeka/`, expect: "html", mustInclude: ["entity.json", "catalog.json"] },
  { id: "about", url: `${SITE}/tr/about/`, expect: "html", mustInclude: ["entity.json", "catalog.json"] },
  { id: "sitemap", url: `${SITE}/sitemap.xml`, expect: "xml", mustInclude: ["led-ekran-fiyatlari", "catalog.json"] },
  { id: "indexnow-key", url: `${SITE}/e8e6f86598e94e95a323f807c39843ad.txt`, expect: "text", mustInclude: ["e8e6f86598e94e95a323f807c39843ad"] },
];

async function check(c) {
  const started = Date.now();
  try {
    const res = await fetch(c.url, {
      redirect: "follow",
      headers: { "user-agent": "ARLEDSCREEN-live-smoke/1.0" },
    });
    const text = await res.text();
    const ms = Date.now() - started;
    const ctype = res.headers.get("content-type") || "";
    const acao = res.headers.get("access-control-allow-origin") || "";
    const looksHtmlSoft404 =
      res.status === 200 &&
      /text\/html/i.test(ctype) &&
      c.expect !== "html" &&
      /<!DOCTYPE html|<html/i.test(text.slice(0, 200));
    const missing = (c.mustInclude || []).filter((n) => !text.includes(n));
    const headerGaps = [];
    if (c.cors && res.status === 200 && !looksHtmlSoft404 && acao !== "*") {
      headerGaps.push("CORS:*");
    }
    if (
      c.contentType &&
      res.status === 200 &&
      !looksHtmlSoft404 &&
      !ctype.toLowerCase().includes(c.contentType.toLowerCase())
    ) {
      headerGaps.push(`ctype:${c.contentType}`);
    }
    let status = "PASS";
    if (res.status !== 200) status = `HTTP_${res.status}`;
    else if (looksHtmlSoft404) status = "SOFT_404";
    else if (missing.length) status = "CONTENT";
    else if (headerGaps.length) status = "HEADERS";
    return {
      id: c.id,
      url: c.url,
      status,
      ms,
      missing,
      headerGaps,
      http: res.status,
    };
  } catch (e) {
    return { id: c.id, url: c.url, status: "ERROR", ms: Date.now() - started, missing: [], headerGaps: [], error: String(e.message || e) };
  }
}

async function main() {
  const results = [];
  for (const c of CHECKS) {
    results.push(await check(c));
  }

  const pass = results.filter((r) => r.status === "PASS").length;
  const fail = results.length - pass;

  console.log("");
  console.log("Live AI alışveriş smoke — arledscreen.com");
  console.log("=".repeat(78));
  console.log(
    `${"id".padEnd(14)} ${"status".padEnd(10)} ${"ms".padEnd(6)} url`,
  );
  console.log("-".repeat(78));
  for (const r of results) {
    const parts = [];
    if (r.missing?.length) parts.push(`missing=[${r.missing.join(",")}]`);
    if (r.headerGaps?.length) parts.push(`headers=[${r.headerGaps.join(",")}]`);
    if (r.error) parts.push(r.error);
    const note = parts.length ? ` ${parts.join(" ")}` : "";
    console.log(
      `${r.id.padEnd(14)} ${r.status.padEnd(10)} ${String(r.ms).padEnd(6)} ${r.url}${note}`,
    );
  }
  console.log("-".repeat(78));
  console.log(`TOTAL ${results.length} · PASS ${pass} · BLOCKED ${fail}`);
  console.log(
    fail
      ? "Owner: merge PR #55 + Cloudflare Pages redeploy, then re-run npm run smoke:live"
      : "Live surface GREEN — proceed Point C + blind-test tur",
  );
  console.log("");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
