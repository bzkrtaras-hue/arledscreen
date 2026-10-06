# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **261/522** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **392/522**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (174 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 174 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /522.

| Model | Tarih | Konum | Incognito | Skor /522 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /522 | |
| Gemini | | | | /522 | |
| Perplexity | | | | /522 | |
| Bing Copilot | | | | /522 | |
| **Ortalama** | | | | **/522** | Hedef ≥ 261 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /522 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /522 | | |
| Gemini | | /522 | | |
| Perplexity | | /522 | | |
| Bing Copilot | | /522 | | |
| **Ortalama** | | **/522** | | Hedef ≥ 392 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
