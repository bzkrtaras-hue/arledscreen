# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **269/537** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **403/537**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (179 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 179 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /537.

| Model | Tarih | Konum | Incognito | Skor /537 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /537 | |
| Gemini | | | | /537 | |
| Perplexity | | | | /537 | |
| Bing Copilot | | | | /537 | |
| **Ortalama** | | | | **/537** | Hedef ≥ 269 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /537 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /537 | | |
| Gemini | | /537 | | |
| Perplexity | | /537 | | |
| Bing Copilot | | /537 | | |
| **Ortalama** | | **/537** | | Hedef ≥ 403 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
