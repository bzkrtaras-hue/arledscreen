# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **294/588** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **441/588**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (196 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 196 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /588.

| Model | Tarih | Konum | Incognito | Skor /588 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /588 | |
| Gemini | | | | /588 | |
| Perplexity | | | | /588 | |
| Bing Copilot | | | | /588 | |
| **Ortalama** | | | | **/588** | Hedef ≥ 294 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /588 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /588 | | |
| Gemini | | /588 | | |
| Perplexity | | /588 | | |
| Bing Copilot | | /588 | | |
| **Ortalama** | | **/588** | | Hedef ≥ 441 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
