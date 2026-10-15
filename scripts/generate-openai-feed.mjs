#!/usr/bin/env node
/**
 * GEO paket 2: OpenAI product-feed (ACP discovery, OpenAI format JSONL) derived
 * 1:1 from public/feeds/merchant-priced-panels.tsv. No new facts: price, brand,
 * image, availability and URL are copied from the owner-approved TSV.
 * No gtin / mpn: NXTIONSTAR panels have no assigned GTIN and the internal slug
 * is not a manufacturer part number (OpenAI: "do not invent a value").
 * Return fields (accepts_returns, return_deadline_in_days, return_policy) mirror the
 * public policy page + MerchantReturnPolicy (14 days from delivery, standard stock products).
 * Run: node scripts/generate-openai-feed.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
const tsv = readFileSync("public/feeds/merchant-priced-panels.tsv", "utf8").trim().split("\n");
const head = tsv[0].split("\t");
const rows = tsv.slice(1).map((l) => Object.fromEntries(l.split("\t").map((v, i) => [head[i], v])));
const avail = { InStock: "in_stock", OutOfStock: "out_of_stock", PreOrder: "pre_order", BackOrder: "backorder" };
const out = rows.map((r) => {
  const use = r.use === "ic" ? "indoor" : "outdoor";
  const extra = [r.surface === "GOB" ? "GOB-coated" : "", r.front_service === "yes" ? "front-service" : ""].filter(Boolean).join(", ");
  return JSON.stringify({
    item_id: r.id,
    title: r.title_en,
    description: `NXTIONSTAR ${r.pitch} ${use}${extra ? ` (${extra})` : ""} LED display module, ${r.module_size}. Price is per panel in USD, excluding VAT and shipping; final project price is set in a written quote. Sold by ARLEDSCREEN, Istanbul, Turkey.`,
    url: r.product_url,
    brand: r.brand,
    seller_name: r.seller,
    seller_url: r.seller_url,
    image_url: r.image_link,
    price: `${Number(r.price_usd).toFixed(2)} USD`,
    availability: avail[r.availability] ?? "unknown",
    condition: r.condition || "new",
    product_category: `Electronics > LED displays > ${use === "indoor" ? "Indoor" : "Outdoor"} LED modules`,
    accepts_returns: true,
    return_deadline_in_days: 14,
    return_policy: "https://arledscreen.com/en/iade-politikasi/",
    is_eligible_search: true,
    is_eligible_checkout: false,
  });
});
writeFileSync("public/feeds/openai-products.jsonl", out.join("\n") + "\n");
console.log(`openai-products.jsonl: ${out.length} rows`);
