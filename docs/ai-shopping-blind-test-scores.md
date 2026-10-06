# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **149/297** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **223/297**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (99 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 99 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /297.

| Model | Tarih | Konum | Incognito | Skor /297 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /297 | |
| Gemini | | | | /297 | |
| Perplexity | | | | /297 | |
| Bing Copilot | | | | /297 | |
| **Ortalama** | | | | **/297** | Hedef ≥ 149 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /297 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /297 | | |
| Gemini | | /297 | | |
| Perplexity | | /297 | | |
| Bing Copilot | | /297 | | |
| **Ortalama** | | **/297** | | Hedef ≥ 223 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
