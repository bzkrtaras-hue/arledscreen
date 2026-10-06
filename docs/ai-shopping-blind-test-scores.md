# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **395/789** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **592/789**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (263 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 263 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /789.

| Model | Tarih | Konum | Incognito | Skor /789 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /789 | |
| Gemini | | | | /789 | |
| Perplexity | | | | /789 | |
| Bing Copilot | | | | /789 | |
| **Ortalama** | | | | **/789** | Hedef ≥ 395 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /789 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /789 | | |
| Gemini | | /789 | | |
| Perplexity | | /789 | | |
| Bing Copilot | | /789 | | |
| **Ortalama** | | **/789** | | Hedef ≥ 592 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
