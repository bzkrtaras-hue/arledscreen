# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **420/840** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **630/840**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (280 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 280 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /840.

| Model | Tarih | Konum | Incognito | Skor /840 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /840 | |
| Gemini | | | | /840 | |
| Perplexity | | | | /840 | |
| Bing Copilot | | | | /840 | |
| **Ortalama** | | | | **/840** | Hedef ≥ 420 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /840 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /840 | | |
| Gemini | | /840 | | |
| Perplexity | | /840 | | |
| Bing Copilot | | /840 | | |
| **Ortalama** | | **/840** | | Hedef ≥ 630 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
