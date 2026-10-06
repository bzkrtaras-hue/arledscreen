# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **546/1092** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **819/1092**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (364 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 364 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1092.

| Model | Tarih | Konum | Incognito | Skor /1092 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1092 | |
| Gemini | | | | /1092 | |
| Perplexity | | | | /1092 | |
| Bing Copilot | | | | /1092 | |
| **Ortalama** | | | | **/1092** | Hedef ≥ 546 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1092 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1092 | | |
| Gemini | | /1092 | | |
| Perplexity | | /1092 | | |
| Bing Copilot | | /1092 | | |
| **Ortalama** | | **/1092** | | Hedef ≥ 819 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
