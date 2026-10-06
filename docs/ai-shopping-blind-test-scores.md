# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **329/657** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **493/657**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (219 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 219 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /657.

| Model | Tarih | Konum | Incognito | Skor /657 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /657 | |
| Gemini | | | | /657 | |
| Perplexity | | | | /657 | |
| Bing Copilot | | | | /657 | |
| **Ortalama** | | | | **/657** | Hedef ≥ 329 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /657 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /657 | | |
| Gemini | | /657 | | |
| Perplexity | | /657 | | |
| Bing Copilot | | /657 | | |
| **Ortalama** | | **/657** | | Hedef ≥ 493 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
