# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **197/393** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **295/393**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (131 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 131 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /393.

| Model | Tarih | Konum | Incognito | Skor /393 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /393 | |
| Gemini | | | | /393 | |
| Perplexity | | | | /393 | |
| Bing Copilot | | | | /393 | |
| **Ortalama** | | | | **/393** | Hedef ≥ 197 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /393 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /393 | | |
| Gemini | | /393 | | |
| Perplexity | | /393 | | |
| Bing Copilot | | /393 | | |
| **Ortalama** | | **/393** | | Hedef ≥ 295 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
