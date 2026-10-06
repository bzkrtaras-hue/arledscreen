# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **245/489** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **367/489**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (163 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 163 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /489.

| Model | Tarih | Konum | Incognito | Skor /489 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /489 | |
| Gemini | | | | /489 | |
| Perplexity | | | | /489 | |
| Bing Copilot | | | | /489 | |
| **Ortalama** | | | | **/489** | Hedef ≥ 245 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /489 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /489 | | |
| Gemini | | /489 | | |
| Perplexity | | /489 | | |
| Bing Copilot | | /489 | | |
| **Ortalama** | | **/489** | | Hedef ≥ 367 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
