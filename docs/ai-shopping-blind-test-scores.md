# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **273/546** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **410/546**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (182 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 182 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /546.

| Model | Tarih | Konum | Incognito | Skor /546 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /546 | |
| Gemini | | | | /546 | |
| Perplexity | | | | /546 | |
| Bing Copilot | | | | /546 | |
| **Ortalama** | | | | **/546** | Hedef ≥ 273 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /546 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /546 | | |
| Gemini | | /546 | | |
| Perplexity | | /546 | | |
| Bing Copilot | | /546 | | |
| **Ortalama** | | **/546** | | Hedef ≥ 410 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
