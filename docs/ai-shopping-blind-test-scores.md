# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **405/810** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **608/810**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (270 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 270 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /810.

| Model | Tarih | Konum | Incognito | Skor /810 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /810 | |
| Gemini | | | | /810 | |
| Perplexity | | | | /810 | |
| Bing Copilot | | | | /810 | |
| **Ortalama** | | | | **/810** | Hedef ≥ 405 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /810 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /810 | | |
| Gemini | | /810 | | |
| Perplexity | | /810 | | |
| Bing Copilot | | /810 | | |
| **Ortalama** | | **/810** | | Hedef ≥ 608 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
