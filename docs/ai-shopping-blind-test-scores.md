# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **434/867** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **651/867**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (289 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 289 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /867.

| Model | Tarih | Konum | Incognito | Skor /867 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /867 | |
| Gemini | | | | /867 | |
| Perplexity | | | | /867 | |
| Bing Copilot | | | | /867 | |
| **Ortalama** | | | | **/867** | Hedef ≥ 434 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /867 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /867 | | |
| Gemini | | /867 | | |
| Perplexity | | /867 | | |
| Bing Copilot | | /867 | | |
| **Ortalama** | | **/867** | | Hedef ≥ 651 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
