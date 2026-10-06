# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **590/1179** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **885/1179**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (393 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 393 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1179.

| Model | Tarih | Konum | Incognito | Skor /1179 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1179 | |
| Gemini | | | | /1179 | |
| Perplexity | | | | /1179 | |
| Bing Copilot | | | | /1179 | |
| **Ortalama** | | | | **/1179** | Hedef ≥ 590 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1179 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1179 | | |
| Gemini | | /1179 | | |
| Perplexity | | /1179 | | |
| Bing Copilot | | /1179 | | |
| **Ortalama** | | **/1179** | | Hedef ≥ 885 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
