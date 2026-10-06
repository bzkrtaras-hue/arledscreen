# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **609/1218** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **914/1218**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (406 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 406 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1218.

| Model | Tarih | Konum | Incognito | Skor /1218 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1218 | |
| Gemini | | | | /1218 | |
| Perplexity | | | | /1218 | |
| Bing Copilot | | | | /1218 | |
| **Ortalama** | | | | **/1218** | Hedef ≥ 609 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1218 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1218 | | |
| Gemini | | /1218 | | |
| Perplexity | | /1218 | | |
| Bing Copilot | | /1218 | | |
| **Ortalama** | | **/1218** | | Hedef ≥ 914 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
