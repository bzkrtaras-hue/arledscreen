# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **176/351** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **264/351**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (117 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 117 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /351.

| Model | Tarih | Konum | Incognito | Skor /351 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /351 | |
| Gemini | | | | /351 | |
| Perplexity | | | | /351 | |
| Bing Copilot | | | | /351 | |
| **Ortalama** | | | | **/351** | Hedef ≥ 176 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /351 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /351 | | |
| Gemini | | /351 | | |
| Perplexity | | /351 | | |
| Bing Copilot | | /351 | | |
| **Ortalama** | | **/351** | | Hedef ≥ 264 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
