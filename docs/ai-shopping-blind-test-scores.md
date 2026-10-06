# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **398/795** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **597/795**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (265 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 265 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /795.

| Model | Tarih | Konum | Incognito | Skor /795 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /795 | |
| Gemini | | | | /795 | |
| Perplexity | | | | /795 | |
| Bing Copilot | | | | /795 | |
| **Ortalama** | | | | **/795** | Hedef ≥ 398 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /795 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /795 | | |
| Gemini | | /795 | | |
| Perplexity | | /795 | | |
| Bing Copilot | | /795 | | |
| **Ortalama** | | **/795** | | Hedef ≥ 597 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
