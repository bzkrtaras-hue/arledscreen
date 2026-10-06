# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **183/366** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **275/366**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (122 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 122 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /366.

| Model | Tarih | Konum | Incognito | Skor /366 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /366 | |
| Gemini | | | | /366 | |
| Perplexity | | | | /366 | |
| Bing Copilot | | | | /366 | |
| **Ortalama** | | | | **/366** | Hedef ≥ 183 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /366 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /366 | | |
| Gemini | | /366 | | |
| Perplexity | | /366 | | |
| Bing Copilot | | /366 | | |
| **Ortalama** | | **/366** | | Hedef ≥ 275 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
