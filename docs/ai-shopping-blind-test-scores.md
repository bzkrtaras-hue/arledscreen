# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **521/1041** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **781/1041**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (347 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 347 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1041.

| Model | Tarih | Konum | Incognito | Skor /1041 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1041 | |
| Gemini | | | | /1041 | |
| Perplexity | | | | /1041 | |
| Bing Copilot | | | | /1041 | |
| **Ortalama** | | | | **/1041** | Hedef ≥ 521 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1041 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1041 | | |
| Gemini | | /1041 | | |
| Perplexity | | /1041 | | |
| Bing Copilot | | /1041 | | |
| **Ortalama** | | **/1041** | | Hedef ≥ 781 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
