# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **366/732** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **549/732**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (244 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 244 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /732.

| Model | Tarih | Konum | Incognito | Skor /732 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /732 | |
| Gemini | | | | /732 | |
| Perplexity | | | | /732 | |
| Bing Copilot | | | | /732 | |
| **Ortalama** | | | | **/732** | Hedef ≥ 366 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /732 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /732 | | |
| Gemini | | /732 | | |
| Perplexity | | /732 | | |
| Bing Copilot | | /732 | | |
| **Ortalama** | | **/732** | | Hedef ≥ 549 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
