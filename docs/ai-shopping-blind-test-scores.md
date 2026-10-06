# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **509/1017** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **763/1017**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (339 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 339 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1017.

| Model | Tarih | Konum | Incognito | Skor /1017 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1017 | |
| Gemini | | | | /1017 | |
| Perplexity | | | | /1017 | |
| Bing Copilot | | | | /1017 | |
| **Ortalama** | | | | **/1017** | Hedef ≥ 509 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1017 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1017 | | |
| Gemini | | /1017 | | |
| Perplexity | | /1017 | | |
| Bing Copilot | | /1017 | | |
| **Ortalama** | | **/1017** | | Hedef ≥ 763 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
