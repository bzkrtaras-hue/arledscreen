# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **494/987** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **741/987**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (329 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 329 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /987.

| Model | Tarih | Konum | Incognito | Skor /987 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /987 | |
| Gemini | | | | /987 | |
| Perplexity | | | | /987 | |
| Bing Copilot | | | | /987 | |
| **Ortalama** | | | | **/987** | Hedef ≥ 494 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /987 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /987 | | |
| Gemini | | /987 | | |
| Perplexity | | /987 | | |
| Bing Copilot | | /987 | | |
| **Ortalama** | | **/987** | | Hedef ≥ 741 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
