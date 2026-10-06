# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **348/696** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **522/696**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (232 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 232 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /696.

| Model | Tarih | Konum | Incognito | Skor /696 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /696 | |
| Gemini | | | | /696 | |
| Perplexity | | | | /696 | |
| Bing Copilot | | | | /696 | |
| **Ortalama** | | | | **/696** | Hedef ≥ 348 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /696 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /696 | | |
| Gemini | | /696 | | |
| Perplexity | | /696 | | |
| Bing Copilot | | /696 | | |
| **Ortalama** | | **/696** | | Hedef ≥ 522 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
