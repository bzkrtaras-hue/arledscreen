# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **165/330** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **248/330**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (110 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 110 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /330.

| Model | Tarih | Konum | Incognito | Skor /330 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /330 | |
| Gemini | | | | /330 | |
| Perplexity | | | | /330 | |
| Bing Copilot | | | | /330 | |
| **Ortalama** | | | | **/330** | Hedef ≥ 165 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /330 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /330 | | |
| Gemini | | /330 | | |
| Perplexity | | /330 | | |
| Bing Copilot | | /330 | | |
| **Ortalama** | | **/330** | | Hedef ≥ 248 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
