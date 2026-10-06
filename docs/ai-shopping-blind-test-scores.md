# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **576/1152** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **864/1152**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (384 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 384 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1152.

| Model | Tarih | Konum | Incognito | Skor /1152 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1152 | |
| Gemini | | | | /1152 | |
| Perplexity | | | | /1152 | |
| Bing Copilot | | | | /1152 | |
| **Ortalama** | | | | **/1152** | Hedef ≥ 576 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1152 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1152 | | |
| Gemini | | /1152 | | |
| Perplexity | | /1152 | | |
| Bing Copilot | | /1152 | | |
| **Ortalama** | | **/1152** | | Hedef ≥ 864 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
