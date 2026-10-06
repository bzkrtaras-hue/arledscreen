# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **194/387** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **291/387**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (129 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 129 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /387.

| Model | Tarih | Konum | Incognito | Skor /387 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /387 | |
| Gemini | | | | /387 | |
| Perplexity | | | | /387 | |
| Bing Copilot | | | | /387 | |
| **Ortalama** | | | | **/387** | Hedef ≥ 194 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /387 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /387 | | |
| Gemini | | /387 | | |
| Perplexity | | /387 | | |
| Bing Copilot | | /387 | | |
| **Ortalama** | | **/387** | | Hedef ≥ 291 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
