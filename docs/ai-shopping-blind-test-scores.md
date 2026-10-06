# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **431/861** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **646/861**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (287 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 287 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /861.

| Model | Tarih | Konum | Incognito | Skor /861 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /861 | |
| Gemini | | | | /861 | |
| Perplexity | | | | /861 | |
| Bing Copilot | | | | /861 | |
| **Ortalama** | | | | **/861** | Hedef ≥ 431 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /861 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /861 | | |
| Gemini | | /861 | | |
| Perplexity | | /861 | | |
| Bing Copilot | | /861 | | |
| **Ortalama** | | **/861** | | Hedef ≥ 646 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
