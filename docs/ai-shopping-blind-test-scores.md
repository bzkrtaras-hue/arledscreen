# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **143/285** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **214/285**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (95 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 95 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /285.

| Model | Tarih | Konum | Incognito | Skor /285 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /285 | |
| Gemini | | | | /285 | |
| Perplexity | | | | /285 | |
| Bing Copilot | | | | /285 | |
| **Ortalama** | | | | **/285** | Hedef ≥ 143 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /285 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /285 | | |
| Gemini | | /285 | | |
| Perplexity | | /285 | | |
| Bing Copilot | | /285 | | |
| **Ortalama** | | **/285** | | Hedef ≥ 214 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
