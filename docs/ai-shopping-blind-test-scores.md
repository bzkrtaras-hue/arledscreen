# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **566/1131** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **849/1131**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (377 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 377 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1131.

| Model | Tarih | Konum | Incognito | Skor /1131 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1131 | |
| Gemini | | | | /1131 | |
| Perplexity | | | | /1131 | |
| Bing Copilot | | | | /1131 | |
| **Ortalama** | | | | **/1131** | Hedef ≥ 566 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1131 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1131 | | |
| Gemini | | /1131 | | |
| Perplexity | | /1131 | | |
| Bing Copilot | | /1131 | | |
| **Ortalama** | | **/1131** | | Hedef ≥ 849 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
