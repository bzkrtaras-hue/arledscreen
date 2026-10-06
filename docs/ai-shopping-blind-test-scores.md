# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **158/315** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **237/315**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (105 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 105 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /315.

| Model | Tarih | Konum | Incognito | Skor /315 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /315 | |
| Gemini | | | | /315 | |
| Perplexity | | | | /315 | |
| Bing Copilot | | | | /315 | |
| **Ortalama** | | | | **/315** | Hedef ≥ 158 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /315 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /315 | | |
| Gemini | | /315 | | |
| Perplexity | | /315 | | |
| Bing Copilot | | /315 | | |
| **Ortalama** | | **/315** | | Hedef ≥ 237 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
