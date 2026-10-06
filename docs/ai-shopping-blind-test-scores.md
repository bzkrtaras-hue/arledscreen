# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **354/708** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **531/708**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (236 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 236 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /708.

| Model | Tarih | Konum | Incognito | Skor /708 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /708 | |
| Gemini | | | | /708 | |
| Perplexity | | | | /708 | |
| Bing Copilot | | | | /708 | |
| **Ortalama** | | | | **/708** | Hedef ≥ 354 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /708 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /708 | | |
| Gemini | | /708 | | |
| Perplexity | | /708 | | |
| Bing Copilot | | /708 | | |
| **Ortalama** | | **/708** | | Hedef ≥ 531 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
