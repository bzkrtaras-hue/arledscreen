# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **402/804** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **603/804**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (268 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 268 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /804.

| Model | Tarih | Konum | Incognito | Skor /804 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /804 | |
| Gemini | | | | /804 | |
| Perplexity | | | | /804 | |
| Bing Copilot | | | | /804 | |
| **Ortalama** | | | | **/804** | Hedef ≥ 402 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /804 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /804 | | |
| Gemini | | /804 | | |
| Perplexity | | /804 | | |
| Bing Copilot | | /804 | | |
| **Ortalama** | | **/804** | | Hedef ≥ 603 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
