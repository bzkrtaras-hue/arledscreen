# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **179/357** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **268/357**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (119 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 119 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /357.

| Model | Tarih | Konum | Incognito | Skor /357 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /357 | |
| Gemini | | | | /357 | |
| Perplexity | | | | /357 | |
| Bing Copilot | | | | /357 | |
| **Ortalama** | | | | **/357** | Hedef ≥ 179 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /357 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /357 | | |
| Gemini | | /357 | | |
| Perplexity | | /357 | | |
| Bing Copilot | | /357 | | |
| **Ortalama** | | **/357** | | Hedef ≥ 268 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
