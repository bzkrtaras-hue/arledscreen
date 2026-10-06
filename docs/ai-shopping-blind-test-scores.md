# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **275/549** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **412/549**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (183 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 183 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /549.

| Model | Tarih | Konum | Incognito | Skor /549 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /549 | |
| Gemini | | | | /549 | |
| Perplexity | | | | /549 | |
| Bing Copilot | | | | /549 | |
| **Ortalama** | | | | **/549** | Hedef ≥ 275 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /549 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /549 | | |
| Gemini | | /549 | | |
| Perplexity | | /549 | | |
| Bing Copilot | | /549 | | |
| **Ortalama** | | **/549** | | Hedef ≥ 412 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
