# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **341/681** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **511/681**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (227 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 227 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /681.

| Model | Tarih | Konum | Incognito | Skor /681 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /681 | |
| Gemini | | | | /681 | |
| Perplexity | | | | /681 | |
| Bing Copilot | | | | /681 | |
| **Ortalama** | | | | **/681** | Hedef ≥ 341 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /681 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /681 | | |
| Gemini | | /681 | | |
| Perplexity | | /681 | | |
| Bing Copilot | | /681 | | |
| **Ortalama** | | **/681** | | Hedef ≥ 511 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
