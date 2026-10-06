# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **570/1140** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **855/1140**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (380 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 380 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1140.

| Model | Tarih | Konum | Incognito | Skor /1140 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1140 | |
| Gemini | | | | /1140 | |
| Perplexity | | | | /1140 | |
| Bing Copilot | | | | /1140 | |
| **Ortalama** | | | | **/1140** | Hedef ≥ 570 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1140 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1140 | | |
| Gemini | | /1140 | | |
| Perplexity | | /1140 | | |
| Bing Copilot | | /1140 | | |
| **Ortalama** | | **/1140** | | Hedef ≥ 855 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
