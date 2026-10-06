# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **432/864** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **648/864**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (288 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 288 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /864.

| Model | Tarih | Konum | Incognito | Skor /864 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /864 | |
| Gemini | | | | /864 | |
| Perplexity | | | | /864 | |
| Bing Copilot | | | | /864 | |
| **Ortalama** | | | | **/864** | Hedef ≥ 432 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /864 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /864 | | |
| Gemini | | /864 | | |
| Perplexity | | /864 | | |
| Bing Copilot | | /864 | | |
| **Ortalama** | | **/864** | | Hedef ≥ 648 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
