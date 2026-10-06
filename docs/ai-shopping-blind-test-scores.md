# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **177/354** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **266/354**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (118 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 118 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /354.

| Model | Tarih | Konum | Incognito | Skor /354 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /354 | |
| Gemini | | | | /354 | |
| Perplexity | | | | /354 | |
| Bing Copilot | | | | /354 | |
| **Ortalama** | | | | **/354** | Hedef ≥ 177 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /354 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /354 | | |
| Gemini | | /354 | | |
| Perplexity | | /354 | | |
| Bing Copilot | | /354 | | |
| **Ortalama** | | **/354** | | Hedef ≥ 266 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
