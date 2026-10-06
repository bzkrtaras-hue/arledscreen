# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **461/921** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **691/921**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (307 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 307 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /921.

| Model | Tarih | Konum | Incognito | Skor /921 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /921 | |
| Gemini | | | | /921 | |
| Perplexity | | | | /921 | |
| Bing Copilot | | | | /921 | |
| **Ortalama** | | | | **/921** | Hedef ≥ 461 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /921 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /921 | | |
| Gemini | | /921 | | |
| Perplexity | | /921 | | |
| Bing Copilot | | /921 | | |
| **Ortalama** | | **/921** | | Hedef ≥ 691 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
