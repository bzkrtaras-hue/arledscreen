# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **380/759** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **570/759**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (253 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 253 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /759.

| Model | Tarih | Konum | Incognito | Skor /759 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /759 | |
| Gemini | | | | /759 | |
| Perplexity | | | | /759 | |
| Bing Copilot | | | | /759 | |
| **Ortalama** | | | | **/759** | Hedef ≥ 380 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /759 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /759 | | |
| Gemini | | /759 | | |
| Perplexity | | /759 | | |
| Bing Copilot | | /759 | | |
| **Ortalama** | | **/759** | | Hedef ≥ 570 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
