# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **531/1062** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **797/1062**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (354 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 354 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1062.

| Model | Tarih | Konum | Incognito | Skor /1062 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1062 | |
| Gemini | | | | /1062 | |
| Perplexity | | | | /1062 | |
| Bing Copilot | | | | /1062 | |
| **Ortalama** | | | | **/1062** | Hedef ≥ 531 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1062 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1062 | | |
| Gemini | | /1062 | | |
| Perplexity | | /1062 | | |
| Bing Copilot | | /1062 | | |
| **Ortalama** | | **/1062** | | Hedef ≥ 797 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
