# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **467/933** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **700/933**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (311 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 311 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /933.

| Model | Tarih | Konum | Incognito | Skor /933 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /933 | |
| Gemini | | | | /933 | |
| Perplexity | | | | /933 | |
| Bing Copilot | | | | /933 | |
| **Ortalama** | | | | **/933** | Hedef ≥ 467 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /933 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /933 | | |
| Gemini | | /933 | | |
| Perplexity | | /933 | | |
| Bing Copilot | | /933 | | |
| **Ortalama** | | **/933** | | Hedef ≥ 700 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
