# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **99/198** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **149/198**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (66 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 66 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /198.

| Model | Tarih | Konum | Incognito | Skor /198 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /198 | |
| Gemini | | | | /198 | |
| Perplexity | | | | /198 | |
| Bing Copilot | | | | /198 | |
| **Ortalama** | | | | **/198** | Hedef ≥ 99 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /198 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /198 | | |
| Gemini | | /198 | | |
| Perplexity | | /198 | | |
| Bing Copilot | | /198 | | |
| **Ortalama** | | **/198** | | Hedef ≥ 149 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
