# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **324/648** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **486/648**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (216 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 216 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /648.

| Model | Tarih | Konum | Incognito | Skor /648 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /648 | |
| Gemini | | | | /648 | |
| Perplexity | | | | /648 | |
| Bing Copilot | | | | /648 | |
| **Ortalama** | | | | **/648** | Hedef ≥ 324 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /648 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /648 | | |
| Gemini | | /648 | | |
| Perplexity | | /648 | | |
| Bing Copilot | | /648 | | |
| **Ortalama** | | **/648** | | Hedef ≥ 486 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
