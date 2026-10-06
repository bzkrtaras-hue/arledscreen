# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **296/591** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **444/591**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (197 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 197 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /591.

| Model | Tarih | Konum | Incognito | Skor /591 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /591 | |
| Gemini | | | | /591 | |
| Perplexity | | | | /591 | |
| Bing Copilot | | | | /591 | |
| **Ortalama** | | | | **/591** | Hedef ≥ 296 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /591 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /591 | | |
| Gemini | | /591 | | |
| Perplexity | | /591 | | |
| Bing Copilot | | /591 | | |
| **Ortalama** | | **/591** | | Hedef ≥ 444 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
