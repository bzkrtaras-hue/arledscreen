# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **588/1176** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **882/1176**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (392 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 392 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1176.

| Model | Tarih | Konum | Incognito | Skor /1176 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1176 | |
| Gemini | | | | /1176 | |
| Perplexity | | | | /1176 | |
| Bing Copilot | | | | /1176 | |
| **Ortalama** | | | | **/1176** | Hedef ≥ 588 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1176 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1176 | | |
| Gemini | | /1176 | | |
| Perplexity | | /1176 | | |
| Bing Copilot | | /1176 | | |
| **Ortalama** | | **/1176** | | Hedef ≥ 882 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
