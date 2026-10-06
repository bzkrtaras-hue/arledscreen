# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **63/126** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **95/126**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (42 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /126.

| Model | Tarih | Konum | Incognito | Skor /126 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /126 | |
| Gemini | | | | /126 | |
| Perplexity | | | | /126 | |
| Bing Copilot | | | | /126 | |
| **Ortalama** | | | | **/126** | Hedef ≥ 63 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /126 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /126 | | |
| Gemini | | /126 | | |
| Perplexity | | /126 | | |
| Bing Copilot | | /126 | | |
| **Ortalama** | | **/126** | | Hedef ≥ 95 |
