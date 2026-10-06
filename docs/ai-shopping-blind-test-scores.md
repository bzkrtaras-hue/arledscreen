# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **608/1215** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **912/1215**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (405 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 405 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1215.

| Model | Tarih | Konum | Incognito | Skor /1215 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1215 | |
| Gemini | | | | /1215 | |
| Perplexity | | | | /1215 | |
| Bing Copilot | | | | /1215 | |
| **Ortalama** | | | | **/1215** | Hedef ≥ 608 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1215 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1215 | | |
| Gemini | | /1215 | | |
| Perplexity | | /1215 | | |
| Bing Copilot | | /1215 | | |
| **Ortalama** | | **/1215** | | Hedef ≥ 912 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
