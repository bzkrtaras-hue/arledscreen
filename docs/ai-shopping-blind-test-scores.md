# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **428/855** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **642/855**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (285 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 285 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /855.

| Model | Tarih | Konum | Incognito | Skor /855 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /855 | |
| Gemini | | | | /855 | |
| Perplexity | | | | /855 | |
| Bing Copilot | | | | /855 | |
| **Ortalama** | | | | **/855** | Hedef ≥ 428 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /855 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /855 | | |
| Gemini | | /855 | | |
| Perplexity | | /855 | | |
| Bing Copilot | | /855 | | |
| **Ortalama** | | **/855** | | Hedef ≥ 642 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
