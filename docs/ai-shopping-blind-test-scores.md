# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **239/477** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **358/477**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (159 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 159 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /477.

| Model | Tarih | Konum | Incognito | Skor /477 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /477 | |
| Gemini | | | | /477 | |
| Perplexity | | | | /477 | |
| Bing Copilot | | | | /477 | |
| **Ortalama** | | | | **/477** | Hedef ≥ 239 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /477 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /477 | | |
| Gemini | | /477 | | |
| Perplexity | | /477 | | |
| Bing Copilot | | /477 | | |
| **Ortalama** | | **/477** | | Hedef ≥ 358 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
