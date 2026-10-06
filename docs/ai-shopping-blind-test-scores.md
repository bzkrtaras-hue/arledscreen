# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **482/963** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **723/963**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (321 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 321 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /963.

| Model | Tarih | Konum | Incognito | Skor /963 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /963 | |
| Gemini | | | | /963 | |
| Perplexity | | | | /963 | |
| Bing Copilot | | | | /963 | |
| **Ortalama** | | | | **/963** | Hedef ≥ 482 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /963 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /963 | | |
| Gemini | | /963 | | |
| Perplexity | | /963 | | |
| Bing Copilot | | /963 | | |
| **Ortalama** | | **/963** | | Hedef ≥ 723 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
