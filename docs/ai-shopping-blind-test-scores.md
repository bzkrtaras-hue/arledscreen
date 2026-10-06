# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **510/1020** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **765/1020**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (340 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 340 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1020.

| Model | Tarih | Konum | Incognito | Skor /1020 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1020 | |
| Gemini | | | | /1020 | |
| Perplexity | | | | /1020 | |
| Bing Copilot | | | | /1020 | |
| **Ortalama** | | | | **/1020** | Hedef ≥ 510 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1020 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1020 | | |
| Gemini | | /1020 | | |
| Perplexity | | /1020 | | |
| Bing Copilot | | /1020 | | |
| **Ortalama** | | **/1020** | | Hedef ≥ 765 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
