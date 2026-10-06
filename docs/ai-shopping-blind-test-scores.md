# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **479/957** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **718/957**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (319 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 319 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /957.

| Model | Tarih | Konum | Incognito | Skor /957 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /957 | |
| Gemini | | | | /957 | |
| Perplexity | | | | /957 | |
| Bing Copilot | | | | /957 | |
| **Ortalama** | | | | **/957** | Hedef ≥ 479 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /957 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /957 | | |
| Gemini | | /957 | | |
| Perplexity | | /957 | | |
| Bing Copilot | | /957 | | |
| **Ortalama** | | **/957** | | Hedef ≥ 718 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
