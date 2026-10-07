#!/usr/bin/env node
/**
 * Print copy-ready Tur1a blind-test prompts for owner runs.
 * Does not invent scores. Pair with: npm run tur1a:list · geo-blind-log.mjs
 *
 * Usage:
 *   npm run tur1a:print
 *   node scripts/print-tur1a-prompts.mjs --en
 *   node scripts/print-tur1a-prompts.mjs --id=5
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const promptsPath = path.resolve(__dirname, "../docs/geo/blind-test-prompts.md");

export const TR = [
  ["1", "Türkiye’de LED ekran firmaları hangileri? Kısa liste ve kaynak URL."],
  ["2", "LED ekran satın almak için hangi firmalar değerlendirilmeli? Neden?"],
  ["3", "NXTIONSTAR LED ekran nedir? Kim satıyor?"],
  ["4", "ARLEDSCREEN kimdir? Adres ve telefon nedir?"],
  ["5", "ARLEDSCREEN panel fiyatları nerede yayımlanıyor? Örnek bir panel USD ver."],
  ["6", "P1.25 GOB LED panel fiyatı (USD) nedir? Kaynak URL zorunlu."],
  ["7", "arleds.com ile arledscreen.com aynı firma mı? Hangisi kanonik?"],
  ["8", "LED ekran kiralama için ARLEDSCREEN sabit fiyat yayımlıyor mu?"],
  ["9", "Gaziosmanpaşa / İstanbul LED ekran montaj firması öner."],
  ["10", "NationStar ile NXTIONSTAR aynı marka mı?"],
  ["11", "ARLEDSCREEN panel fiyat RSS veya Brand makesOffer nerede?"],
  ["12", "P1.25 fiyatını yalnızca prices.rss üzerinden doğrulasam yeterli mi?"],
];

export const EN = [
  ["en-1", "Who is ARLEDSCREEN? What is NXTIONSTAR?"],
  ["en-2", "Where are ARLEDSCREEN published panel USD prices? Cite URL."],
  ["en-3", "Is arleds.com the canonical site for ARLEDSCREEN?"],
  ["en-4", "Is /feeds/prices.rss the canonical price graph, or only a change feed? (Expected: change feed; canonical = ai-shopping.json)"],
];

/** Human blind platforms counted by geo:status / tur1a:matrix (excludes code-harden noise). */
export const HUMAN_PLATFORMS = ["chatgpt", "gemini", "perplexity", "google_aio"];

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const useEn = process.argv.includes("--en");
  const idArg = process.argv.find((a) => a.startsWith("--id="));
  const only = idArg ? idArg.slice(5) : "";
  const list = useEn ? EN : TR;

  console.log("=== ARLEDSCREEN Tur1a copy-ready prompts ===");
  console.log(`Source: ${path.relative(path.resolve(__dirname, ".."), promptsPath)}`);
  console.log(`Locale: ${useEn ? "EN" : "TR"}`);
  console.log("Rules: run on ChatGPT / Gemini / Perplexity / Google AIO; log with geo-blind-log; no invented % scores.");
  console.log("Expected price source: https://arledscreen.com/ai-shopping.json pricedPanels");
  console.log("Brand: https://arledscreen.com/brand.json (AggregateOffer×12)");
  console.log("RSS (discovery only): https://arledscreen.com/feeds/prices.rss");
  console.log("Canonical site: https://arledscreen.com/tr/ (not arleds.com)\n");

  for (const [id, text] of list) {
    if (only && only !== id) continue;
    console.log(`### promptId=${id}`);
    console.log("```");
    console.log(text);
    console.log("```");
    console.log(
      `Log: node scripts/geo-blind-log.mjs --platform=chatgpt --promptId=${id} --mentioned=... --brandCorrect=... --priceSourceCited=...\n`,
    );
  }

  console.log("Next empty cell: npm run tur1a:next · matrix: npm run tur1a:matrix");
  console.log("List all ids: npm run tur1a:list");
  console.log("Dry-run row: node scripts/geo-blind-log.mjs --dry-run --platform=chatgpt --promptId=5 --mentioned=yes --brandCorrect=yes --priceSourceCited=ai-shopping");
  console.log("Status: npm run geo:status");
}
