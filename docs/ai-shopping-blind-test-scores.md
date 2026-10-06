# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **53/105** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **79/105**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (35 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /105.

| Model | Tarih | Konum | Incognito | Skor /105 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /105 | |
| Gemini | | | | /105 | |
| Perplexity | | | | /105 | |
| Bing Copilot | | | | /105 | |
| **Ortalama** | | | | **/105** | Hedef ≥ 53 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /105 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /105 | | |
| Gemini | | /105 | | |
| Perplexity | | /105 | | |
| Bing Copilot | | /105 | | |
| **Ortalama** | | **/105** | | Hedef ≥ 79 |
