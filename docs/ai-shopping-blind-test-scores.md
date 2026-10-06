# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **501/1002** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **752/1002**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (334 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 334 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1002.

| Model | Tarih | Konum | Incognito | Skor /1002 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1002 | |
| Gemini | | | | /1002 | |
| Perplexity | | | | /1002 | |
| Bing Copilot | | | | /1002 | |
| **Ortalama** | | | | **/1002** | Hedef ≥ 501 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1002 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1002 | | |
| Gemini | | /1002 | | |
| Perplexity | | /1002 | | |
| Bing Copilot | | /1002 | | |
| **Ortalama** | | **/1002** | | Hedef ≥ 752 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
