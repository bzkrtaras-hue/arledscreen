# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **330/660** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **495/660**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (220 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 220 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /660.

| Model | Tarih | Konum | Incognito | Skor /660 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /660 | |
| Gemini | | | | /660 | |
| Perplexity | | | | /660 | |
| Bing Copilot | | | | /660 | |
| **Ortalama** | | | | **/660** | Hedef ≥ 330 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /660 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /660 | | |
| Gemini | | /660 | | |
| Perplexity | | /660 | | |
| Bing Copilot | | /660 | | |
| **Ortalama** | | **/660** | | Hedef ≥ 495 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
