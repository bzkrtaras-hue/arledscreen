# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **390/780** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **585/780**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (260 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 260 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /780.

| Model | Tarih | Konum | Incognito | Skor /780 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /780 | |
| Gemini | | | | /780 | |
| Perplexity | | | | /780 | |
| Bing Copilot | | | | /780 | |
| **Ortalama** | | | | **/780** | Hedef ≥ 390 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /780 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /780 | | |
| Gemini | | /780 | | |
| Perplexity | | /780 | | |
| Bing Copilot | | /780 | | |
| **Ortalama** | | **/780** | | Hedef ≥ 585 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
