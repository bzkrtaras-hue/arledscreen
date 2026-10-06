# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **543/1086** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **815/1086**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (362 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 362 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1086.

| Model | Tarih | Konum | Incognito | Skor /1086 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1086 | |
| Gemini | | | | /1086 | |
| Perplexity | | | | /1086 | |
| Bing Copilot | | | | /1086 | |
| **Ortalama** | | | | **/1086** | Hedef ≥ 543 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1086 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1086 | | |
| Gemini | | /1086 | | |
| Perplexity | | /1086 | | |
| Bing Copilot | | /1086 | | |
| **Ortalama** | | **/1086** | | Hedef ≥ 815 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
