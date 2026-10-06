# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **266/531** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **399/531**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (177 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 177 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /531.

| Model | Tarih | Konum | Incognito | Skor /531 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /531 | |
| Gemini | | | | /531 | |
| Perplexity | | | | /531 | |
| Bing Copilot | | | | /531 | |
| **Ortalama** | | | | **/531** | Hedef ≥ 266 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /531 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /531 | | |
| Gemini | | /531 | | |
| Perplexity | | /531 | | |
| Bing Copilot | | /531 | | |
| **Ortalama** | | **/531** | | Hedef ≥ 399 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
