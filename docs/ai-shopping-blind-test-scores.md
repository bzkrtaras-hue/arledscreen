# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **300/600** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **450/600**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (200 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 200 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /600.

| Model | Tarih | Konum | Incognito | Skor /600 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /600 | |
| Gemini | | | | /600 | |
| Perplexity | | | | /600 | |
| Bing Copilot | | | | /600 | |
| **Ortalama** | | | | **/600** | Hedef ≥ 300 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /600 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /600 | | |
| Gemini | | /600 | | |
| Perplexity | | /600 | | |
| Bing Copilot | | /600 | | |
| **Ortalama** | | **/600** | | Hedef ≥ 450 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
