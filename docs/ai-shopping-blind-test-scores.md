# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **236/471** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **354/471**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (157 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 157 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /471.

| Model | Tarih | Konum | Incognito | Skor /471 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /471 | |
| Gemini | | | | /471 | |
| Perplexity | | | | /471 | |
| Bing Copilot | | | | /471 | |
| **Ortalama** | | | | **/471** | Hedef ≥ 236 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /471 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /471 | | |
| Gemini | | /471 | | |
| Perplexity | | /471 | | |
| Bing Copilot | | /471 | | |
| **Ortalama** | | **/471** | | Hedef ≥ 354 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
