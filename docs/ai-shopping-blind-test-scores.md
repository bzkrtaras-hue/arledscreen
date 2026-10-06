# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **279/558** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **419/558**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (186 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 186 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /558.

| Model | Tarih | Konum | Incognito | Skor /558 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /558 | |
| Gemini | | | | /558 | |
| Perplexity | | | | /558 | |
| Bing Copilot | | | | /558 | |
| **Ortalama** | | | | **/558** | Hedef ≥ 279 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /558 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /558 | | |
| Gemini | | /558 | | |
| Perplexity | | /558 | | |
| Bing Copilot | | /558 | | |
| **Ortalama** | | **/558** | | Hedef ≥ 419 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
