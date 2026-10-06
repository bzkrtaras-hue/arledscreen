# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **533/1065** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **799/1065**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (355 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 355 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1065.

| Model | Tarih | Konum | Incognito | Skor /1065 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1065 | |
| Gemini | | | | /1065 | |
| Perplexity | | | | /1065 | |
| Bing Copilot | | | | /1065 | |
| **Ortalama** | | | | **/1065** | Hedef ≥ 533 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1065 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1065 | | |
| Gemini | | /1065 | | |
| Perplexity | | /1065 | | |
| Bing Copilot | | /1065 | | |
| **Ortalama** | | **/1065** | | Hedef ≥ 799 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
