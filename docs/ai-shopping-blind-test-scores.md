# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **188/375** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **282/375**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (125 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 125 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /375.

| Model | Tarih | Konum | Incognito | Skor /375 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /375 | |
| Gemini | | | | /375 | |
| Perplexity | | | | /375 | |
| Bing Copilot | | | | /375 | |
| **Ortalama** | | | | **/375** | Hedef ≥ 188 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /375 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /375 | | |
| Gemini | | /375 | | |
| Perplexity | | /375 | | |
| Bing Copilot | | /375 | | |
| **Ortalama** | | **/375** | | Hedef ≥ 282 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
