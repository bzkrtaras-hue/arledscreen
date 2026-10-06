# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **534/1068** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **801/1068**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (356 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 356 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1068.

| Model | Tarih | Konum | Incognito | Skor /1068 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1068 | |
| Gemini | | | | /1068 | |
| Perplexity | | | | /1068 | |
| Bing Copilot | | | | /1068 | |
| **Ortalama** | | | | **/1068** | Hedef ≥ 534 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1068 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1068 | | |
| Gemini | | /1068 | | |
| Perplexity | | /1068 | | |
| Bing Copilot | | /1068 | | |
| **Ortalama** | | **/1068** | | Hedef ≥ 801 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
