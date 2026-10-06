# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **96/192** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **144/192**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (64 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 64 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /192.

| Model | Tarih | Konum | Incognito | Skor /192 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /192 | |
| Gemini | | | | /192 | |
| Perplexity | | | | /192 | |
| Bing Copilot | | | | /192 | |
| **Ortalama** | | | | **/192** | Hedef ≥ 96 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /192 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /192 | | |
| Gemini | | /192 | | |
| Perplexity | | /192 | | |
| Bing Copilot | | /192 | | |
| **Ortalama** | | **/192** | | Hedef ≥ 144 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
