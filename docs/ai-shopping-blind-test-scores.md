# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **411/822** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **617/822**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (274 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 274 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /822.

| Model | Tarih | Konum | Incognito | Skor /822 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /822 | |
| Gemini | | | | /822 | |
| Perplexity | | | | /822 | |
| Bing Copilot | | | | /822 | |
| **Ortalama** | | | | **/822** | Hedef ≥ 411 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /822 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /822 | | |
| Gemini | | /822 | | |
| Perplexity | | /822 | | |
| Bing Copilot | | /822 | | |
| **Ortalama** | | **/822** | | Hedef ≥ 617 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
