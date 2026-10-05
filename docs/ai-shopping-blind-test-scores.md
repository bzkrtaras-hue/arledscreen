# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **44/87** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **65/87**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (29 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /87.

| Model | Tarih | Konum | Incognito | Skor /87 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /87 | |
| Gemini | | | | /87 | |
| Perplexity | | | | /87 | |
| Bing Copilot | | | | /87 | |
| **Ortalama** | | | | **/87** | Hedef ≥ 44 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /87 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /87 | | |
| Gemini | | /87 | | |
| Perplexity | | /87 | | |
| Bing Copilot | | /87 | | |
| **Ortalama** | | **/87** | | Hedef ≥ 65 |
