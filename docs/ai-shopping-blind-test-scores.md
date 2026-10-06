# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **417/834** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **626/834**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (278 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 278 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /834.

| Model | Tarih | Konum | Incognito | Skor /834 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /834 | |
| Gemini | | | | /834 | |
| Perplexity | | | | /834 | |
| Bing Copilot | | | | /834 | |
| **Ortalama** | | | | **/834** | Hedef ≥ 417 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /834 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /834 | | |
| Gemini | | /834 | | |
| Perplexity | | /834 | | |
| Bing Copilot | | /834 | | |
| **Ortalama** | | **/834** | | Hedef ≥ 626 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
