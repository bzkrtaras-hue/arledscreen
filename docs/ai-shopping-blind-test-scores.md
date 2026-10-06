# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **138/276** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **207/276**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (92 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 92 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /276.

| Model | Tarih | Konum | Incognito | Skor /276 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /276 | |
| Gemini | | | | /276 | |
| Perplexity | | | | /276 | |
| Bing Copilot | | | | /276 | |
| **Ortalama** | | | | **/276** | Hedef ≥ 138 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /276 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /276 | | |
| Gemini | | /276 | | |
| Perplexity | | /276 | | |
| Bing Copilot | | /276 | | |
| **Ortalama** | | **/276** | | Hedef ≥ 207 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
