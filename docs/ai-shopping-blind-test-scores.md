# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **567/1134** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **851/1134**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (378 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 378 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1134.

| Model | Tarih | Konum | Incognito | Skor /1134 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1134 | |
| Gemini | | | | /1134 | |
| Perplexity | | | | /1134 | |
| Bing Copilot | | | | /1134 | |
| **Ortalama** | | | | **/1134** | Hedef ≥ 567 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1134 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1134 | | |
| Gemini | | /1134 | | |
| Perplexity | | /1134 | | |
| Bing Copilot | | /1134 | | |
| **Ortalama** | | **/1134** | | Hedef ≥ 851 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
