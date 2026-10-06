# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **189/378** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **284/378**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (126 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 126 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /378.

| Model | Tarih | Konum | Incognito | Skor /378 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /378 | |
| Gemini | | | | /378 | |
| Perplexity | | | | /378 | |
| Bing Copilot | | | | /378 | |
| **Ortalama** | | | | **/378** | Hedef ≥ 189 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /378 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /378 | | |
| Gemini | | /378 | | |
| Perplexity | | /378 | | |
| Bing Copilot | | /378 | | |
| **Ortalama** | | **/378** | | Hedef ≥ 284 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
