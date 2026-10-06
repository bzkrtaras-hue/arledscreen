# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **62/123** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **92/123**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (41 prompt)

> Sahip doldurur. Agent skor uydurmaz.
> Canlı tur PR #55 merge + CF redeploy + `smoke:live` GREEN sonrası.

## Tur 1 — deploy sonrası (Point C öncesi)

Skor: prompt başına **0–3** (bkz. protokol). Toplam /123.

| Model | Tarih | Konum | Incognito | Skor /123 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /123 | |
| Gemini | | | | /123 | |
| Perplexity | | | | /123 | |
| Bing Copilot | | | | /123 | |
| **Ortalama** | | | | **/123** | Hedef ≥ 62 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /123 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /123 | | |
| Gemini | | /123 | | |
| Perplexity | | /123 | | |
| Bing Copilot | | /123 | | |
| **Ortalama** | | **/123** | | Hedef ≥ 92 |
