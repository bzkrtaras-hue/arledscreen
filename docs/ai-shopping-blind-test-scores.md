# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **357/714** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **536/714**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (238 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 238 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /714.

| Model | Tarih | Konum | Incognito | Skor /714 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /714 | |
| Gemini | | | | /714 | |
| Perplexity | | | | /714 | |
| Bing Copilot | | | | /714 | |
| **Ortalama** | | | | **/714** | Hedef ≥ 357 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /714 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /714 | | |
| Gemini | | /714 | | |
| Perplexity | | /714 | | |
| Bing Copilot | | /714 | | |
| **Ortalama** | | **/714** | | Hedef ≥ 536 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
