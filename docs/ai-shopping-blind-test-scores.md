# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **270/540** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **405/540**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (180 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 180 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /540.

| Model | Tarih | Konum | Incognito | Skor /540 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /540 | |
| Gemini | | | | /540 | |
| Perplexity | | | | /540 | |
| Bing Copilot | | | | /540 | |
| **Ortalama** | | | | **/540** | Hedef ≥ 270 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /540 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /540 | | |
| Gemini | | /540 | | |
| Perplexity | | /540 | | |
| Bing Copilot | | /540 | | |
| **Ortalama** | | **/540** | | Hedef ≥ 405 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
