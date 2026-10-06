# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **170/339** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **255/339**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (113 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 113 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /339.

| Model | Tarih | Konum | Incognito | Skor /339 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /339 | |
| Gemini | | | | /339 | |
| Perplexity | | | | /339 | |
| Bing Copilot | | | | /339 | |
| **Ortalama** | | | | **/339** | Hedef ≥ 170 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /339 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /339 | | |
| Gemini | | /339 | | |
| Perplexity | | /339 | | |
| Bing Copilot | | /339 | | |
| **Ortalama** | | **/339** | | Hedef ≥ 255 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
