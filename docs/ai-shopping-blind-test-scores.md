# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **134/267** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **201/267**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (89 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 89 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /267.

| Model | Tarih | Konum | Incognito | Skor /267 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /267 | |
| Gemini | | | | /267 | |
| Perplexity | | | | /267 | |
| Bing Copilot | | | | /267 | |
| **Ortalama** | | | | **/267** | Hedef ≥ 134 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /267 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /267 | | |
| Gemini | | /267 | | |
| Perplexity | | /267 | | |
| Bing Copilot | | /267 | | |
| **Ortalama** | | **/267** | | Hedef ≥ 201 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
