# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **503/1005** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **754/1005**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (335 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 335 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1005.

| Model | Tarih | Konum | Incognito | Skor /1005 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1005 | |
| Gemini | | | | /1005 | |
| Perplexity | | | | /1005 | |
| Bing Copilot | | | | /1005 | |
| **Ortalama** | | | | **/1005** | Hedef ≥ 503 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1005 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1005 | | |
| Gemini | | /1005 | | |
| Perplexity | | /1005 | | |
| Bing Copilot | | /1005 | | |
| **Ortalama** | | **/1005** | | Hedef ≥ 754 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
