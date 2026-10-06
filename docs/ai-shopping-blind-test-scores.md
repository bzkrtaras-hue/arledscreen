# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **137/273** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **205/273**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (91 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 91 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /273.

| Model | Tarih | Konum | Incognito | Skor /273 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /273 | |
| Gemini | | | | /273 | |
| Perplexity | | | | /273 | |
| Bing Copilot | | | | /273 | |
| **Ortalama** | | | | **/273** | Hedef ≥ 137 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /273 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /273 | | |
| Gemini | | /273 | | |
| Perplexity | | /273 | | |
| Bing Copilot | | /273 | | |
| **Ortalama** | | **/273** | | Hedef ≥ 205 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
