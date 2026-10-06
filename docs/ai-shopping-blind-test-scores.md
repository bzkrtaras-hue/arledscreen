# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **320/639** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **480/639**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (213 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 213 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /639.

| Model | Tarih | Konum | Incognito | Skor /639 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /639 | |
| Gemini | | | | /639 | |
| Perplexity | | | | /639 | |
| Bing Copilot | | | | /639 | |
| **Ortalama** | | | | **/639** | Hedef ≥ 320 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /639 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /639 | | |
| Gemini | | /639 | | |
| Perplexity | | /639 | | |
| Bing Copilot | | /639 | | |
| **Ortalama** | | **/639** | | Hedef ≥ 480 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
