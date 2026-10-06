# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **339/678** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **509/678**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (226 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 226 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /678.

| Model | Tarih | Konum | Incognito | Skor /678 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /678 | |
| Gemini | | | | /678 | |
| Perplexity | | | | /678 | |
| Bing Copilot | | | | /678 | |
| **Ortalama** | | | | **/678** | Hedef ≥ 339 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /678 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /678 | | |
| Gemini | | /678 | | |
| Perplexity | | /678 | | |
| Bing Copilot | | /678 | | |
| **Ortalama** | | **/678** | | Hedef ≥ 509 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
