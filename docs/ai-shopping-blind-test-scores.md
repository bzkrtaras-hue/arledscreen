# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **413/825** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **619/825**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (275 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 275 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /825.

| Model | Tarih | Konum | Incognito | Skor /825 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /825 | |
| Gemini | | | | /825 | |
| Perplexity | | | | /825 | |
| Bing Copilot | | | | /825 | |
| **Ortalama** | | | | **/825** | Hedef ≥ 413 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /825 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /825 | | |
| Gemini | | /825 | | |
| Perplexity | | /825 | | |
| Bing Copilot | | /825 | | |
| **Ortalama** | | **/825** | | Hedef ≥ 619 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
