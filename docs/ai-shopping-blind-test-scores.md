# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **375/750** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **563/750**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (250 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 250 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /750.

| Model | Tarih | Konum | Incognito | Skor /750 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /750 | |
| Gemini | | | | /750 | |
| Perplexity | | | | /750 | |
| Bing Copilot | | | | /750 | |
| **Ortalama** | | | | **/750** | Hedef ≥ 375 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /750 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /750 | | |
| Gemini | | /750 | | |
| Perplexity | | /750 | | |
| Bing Copilot | | /750 | | |
| **Ortalama** | | **/750** | | Hedef ≥ 563 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
