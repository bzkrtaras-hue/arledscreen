# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **558/1116** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **837/1116**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (372 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 372 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1116.

| Model | Tarih | Konum | Incognito | Skor /1116 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1116 | |
| Gemini | | | | /1116 | |
| Perplexity | | | | /1116 | |
| Bing Copilot | | | | /1116 | |
| **Ortalama** | | | | **/1116** | Hedef ≥ 558 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1116 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1116 | | |
| Gemini | | /1116 | | |
| Perplexity | | /1116 | | |
| Bing Copilot | | /1116 | | |
| **Ortalama** | | **/1116** | | Hedef ≥ 837 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
