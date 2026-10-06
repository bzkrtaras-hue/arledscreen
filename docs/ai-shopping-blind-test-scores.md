# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **168/336** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **252/336**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (112 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 112 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /336.

| Model | Tarih | Konum | Incognito | Skor /336 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /336 | |
| Gemini | | | | /336 | |
| Perplexity | | | | /336 | |
| Bing Copilot | | | | /336 | |
| **Ortalama** | | | | **/336** | Hedef ≥ 168 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /336 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /336 | | |
| Gemini | | /336 | | |
| Perplexity | | /336 | | |
| Bing Copilot | | /336 | | |
| **Ortalama** | | **/336** | | Hedef ≥ 252 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
