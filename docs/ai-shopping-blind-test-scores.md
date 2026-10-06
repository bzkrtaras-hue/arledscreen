# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **60/120** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **90/120**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (40 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /120.

| Model | Tarih | Konum | Incognito | Skor /120 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /120 | |
| Gemini | | | | /120 | |
| Perplexity | | | | /120 | |
| Bing Copilot | | | | /120 | |
| **Ortalama** | | | | **/120** | Hedef ≥ 60 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /120 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /120 | | |
| Gemini | | /120 | | |
| Perplexity | | /120 | | |
| Bing Copilot | | /120 | | |
| **Ortalama** | | **/120** | | Hedef ≥ 90 |
