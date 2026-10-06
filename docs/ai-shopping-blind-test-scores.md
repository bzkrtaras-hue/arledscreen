# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **401/801** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **601/801**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (267 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 267 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /801.

| Model | Tarih | Konum | Incognito | Skor /801 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /801 | |
| Gemini | | | | /801 | |
| Perplexity | | | | /801 | |
| Bing Copilot | | | | /801 | |
| **Ortalama** | | | | **/801** | Hedef ≥ 401 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /801 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /801 | | |
| Gemini | | /801 | | |
| Perplexity | | /801 | | |
| Bing Copilot | | /801 | | |
| **Ortalama** | | **/801** | | Hedef ≥ 601 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
