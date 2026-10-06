# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **422/843** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **633/843**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (281 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 281 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /843.

| Model | Tarih | Konum | Incognito | Skor /843 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /843 | |
| Gemini | | | | /843 | |
| Perplexity | | | | /843 | |
| Bing Copilot | | | | /843 | |
| **Ortalama** | | | | **/843** | Hedef ≥ 422 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /843 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /843 | | |
| Gemini | | /843 | | |
| Perplexity | | /843 | | |
| Bing Copilot | | /843 | | |
| **Ortalama** | | **/843** | | Hedef ≥ 633 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
