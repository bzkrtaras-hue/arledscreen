# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **351/702** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **527/702**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (234 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 234 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /702.

| Model | Tarih | Konum | Incognito | Skor /702 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /702 | |
| Gemini | | | | /702 | |
| Perplexity | | | | /702 | |
| Bing Copilot | | | | /702 | |
| **Ortalama** | | | | **/702** | Hedef ≥ 351 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /702 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /702 | | |
| Gemini | | /702 | | |
| Perplexity | | /702 | | |
| Bing Copilot | | /702 | | |
| **Ortalama** | | **/702** | | Hedef ≥ 527 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
