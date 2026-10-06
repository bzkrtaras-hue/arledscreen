# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **71/141** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **106/141**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (47 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 47 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /141.

| Model | Tarih | Konum | Incognito | Skor /141 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /141 | |
| Gemini | | | | /141 | |
| Perplexity | | | | /141 | |
| Bing Copilot | | | | /141 | |
| **Ortalama** | | | | **/141** | Hedef ≥ 71 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /141 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /141 | | |
| Gemini | | /141 | | |
| Perplexity | | /141 | | |
| Bing Copilot | | /141 | | |
| **Ortalama** | | **/141** | | Hedef ≥ 106 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
