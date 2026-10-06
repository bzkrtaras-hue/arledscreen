# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **539/1077** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **808/1077**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (359 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 359 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1077.

| Model | Tarih | Konum | Incognito | Skor /1077 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1077 | |
| Gemini | | | | /1077 | |
| Perplexity | | | | /1077 | |
| Bing Copilot | | | | /1077 | |
| **Ortalama** | | | | **/1077** | Hedef ≥ 539 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1077 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1077 | | |
| Gemini | | /1077 | | |
| Perplexity | | /1077 | | |
| Bing Copilot | | /1077 | | |
| **Ortalama** | | **/1077** | | Hedef ≥ 808 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
