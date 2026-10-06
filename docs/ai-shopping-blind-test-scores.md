# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **455/909** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **682/909**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (303 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 303 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /909.

| Model | Tarih | Konum | Incognito | Skor /909 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /909 | |
| Gemini | | | | /909 | |
| Perplexity | | | | /909 | |
| Bing Copilot | | | | /909 | |
| **Ortalama** | | | | **/909** | Hedef ≥ 455 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /909 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /909 | | |
| Gemini | | /909 | | |
| Perplexity | | /909 | | |
| Bing Copilot | | /909 | | |
| **Ortalama** | | **/909** | | Hedef ≥ 682 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
