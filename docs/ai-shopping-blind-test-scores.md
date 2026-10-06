# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **572/1143** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **858/1143**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (381 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 381 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1143.

| Model | Tarih | Konum | Incognito | Skor /1143 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1143 | |
| Gemini | | | | /1143 | |
| Perplexity | | | | /1143 | |
| Bing Copilot | | | | /1143 | |
| **Ortalama** | | | | **/1143** | Hedef ≥ 572 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1143 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1143 | | |
| Gemini | | /1143 | | |
| Perplexity | | /1143 | | |
| Bing Copilot | | /1143 | | |
| **Ortalama** | | **/1143** | | Hedef ≥ 858 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
