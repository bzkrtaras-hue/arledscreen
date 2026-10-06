# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **174/348** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **261/348**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (116 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 116 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /348.

| Model | Tarih | Konum | Incognito | Skor /348 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /348 | |
| Gemini | | | | /348 | |
| Perplexity | | | | /348 | |
| Bing Copilot | | | | /348 | |
| **Ortalama** | | | | **/348** | Hedef ≥ 174 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /348 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /348 | | |
| Gemini | | /348 | | |
| Perplexity | | /348 | | |
| Bing Copilot | | /348 | | |
| **Ortalama** | | **/348** | | Hedef ≥ 261 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
