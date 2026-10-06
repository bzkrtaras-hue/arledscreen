# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **315/630** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **473/630**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (210 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 210 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /630.

| Model | Tarih | Konum | Incognito | Skor /630 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /630 | |
| Gemini | | | | /630 | |
| Perplexity | | | | /630 | |
| Bing Copilot | | | | /630 | |
| **Ortalama** | | | | **/630** | Hedef ≥ 315 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /630 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /630 | | |
| Gemini | | /630 | | |
| Perplexity | | /630 | | |
| Bing Copilot | | /630 | | |
| **Ortalama** | | **/630** | | Hedef ≥ 473 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
