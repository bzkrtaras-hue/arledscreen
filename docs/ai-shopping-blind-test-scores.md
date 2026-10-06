# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **549/1098** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **824/1098**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (366 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 366 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1098.

| Model | Tarih | Konum | Incognito | Skor /1098 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1098 | |
| Gemini | | | | /1098 | |
| Perplexity | | | | /1098 | |
| Bing Copilot | | | | /1098 | |
| **Ortalama** | | | | **/1098** | Hedef ≥ 549 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1098 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1098 | | |
| Gemini | | /1098 | | |
| Perplexity | | /1098 | | |
| Bing Copilot | | /1098 | | |
| **Ortalama** | | **/1098** | | Hedef ≥ 824 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
