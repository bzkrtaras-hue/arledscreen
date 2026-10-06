# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **435/870** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **653/870**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (290 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 290 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /870.

| Model | Tarih | Konum | Incognito | Skor /870 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /870 | |
| Gemini | | | | /870 | |
| Perplexity | | | | /870 | |
| Bing Copilot | | | | /870 | |
| **Ortalama** | | | | **/870** | Hedef ≥ 435 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /870 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /870 | | |
| Gemini | | /870 | | |
| Perplexity | | /870 | | |
| Bing Copilot | | /870 | | |
| **Ortalama** | | **/870** | | Hedef ≥ 653 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
