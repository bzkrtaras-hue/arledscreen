# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **344/687** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **516/687**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (229 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 229 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /687.

| Model | Tarih | Konum | Incognito | Skor /687 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /687 | |
| Gemini | | | | /687 | |
| Perplexity | | | | /687 | |
| Bing Copilot | | | | /687 | |
| **Ortalama** | | | | **/687** | Hedef ≥ 344 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /687 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /687 | | |
| Gemini | | /687 | | |
| Perplexity | | /687 | | |
| Bing Copilot | | /687 | | |
| **Ortalama** | | **/687** | | Hedef ≥ 516 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
