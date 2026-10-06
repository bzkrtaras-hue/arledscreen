# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **195/390** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **293/390**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (130 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 130 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /390.

| Model | Tarih | Konum | Incognito | Skor /390 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /390 | |
| Gemini | | | | /390 | |
| Perplexity | | | | /390 | |
| Bing Copilot | | | | /390 | |
| **Ortalama** | | | | **/390** | Hedef ≥ 195 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /390 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /390 | | |
| Gemini | | /390 | | |
| Perplexity | | /390 | | |
| Bing Copilot | | /390 | | |
| **Ortalama** | | **/390** | | Hedef ≥ 293 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
