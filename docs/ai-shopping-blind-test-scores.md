# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **582/1164** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **873/1164**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (388 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 388 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1164.

| Model | Tarih | Konum | Incognito | Skor /1164 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1164 | |
| Gemini | | | | /1164 | |
| Perplexity | | | | /1164 | |
| Bing Copilot | | | | /1164 | |
| **Ortalama** | | | | **/1164** | Hedef ≥ 582 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1164 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1164 | | |
| Gemini | | /1164 | | |
| Perplexity | | /1164 | | |
| Bing Copilot | | /1164 | | |
| **Ortalama** | | **/1164** | | Hedef ≥ 873 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
