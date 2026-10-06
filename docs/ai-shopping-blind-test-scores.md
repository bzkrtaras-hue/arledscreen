# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **192/384** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **288/384**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (128 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 128 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /384.

| Model | Tarih | Konum | Incognito | Skor /384 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /384 | |
| Gemini | | | | /384 | |
| Perplexity | | | | /384 | |
| Bing Copilot | | | | /384 | |
| **Ortalama** | | | | **/384** | Hedef ≥ 192 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /384 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /384 | | |
| Gemini | | /384 | | |
| Perplexity | | /384 | | |
| Bing Copilot | | /384 | | |
| **Ortalama** | | **/384** | | Hedef ≥ 288 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
