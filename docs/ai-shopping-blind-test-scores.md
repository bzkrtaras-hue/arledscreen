# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **237/474** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **356/474**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (158 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 158 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /474.

| Model | Tarih | Konum | Incognito | Skor /474 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /474 | |
| Gemini | | | | /474 | |
| Perplexity | | | | /474 | |
| Bing Copilot | | | | /474 | |
| **Ortalama** | | | | **/474** | Hedef ≥ 237 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /474 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /474 | | |
| Gemini | | /474 | | |
| Perplexity | | /474 | | |
| Bing Copilot | | /474 | | |
| **Ortalama** | | **/474** | | Hedef ≥ 356 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
