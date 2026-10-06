# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **561/1122** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **842/1122**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (374 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 374 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1122.

| Model | Tarih | Konum | Incognito | Skor /1122 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1122 | |
| Gemini | | | | /1122 | |
| Perplexity | | | | /1122 | |
| Bing Copilot | | | | /1122 | |
| **Ortalama** | | | | **/1122** | Hedef ≥ 561 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1122 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1122 | | |
| Gemini | | /1122 | | |
| Perplexity | | /1122 | | |
| Bing Copilot | | /1122 | | |
| **Ortalama** | | **/1122** | | Hedef ≥ 842 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
