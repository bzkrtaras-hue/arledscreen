# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **573/1146** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **860/1146**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (382 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 382 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1146.

| Model | Tarih | Konum | Incognito | Skor /1146 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1146 | |
| Gemini | | | | /1146 | |
| Perplexity | | | | /1146 | |
| Bing Copilot | | | | /1146 | |
| **Ortalama** | | | | **/1146** | Hedef ≥ 573 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1146 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1146 | | |
| Gemini | | /1146 | | |
| Perplexity | | /1146 | | |
| Bing Copilot | | /1146 | | |
| **Ortalama** | | **/1146** | | Hedef ≥ 860 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
