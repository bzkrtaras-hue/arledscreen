# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **141/282** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **212/282**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (94 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 94 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /282.

| Model | Tarih | Konum | Incognito | Skor /282 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /282 | |
| Gemini | | | | /282 | |
| Perplexity | | | | /282 | |
| Bing Copilot | | | | /282 | |
| **Ortalama** | | | | **/282** | Hedef ≥ 141 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /282 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /282 | | |
| Gemini | | /282 | | |
| Perplexity | | /282 | | |
| Bing Copilot | | /282 | | |
| **Ortalama** | | **/282** | | Hedef ≥ 212 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
