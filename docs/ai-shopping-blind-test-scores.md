# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **267/534** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **401/534**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (178 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 178 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /534.

| Model | Tarih | Konum | Incognito | Skor /534 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /534 | |
| Gemini | | | | /534 | |
| Perplexity | | | | /534 | |
| Bing Copilot | | | | /534 | |
| **Ortalama** | | | | **/534** | Hedef ≥ 267 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /534 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /534 | | |
| Gemini | | /534 | | |
| Perplexity | | /534 | | |
| Bing Copilot | | /534 | | |
| **Ortalama** | | **/534** | | Hedef ≥ 401 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
