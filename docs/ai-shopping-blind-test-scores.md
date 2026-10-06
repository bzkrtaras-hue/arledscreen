# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **441/882** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **662/882**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (294 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 294 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /882.

| Model | Tarih | Konum | Incognito | Skor /882 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /882 | |
| Gemini | | | | /882 | |
| Perplexity | | | | /882 | |
| Bing Copilot | | | | /882 | |
| **Ortalama** | | | | **/882** | Hedef ≥ 441 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /882 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /882 | | |
| Gemini | | /882 | | |
| Perplexity | | /882 | | |
| Bing Copilot | | /882 | | |
| **Ortalama** | | **/882** | | Hedef ≥ 662 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
