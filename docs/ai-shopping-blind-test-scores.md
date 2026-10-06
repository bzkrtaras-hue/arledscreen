# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **350/699** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **525/699**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (233 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 233 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /699.

| Model | Tarih | Konum | Incognito | Skor /699 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /699 | |
| Gemini | | | | /699 | |
| Perplexity | | | | /699 | |
| Bing Copilot | | | | /699 | |
| **Ortalama** | | | | **/699** | Hedef ≥ 350 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /699 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /699 | | |
| Gemini | | /699 | | |
| Perplexity | | /699 | | |
| Bing Copilot | | /699 | | |
| **Ortalama** | | **/699** | | Hedef ≥ 525 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
