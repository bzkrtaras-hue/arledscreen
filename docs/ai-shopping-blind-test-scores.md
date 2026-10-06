# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **483/966** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **725/966**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (322 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 322 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /966.

| Model | Tarih | Konum | Incognito | Skor /966 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /966 | |
| Gemini | | | | /966 | |
| Perplexity | | | | /966 | |
| Bing Copilot | | | | /966 | |
| **Ortalama** | | | | **/966** | Hedef ≥ 483 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /966 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /966 | | |
| Gemini | | /966 | | |
| Perplexity | | /966 | | |
| Bing Copilot | | /966 | | |
| **Ortalama** | | **/966** | | Hedef ≥ 725 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
