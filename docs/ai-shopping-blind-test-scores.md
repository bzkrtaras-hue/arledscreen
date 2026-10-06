# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **600/1200** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **900/1200**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (400 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 400 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1200.

| Model | Tarih | Konum | Incognito | Skor /1200 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1200 | |
| Gemini | | | | /1200 | |
| Perplexity | | | | /1200 | |
| Bing Copilot | | | | /1200 | |
| **Ortalama** | | | | **/1200** | Hedef ≥ 600 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1200 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1200 | | |
| Gemini | | /1200 | | |
| Perplexity | | /1200 | | |
| Bing Copilot | | /1200 | | |
| **Ortalama** | | **/1200** | | Hedef ≥ 900 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
