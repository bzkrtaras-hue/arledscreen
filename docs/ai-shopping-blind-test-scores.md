# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **477/954** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **716/954**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (318 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 318 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /954.

| Model | Tarih | Konum | Incognito | Skor /954 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /954 | |
| Gemini | | | | /954 | |
| Perplexity | | | | /954 | |
| Bing Copilot | | | | /954 | |
| **Ortalama** | | | | **/954** | Hedef ≥ 477 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /954 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /954 | | |
| Gemini | | /954 | | |
| Perplexity | | /954 | | |
| Bing Copilot | | /954 | | |
| **Ortalama** | | **/954** | | Hedef ≥ 716 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
