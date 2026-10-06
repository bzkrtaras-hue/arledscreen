# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **500/999** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **750/999**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (333 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 333 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /999.

| Model | Tarih | Konum | Incognito | Skor /999 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /999 | |
| Gemini | | | | /999 | |
| Perplexity | | | | /999 | |
| Bing Copilot | | | | /999 | |
| **Ortalama** | | | | **/999** | Hedef ≥ 500 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /999 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /999 | | |
| Gemini | | /999 | | |
| Perplexity | | /999 | | |
| Bing Copilot | | /999 | | |
| **Ortalama** | | **/999** | | Hedef ≥ 750 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
