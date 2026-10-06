# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **470/939** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **705/939**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (313 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 313 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /939.

| Model | Tarih | Konum | Incognito | Skor /939 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /939 | |
| Gemini | | | | /939 | |
| Perplexity | | | | /939 | |
| Bing Copilot | | | | /939 | |
| **Ortalama** | | | | **/939** | Hedef ≥ 470 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /939 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /939 | | |
| Gemini | | /939 | | |
| Perplexity | | /939 | | |
| Bing Copilot | | /939 | | |
| **Ortalama** | | **/939** | | Hedef ≥ 705 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
