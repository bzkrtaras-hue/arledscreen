# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **128/255** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **192/255**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (85 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 85 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /255.

| Model | Tarih | Konum | Incognito | Skor /255 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /255 | |
| Gemini | | | | /255 | |
| Perplexity | | | | /255 | |
| Bing Copilot | | | | /255 | |
| **Ortalama** | | | | **/255** | Hedef ≥ 128 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /255 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /255 | | |
| Gemini | | /255 | | |
| Perplexity | | /255 | | |
| Bing Copilot | | /255 | | |
| **Ortalama** | | **/255** | | Hedef ≥ 192 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
