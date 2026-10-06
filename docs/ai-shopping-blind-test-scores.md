# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **107/213** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **160/213**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (71 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 71 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /213.

| Model | Tarih | Konum | Incognito | Skor /213 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /213 | |
| Gemini | | | | /213 | |
| Perplexity | | | | /213 | |
| Bing Copilot | | | | /213 | |
| **Ortalama** | | | | **/213** | Hedef ≥ 107 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /213 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /213 | | |
| Gemini | | /213 | | |
| Perplexity | | /213 | | |
| Bing Copilot | | /213 | | |
| **Ortalama** | | **/213** | | Hedef ≥ 160 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
