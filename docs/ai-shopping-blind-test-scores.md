# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **399/798** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **599/798**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (266 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 266 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /798.

| Model | Tarih | Konum | Incognito | Skor /798 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /798 | |
| Gemini | | | | /798 | |
| Perplexity | | | | /798 | |
| Bing Copilot | | | | /798 | |
| **Ortalama** | | | | **/798** | Hedef ≥ 399 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /798 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /798 | | |
| Gemini | | /798 | | |
| Perplexity | | /798 | | |
| Bing Copilot | | /798 | | |
| **Ortalama** | | **/798** | | Hedef ≥ 599 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
