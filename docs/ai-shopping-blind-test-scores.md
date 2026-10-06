# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **312/624** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **468/624**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (208 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 208 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /624.

| Model | Tarih | Konum | Incognito | Skor /624 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /624 | |
| Gemini | | | | /624 | |
| Perplexity | | | | /624 | |
| Bing Copilot | | | | /624 | |
| **Ortalama** | | | | **/624** | Hedef ≥ 312 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /624 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /624 | | |
| Gemini | | /624 | | |
| Perplexity | | /624 | | |
| Bing Copilot | | /624 | | |
| **Ortalama** | | **/624** | | Hedef ≥ 468 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
