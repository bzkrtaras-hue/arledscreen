# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **542/1083** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **813/1083**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (361 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 361 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1083.

| Model | Tarih | Konum | Incognito | Skor /1083 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1083 | |
| Gemini | | | | /1083 | |
| Perplexity | | | | /1083 | |
| Bing Copilot | | | | /1083 | |
| **Ortalama** | | | | **/1083** | Hedef ≥ 542 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1083 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1083 | | |
| Gemini | | /1083 | | |
| Perplexity | | /1083 | | |
| Bing Copilot | | /1083 | | |
| **Ortalama** | | **/1083** | | Hedef ≥ 813 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
