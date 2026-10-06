# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **122/243** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **183/243**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (81 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 81 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /243.

| Model | Tarih | Konum | Incognito | Skor /243 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /243 | |
| Gemini | | | | /243 | |
| Perplexity | | | | /243 | |
| Bing Copilot | | | | /243 | |
| **Ortalama** | | | | **/243** | Hedef ≥ 122 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /243 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /243 | | |
| Gemini | | /243 | | |
| Perplexity | | /243 | | |
| Bing Copilot | | /243 | | |
| **Ortalama** | | **/243** | | Hedef ≥ 183 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
