#!/usr/bin/env node
/**
 * Validates the public return/cancellation page against the machine-readable policy.
 * - /tr/ and /en/iade-politikasi/ exist, no [ONAY BEKLİYOR]/[AWAITING APPROVAL] marker, no noindex
 * - both URLs are in sitemap.xml
 * - ai-shopping.json / catalog.json: every panel offer = FiniteReturnWindow, 14 days, link to the page
 * - llms.txt / llms-full.txt no longer say the return policy is not published
 * - the page text states the same 14-day window
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
if (!fs.existsSync(out)) {
  console.log("validate-iade-policy: out/ missing, skipped");
  process.exit(0);
}
const fail = (m) => {
  console.error(`❌ validate-iade-policy: ${m}`);
  process.exit(1);
};
for (const loc of ["tr", "en"]) {
  const f = path.join(out, loc, "iade-politikasi", "index.html");
  if (!fs.existsSync(f)) fail(`${loc}/iade-politikasi/index.html missing`);
  const html = fs.readFileSync(f, "utf8");
  if (/ONAY BEKLİYOR|AWAITING APPROVAL/i.test(html)) fail(`${loc} page still has a placeholder marker`);
  if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html)) fail(`${loc} page is noindex`);
  if (!/\b14\b/.test(html)) fail(`${loc} page does not state the 14-day window`);
  if (/ucuz|indirim|kampanya|cheap|discount/i.test(html.replace(/<script[\s\S]*?<\/script>/g, ""))) fail(`${loc} page has non-premium wording`);
}
const sm = fs.readFileSync(path.join(out, "sitemap.xml"), "utf8");
for (const loc of ["tr", "en"]) {
  if (!sm.includes(`<loc>https://arledscreen.com/${loc}/iade-politikasi/</loc>`)) fail(`sitemap.xml lacks /${loc}/iade-politikasi/`);
}
const walk = (n, acc = []) => {
  if (Array.isArray(n)) n.forEach((x) => walk(x, acc));
  else if (n && typeof n === "object") {
    if (n["@type"] === "MerchantReturnPolicy") acc.push(n);
    Object.values(n).forEach((x) => walk(x, acc));
  }
  return acc;
};
for (const file of ["ai-shopping.json", "catalog.json", "entity.json", "brand.json"]) {
  const pols = walk(JSON.parse(fs.readFileSync(path.join(out, file), "utf8")));
  if (!pols.length) fail(`${file}: no MerchantReturnPolicy found`);
  for (const p of pols) {
    if (
      p.returnPolicyCategory !== "https://schema.org/MerchantReturnFiniteReturnWindow" ||
      p.merchantReturnDays !== 14 ||
      p.merchantReturnLink !== "https://arledscreen.com/tr/iade-politikasi/"
    )
      fail(`${file}: MerchantReturnPolicy not aligned with the policy page`);
  }
}
for (const f of ["llms.txt", "llms-full.txt"]) {
  const t = fs.readFileSync(path.join(out, f), "utf8");
  if (/sitede sabit yayımlanmaz; teklifte yazılır/.test(t)) fail(`${f} still says the return policy is not published`);
  if (!t.includes("/iade-politikasi/")) fail(`${f} does not link the return policy page`);
}
console.log("✅ validate-iade-policy: page, sitemap, schema and llms files aligned (14 days)");
