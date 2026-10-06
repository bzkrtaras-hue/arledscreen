# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **548/1095** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **822/1095**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (365 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 365 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1095.

| Model | Tarih | Konum | Incognito | Skor /1095 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1095 | |
| Gemini | | | | /1095 | |
| Perplexity | | | | /1095 | |
| Bing Copilot | | | | /1095 | |
| **Ortalama** | | | | **/1095** | Hedef ≥ 548 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1095 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1095 | | |
| Gemini | | /1095 | | |
| Perplexity | | /1095 | | |
| Bing Copilot | | /1095 | | |
| **Ortalama** | | **/1095** | | Hedef ≥ 822 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
