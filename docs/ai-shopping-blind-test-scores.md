# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **323/645** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **484/645**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (215 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 215 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /645.

| Model | Tarih | Konum | Incognito | Skor /645 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /645 | |
| Gemini | | | | /645 | |
| Perplexity | | | | /645 | |
| Bing Copilot | | | | /645 | |
| **Ortalama** | | | | **/645** | Hedef ≥ 323 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /645 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /645 | | |
| Gemini | | /645 | | |
| Perplexity | | /645 | | |
| Bing Copilot | | /645 | | |
| **Ortalama** | | **/645** | | Hedef ≥ 484 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
