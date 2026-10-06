# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **519/1038** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **779/1038**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (346 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 346 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1038.

| Model | Tarih | Konum | Incognito | Skor /1038 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1038 | |
| Gemini | | | | /1038 | |
| Perplexity | | | | /1038 | |
| Bing Copilot | | | | /1038 | |
| **Ortalama** | | | | **/1038** | Hedef ≥ 519 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1038 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1038 | | |
| Gemini | | /1038 | | |
| Perplexity | | /1038 | | |
| Bing Copilot | | /1038 | | |
| **Ortalama** | | **/1038** | | Hedef ≥ 779 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
