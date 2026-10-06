# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **249/498** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **374/498**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (166 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 166 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /498.

| Model | Tarih | Konum | Incognito | Skor /498 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /498 | |
| Gemini | | | | /498 | |
| Perplexity | | | | /498 | |
| Bing Copilot | | | | /498 | |
| **Ortalama** | | | | **/498** | Hedef ≥ 249 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /498 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /498 | | |
| Gemini | | /498 | | |
| Perplexity | | /498 | | |
| Bing Copilot | | /498 | | |
| **Ortalama** | | **/498** | | Hedef ≥ 374 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
