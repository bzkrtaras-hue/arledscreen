# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **560/1119** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **840/1119**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (373 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 373 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1119.

| Model | Tarih | Konum | Incognito | Skor /1119 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1119 | |
| Gemini | | | | /1119 | |
| Perplexity | | | | /1119 | |
| Bing Copilot | | | | /1119 | |
| **Ortalama** | | | | **/1119** | Hedef ≥ 560 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1119 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1119 | | |
| Gemini | | /1119 | | |
| Perplexity | | /1119 | | |
| Bing Copilot | | /1119 | | |
| **Ortalama** | | **/1119** | | Hedef ≥ 840 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
