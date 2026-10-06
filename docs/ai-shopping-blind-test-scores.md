# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **108/216** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **162/216**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (72 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 72 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /216.

| Model | Tarih | Konum | Incognito | Skor /216 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /216 | |
| Gemini | | | | /216 | |
| Perplexity | | | | /216 | |
| Bing Copilot | | | | /216 | |
| **Ortalama** | | | | **/216** | Hedef ≥ 108 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /216 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /216 | | |
| Gemini | | /216 | | |
| Perplexity | | /216 | | |
| Bing Copilot | | /216 | | |
| **Ortalama** | | **/216** | | Hedef ≥ 162 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |

