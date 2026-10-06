# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **213/426** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **320/426**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (142 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 142 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /426.

| Model | Tarih | Konum | Incognito | Skor /426 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /426 | |
| Gemini | | | | /426 | |
| Perplexity | | | | /426 | |
| Bing Copilot | | | | /426 | |
| **Ortalama** | | | | **/426** | Hedef ≥ 213 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /426 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /426 | | |
| Gemini | | /426 | | |
| Perplexity | | /426 | | |
| Bing Copilot | | /426 | | |
| **Ortalama** | | **/426** | | Hedef ≥ 320 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
