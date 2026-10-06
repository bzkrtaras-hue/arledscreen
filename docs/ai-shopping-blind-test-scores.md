# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **557/1113** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **835/1113**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (371 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 371 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1113.

| Model | Tarih | Konum | Incognito | Skor /1113 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1113 | |
| Gemini | | | | /1113 | |
| Perplexity | | | | /1113 | |
| Bing Copilot | | | | /1113 | |
| **Ortalama** | | | | **/1113** | Hedef ≥ 557 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1113 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1113 | | |
| Gemini | | /1113 | | |
| Perplexity | | /1113 | | |
| Bing Copilot | | /1113 | | |
| **Ortalama** | | **/1113** | | Hedef ≥ 835 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
