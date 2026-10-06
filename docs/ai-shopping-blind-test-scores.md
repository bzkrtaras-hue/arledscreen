# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **173/345** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **259/345**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (115 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 115 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /345.

| Model | Tarih | Konum | Incognito | Skor /345 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /345 | |
| Gemini | | | | /345 | |
| Perplexity | | | | /345 | |
| Bing Copilot | | | | /345 | |
| **Ortalama** | | | | **/345** | Hedef ≥ 173 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /345 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /345 | | |
| Gemini | | /345 | | |
| Perplexity | | /345 | | |
| Bing Copilot | | /345 | | |
| **Ortalama** | | **/345** | | Hedef ≥ 259 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
