# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **387/774** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **581/774**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (258 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 258 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /774.

| Model | Tarih | Konum | Incognito | Skor /774 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /774 | |
| Gemini | | | | /774 | |
| Perplexity | | | | /774 | |
| Bing Copilot | | | | /774 | |
| **Ortalama** | | | | **/774** | Hedef ≥ 387 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /774 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /774 | | |
| Gemini | | /774 | | |
| Perplexity | | /774 | | |
| Bing Copilot | | /774 | | |
| **Ortalama** | | **/774** | | Hedef ≥ 581 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
