# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **551/1101** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **826/1101**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (367 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 367 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1101.

| Model | Tarih | Konum | Incognito | Skor /1101 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1101 | |
| Gemini | | | | /1101 | |
| Perplexity | | | | /1101 | |
| Bing Copilot | | | | /1101 | |
| **Ortalama** | | | | **/1101** | Hedef ≥ 551 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1101 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1101 | | |
| Gemini | | /1101 | | |
| Perplexity | | /1101 | | |
| Bing Copilot | | /1101 | | |
| **Ortalama** | | **/1101** | | Hedef ≥ 826 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
