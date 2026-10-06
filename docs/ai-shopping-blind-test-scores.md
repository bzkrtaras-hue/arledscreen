# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **449/897** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **673/897**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (299 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 299 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /897.

| Model | Tarih | Konum | Incognito | Skor /897 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /897 | |
| Gemini | | | | /897 | |
| Perplexity | | | | /897 | |
| Bing Copilot | | | | /897 | |
| **Ortalama** | | | | **/897** | Hedef ≥ 449 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /897 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /897 | | |
| Gemini | | /897 | | |
| Perplexity | | /897 | | |
| Bing Copilot | | /897 | | |
| **Ortalama** | | **/897** | | Hedef ≥ 673 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
