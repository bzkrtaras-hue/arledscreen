#!/usr/bin/env node
/**
 * Probe legacy arleds.com → expect 301 to https://arledscreen.com/tr/.
 * Owner-gated until registrar/DNS answers; this script verifies + diagnoses.
 *
 * Usage: node scripts/verify-arleds-301.mjs
 * Exit 0 only when all probes redirect correctly.
 */
import dns from "node:dns/promises";
import {
  buildHostingerMailto,
  HOSTINGER_GMAIL_DRAFT_URL,
  HOSTINGER_SUPPORT_TO,
} from "./print-point-c-packs.mjs";

const EXPECT = "https://arledscreen.com/tr/";
const PROBES = [
  "http://arleds.com/",
  "http://www.arleds.com/",
  "https://arleds.com/",
  "https://www.arleds.com/",
];

async function probe(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "manual",
      signal: ctrl.signal,
      headers: { "User-Agent": "ARLEDSCREEN-arleds-301-verify/1.0" },
    });
    const loc = res.headers.get("location") || "";
    return { url, status: res.status, location: loc };
  } catch (e) {
    return {
      url,
      status: 0,
      location: "",
      error: e?.name === "AbortError" ? "timeout" : String(e?.message || e),
    };
  } finally {
    clearTimeout(t);
  }
}

function okLocation(loc) {
  if (!loc) return false;
  const n = loc.replace(/\/$/, "") + "/";
  return (
    n === EXPECT ||
    n === "https://arledscreen.com/tr/" ||
    loc === "https://arledscreen.com/tr" ||
    loc.startsWith("https://arledscreen.com/tr/")
  );
}

async function resolveDns(host) {
  const out = { host, ns: [], a: [], error: null };
  try {
    out.ns = (await dns.resolveNs(host)).map(String).sort();
  } catch (e) {
    out.error = String(e?.code || e?.message || e);
  }
  try {
    out.a = (await dns.resolve4(host)).map(String).sort();
  } catch (e) {
    if (!out.error) out.error = String(e?.code || e?.message || e);
  }
  return out;
}

function classifyMode(results, apexDns, wwwDns) {
  const nsBlob = [...(apexDns.ns || []), ...(wwwDns.ns || [])].join(" ").toLowerCase();
  const errs = results.filter((r) => r.status === 0).map((r) => String(r.error || ""));
  const timeouts = errs.some((e) => /timeout|abort|fetch failed|ECONNRESET|ETIMEDOUT|UND_ERR/i.test(e));
  const http200 = results.some((r) => r.status === 200);
  const wrongLoc = results.some(
    (r) => (r.status === 301 || r.status === 302 || r.status === 307 || r.status === 308) && !okLocation(r.location),
  );
  const nx = /ENOTFOUND|ENODATA|NXDOMAIN|EREFUSED/i.test(String(apexDns.error || ""));

  if (nx && !(apexDns.a || []).length) return "nxdomain";
  if (nsBlob.includes("dnsenable") && timeouts) return "dnsenable_tls_dead";
  if (nsBlob.includes("hostinger") || nsBlob.includes("dns-parking") || nsBlob.includes("hostinger.com")) {
    if (timeouts) return "hostinger_unreachable";
    if (http200) return "http_200_no_redirect";
    if (wrongLoc) return "wrong_location";
    return "hostinger_partial";
  }
  if (nsBlob.includes("cloudflare") || nsBlob.includes("ns.cloudflare")) {
    if (http200) return "http_200_no_redirect";
    if (wrongLoc) return "wrong_location";
    if (timeouts) return "cloudflare_unreachable";
    return "cloudflare_partial";
  }
  if (http200) return "http_200_no_redirect";
  if (wrongLoc) return "wrong_location";
  if (timeouts) return "timeout_unknown_dns";
  return "unknown_fail";
}

function printDiagnosis(mode, apexDns, wwwDns) {
  console.error("\n--- DNS diagnosis (live) ---");
  console.error(`arleds.com NS: ${(apexDns.ns || []).join(", ") || "<none>"} A: ${(apexDns.a || []).join(", ") || "<none>"}${apexDns.error ? ` (${apexDns.error})` : ""}`);
  console.error(`www.arleds.com NS: ${(wwwDns.ns || []).join(", ") || "<none>"} A: ${(wwwDns.a || []).join(", ") || "<none>"}${wwwDns.error ? ` (${wwwDns.error})` : ""}`);
  console.error(`mode: ${mode}`);
}

