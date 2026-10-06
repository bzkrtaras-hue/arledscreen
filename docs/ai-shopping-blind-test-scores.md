# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **200/399** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **300/399**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (133 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 133 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /399.

| Model | Tarih | Konum | Incognito | Skor /399 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /399 | |
| Gemini | | | | /399 | |
| Perplexity | | | | /399 | |
| Bing Copilot | | | | /399 | |
| **Ortalama** | | | | **/399** | Hedef ≥ 200 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /399 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /399 | | |
| Gemini | | /399 | | |
| Perplexity | | /399 | | |
| Bing Copilot | | /399 | | |
| **Ortalama** | | **/399** | | Hedef ≥ 300 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
