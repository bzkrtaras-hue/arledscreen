# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **80/159** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **119/159**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (53 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 53 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /159.

| Model | Tarih | Konum | Incognito | Skor /159 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /159 | |
| Gemini | | | | /159 | |
| Perplexity | | | | /159 | |
| Bing Copilot | | | | /159 | |
| **Ortalama** | | | | **/159** | Hedef ≥ 80 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /159 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /159 | | |
| Gemini | | /159 | | |
| Perplexity | | /159 | | |
| Bing Copilot | | /159 | | |
| **Ortalama** | | **/159** | | Hedef ≥ 119 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
