# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **569/1137** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **853/1137**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (379 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 379 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1137.

| Model | Tarih | Konum | Incognito | Skor /1137 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1137 | |
| Gemini | | | | /1137 | |
| Perplexity | | | | /1137 | |
| Bing Copilot | | | | /1137 | |
| **Ortalama** | | | | **/1137** | Hedef ≥ 569 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1137 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1137 | | |
| Gemini | | /1137 | | |
| Perplexity | | /1137 | | |
| Bing Copilot | | /1137 | | |
| **Ortalama** | | **/1137** | | Hedef ≥ 853 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
