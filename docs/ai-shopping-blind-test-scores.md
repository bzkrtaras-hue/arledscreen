# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **65/129** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **97/129**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (43 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 43 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /129.

| Model | Tarih | Konum | Incognito | Skor /129 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /129 | |
| Gemini | | | | /129 | |
| Perplexity | | | | /129 | |
| Bing Copilot | | | | /129 | |
| **Ortalama** | | | | **/129** | Hedef ≥ 65 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /129 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /129 | | |
| Gemini | | /129 | | |
| Perplexity | | /129 | | |
| Bing Copilot | | /129 | | |
| **Ortalama** | | **/129** | | Hedef ≥ 97 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
