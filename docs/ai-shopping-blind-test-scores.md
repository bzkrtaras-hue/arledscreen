# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **153/306** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **230/306**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (102 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 102 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /306.

| Model | Tarih | Konum | Incognito | Skor /306 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /306 | |
| Gemini | | | | /306 | |
| Perplexity | | | | /306 | |
| Bing Copilot | | | | /306 | |
| **Ortalama** | | | | **/306** | Hedef ≥ 153 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /306 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /306 | | |
| Gemini | | /306 | | |
| Perplexity | | /306 | | |
| Bing Copilot | | /306 | | |
| **Ortalama** | | **/306** | | Hedef ≥ 230 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |

