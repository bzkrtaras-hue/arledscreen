# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **126/252** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **189/252**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (84 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 84 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /252.

| Model | Tarih | Konum | Incognito | Skor /252 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /252 | |
| Gemini | | | | /252 | |
| Perplexity | | | | /252 | |
| Bing Copilot | | | | /252 | |
| **Ortalama** | | | | **/252** | Hedef ≥ 126 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /252 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /252 | | |
| Gemini | | /252 | | |
| Perplexity | | /252 | | |
| Bing Copilot | | /252 | | |
| **Ortalama** | | **/252** | | Hedef ≥ 189 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
