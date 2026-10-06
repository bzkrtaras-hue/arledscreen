# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **293/585** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **439/585**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (195 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 195 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /585.

| Model | Tarih | Konum | Incognito | Skor /585 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /585 | |
| Gemini | | | | /585 | |
| Perplexity | | | | /585 | |
| Bing Copilot | | | | /585 | |
| **Ortalama** | | | | **/585** | Hedef ≥ 293 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /585 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /585 | | |
| Gemini | | /585 | | |
| Perplexity | | /585 | | |
| Bing Copilot | | /585 | | |
| **Ortalama** | | **/585** | | Hedef ≥ 439 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
