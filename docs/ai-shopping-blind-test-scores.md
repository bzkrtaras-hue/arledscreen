# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **57/114** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **86/114**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (38 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /114.

| Model | Tarih | Konum | Incognito | Skor /114 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /114 | |
| Gemini | | | | /114 | |
| Perplexity | | | | /114 | |
| Bing Copilot | | | | /114 | |
| **Ortalama** | | | | **/114** | Hedef ≥ 57 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /114 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /114 | | |
| Gemini | | /114 | | |
| Perplexity | | /114 | | |
| Bing Copilot | | /114 | | |
| **Ortalama** | | **/114** | | Hedef ≥ 86 |
