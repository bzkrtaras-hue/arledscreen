# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **333/666** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **500/666**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (222 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 222 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /666.

| Model | Tarih | Konum | Incognito | Skor /666 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /666 | |
| Gemini | | | | /666 | |
| Perplexity | | | | /666 | |
| Bing Copilot | | | | /666 | |
| **Ortalama** | | | | **/666** | Hedef ≥ 333 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /666 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /666 | | |
| Gemini | | /666 | | |
| Perplexity | | /666 | | |
| Bing Copilot | | /666 | | |
| **Ortalama** | | **/666** | | Hedef ≥ 500 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
