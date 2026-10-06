# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **90/180** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **135/180**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (60 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 60 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /180.

| Model | Tarih | Konum | Incognito | Skor /180 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /180 | |
| Gemini | | | | /180 | |
| Perplexity | | | | /180 | |
| Bing Copilot | | | | /180 | |
| **Ortalama** | | | | **/180** | Hedef ≥ 90 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /180 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /180 | | |
| Gemini | | /180 | | |
| Perplexity | | /180 | | |
| Bing Copilot | | /180 | | |
| **Ortalama** | | **/180** | | Hedef ≥ 135 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
