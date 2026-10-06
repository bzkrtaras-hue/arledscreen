# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **150/300** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **225/300**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (100 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 100 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /300.

| Model | Tarih | Konum | Incognito | Skor /300 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /300 | |
| Gemini | | | | /300 | |
| Perplexity | | | | /300 | |
| Bing Copilot | | | | /300 | |
| **Ortalama** | | | | **/300** | Hedef ≥ 150 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /300 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /300 | | |
| Gemini | | /300 | | |
| Perplexity | | /300 | | |
| Bing Copilot | | /300 | | |
| **Ortalama** | | **/300** | | Hedef ≥ 225 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
