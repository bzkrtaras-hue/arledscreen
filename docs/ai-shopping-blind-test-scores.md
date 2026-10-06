# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **465/930** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **698/930**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (310 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 310 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /930.

| Model | Tarih | Konum | Incognito | Skor /930 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /930 | |
| Gemini | | | | /930 | |
| Perplexity | | | | /930 | |
| Bing Copilot | | | | /930 | |
| **Ortalama** | | | | **/930** | Hedef ≥ 465 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /930 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /930 | | |
| Gemini | | /930 | | |
| Perplexity | | /930 | | |
| Bing Copilot | | /930 | | |
| **Ortalama** | | **/930** | | Hedef ≥ 698 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
