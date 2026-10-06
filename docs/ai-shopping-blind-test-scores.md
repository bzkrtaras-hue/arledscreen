# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **437/873** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **655/873**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (291 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 291 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /873.

| Model | Tarih | Konum | Incognito | Skor /873 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /873 | |
| Gemini | | | | /873 | |
| Perplexity | | | | /873 | |
| Bing Copilot | | | | /873 | |
| **Ortalama** | | | | **/873** | Hedef ≥ 437 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /873 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /873 | | |
| Gemini | | /873 | | |
| Perplexity | | /873 | | |
| Bing Copilot | | /873 | | |
| **Ortalama** | | **/873** | | Hedef ≥ 655 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
