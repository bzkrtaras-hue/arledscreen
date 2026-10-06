# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **336/672** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **504/672**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (224 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 224 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /672.

| Model | Tarih | Konum | Incognito | Skor /672 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /672 | |
| Gemini | | | | /672 | |
| Perplexity | | | | /672 | |
| Bing Copilot | | | | /672 | |
| **Ortalama** | | | | **/672** | Hedef ≥ 336 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /672 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /672 | | |
| Gemini | | /672 | | |
| Perplexity | | /672 | | |
| Bing Copilot | | /672 | | |
| **Ortalama** | | **/672** | | Hedef ≥ 504 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
