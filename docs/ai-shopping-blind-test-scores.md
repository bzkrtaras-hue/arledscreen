# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **191/381** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **286/381**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (127 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 127 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /381.

| Model | Tarih | Konum | Incognito | Skor /381 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /381 | |
| Gemini | | | | /381 | |
| Perplexity | | | | /381 | |
| Bing Copilot | | | | /381 | |
| **Ortalama** | | | | **/381** | Hedef ≥ 191 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /381 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /381 | | |
| Gemini | | /381 | | |
| Perplexity | | /381 | | |
| Bing Copilot | | /381 | | |
| **Ortalama** | | **/381** | | Hedef ≥ 286 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
