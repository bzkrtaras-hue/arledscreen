# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **377/753** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **565/753**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (251 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 251 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /753.

| Model | Tarih | Konum | Incognito | Skor /753 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /753 | |
| Gemini | | | | /753 | |
| Perplexity | | | | /753 | |
| Bing Copilot | | | | /753 | |
| **Ortalama** | | | | **/753** | Hedef ≥ 377 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /753 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /753 | | |
| Gemini | | /753 | | |
| Perplexity | | /753 | | |
| Bing Copilot | | /753 | | |
| **Ortalama** | | **/753** | | Hedef ≥ 565 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
