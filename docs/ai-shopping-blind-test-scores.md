# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **513/1026** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **770/1026**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (342 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 342 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /1026.

| Model | Tarih | Konum | Incognito | Skor /1026 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /1026 | |
| Gemini | | | | /1026 | |
| Perplexity | | | | /1026 | |
| Bing Copilot | | | | /1026 | |
| **Ortalama** | | | | **/1026** | Hedef ≥ 513 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /1026 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /1026 | | |
| Gemini | | /1026 | | |
| Perplexity | | /1026 | | |
| Bing Copilot | | /1026 | | |
| **Ortalama** | | **/1026** | | Hedef ≥ 770 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
