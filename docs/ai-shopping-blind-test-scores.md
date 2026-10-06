# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **408/816** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **612/816**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (272 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 272 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /816.

| Model | Tarih | Konum | Incognito | Skor /816 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /816 | |
| Gemini | | | | /816 | |
| Perplexity | | | | /816 | |
| Bing Copilot | | | | /816 | |
| **Ortalama** | | | | **/816** | Hedef ≥ 408 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /816 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /816 | | |
| Gemini | | /816 | | |
| Perplexity | | /816 | | |
| Bing Copilot | | /816 | | |
| **Ortalama** | | **/816** | | Hedef ≥ 612 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
