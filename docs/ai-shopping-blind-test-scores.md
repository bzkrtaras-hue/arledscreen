# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **459/918** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **689/918**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (306 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 306 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /918.

| Model | Tarih | Konum | Incognito | Skor /918 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /918 | |
| Gemini | | | | /918 | |
| Perplexity | | | | /918 | |
| Bing Copilot | | | | /918 | |
| **Ortalama** | | | | **/918** | Hedef ≥ 459 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /918 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /918 | | |
| Gemini | | /918 | | |
| Perplexity | | /918 | | |
| Bing Copilot | | /918 | | |
| **Ortalama** | | **/918** | | Hedef ≥ 689 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
