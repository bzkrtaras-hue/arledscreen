# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **206/411** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **309/411**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (137 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 137 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /411.

| Model | Tarih | Konum | Incognito | Skor /411 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /411 | |
| Gemini | | | | /411 | |
| Perplexity | | | | /411 | |
| Bing Copilot | | | | /411 | |
| **Ortalama** | | | | **/411** | Hedef ≥ 206 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /411 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /411 | | |
| Gemini | | /411 | | |
| Perplexity | | /411 | | |
| Bing Copilot | | /411 | | |
| **Ortalama** | | **/411** | | Hedef ≥ 309 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
