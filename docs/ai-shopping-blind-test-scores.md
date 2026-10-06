# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **518/1035** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **777/1035**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (345 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 345 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1035.

| Model | Tarih | Konum | Incognito | Skor /1035 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1035 | |
| Gemini | | | | /1035 | |
| Perplexity | | | | /1035 | |
| Bing Copilot | | | | /1035 | |
| **Ortalama** | | | | **/1035** | Hedef ≥ 518 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1035 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1035 | | |
| Gemini | | /1035 | | |
| Perplexity | | /1035 | | |
| Bing Copilot | | /1035 | | |
| **Ortalama** | | **/1035** | | Hedef ≥ 777 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
