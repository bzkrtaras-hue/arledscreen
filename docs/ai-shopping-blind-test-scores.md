# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **347/693** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **520/693**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (231 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 231 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /693.

| Model | Tarih | Konum | Incognito | Skor /693 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /693 | |
| Gemini | | | | /693 | |
| Perplexity | | | | /693 | |
| Bing Copilot | | | | /693 | |
| **Ortalama** | | | | **/693** | Hedef ≥ 347 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /693 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /693 | | |
| Gemini | | /693 | | |
| Perplexity | | /693 | | |
| Bing Copilot | | /693 | | |
| **Ortalama** | | **/693** | | Hedef ≥ 520 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
