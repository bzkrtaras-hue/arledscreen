# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **554/1107** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **831/1107**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (369 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 369 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1107.

| Model | Tarih | Konum | Incognito | Skor /1107 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1107 | |
| Gemini | | | | /1107 | |
| Perplexity | | | | /1107 | |
| Bing Copilot | | | | /1107 | |
| **Ortalama** | | | | **/1107** | Hedef ≥ 554 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1107 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1107 | | |
| Gemini | | /1107 | | |
| Perplexity | | /1107 | | |
| Bing Copilot | | /1107 | | |
| **Ortalama** | | **/1107** | | Hedef ≥ 831 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
