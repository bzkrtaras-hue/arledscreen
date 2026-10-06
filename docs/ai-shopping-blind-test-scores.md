# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **372/744** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **558/744**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (248 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 248 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /744.

| Model | Tarih | Konum | Incognito | Skor /744 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /744 | |
| Gemini | | | | /744 | |
| Perplexity | | | | /744 | |
| Bing Copilot | | | | /744 | |
| **Ortalama** | | | | **/744** | Hedef ≥ 372 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /744 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /744 | | |
| Gemini | | /744 | | |
| Perplexity | | /744 | | |
| Bing Copilot | | /744 | | |
| **Ortalama** | | **/744** | | Hedef ≥ 558 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
