# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **180/360** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **270/360**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (120 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 120 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /360.

| Model | Tarih | Konum | Incognito | Skor /360 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /360 | |
| Gemini | | | | /360 | |
| Perplexity | | | | /360 | |
| Bing Copilot | | | | /360 | |
| **Ortalama** | | | | **/360** | Hedef ≥ 180 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /360 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /360 | | |
| Gemini | | /360 | | |
| Perplexity | | /360 | | |
| Bing Copilot | | /360 | | |
| **Ortalama** | | **/360** | | Hedef ≥ 270 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
