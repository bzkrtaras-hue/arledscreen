# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **489/978** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **734/978**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (326 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 326 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /978.

| Model | Tarih | Konum | Incognito | Skor /978 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /978 | |
| Gemini | | | | /978 | |
| Perplexity | | | | /978 | |
| Bing Copilot | | | | /978 | |
| **Ortalama** | | | | **/978** | Hedef ≥ 489 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /978 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /978 | | |
| Gemini | | /978 | | |
| Perplexity | | /978 | | |
| Bing Copilot | | /978 | | |
| **Ortalama** | | **/978** | | Hedef ≥ 734 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
