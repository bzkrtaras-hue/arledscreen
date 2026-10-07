#!/usr/bin/env node
/**
 * Probe legacy arleds.com → expect 301 to https://arledscreen.com/tr/.
 * Owner-gated until Hostinger/CF DNS answers; this script only verifies.
 *
 * Usage: node scripts/verify-arleds-301.mjs
 * Exit 0 only when all probes redirect correctly.
 */
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
    return { url, status: 0, location: "", error: e?.name === "AbortError" ? "timeout" : String(e?.message || e) };
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

const results = [];
for (const u of PROBES) {
  // sequential — legacy host often flaky
  // eslint-disable-next-line no-await-in-loop
  results.push(await probe(u));
}

let fail = 0;
for (const r of results) {
  const pass = (r.status === 301 || r.status === 308) && okLocation(r.location);
  if (!pass) fail++;
  console.log(
    `${pass ? "OK" : "FAIL"} ${r.url} → HTTP ${r.status || "ERR"} Location=${r.location || r.error || "<empty>"}`,
  );
}

if (fail) {
  console.error(
    `\n${fail}/${results.length} probes failed. Owner: set Hostinger/CF redirect arleds.com → ${EXPECT} (see docs/ops/arleds-301-hostinger.md).`,
  );
  console.error("\n--- Hostinger clipboard (permanent 301 entire domain) ---");
  console.error("hPanel → Domains → arleds.com → Redirects");
  console.error("http://arleds.com/ → https://arledscreen.com/tr/");
  console.error("http://www.arleds.com/ → https://arledscreen.com/tr/");
  console.error("https://arleds.com/ → https://arledscreen.com/tr/");
  console.error("https://www.arleds.com/ → https://arledscreen.com/tr/");
  console.error("Also: npm run point-c · https://arledscreen.com/point-c.txt");
  process.exit(1);
}
console.log(`\nOK all ${results.length} probes redirect to ${EXPECT}`);
