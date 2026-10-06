# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **555/1110** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **833/1110**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (370 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 370 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1110.

| Model | Tarih | Konum | Incognito | Skor /1110 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1110 | |
| Gemini | | | | /1110 | |
| Perplexity | | | | /1110 | |
| Bing Copilot | | | | /1110 | |
| **Ortalama** | | | | **/1110** | Hedef ≥ 555 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1110 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1110 | | |
| Gemini | | /1110 | | |
| Perplexity | | /1110 | | |
| Bing Copilot | | /1110 | | |
| **Ortalama** | | **/1110** | | Hedef ≥ 833 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
