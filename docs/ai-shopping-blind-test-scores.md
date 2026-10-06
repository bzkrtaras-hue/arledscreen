# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **219/438** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **329/438**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (146 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 146 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /438.

| Model | Tarih | Konum | Incognito | Skor /438 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /438 | |
| Gemini | | | | /438 | |
| Perplexity | | | | /438 | |
| Bing Copilot | | | | /438 | |
| **Ortalama** | | | | **/438** | Hedef ≥ 219 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /438 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /438 | | |
| Gemini | | /438 | | |
| Perplexity | | /438 | | |
| Bing Copilot | | /438 | | |
| **Ortalama** | | **/438** | | Hedef ≥ 329 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
