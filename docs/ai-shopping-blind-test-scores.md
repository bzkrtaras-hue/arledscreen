# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **507/1014** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **761/1014**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (338 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 338 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1014.

| Model | Tarih | Konum | Incognito | Skor /1014 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1014 | |
| Gemini | | | | /1014 | |
| Perplexity | | | | /1014 | |
| Bing Copilot | | | | /1014 | |
| **Ortalama** | | | | **/1014** | Hedef ≥ 507 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1014 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1014 | | |
| Gemini | | /1014 | | |
| Perplexity | | /1014 | | |
| Bing Copilot | | /1014 | | |
| **Ortalama** | | **/1014** | | Hedef ≥ 761 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
