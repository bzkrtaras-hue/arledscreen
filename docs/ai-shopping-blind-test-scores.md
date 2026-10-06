# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **464/927** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **696/927**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (309 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 309 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /927.

| Model | Tarih | Konum | Incognito | Skor /927 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /927 | |
| Gemini | | | | /927 | |
| Perplexity | | | | /927 | |
| Bing Copilot | | | | /927 | |
| **Ortalama** | | | | **/927** | Hedef ≥ 464 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /927 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /927 | | |
| Gemini | | /927 | | |
| Perplexity | | /927 | | |
| Bing Copilot | | /927 | | |
| **Ortalama** | | **/927** | | Hedef ≥ 696 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
