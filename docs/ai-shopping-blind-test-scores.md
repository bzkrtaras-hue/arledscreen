# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **462/924** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **693/924**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (308 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 308 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /924.

| Model | Tarih | Konum | Incognito | Skor /924 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /924 | |
| Gemini | | | | /924 | |
| Perplexity | | | | /924 | |
| Bing Copilot | | | | /924 | |
| **Ortalama** | | | | **/924** | Hedef ≥ 462 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /924 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /924 | | |
| Gemini | | /924 | | |
| Perplexity | | /924 | | |
| Bing Copilot | | /924 | | |
| **Ortalama** | | **/924** | | Hedef ≥ 693 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
