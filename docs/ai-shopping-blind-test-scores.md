# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **522/1044** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **783/1044**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (348 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 348 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1044.

| Model | Tarih | Konum | Incognito | Skor /1044 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1044 | |
| Gemini | | | | /1044 | |
| Perplexity | | | | /1044 | |
| Bing Copilot | | | | /1044 | |
| **Ortalama** | | | | **/1044** | Hedef ≥ 522 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1044 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1044 | | |
| Gemini | | /1044 | | |
| Perplexity | | /1044 | | |
| Bing Copilot | | /1044 | | |
| **Ortalama** | | **/1044** | | Hedef ≥ 783 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
