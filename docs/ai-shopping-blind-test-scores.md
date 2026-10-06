# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **536/1071** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **804/1071**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (357 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 357 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1071.

| Model | Tarih | Konum | Incognito | Skor /1071 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1071 | |
| Gemini | | | | /1071 | |
| Perplexity | | | | /1071 | |
| Bing Copilot | | | | /1071 | |
| **Ortalama** | | | | **/1071** | Hedef ≥ 536 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1071 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1071 | | |
| Gemini | | /1071 | | |
| Perplexity | | /1071 | | |
| Bing Copilot | | /1071 | | |
| **Ortalama** | | **/1071** | | Hedef ≥ 804 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
