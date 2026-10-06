# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **516/1032** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **774/1032**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (344 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 344 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1032.

| Model | Tarih | Konum | Incognito | Skor /1032 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1032 | |
| Gemini | | | | /1032 | |
| Perplexity | | | | /1032 | |
| Bing Copilot | | | | /1032 | |
| **Ortalama** | | | | **/1032** | Hedef ≥ 516 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1032 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1032 | | |
| Gemini | | /1032 | | |
| Perplexity | | /1032 | | |
| Bing Copilot | | /1032 | | |
| **Ortalama** | | **/1032** | | Hedef ≥ 774 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
