# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **252/504** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **378/504**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (168 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 168 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /504.

| Model | Tarih | Konum | Incognito | Skor /504 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /504 | |
| Gemini | | | | /504 | |
| Perplexity | | | | /504 | |
| Bing Copilot | | | | /504 | |
| **Ortalama** | | | | **/504** | Hedef ≥ 252 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /504 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /504 | | |
| Gemini | | /504 | | |
| Perplexity | | /504 | | |
| Bing Copilot | | /504 | | |
| **Ortalama** | | **/504** | | Hedef ≥ 378 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
