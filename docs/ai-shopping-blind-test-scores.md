# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **594/1188** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **891/1188**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (396 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 396 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1188.

| Model | Tarih | Konum | Incognito | Skor /1188 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1188 | |
| Gemini | | | | /1188 | |
| Perplexity | | | | /1188 | |
| Bing Copilot | | | | /1188 | |
| **Ortalama** | | | | **/1188** | Hedef ≥ 594 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1188 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1188 | | |
| Gemini | | /1188 | | |
| Perplexity | | /1188 | | |
| Bing Copilot | | /1188 | | |
| **Ortalama** | | **/1188** | | Hedef ≥ 891 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
