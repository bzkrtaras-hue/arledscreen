# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **75/150** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **113/150**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (50 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 50 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /150.

| Model | Tarih | Konum | Incognito | Skor /150 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /150 | |
| Gemini | | | | /150 | |
| Perplexity | | | | /150 | |
| Bing Copilot | | | | /150 | |
| **Ortalama** | | | | **/150** | Hedef ≥ 75 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /150 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /150 | | |
| Gemini | | /150 | | |
| Perplexity | | /150 | | |
| Bing Copilot | | /150 | | |
| **Ortalama** | | **/150** | | Hedef ≥ 113 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
