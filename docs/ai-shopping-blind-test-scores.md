# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **155/309** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **232/309**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (103 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 103 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /309.

| Model | Tarih | Konum | Incognito | Skor /309 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /309 | |
| Gemini | | | | /309 | |
| Perplexity | | | | /309 | |
| Bing Copilot | | | | /309 | |
| **Ortalama** | | | | **/309** | Hedef ≥ 155 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /309 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /309 | | |
| Gemini | | /309 | | |
| Perplexity | | /309 | | |
| Bing Copilot | | /309 | | |
| **Ortalama** | | **/309** | | Hedef ≥ 232 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
