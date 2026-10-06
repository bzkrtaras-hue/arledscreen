# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **230/459** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **345/459**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (153 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 153 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /459.

| Model | Tarih | Konum | Incognito | Skor /459 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /459 | |
| Gemini | | | | /459 | |
| Perplexity | | | | /459 | |
| Bing Copilot | | | | /459 | |
| **Ortalama** | | | | **/459** | Hedef ≥ 230 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /459 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /459 | | |
| Gemini | | /459 | | |
| Perplexity | | /459 | | |
| Bing Copilot | | /459 | | |
| **Ortalama** | | **/459** | | Hedef ≥ 345 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
