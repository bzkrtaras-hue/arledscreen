# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **471/942** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **707/942**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (314 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 314 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /942.

| Model | Tarih | Konum | Incognito | Skor /942 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /942 | |
| Gemini | | | | /942 | |
| Perplexity | | | | /942 | |
| Bing Copilot | | | | /942 | |
| **Ortalama** | | | | **/942** | Hedef ≥ 471 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /942 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /942 | | |
| Gemini | | /942 | | |
| Perplexity | | /942 | | |
| Bing Copilot | | /942 | | |
| **Ortalama** | | **/942** | | Hedef ≥ 707 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
