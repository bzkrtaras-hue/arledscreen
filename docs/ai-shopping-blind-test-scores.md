# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **51/102** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **77/102**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (34 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /102.

| Model | Tarih | Konum | Incognito | Skor /102 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /102 | |
| Gemini | | | | /102 | |
| Perplexity | | | | /102 | |
| Bing Copilot | | | | /102 | |
| **Ortalama** | | | | **/102** | Hedef ≥ 51 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /102 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /102 | | |
| Gemini | | /102 | | |
| Perplexity | | /102 | | |
| Bing Copilot | | /102 | | |
| **Ortalama** | | **/102** | | Hedef ≥ 77 |
