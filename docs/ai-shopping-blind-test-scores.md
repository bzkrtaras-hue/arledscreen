# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **314/627** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **471/627**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (209 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 209 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /627.

| Model | Tarih | Konum | Incognito | Skor /627 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /627 | |
| Gemini | | | | /627 | |
| Perplexity | | | | /627 | |
| Bing Copilot | | | | /627 | |
| **Ortalama** | | | | **/627** | Hedef ≥ 314 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /627 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /627 | | |
| Gemini | | /627 | | |
| Perplexity | | /627 | | |
| Bing Copilot | | /627 | | |
| **Ortalama** | | **/627** | | Hedef ≥ 471 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
