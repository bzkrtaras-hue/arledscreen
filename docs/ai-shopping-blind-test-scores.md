# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **164/327** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **246/327**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (109 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 109 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /327.

| Model | Tarih | Konum | Incognito | Skor /327 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /327 | |
| Gemini | | | | /327 | |
| Perplexity | | | | /327 | |
| Bing Copilot | | | | /327 | |
| **Ortalama** | | | | **/327** | Hedef ≥ 164 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /327 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /327 | | |
| Gemini | | /327 | | |
| Perplexity | | /327 | | |
| Bing Copilot | | /327 | | |
| **Ortalama** | | **/327** | | Hedef ≥ 246 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
