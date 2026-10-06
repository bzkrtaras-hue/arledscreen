# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **458/915** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **687/915**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (305 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 305 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /915.

| Model | Tarih | Konum | Incognito | Skor /915 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /915 | |
| Gemini | | | | /915 | |
| Perplexity | | | | /915 | |
| Bing Copilot | | | | /915 | |
| **Ortalama** | | | | **/915** | Hedef ≥ 458 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /915 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /915 | | |
| Gemini | | /915 | | |
| Perplexity | | /915 | | |
| Bing Copilot | | /915 | | |
| **Ortalama** | | **/915** | | Hedef ≥ 687 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
