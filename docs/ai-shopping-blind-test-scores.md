# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **123/246** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **185/246**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (82 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 82 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /246.

| Model | Tarih | Konum | Incognito | Skor /246 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /246 | |
| Gemini | | | | /246 | |
| Perplexity | | | | /246 | |
| Bing Copilot | | | | /246 | |
| **Ortalama** | | | | **/246** | Hedef ≥ 123 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /246 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /246 | | |
| Gemini | | /246 | | |
| Perplexity | | /246 | | |
| Bing Copilot | | /246 | | |
| **Ortalama** | | **/246** | | Hedef ≥ 185 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
