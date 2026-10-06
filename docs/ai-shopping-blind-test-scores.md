# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **89/177** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **133/177**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (59 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 59 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /177.

| Model | Tarih | Konum | Incognito | Skor /177 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /177 | |
| Gemini | | | | /177 | |
| Perplexity | | | | /177 | |
| Bing Copilot | | | | /177 | |
| **Ortalama** | | | | **/177** | Hedef ≥ 89 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /177 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /177 | | |
| Gemini | | /177 | | |
| Perplexity | | /177 | | |
| Bing Copilot | | /177 | | |
| **Ortalama** | | **/177** | | Hedef ≥ 133 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
