# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **599/1197** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **898/1197**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (399 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 399 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1197.

| Model | Tarih | Konum | Incognito | Skor /1197 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1197 | |
| Gemini | | | | /1197 | |
| Perplexity | | | | /1197 | |
| Bing Copilot | | | | /1197 | |
| **Ortalama** | | | | **/1197** | Hedef ≥ 599 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1197 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1197 | | |
| Gemini | | /1197 | | |
| Perplexity | | /1197 | | |
| Bing Copilot | | /1197 | | |
| **Ortalama** | | **/1197** | | Hedef ≥ 898 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
