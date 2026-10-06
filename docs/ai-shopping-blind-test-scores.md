# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **246/492** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **369/492**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (164 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 164 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /492.

| Model | Tarih | Konum | Incognito | Skor /492 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /492 | |
| Gemini | | | | /492 | |
| Perplexity | | | | /492 | |
| Bing Copilot | | | | /492 | |
| **Ortalama** | | | | **/492** | Hedef ≥ 246 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /492 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /492 | | |
| Gemini | | /492 | | |
| Perplexity | | /492 | | |
| Bing Copilot | | /492 | | |
| **Ortalama** | | **/492** | | Hedef ≥ 369 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
