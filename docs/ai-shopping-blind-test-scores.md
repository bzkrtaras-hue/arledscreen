# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **585/1170** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **878/1170**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (390 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 390 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1170.

| Model | Tarih | Konum | Incognito | Skor /1170 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1170 | |
| Gemini | | | | /1170 | |
| Perplexity | | | | /1170 | |
| Bing Copilot | | | | /1170 | |
| **Ortalama** | | | | **/1170** | Hedef ≥ 585 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1170 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1170 | | |
| Gemini | | /1170 | | |
| Perplexity | | /1170 | | |
| Bing Copilot | | /1170 | | |
| **Ortalama** | | **/1170** | | Hedef ≥ 878 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
