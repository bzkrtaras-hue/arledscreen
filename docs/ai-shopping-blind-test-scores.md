# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **204/408** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **306/408**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (136 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 136 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /408.

| Model | Tarih | Konum | Incognito | Skor /408 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /408 | |
| Gemini | | | | /408 | |
| Perplexity | | | | /408 | |
| Bing Copilot | | | | /408 | |
| **Ortalama** | | | | **/408** | Hedef ≥ 204 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /408 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /408 | | |
| Gemini | | /408 | | |
| Perplexity | | /408 | | |
| Bing Copilot | | /408 | | |
| **Ortalama** | | **/408** | | Hedef ≥ 306 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
