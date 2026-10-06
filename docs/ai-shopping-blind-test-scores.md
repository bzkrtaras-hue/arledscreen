# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **563/1125** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **844/1125**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (375 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 375 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1125.

| Model | Tarih | Konum | Incognito | Skor /1125 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1125 | |
| Gemini | | | | /1125 | |
| Perplexity | | | | /1125 | |
| Bing Copilot | | | | /1125 | |
| **Ortalama** | | | | **/1125** | Hedef ≥ 563 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1125 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1125 | | |
| Gemini | | /1125 | | |
| Perplexity | | /1125 | | |
| Bing Copilot | | /1125 | | |
| **Ortalama** | | **/1125** | | Hedef ≥ 844 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
