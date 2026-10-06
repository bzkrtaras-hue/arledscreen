# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **429/858** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **644/858**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (286 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 286 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /858.

| Model | Tarih | Konum | Incognito | Skor /858 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /858 | |
| Gemini | | | | /858 | |
| Perplexity | | | | /858 | |
| Bing Copilot | | | | /858 | |
| **Ortalama** | | | | **/858** | Hedef ≥ 429 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /858 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /858 | | |
| Gemini | | /858 | | |
| Perplexity | | /858 | | |
| Bing Copilot | | /858 | | |
| **Ortalama** | | **/858** | | Hedef ≥ 644 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
