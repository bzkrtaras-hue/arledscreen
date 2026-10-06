# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **201/402** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **302/402**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (134 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 134 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /402.

| Model | Tarih | Konum | Incognito | Skor /402 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /402 | |
| Gemini | | | | /402 | |
| Perplexity | | | | /402 | |
| Bing Copilot | | | | /402 | |
| **Ortalama** | | | | **/402** | Hedef ≥ 201 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /402 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /402 | | |
| Gemini | | /402 | | |
| Perplexity | | /402 | | |
| Bing Copilot | | /402 | | |
| **Ortalama** | | **/402** | | Hedef ≥ 302 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
