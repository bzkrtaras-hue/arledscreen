# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **83/165** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **124/165**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (55 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 55 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /165.

| Model | Tarih | Konum | Incognito | Skor /165 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /165 | |
| Gemini | | | | /165 | |
| Perplexity | | | | /165 | |
| Bing Copilot | | | | /165 | |
| **Ortalama** | | | | **/165** | Hedef ≥ 83 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /165 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /165 | | |
| Gemini | | /165 | | |
| Perplexity | | /165 | | |
| Bing Copilot | | /165 | | |
| **Ortalama** | | **/165** | | Hedef ≥ 124 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
