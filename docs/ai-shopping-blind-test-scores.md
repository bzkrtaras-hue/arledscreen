# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **606/1212** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **909/1212**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (404 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 404 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1212.

| Model | Tarih | Konum | Incognito | Skor /1212 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1212 | |
| Gemini | | | | /1212 | |
| Perplexity | | | | /1212 | |
| Bing Copilot | | | | /1212 | |
| **Ortalama** | | | | **/1212** | Hedef ≥ 606 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1212 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1212 | | |
| Gemini | | /1212 | | |
| Perplexity | | /1212 | | |
| Bing Copilot | | /1212 | | |
| **Ortalama** | | **/1212** | | Hedef ≥ 909 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
