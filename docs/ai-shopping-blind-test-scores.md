# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **288/576** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **432/576**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (192 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 192 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /576.

| Model | Tarih | Konum | Incognito | Skor /576 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /576 | |
| Gemini | | | | /576 | |
| Perplexity | | | | /576 | |
| Bing Copilot | | | | /576 | |
| **Ortalama** | | | | **/576** | Hedef ≥ 288 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /576 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /576 | | |
| Gemini | | /576 | | |
| Perplexity | | /576 | | |
| Bing Copilot | | /576 | | |
| **Ortalama** | | **/576** | | Hedef ≥ 432 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
