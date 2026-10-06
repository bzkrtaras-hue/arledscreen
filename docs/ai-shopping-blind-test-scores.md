# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **140/279** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **210/279**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (93 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 93 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /279.

| Model | Tarih | Konum | Incognito | Skor /279 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /279 | |
| Gemini | | | | /279 | |
| Perplexity | | | | /279 | |
| Bing Copilot | | | | /279 | |
| **Ortalama** | | | | **/279** | Hedef ≥ 140 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /279 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /279 | | |
| Gemini | | /279 | | |
| Perplexity | | /279 | | |
| Bing Copilot | | /279 | | |
| **Ortalama** | | **/279** | | Hedef ≥ 210 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
