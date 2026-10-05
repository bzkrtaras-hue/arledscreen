# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **48/96** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **72/96**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (32 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /96.

| Model | Tarih | Konum | Incognito | Skor /96 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /96 | |
| Gemini | | | | /96 | |
| Perplexity | | | | /96 | |
| Bing Copilot | | | | /96 | |
| **Ortalama** | | | | **/96** | Hedef ≥ 48 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /96 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /96 | | |
| Gemini | | /96 | | |
| Perplexity | | /96 | | |
| Bing Copilot | | /96 | | |
| **Ortalama** | | **/96** | | Hedef ≥ 72 |
