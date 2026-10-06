# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **381/762** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **572/762**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (254 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 254 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /762.

| Model | Tarih | Konum | Incognito | Skor /762 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /762 | |
| Gemini | | | | /762 | |
| Perplexity | | | | /762 | |
| Bing Copilot | | | | /762 | |
| **Ortalama** | | | | **/762** | Hedef ≥ 381 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /762 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /762 | | |
| Gemini | | /762 | | |
| Perplexity | | /762 | | |
| Bing Copilot | | /762 | | |
| **Ortalama** | | **/762** | | Hedef ≥ 572 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
