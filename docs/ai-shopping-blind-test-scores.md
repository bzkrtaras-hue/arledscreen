# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **359/717** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **538/717**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (239 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 239 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /717.

| Model | Tarih | Konum | Incognito | Skor /717 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /717 | |
| Gemini | | | | /717 | |
| Perplexity | | | | /717 | |
| Bing Copilot | | | | /717 | |
| **Ortalama** | | | | **/717** | Hedef ≥ 359 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /717 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /717 | | |
| Gemini | | /717 | | |
| Perplexity | | /717 | | |
| Bing Copilot | | /717 | | |
| **Ortalama** | | **/717** | | Hedef ≥ 538 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
