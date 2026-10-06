# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **182/363** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **273/363**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (121 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 121 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /363.

| Model | Tarih | Konum | Incognito | Skor /363 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /363 | |
| Gemini | | | | /363 | |
| Perplexity | | | | /363 | |
| Bing Copilot | | | | /363 | |
| **Ortalama** | | | | **/363** | Hedef ≥ 182 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /363 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /363 | | |
| Gemini | | /363 | | |
| Perplexity | | /363 | | |
| Bing Copilot | | /363 | | |
| **Ortalama** | | **/363** | | Hedef ≥ 273 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