function printNextSteps(mode) {
  console.error("\nOwner next (provider-correct — do not open the wrong panel):");

  if (mode === "dnsenable_tls_dead" || mode === "timeout_unknown_dns") {
    console.error("NS looks like Isimtescil/DNSEnable (or unknown) — Hostinger hPanel will NOT apply.");
    console.error("Option A (fastest at registrar): Isimtescil/DNSEnable domain → Domain Redirect");
    console.error(`  arleds.com + www → ${EXPECT} (301/permanent)`);
    console.error("Option B (align with arledscreen.com): move NS to Cloudflare, then Bulk Redirect");
    console.error(`  arleds.com/* → ${EXPECT} (301)`);
    console.error("Re-check: npm run verify:arleds-301");
  } else if (mode === "hostinger_unreachable" || mode === "hostinger_partial" || mode === "http_200_no_redirect") {
    console.error("\n--- Hostinger clipboard (permanent 301 entire domain) ---");
    console.error("hPanel → Domains → arleds.com → Redirects");
    console.error("http://arleds.com/ → https://arledscreen.com/tr/");
    console.error("http://www.arleds.com/ → https://arledscreen.com/tr/");
    console.error("https://arleds.com/ → https://arledscreen.com/tr/");
    console.error("https://www.arleds.com/ → https://arledscreen.com/tr/");
    console.error(`Hostinger support: ${HOSTINGER_SUPPORT_TO}`);
    console.error(buildHostingerMailto());
    console.error(`Gmail draft (Send): ${HOSTINGER_GMAIL_DRAFT_URL}`);
    console.error("Also: npm run point-c:hostinger-eml · docs/ops/arleds-301-hostinger.md");
  } else if (mode === "cloudflare_unreachable" || mode === "cloudflare_partial" || mode === "wrong_location") {
    console.error("Cloudflare-ish NS detected (or redirect Location wrong).");
    console.error("Cloudflare Dashboard → Rules → Redirect Rules / Bulk Redirects");
    console.error(`  arleds.com/* and www.arleds.com/* → ${EXPECT} (301 Permanent)`);
    console.error("Re-check: npm run verify:arleds-301");
  } else if (mode === "nxdomain") {
    console.error("DNS NXDOMAIN / no A records — restore NS at registrar or attach domain to hosting first.");
  } else {
    console.error("\n--- Hostinger clipboard (fallback if domain is on Hostinger) ---");
    console.error("hPanel → Domains → arleds.com → Redirects → 301 to https://arledscreen.com/tr/");
    console.error(buildHostingerMailto());
    console.error(`Gmail draft (Send): ${HOSTINGER_GMAIL_DRAFT_URL}`);
  }

  console.error("npm run point-c:next · npm run geo:status · docs/ops/arleds-301-hostinger.md");
}

let failCount = 0;
function failCountLabel() {
  return `${failCount}/${PROBES.length} probes failed.`;
}

const results = [];
for (const u of PROBES) {
  // sequential — legacy host often flaky
  // eslint-disable-next-line no-await-in-loop
  results.push(await probe(u));
}

for (const r of results) {
  const pass = (r.status === 301 || r.status === 308) && okLocation(r.location);
  if (!pass) failCount++;
  console.log(
    `${pass ? "OK" : "FAIL"} ${r.url} → HTTP ${r.status || "ERR"} Location=${r.location || r.error || "<empty>"}`,
  );
}

if (failCount) {
  const apexDns = await resolveDns("arleds.com");
  const wwwDns = await resolveDns("www.arleds.com");
  const mode = classifyMode(results, apexDns, wwwDns);
  printDiagnosis(mode, apexDns, wwwDns);
  console.error(
    `\n${failCount}/${results.length} probes failed. Target: ${EXPECT} (see docs/ops/arleds-301-hostinger.md).`,
  );
  printNextSteps(mode);
  // Keep CI needle for owner-tooling smoke (always print on fail).
  if (!["hostinger_unreachable", "hostinger_partial", "http_200_no_redirect", "unknown_fail"].includes(mode)) {
    console.error("\n--- Hostinger clipboard (only if NS is Hostinger; otherwise ignore) ---");
    console.error("hPanel → Domains → arleds.com → Redirects → 301 to https://arledscreen.com/tr/");
  }
  process.exit(1);
}
console.log(`\nOK all ${results.length} probes redirect to ${EXPECT}`);
