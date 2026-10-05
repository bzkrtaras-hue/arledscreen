/**
 * Sync llms-full.txt §4 panel tables from PANEL_PRICES (Gün 50).
 *
 * Replaces content between <!-- AUTO:PANEL_PRICES_BEGIN --> and
 * <!-- AUTO:PANEL_PRICES_END --> so agent prose USD never drifts from catalog.
 *
 * Run: node scripts/sync-llms-prices.mjs (also via npm run build)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const pricesSrc = fs.readFileSync(path.join(root, "src/content/prices.ts"), "utf8");
const PRICE_VALID_UNTIL =
  pricesSrc.match(/export const PRICE_VALID_UNTIL\s*=\s*"([^"]+)"/)?.[1] || "2026-12-31";
const PANELS_PER_M2 = 1 / (0.32 * 0.16);

const priceRe =
  /\{\s*id:\s*"([^"]+)",\s*pitch:\s*"([^"]+)",\s*pitchMm:\s*([\d.]+),\s*use:\s*"(ic|dis)",\s*(?:surface:\s*"GOB",\s*)?(?:frontService:\s*true,\s*)?usd:\s*([\d.]+)/g;

const rows = [];
for (const m of pricesSrc.matchAll(priceRe)) {
  rows.push({
    id: m[1],
    pitch: m[2],
    use: m[4],
    surface: /surface:\s*"GOB"/.test(m[0]) ? "GOB" : undefined,
    frontService: /frontService:\s*true/.test(m[0]),
    usd: Number(m[5]),
  });
}

function fmtUsd(n) {
  return n.toFixed(2).replace(".", ",");
}

function fmtM2(n) {
  const v = Math.round(n * PANELS_PER_M2);
  return v.toLocaleString("tr-TR");
}

function label(p) {
  const use = p.use === "ic" ? "İç mekân" : "Dış mekân";
  const extra = [p.surface, p.frontService ? "front / önden servis" : ""]
    .filter(Boolean)
    .join(" ");
  if (p.frontService) return `${p.pitch} ${use} (${extra})`;
  if (p.surface) return `${p.pitch} ${use} ${p.surface}`;
  return `${p.pitch} ${use}`;
}

function table(use) {
  const subset = rows.filter((r) => r.use === use);
  const lines = [
    "| Modül | Panel fiyatı (USD) | 1 m² için yaklaşık modül bedeli (USD)* |",
    "|---|---|---|",
    ...subset.map(
      (p) => `| ${label(p)} | ${fmtUsd(p.usd)} | ≈ ${fmtM2(p.usd)} |`,
    ),
  ];
  return lines.join("\n");
}

const block = [
  "<!-- AUTO:PANEL_PRICES_BEGIN -->",
  "",
  "İç mekân:",
  "",
  table("ic"),
  "",
  "Dış mekân:",
  "",
  table("dis"),
  "",
  "*1 m² = 1 / (0,32 × 0,16) ≈ 19,53 modül (standart 320 × 160 mm). Bu sütun yalnızca modül bedelidir; işçilik, kontrol kartı, yazılım, konstrüksiyon, KDV ve nakliye dahil değildir. Gerçek projede modül adedi her kenarda yukarı yuvarlanır.",
  "",
  `Makinece aynı fiyat kaynağı: https://arledscreen.com/catalog.json · Tek fetch: https://arledscreen.com/ai-shopping.json (pricedPanels+agentRules) · Ajan keşif: https://arledscreen.com/.well-known/ard.json · Point C: https://arledscreen.com/entity-profiles.json · priceValidUntil: ${PRICE_VALID_UNTIL} · ücretsiz kargo yok`,
  "",
  "<!-- AUTO:PANEL_PRICES_END -->",
].join("\n");

const llmsPath = path.join(root, "public/llms-full.txt");
let text = fs.readFileSync(llmsPath, "utf8");
const re =
  /<!-- AUTO:PANEL_PRICES_BEGIN -->[\s\S]*?<!-- AUTO:PANEL_PRICES_END -->/;
if (!re.test(text)) {
  // First run: replace the hand-maintained İç/Dış tables block before "Hesaplayıcının toplam"
  const legacy = /(İç mekân:\n\n\| Modül \|[\s\S]*?Makinece aynı fiyat kaynağı:[^\n]*\n)/;
  if (!legacy.test(text)) {
    console.error("sync-llms-prices: could not find price tables in llms-full.txt");
    process.exit(1);
  }
  text = text.replace(legacy, `${block}\n\n`);
} else {
  text = text.replace(re, block);
}

fs.writeFileSync(llmsPath, text);
console.log(`sync-llms-prices: wrote ${rows.length} PANEL_PRICES rows into llms-full.txt`);
