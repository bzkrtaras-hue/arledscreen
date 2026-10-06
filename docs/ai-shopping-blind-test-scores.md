# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **345/690** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **518/690**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (230 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 230 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /690.

| Model | Tarih | Konum | Incognito | Skor /690 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /690 | |
| Gemini | | | | /690 | |
| Perplexity | | | | /690 | |
| Bing Copilot | | | | /690 | |
| **Ortalama** | | | | **/690** | Hedef ≥ 345 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /690 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /690 | | |
| Gemini | | /690 | | |
| Perplexity | | /690 | | |
| Bing Copilot | | /690 | | |
| **Ortalama** | | **/690** | | Hedef ≥ 518 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
