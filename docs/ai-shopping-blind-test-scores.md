# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **258/516** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **387/516**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (172 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 172 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /516.

| Model | Tarih | Konum | Incognito | Skor /516 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /516 | |
| Gemini | | | | /516 | |
| Perplexity | | | | /516 | |
| Bing Copilot | | | | /516 | |
| **Ortalama** | | | | **/516** | Hedef ≥ 258 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /516 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /516 | | |
| Gemini | | /516 | | |
| Perplexity | | /516 | | |
| Bing Copilot | | /516 | | |
| **Ortalama** | | **/516** | | Hedef ≥ 387 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
