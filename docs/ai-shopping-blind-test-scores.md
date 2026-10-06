# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **605/1209** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **907/1209**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (403 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 403 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1209.

| Model | Tarih | Konum | Incognito | Skor /1209 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1209 | |
| Gemini | | | | /1209 | |
| Perplexity | | | | /1209 | |
| Bing Copilot | | | | /1209 | |
| **Ortalama** | | | | **/1209** | Hedef ≥ 605 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1209 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1209 | | |
| Gemini | | /1209 | | |
| Perplexity | | /1209 | | |
| Bing Copilot | | /1209 | | |
| **Ortalama** | | **/1209** | | Hedef ≥ 907 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
