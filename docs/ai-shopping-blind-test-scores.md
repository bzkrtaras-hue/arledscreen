# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **56/111** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **83/111**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (37 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /111.

| Model | Tarih | Konum | Incognito | Skor /111 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /111 | |
| Gemini | | | | /111 | |
| Perplexity | | | | /111 | |
| Bing Copilot | | | | /111 | |
| **Ortalama** | | | | **/111** | Hedef ≥ 56 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /111 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /111 | | |
| Gemini | | /111 | | |
| Perplexity | | /111 | | |
| Bing Copilot | | /111 | | |
| **Ortalama** | | **/111** | | Hedef ≥ 83 |
