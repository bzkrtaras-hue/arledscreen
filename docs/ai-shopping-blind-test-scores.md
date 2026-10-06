# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **369/738** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **554/738**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (246 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 246 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /738.

| Model | Tarih | Konum | Incognito | Skor /738 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /738 | |
| Gemini | | | | /738 | |
| Perplexity | | | | /738 | |
| Bing Copilot | | | | /738 | |
| **Ortalama** | | | | **/738** | Hedef ≥ 369 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /738 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /738 | | |
| Gemini | | /738 | | |
| Perplexity | | /738 | | |
| Bing Copilot | | /738 | | |
| **Ortalama** | | **/738** | | Hedef ≥ 554 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
