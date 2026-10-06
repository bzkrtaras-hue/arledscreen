# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **234/468** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **351/468**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (156 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 156 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /468.

| Model | Tarih | Konum | Incognito | Skor /468 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /468 | |
| Gemini | | | | /468 | |
| Perplexity | | | | /468 | |
| Bing Copilot | | | | /468 | |
| **Ortalama** | | | | **/468** | Hedef ≥ 234 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /468 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /468 | | |
| Gemini | | /468 | | |
| Perplexity | | /468 | | |
| Bing Copilot | | /468 | | |
| **Ortalama** | | **/468** | | Hedef ≥ 351 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
