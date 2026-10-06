# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **446/891** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **669/891**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (297 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 297 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /891.

| Model | Tarih | Konum | Incognito | Skor /891 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /891 | |
| Gemini | | | | /891 | |
| Perplexity | | | | /891 | |
| Bing Copilot | | | | /891 | |
| **Ortalama** | | | | **/891** | Hedef ≥ 446 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /891 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /891 | | |
| Gemini | | /891 | | |
| Perplexity | | /891 | | |
| Bing Copilot | | /891 | | |
| **Ortalama** | | **/891** | | Hedef ≥ 669 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
