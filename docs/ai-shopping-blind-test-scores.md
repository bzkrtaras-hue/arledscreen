# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **392/783** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **588/783**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (261 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 261 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /783.

| Model | Tarih | Konum | Incognito | Skor /783 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /783 | |
| Gemini | | | | /783 | |
| Perplexity | | | | /783 | |
| Bing Copilot | | | | /783 | |
| **Ortalama** | | | | **/783** | Hedef ≥ 392 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /783 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /783 | | |
| Gemini | | /783 | | |
| Perplexity | | /783 | | |
| Bing Copilot | | /783 | | |
| **Ortalama** | | **/783** | | Hedef ≥ 588 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
