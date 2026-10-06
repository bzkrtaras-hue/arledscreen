# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **581/1161** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **871/1161**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (387 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 387 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1161.

| Model | Tarih | Konum | Incognito | Skor /1161 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1161 | |
| Gemini | | | | /1161 | |
| Perplexity | | | | /1161 | |
| Bing Copilot | | | | /1161 | |
| **Ortalama** | | | | **/1161** | Hedef ≥ 581 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1161 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1161 | | |
| Gemini | | /1161 | | |
| Perplexity | | /1161 | | |
| Bing Copilot | | /1161 | | |
| **Ortalama** | | **/1161** | | Hedef ≥ 871 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
