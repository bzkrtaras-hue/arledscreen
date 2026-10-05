# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **47/93** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **70/93**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (31 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /93.

| Model | Tarih | Konum | Incognito | Skor /93 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /93 | |
| Gemini | | | | /93 | |
| Perplexity | | | | /93 | |
| Bing Copilot | | | | /93 | |
| **Ortalama** | | | | **/93** | Hedef ≥ 47 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /93 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /93 | | |
| Gemini | | /93 | | |
| Perplexity | | /93 | | |
| Bing Copilot | | /93 | | |
| **Ortalama** | | **/93** | | Hedef ≥ 70 |
