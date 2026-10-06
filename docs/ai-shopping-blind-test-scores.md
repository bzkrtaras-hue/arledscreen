# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **308/615** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **462/615**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (205 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 205 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /615.

| Model | Tarih | Konum | Incognito | Skor /615 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /615 | |
| Gemini | | | | /615 | |
| Perplexity | | | | /615 | |
| Bing Copilot | | | | /615 | |
| **Ortalama** | | | | **/615** | Hedef ≥ 308 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /615 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /615 | | |
| Gemini | | /615 | | |
| Perplexity | | /615 | | |
| Bing Copilot | | /615 | | |
| **Ortalama** | | **/615** | | Hedef ≥ 462 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
