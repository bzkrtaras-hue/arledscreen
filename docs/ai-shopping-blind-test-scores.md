# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **227/453** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **340/453**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (151 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 151 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /453.

| Model | Tarih | Konum | Incognito | Skor /453 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /453 | |
| Gemini | | | | /453 | |
| Perplexity | | | | /453 | |
| Bing Copilot | | | | /453 | |
| **Ortalama** | | | | **/453** | Hedef ≥ 227 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /453 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /453 | | |
| Gemini | | /453 | | |
| Perplexity | | /453 | | |
| Bing Copilot | | /453 | | |
| **Ortalama** | | **/453** | | Hedef ≥ 340 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
