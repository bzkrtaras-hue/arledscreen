# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **198/396** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **297/396**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (132 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 132 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /396.

| Model | Tarih | Konum | Incognito | Skor /396 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /396 | |
| Gemini | | | | /396 | |
| Perplexity | | | | /396 | |
| Bing Copilot | | | | /396 | |
| **Ortalama** | | | | **/396** | Hedef ≥ 198 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /396 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /396 | | |
| Gemini | | /396 | | |
| Perplexity | | /396 | | |
| Bing Copilot | | /396 | | |
| **Ortalama** | | **/396** | | Hedef ≥ 297 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
