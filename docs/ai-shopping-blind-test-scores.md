# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **378/756** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **567/756**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (252 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 252 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /756.

| Model | Tarih | Konum | Incognito | Skor /756 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /756 | |
| Gemini | | | | /756 | |
| Perplexity | | | | /756 | |
| Bing Copilot | | | | /756 | |
| **Ortalama** | | | | **/756** | Hedef ≥ 378 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /756 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /756 | | |
| Gemini | | /756 | | |
| Perplexity | | /756 | | |
| Bing Copilot | | /756 | | |
| **Ortalama** | | **/756** | | Hedef ≥ 567 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
