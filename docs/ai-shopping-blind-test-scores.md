# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **45/90** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **68/90**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (30 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /90.

| Model | Tarih | Konum | Incognito | Skor /90 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /90 | |
| Gemini | | | | /90 | |
| Perplexity | | | | /90 | |
| Bing Copilot | | | | /90 | |
| **Ortalama** | | | | **/90** | Hedef ≥ 45 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /90 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /90 | | |
| Gemini | | /90 | | |
| Perplexity | | /90 | | |
| Bing Copilot | | /90 | | |
| **Ortalama** | | **/90** | | Hedef ≥ 68 |
