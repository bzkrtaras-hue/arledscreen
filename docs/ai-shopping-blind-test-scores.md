# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **185/369** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **277/369**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (123 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 123 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /369.

| Model | Tarih | Konum | Incognito | Skor /369 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /369 | |
| Gemini | | | | /369 | |
| Perplexity | | | | /369 | |
| Bing Copilot | | | | /369 | |
| **Ortalama** | | | | **/369** | Hedef ≥ 185 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /369 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /369 | | |
| Gemini | | /369 | | |
| Perplexity | | /369 | | |
| Bing Copilot | | /369 | | |
| **Ortalama** | | **/369** | | Hedef ≥ 277 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
