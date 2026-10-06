# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **512/1023** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **768/1023**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (341 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 341 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1023.

| Model | Tarih | Konum | Incognito | Skor /1023 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1023 | |
| Gemini | | | | /1023 | |
| Perplexity | | | | /1023 | |
| Bing Copilot | | | | /1023 | |
| **Ortalama** | | | | **/1023** | Hedef ≥ 512 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1023 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1023 | | |
| Gemini | | /1023 | | |
| Perplexity | | /1023 | | |
| Bing Copilot | | /1023 | | |
| **Ortalama** | | **/1023** | | Hedef ≥ 768 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
