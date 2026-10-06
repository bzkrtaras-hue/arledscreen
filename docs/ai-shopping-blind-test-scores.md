# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **120/240** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **180/240**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (80 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 80 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /240.

| Model | Tarih | Konum | Incognito | Skor /240 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /240 | |
| Gemini | | | | /240 | |
| Perplexity | | | | /240 | |
| Bing Copilot | | | | /240 | |
| **Ortalama** | | | | **/240** | Hedef ≥ 120 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /240 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /240 | | |
| Gemini | | /240 | | |
| Perplexity | | /240 | | |
| Bing Copilot | | /240 | | |
| **Ortalama** | | **/240** | | Hedef ≥ 180 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
