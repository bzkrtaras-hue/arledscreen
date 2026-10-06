# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **287/573** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **430/573**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (191 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 191 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /573.

| Model | Tarih | Konum | Incognito | Skor /573 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /573 | |
| Gemini | | | | /573 | |
| Perplexity | | | | /573 | |
| Bing Copilot | | | | /573 | |
| **Ortalama** | | | | **/573** | Hedef ≥ 287 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /573 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /573 | | |
| Gemini | | /573 | | |
| Perplexity | | /573 | | |
| Bing Copilot | | /573 | | |
| **Ortalama** | | **/573** | | Hedef ≥ 430 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
