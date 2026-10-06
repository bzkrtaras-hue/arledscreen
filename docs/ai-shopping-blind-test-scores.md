# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **504/1008** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **756/1008**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (336 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 336 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1008.

| Model | Tarih | Konum | Incognito | Skor /1008 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1008 | |
| Gemini | | | | /1008 | |
| Perplexity | | | | /1008 | |
| Bing Copilot | | | | /1008 | |
| **Ortalama** | | | | **/1008** | Hedef ≥ 504 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1008 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1008 | | |
| Gemini | | /1008 | | |
| Perplexity | | /1008 | | |
| Bing Copilot | | /1008 | | |
| **Ortalama** | | **/1008** | | Hedef ≥ 756 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
