# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **515/1029** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **772/1029**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (343 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 343 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1029.

| Model | Tarih | Konum | Incognito | Skor /1029 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1029 | |
| Gemini | | | | /1029 | |
| Perplexity | | | | /1029 | |
| Bing Copilot | | | | /1029 | |
| **Ortalama** | | | | **/1029** | Hedef ≥ 515 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1029 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1029 | | |
| Gemini | | /1029 | | |
| Perplexity | | /1029 | | |
| Bing Copilot | | /1029 | | |
| **Ortalama** | | **/1029** | | Hedef ≥ 772 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
