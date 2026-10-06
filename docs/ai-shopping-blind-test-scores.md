# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **396/792** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **594/792**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (264 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 264 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /792.

| Model | Tarih | Konum | Incognito | Skor /792 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /792 | |
| Gemini | | | | /792 | |
| Perplexity | | | | /792 | |
| Bing Copilot | | | | /792 | |
| **Ortalama** | | | | **/792** | Hedef ≥ 396 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /792 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /792 | | |
| Gemini | | /792 | | |
| Perplexity | | /792 | | |
| Bing Copilot | | /792 | | |
| **Ortalama** | | **/792** | | Hedef ≥ 594 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
