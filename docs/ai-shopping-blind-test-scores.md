# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **218/435** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **327/435**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (145 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 145 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /435.

| Model | Tarih | Konum | Incognito | Skor /435 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /435 | |
| Gemini | | | | /435 | |
| Perplexity | | | | /435 | |
| Bing Copilot | | | | /435 | |
| **Ortalama** | | | | **/435** | Hedef ≥ 218 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /435 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /435 | | |
| Gemini | | /435 | | |
| Perplexity | | /435 | | |
| Bing Copilot | | /435 | | |
| **Ortalama** | | **/435** | | Hedef ≥ 327 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
