# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **425/849** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **637/849**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (283 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 283 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /849.

| Model | Tarih | Konum | Incognito | Skor /849 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /849 | |
| Gemini | | | | /849 | |
| Perplexity | | | | /849 | |
| Bing Copilot | | | | /849 | |
| **Ortalama** | | | | **/849** | Hedef ≥ 425 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /849 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /849 | | |
| Gemini | | /849 | | |
| Perplexity | | /849 | | |
| Bing Copilot | | /849 | | |
| **Ortalama** | | **/849** | | Hedef ≥ 637 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
