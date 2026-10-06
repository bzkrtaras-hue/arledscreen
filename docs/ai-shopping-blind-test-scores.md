# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **353/705** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **529/705**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (235 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 235 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /705.

| Model | Tarih | Konum | Incognito | Skor /705 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /705 | |
| Gemini | | | | /705 | |
| Perplexity | | | | /705 | |
| Bing Copilot | | | | /705 | |
| **Ortalama** | | | | **/705** | Hedef ≥ 353 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /705 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /705 | | |
| Gemini | | /705 | | |
| Perplexity | | /705 | | |
| Bing Copilot | | /705 | | |
| **Ortalama** | | **/705** | | Hedef ≥ 529 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
