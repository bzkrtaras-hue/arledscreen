# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **248/495** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **372/495**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (165 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 165 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /495.

| Model | Tarih | Konum | Incognito | Skor /495 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /495 | |
| Gemini | | | | /495 | |
| Perplexity | | | | /495 | |
| Bing Copilot | | | | /495 | |
| **Ortalama** | | | | **/495** | Hedef ≥ 248 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /495 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /495 | | |
| Gemini | | /495 | | |
| Perplexity | | /495 | | |
| Bing Copilot | | /495 | | |
| **Ortalama** | | **/495** | | Hedef ≥ 372 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
