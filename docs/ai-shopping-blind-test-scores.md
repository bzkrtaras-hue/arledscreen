# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **407/813** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **610/813**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (271 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 271 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /813.

| Model | Tarih | Konum | Incognito | Skor /813 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /813 | |
| Gemini | | | | /813 | |
| Perplexity | | | | /813 | |
| Bing Copilot | | | | /813 | |
| **Ortalama** | | | | **/813** | Hedef ≥ 407 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /813 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /813 | | |
| Gemini | | /813 | | |
| Perplexity | | /813 | | |
| Bing Copilot | | /813 | | |
| **Ortalama** | | **/813** | | Hedef ≥ 610 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
