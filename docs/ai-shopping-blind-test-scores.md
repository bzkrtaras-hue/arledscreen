# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **525/1050** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **788/1050**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (350 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 350 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1050.

| Model | Tarih | Konum | Incognito | Skor /1050 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1050 | |
| Gemini | | | | /1050 | |
| Perplexity | | | | /1050 | |
| Bing Copilot | | | | /1050 | |
| **Ortalama** | | | | **/1050** | Hedef ≥ 525 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1050 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1050 | | |
| Gemini | | /1050 | | |
| Perplexity | | /1050 | | |
| Bing Copilot | | /1050 | | |
| **Ortalama** | | **/1050** | | Hedef ≥ 788 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
