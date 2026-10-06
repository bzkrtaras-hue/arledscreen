# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **528/1056** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **792/1056**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (352 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 352 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1056.

| Model | Tarih | Konum | Incognito | Skor /1056 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1056 | |
| Gemini | | | | /1056 | |
| Perplexity | | | | /1056 | |
| Bing Copilot | | | | /1056 | |
| **Ortalama** | | | | **/1056** | Hedef ≥ 528 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1056 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1056 | | |
| Gemini | | /1056 | | |
| Perplexity | | /1056 | | |
| Bing Copilot | | /1056 | | |
| **Ortalama** | | **/1056** | | Hedef ≥ 792 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
