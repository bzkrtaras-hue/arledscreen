# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **596/1191** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **894/1191**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (397 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 397 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1191.

| Model | Tarih | Konum | Incognito | Skor /1191 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1191 | |
| Gemini | | | | /1191 | |
| Perplexity | | | | /1191 | |
| Bing Copilot | | | | /1191 | |
| **Ortalama** | | | | **/1191** | Hedef ≥ 596 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1191 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1191 | | |
| Gemini | | /1191 | | |
| Perplexity | | /1191 | | |
| Bing Copilot | | /1191 | | |
| **Ortalama** | | **/1191** | | Hedef ≥ 894 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
