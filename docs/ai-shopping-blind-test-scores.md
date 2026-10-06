# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **144/288** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **216/288**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (96 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 96 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /288.

| Model | Tarih | Konum | Incognito | Skor /288 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /288 | |
| Gemini | | | | /288 | |
| Perplexity | | | | /288 | |
| Bing Copilot | | | | /288 | |
| **Ortalama** | | | | **/288** | Hedef ≥ 144 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /288 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /288 | | |
| Gemini | | /288 | | |
| Perplexity | | /288 | | |
| Bing Copilot | | /288 | | |
| **Ortalama** | | **/288** | | Hedef ≥ 216 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
