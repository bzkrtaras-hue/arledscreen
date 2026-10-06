# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **264/528** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **396/528**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (176 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 176 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /528.

| Model | Tarih | Konum | Incognito | Skor /528 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /528 | |
| Gemini | | | | /528 | |
| Perplexity | | | | /528 | |
| Bing Copilot | | | | /528 | |
| **Ortalama** | | | | **/528** | Hedef ≥ 264 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /528 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /528 | | |
| Gemini | | /528 | | |
| Perplexity | | /528 | | |
| Bing Copilot | | /528 | | |
| **Ortalama** | | **/528** | | Hedef ≥ 396 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
