# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **101/201** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **151/201**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (67 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 67 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /201.

| Model | Tarih | Konum | Incognito | Skor /201 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /201 | |
| Gemini | | | | /201 | |
| Perplexity | | | | /201 | |
| Bing Copilot | | | | /201 | |
| **Ortalama** | | | | **/201** | Hedef ≥ 101 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /201 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /201 | | |
| Gemini | | /201 | | |
| Perplexity | | /201 | | |
| Bing Copilot | | /201 | | |
| **Ortalama** | | **/201** | | Hedef ≥ 151 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
