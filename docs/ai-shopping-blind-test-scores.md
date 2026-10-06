# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **419/837** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **628/837**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (279 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 279 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /837.

| Model | Tarih | Konum | Incognito | Skor /837 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /837 | |
| Gemini | | | | /837 | |
| Perplexity | | | | /837 | |
| Bing Copilot | | | | /837 | |
| **Ortalama** | | | | **/837** | Hedef ≥ 419 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /837 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /837 | | |
| Gemini | | /837 | | |
| Perplexity | | /837 | | |
| Bing Copilot | | /837 | | |
| **Ortalama** | | **/837** | | Hedef ≥ 628 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
