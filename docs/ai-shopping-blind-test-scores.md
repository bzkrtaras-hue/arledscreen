# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **54/108** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **81/108**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (36 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /108.

| Model | Tarih | Konum | Incognito | Skor /108 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /108 | |
| Gemini | | | | /108 | |
| Perplexity | | | | /108 | |
| Bing Copilot | | | | /108 | |
| **Ortalama** | | | | **/108** | Hedef ≥ 54 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /108 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /108 | | |
| Gemini | | /108 | | |
| Perplexity | | /108 | | |
| Bing Copilot | | /108 | | |
| **Ortalama** | | **/108** | | Hedef ≥ 81 |
