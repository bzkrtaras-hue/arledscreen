# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **383/765** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **574/765**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (255 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 255 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /765.

| Model | Tarih | Konum | Incognito | Skor /765 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /765 | |
| Gemini | | | | /765 | |
| Perplexity | | | | /765 | |
| Bing Copilot | | | | /765 | |
| **Ortalama** | | | | **/765** | Hedef ≥ 383 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /765 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /765 | | |
| Gemini | | /765 | | |
| Perplexity | | /765 | | |
| Bing Copilot | | /765 | | |
| **Ortalama** | | **/765** | | Hedef ≥ 574 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
