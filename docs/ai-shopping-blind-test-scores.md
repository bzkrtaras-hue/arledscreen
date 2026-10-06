# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **59/117** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **88/117**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (39 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /117.

| Model | Tarih | Konum | Incognito | Skor /117 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /117 | |
| Gemini | | | | /117 | |
| Perplexity | | | | /117 | |
| Bing Copilot | | | | /117 | |
| **Ortalama** | | | | **/117** | Hedef ≥ 59 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /117 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /117 | | |
| Gemini | | /117 | | |
| Perplexity | | /117 | | |
| Bing Copilot | | /117 | | |
| **Ortalama** | | **/117** | | Hedef ≥ 88 |
