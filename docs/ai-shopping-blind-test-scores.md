# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **497/993** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **745/993**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (331 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 331 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /993.

| Model | Tarih | Konum | Incognito | Skor /993 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /993 | |
| Gemini | | | | /993 | |
| Perplexity | | | | /993 | |
| Bing Copilot | | | | /993 | |
| **Ortalama** | | | | **/993** | Hedef ≥ 497 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /993 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /993 | | |
| Gemini | | /993 | | |
| Perplexity | | /993 | | |
| Bing Copilot | | /993 | | |
| **Ortalama** | | **/993** | | Hedef ≥ 745 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
