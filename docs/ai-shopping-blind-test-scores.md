# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **537/1074** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **806/1074**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (358 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 358 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1074.

| Model | Tarih | Konum | Incognito | Skor /1074 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1074 | |
| Gemini | | | | /1074 | |
| Perplexity | | | | /1074 | |
| Bing Copilot | | | | /1074 | |
| **Ortalama** | | | | **/1074** | Hedef ≥ 537 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1074 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1074 | | |
| Gemini | | /1074 | | |
| Perplexity | | /1074 | | |
| Bing Copilot | | /1074 | | |
| **Ortalama** | | **/1074** | | Hedef ≥ 806 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
