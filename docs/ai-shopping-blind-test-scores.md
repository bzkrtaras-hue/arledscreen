# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **423/846** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **635/846**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (282 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 282 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /846.

| Model | Tarih | Konum | Incognito | Skor /846 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /846 | |
| Gemini | | | | /846 | |
| Perplexity | | | | /846 | |
| Bing Copilot | | | | /846 | |
| **Ortalama** | | | | **/846** | Hedef ≥ 423 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /846 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /846 | | |
| Gemini | | /846 | | |
| Perplexity | | /846 | | |
| Bing Copilot | | /846 | | |
| **Ortalama** | | **/846** | | Hedef ≥ 635 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
