# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **159/318** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **239/318**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (106 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 106 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /318.

| Model | Tarih | Konum | Incognito | Skor /318 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /318 | |
| Gemini | | | | /318 | |
| Perplexity | | | | /318 | |
| Bing Copilot | | | | /318 | |
| **Ortalama** | | | | **/318** | Hedef ≥ 159 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /318 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /318 | | |
| Gemini | | /318 | | |
| Perplexity | | /318 | | |
| Bing Copilot | | /318 | | |
| **Ortalama** | | **/318** | | Hedef ≥ 239 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
