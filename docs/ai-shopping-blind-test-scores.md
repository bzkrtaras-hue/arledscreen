# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **368/735** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **552/735**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (245 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 245 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /735.

| Model | Tarih | Konum | Incognito | Skor /735 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /735 | |
| Gemini | | | | /735 | |
| Perplexity | | | | /735 | |
| Bing Copilot | | | | /735 | |
| **Ortalama** | | | | **/735** | Hedef ≥ 368 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /735 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /735 | | |
| Gemini | | /735 | | |
| Perplexity | | /735 | | |
| Bing Copilot | | /735 | | |
| **Ortalama** | | **/735** | | Hedef ≥ 552 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
