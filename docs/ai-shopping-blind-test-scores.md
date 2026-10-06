# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **527/1053** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **790/1053**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (351 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 351 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1053.

| Model | Tarih | Konum | Incognito | Skor /1053 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1053 | |
| Gemini | | | | /1053 | |
| Perplexity | | | | /1053 | |
| Bing Copilot | | | | /1053 | |
| **Ortalama** | | | | **/1053** | Hedef ≥ 527 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1053 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1053 | | |
| Gemini | | /1053 | | |
| Perplexity | | /1053 | | |
| Bing Copilot | | /1053 | | |
| **Ortalama** | | **/1053** | | Hedef ≥ 790 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
