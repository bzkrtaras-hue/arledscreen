# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **92/183** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **138/183**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (61 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 61 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /183.

| Model | Tarih | Konum | Incognito | Skor /183 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /183 | |
| Gemini | | | | /183 | |
| Perplexity | | | | /183 | |
| Bing Copilot | | | | /183 | |
| **Ortalama** | | | | **/183** | Hedef ≥ 92 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /183 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /183 | | |
| Gemini | | /183 | | |
| Perplexity | | /183 | | |
| Bing Copilot | | /183 | | |
| **Ortalama** | | **/183** | | Hedef ≥ 138 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
