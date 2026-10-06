# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **480/960** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **720/960**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (320 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 320 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /960.

| Model | Tarih | Konum | Incognito | Skor /960 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /960 | |
| Gemini | | | | /960 | |
| Perplexity | | | | /960 | |
| Bing Copilot | | | | /960 | |
| **Ortalama** | | | | **/960** | Hedef ≥ 480 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /960 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /960 | | |
| Gemini | | /960 | | |
| Perplexity | | /960 | | |
| Bing Copilot | | /960 | | |
| **Ortalama** | | **/960** | | Hedef ≥ 720 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
