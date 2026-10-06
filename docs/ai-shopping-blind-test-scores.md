# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **276/552** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **414/552**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (184 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 184 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /552.

| Model | Tarih | Konum | Incognito | Skor /552 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /552 | |
| Gemini | | | | /552 | |
| Perplexity | | | | /552 | |
| Bing Copilot | | | | /552 | |
| **Ortalama** | | | | **/552** | Hedef ≥ 276 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /552 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /552 | | |
| Gemini | | /552 | | |
| Perplexity | | /552 | | |
| Bing Copilot | | /552 | | |
| **Ortalama** | | **/552** | | Hedef ≥ 414 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
