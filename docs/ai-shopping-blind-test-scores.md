# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **93/186** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **140/186**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (62 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 62 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /186.

| Model | Tarih | Konum | Incognito | Skor /186 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /186 | |
| Gemini | | | | /186 | |
| Perplexity | | | | /186 | |
| Bing Copilot | | | | /186 | |
| **Ortalama** | | | | **/186** | Hedef ≥ 93 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /186 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /186 | | |
| Gemini | | /186 | | |
| Perplexity | | /186 | | |
| Bing Copilot | | /186 | | |
| **Ortalama** | | **/186** | | Hedef ≥ 140 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
