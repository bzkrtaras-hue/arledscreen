# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **50/99** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **74/99**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (33 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /99.

| Model | Tarih | Konum | Incognito | Skor /99 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /99 | |
| Gemini | | | | /99 | |
| Perplexity | | | | /99 | |
| Bing Copilot | | | | /99 | |
| **Ortalama** | | | | **/99** | Hedef ≥ 50 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /99 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /99 | | |
| Gemini | | /99 | | |
| Perplexity | | /99 | | |
| Bing Copilot | | /99 | | |
| **Ortalama** | | **/99** | | Hedef ≥ 74 |
