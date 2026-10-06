# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **564/1128** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **846/1128**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (376 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 376 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1128.

| Model | Tarih | Konum | Incognito | Skor /1128 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1128 | |
| Gemini | | | | /1128 | |
| Perplexity | | | | /1128 | |
| Bing Copilot | | | | /1128 | |
| **Ortalama** | | | | **/1128** | Hedef ≥ 564 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1128 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1128 | | |
| Gemini | | /1128 | | |
| Perplexity | | /1128 | | |
| Bing Copilot | | /1128 | | |
| **Ortalama** | | **/1128** | | Hedef ≥ 846 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
