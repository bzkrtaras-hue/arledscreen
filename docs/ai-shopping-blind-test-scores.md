# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **282/564** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **423/564**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (188 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 188 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /564.

| Model | Tarih | Konum | Incognito | Skor /564 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /564 | |
| Gemini | | | | /564 | |
| Perplexity | | | | /564 | |
| Bing Copilot | | | | /564 | |
| **Ortalama** | | | | **/564** | Hedef ≥ 282 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /564 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /564 | | |
| Gemini | | /564 | | |
| Perplexity | | /564 | | |
| Bing Copilot | | /564 | | |
| **Ortalama** | | **/564** | | Hedef ≥ 423 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
